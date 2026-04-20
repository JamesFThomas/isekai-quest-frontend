import { getDbConnection } from '@/lib/server/db/azureSql';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import sql from 'mssql';
import { ProgressionData } from '@/types/persistence';
import bcrypt from 'bcryptjs';

/*
The registration route will create a new account record in the accounts table, a new player record in the players table linked to the account, and a new character save record in the character_saves table linked to the player.
The password will be hashed before storing.
The route will return a success response with the created account, player, and character save data (excluding password hash) if all inserts succeed, or an error response if any insert fails.
A sql transaction will be used to ensure all inserts succeed or fail together for data integrity.
The response data will include the new account and player records, as well as the initial character save data with the default starting character and progression state.
This allows the frontend to immediately log in the user and load their initial game state after registration without needing an additional login request.
The session refresh data can also be included in the response to allow for immediate session creation on the frontend using the new account and player information.
*/
export async function POST(request: Request) {
  let transaction: sql.Transaction | null = null;
  try {
    const body = await request.json();

    // check body for CreateAccountInput input values and respond with 400 if not present
    if (
      !body.email ||
      typeof body.email !== 'string' ||
      !body.password ||
      typeof body.password !== 'string' ||
      !body.characterName ||
      typeof body.characterName !== 'string' ||
      !body.avatar ||
      typeof body.avatar !== 'string' ||
      !body.characterClass ||
      typeof body.characterClass !== 'string'
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields in registration data',
          data: {},
        },
        { status: 400 },
      );
    }

    // create db connection pool
    const pool = await getDbConnection();

    // Accounts lookup for duplicate account by email fail with 409 if found
    const existingAccountResult = await pool
      .request()
      .input('email', sql.NVarChar, body.email.toLowerCase().trim())
      .query('SELECT id FROM accounts WHERE email = @email');

    if (existingAccountResult.recordset.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'An account with this email already exists',
          data: {},
        },
        { status: 409 },
      );
    }
    // create sql transaction for account player and character save inserts
    transaction = new sql.Transaction(pool);
    await transaction.begin();

    // create account, player, and character_saves record in the database, hash the password before storing

    // create account record
    const accountId = randomUUID();
    const normalizedEmail = body.email.toLowerCase().trim();

    // hash password with bcrypt before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const passwordHash = hashedPassword;

    // insert account record
    await transaction
      .request()
      .input('id', sql.UniqueIdentifier, accountId)
      .input('email', sql.NVarChar(255), normalizedEmail)
      .input('password_hash', sql.NVarChar(255), passwordHash).query(`
        INSERT INTO accounts (id, email, password_hash)
        VALUES (@id, @email, @password_hash)
      `);

    // check if account record was created successfully
    const newAccountResult = await transaction
      .request()
      .input('id', sql.UniqueIdentifier, accountId)
      .query('SELECT id FROM accounts WHERE id = @id');

    if (newAccountResult.recordset.length === 0) {
      // throw error to trigger transaction rollback
      throw new Error('Failed to create account');
    }

    // create player record with accountId
    const playerId = randomUUID();
    await transaction
      .request()
      .input('id', sql.UniqueIdentifier, playerId)
      .input('account_id', sql.UniqueIdentifier, accountId)
      .input('display_name', sql.NVarChar(255), body.characterName.trim())
      .query(`
        INSERT INTO players (id, account_id, display_name)
        VALUES (@id, @account_id, @display_name)
      `);

    // check for player record was created successfully
    const newPlayerResult = await transaction
      .request()
      .input('id', sql.UniqueIdentifier, playerId)
      .query('SELECT id FROM players WHERE id = @id');

    if (newPlayerResult.recordset.length === 0) {
      // throw error to trigger transaction rollback
      throw new Error('Failed to create player');
    }

    // Create the character_saves insert using the playerId, and build the initial characterData and progressionData objects

    const initialProgressionData: ProgressionData = {
      completedQuestIds: [],
      currentTown: 'StartsVille',
      acceptedQuestId: null,
      currentStoryPointId: null,
      lastEndedQuestId: null,
    };

    const newCharacterSave = {
      id: randomUUID(),
      player_id: playerId,
      character_data: {
        id: randomUUID(),
        name: body.characterName.trim(),
        avatar: body.avatar.trim(),
        class: body.characterClass.trim(),
        level: 1,
        hp: 100,
        maxHp: 100,
        mp: 100,
        maxMp: 100,
        inventory: {
          attacks: [],
          skills: [],
          coins: {
            gold: 100, // TODO: update starting coins once all quests complete
            silver: 100, // TODO: update starting coins once all quests complete
            copper: 100, // TODO: update starting coins once all quests complete
          },
          weapons: [],
          equipment: [],
          rations: [],
          potions: [],
        },
        partyMembers: [],
      },
      progression_data: initialProgressionData,
      schema_version: '1.0.0',
      game_version_last_played: '1.0.0',
    };

    // character_saves record
    await transaction
      .request()
      .input('id', sql.UniqueIdentifier, newCharacterSave.id)
      .input('player_id', sql.UniqueIdentifier, playerId)
      .input(
        'character_data',
        sql.NVarChar,
        JSON.stringify(newCharacterSave.character_data),
      )
      .input(
        'progression_data',
        sql.NVarChar,
        JSON.stringify(newCharacterSave.progression_data),
      )
      .input(
        'schema_version',
        sql.NVarChar(50),
        newCharacterSave.schema_version,
      )
      .input(
        'game_version_last_played',
        sql.NVarChar(50),
        newCharacterSave.game_version_last_played,
      ).query(`
        INSERT INTO character_saves (id, player_id, character_data, progression_data, schema_version, game_version_last_played)
        VALUES (@id, @player_id, @character_data, @progression_data, @schema_version, @game_version_last_played)
      `);

    // check if character_saves record was created successfully
    const newCharacterSaveResult = await transaction
      .request()
      .input('id', sql.UniqueIdentifier, newCharacterSave.id)
      .query('SELECT id FROM character_saves WHERE id = @id');

    if (newCharacterSaveResult.recordset.length === 0) {
      // throw error to trigger transaction rollback
      throw new Error('Failed to create character save');
    }

    // complete the transaction
    await transaction.commit();

    // return success response with account, player, and character save data (excluding password hash)
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        data: {
          account: newAccountResult.recordset[0],
          player: newPlayerResult.recordset[0],
          characterData: newCharacterSave.character_data,
          progressionData: newCharacterSave.progression_data,
          schemaVersion: newCharacterSave.schema_version,
          gameVersionLastPlayed: newCharacterSave.game_version_last_played,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error in registration route:', error);

    let debugError: string | null = null;

    if (error instanceof Error) {
      console.error('REGISTER ROUTE ERROR MESSAGE:', error.message);
      console.error('REGISTER ROUTE ERROR STACK:', error.stack);
      debugError = error.message;
    }

    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error('Error rolling back transaction:', rollbackError);
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing the registration',
        data: null,
        debugError, // 👈 TEMP: surface backend error to client
      },
      { status: 500 },
    );
  }
}
