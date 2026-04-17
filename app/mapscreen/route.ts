import { getDbConnection } from '@/lib/server/db/azureSql';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import sql from 'mssql';
import { ProgressionData } from '@/types/persistence';

/*
  ```
CREATE TABLE accounts (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    last_login_at DATETIME2 NULL
);

CREATE TABLE players (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    account_id UNIQUEIDENTIFIER NOT NULL,
    display_name NVARCHAR(255) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_players_accounts
        FOREIGN KEY (account_id)
        REFERENCES accounts(id)
        ON DELETE CASCADE
);

CREATE TABLE character_saves (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    player_id UNIQUEIDENTIFIER NOT NULL,

    character_data NVARCHAR(MAX) NOT NULL,
    progression_data NVARCHAR(MAX) NOT NULL,

    schema_version NVARCHAR(50) NOT NULL,
    game_version_last_played NVARCHAR(50) NOT NULL,

    updated_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_character_saves_players
        FOREIGN KEY (player_id)
        REFERENCES players(id)
        ON DELETE CASCADE
);

export interface CreateAccountInput {
  email: string;
  password: string;
  characterName: string;
  avatar: string;
  characterClass: string;
}

```




*/

export async function POST(request: Request) {
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

    // Accounts lookup for duplicate account by email fail with 409 if found
    const pool = await getDbConnection();
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

    // create account, player, and character_saves record in the database, hash the password before storing

    // create account record
    const accountId = randomUUID();
    const normalizedEmail = body.email.toLowerCase().trim();
    const passwordHash = body.password; // TODO: hash the password before storing
    await pool
      .request()
      .input('id', sql.UniqueIdentifier, accountId)
      .input('email', sql.NVarChar(255), normalizedEmail)
      .input('password_hash', sql.NVarChar(255), passwordHash).query(`
        INSERT INTO accounts (id, email, password_hash)
        VALUES (@id, @email, @password_hash)
      `);

    // check if account record was created successfully
    const newAccountResult = await pool
      .request()
      .input('id', sql.UniqueIdentifier, accountId)
      .query('SELECT id FROM accounts WHERE id = @id');

    if (newAccountResult.recordset.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to create account',
          data: {},
        },
        { status: 500 },
      );
    }

    // create player record with accountId
    const playerId = randomUUID();
    await pool
      .request()
      .input('id', sql.UniqueIdentifier, playerId)
      .input('account_id', sql.UniqueIdentifier, accountId)
      .input('display_name', sql.NVarChar(255), body.characterName.trim())
      .query(`
        INSERT INTO players (id, account_id, display_name)
        VALUES (@id, @account_id, @display_name)
      `);

    // check for player record was created successfully
    const newPlayerResult = await pool
      .request()
      .input('id', sql.UniqueIdentifier, playerId)
      .query('SELECT id FROM players WHERE id = @id');

    if (newPlayerResult.recordset.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to create player',
          data: {},
        },
        { status: 500 },
      );
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
    await pool
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
    const newCharacterSaveResult = await pool
      .request()
      .input('id', sql.UniqueIdentifier, newCharacterSave.id)
      .query('SELECT id FROM character_saves WHERE id = @id');

    if (newCharacterSaveResult.recordset.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to create character save',
          data: {},
        },
        { status: 500 },
      );
    }

    // return success response with account, player, and character save data (excluding password hash)
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        data: {
          account: newAccountResult.recordset[0],
          player: newPlayerResult.recordset[0],
          characterSave: newCharacterSave,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error in registration route:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing the registration',
        data: {},
      },
      { status: 500 },
    );
  }
}
