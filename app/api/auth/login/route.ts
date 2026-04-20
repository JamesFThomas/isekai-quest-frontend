import { getDbConnection } from '@/lib/server/db/azureSql';
import { NextResponse } from 'next/server';
import sql from 'mssql';
import bcrypt from 'bcryptjs';
import {
  PersistenceResponseData,
  ProgressionData,
  SessionRefreshData,
} from '@/types/persistence';
import { Character } from '@/types/character';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // check body for LoginCredentials input values and respond with 400 if not present
    if (
      !body.email ||
      typeof body.email !== 'string' ||
      !body.password ||
      typeof body.password !== 'string'
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields in login data',
          data: {},
        },
        { status: 400 },
      );
    }

    // create db connection pool
    const pool = await getDbConnection();

    // normalize email for lookup
    const normalizedEmail = body.email.toLowerCase().trim();

    // lookup account by email
    const accountResult = await pool
      .request()
      .input('email', sql.NVarChar, normalizedEmail)
      .query('SELECT id, password_hash FROM accounts WHERE email = @email');

    if (accountResult.recordset.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
          data: {},
        },
        { status: 401 },
      );
    }

    // compare stored password hash with input password
    const isMatch = await bcrypt.compare(
      body.password,
      accountResult.recordset[0].password_hash,
    );
    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
          data: {},
        },
        { status: 401 },
      );
    }

    // Update accounts.last_login_at to current timestamp
    const updateResult = await pool
      .request()
      .input('id', sql.UniqueIdentifier, accountResult.recordset[0].id)
      .query(
        'UPDATE accounts SET last_login_at = SYSUTCDATETIME() WHERE id = @id',
      );

    console.log('Rows affected:', updateResult.rowsAffected);
    console.log(
      'Updating last_login_at for accountId:',
      accountResult.recordset[0].id,
    );

    // Load player + character save data for the account to return in the response for client session hydration
    const playerResult = await pool
      .request()
      .input('accountId', sql.UniqueIdentifier, accountResult.recordset[0].id)
      .query(`
          SELECT p.id as playerId, p.display_name, cs.character_data, cs.progression_data
          FROM players p
          INNER JOIN character_saves cs ON p.id = cs.player_id
          WHERE p.account_id = @accountId
        `);

    if (playerResult.recordset.length === 0) {
      throw new Error('No player data found for account'); // This should not happen if registration creates player and character save correctly
    }

    // Return session/refresh payload with player and character data for client session hydration
    const playerData = playerResult.recordset[0];

    // Parse character_data and progression_data before building the response object
    const parsedCharacterData: Character = JSON.parse(
      playerData.character_data,
    );
    const parsedProgressionData: ProgressionData = JSON.parse(
      playerData.progression_data,
    );

    const responseData: SessionRefreshData = {
      accountId: accountResult.recordset[0].id,
      email: normalizedEmail,
      playerId: playerData.playerId,
      characterSnapshot: {
        characterData: parsedCharacterData,
        progressionData: parsedProgressionData,
      },
    };

    const persistenceResponseData: PersistenceResponseData = {
      account: accountResult.recordset[0],
      refreshSessionData: responseData,
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        data: persistenceResponseData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in login route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during login',
        data: {},
      },
      { status: 500 },
    );
  }
}
