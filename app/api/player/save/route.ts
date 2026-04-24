import { getDbConnection } from '@/lib/server/db/azureSql';
import { NextResponse } from 'next/server';
import sql from 'mssql';

/*
The save player route accepts a playerId, characterData, and progressionData,
and updates the corresponding records in the database.

Flow:
1. Validate the incoming request body to ensure all required fields are present.
2. Create a database connection pool.
3. Use a transaction to ensure atomicity of the update operations.
4. Update the character_saves record with the new characterData and progressionData.
5. If the update is successful, commit the transaction; otherwise, roll back.
6. Return a standardized PersistenceResponse indicating success or failure.

This route replaces the localStorage save method while preserving
the same response contract for seamless frontend integration.
*/

export async function POST(request: Request) {
  let transaction: sql.Transaction | null = null;
  try {
    const body = await request.json();

    // vlaidate body for playerId, characterData, and progressionData
    if (
      !body.playerId ||
      typeof body.playerId !== 'string' ||
      !body.characterData ||
      typeof body.characterData !== 'object' ||
      !body.progressionData ||
      typeof body.progressionData !== 'object'
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields in save player data',
          data: {},
        },
        { status: 400 },
      );
    }

    // create db connection pool
    const pool = await getDbConnection();

    //Use a transaction to ensure atomicity of the update operations.
    transaction = new sql.Transaction(pool);
    await transaction.begin();

    // Before updating anything, query character_saves by player_id inside the transaction to confirm the save record exists. If not found, return a 404
    const characterSaveResult = await transaction
      .request()
      .input('playerId', sql.UniqueIdentifier, body.playerId)
      .query('SELECT id FROM character_saves WHERE player_id = @playerId');

    if (characterSaveResult.recordset.length === 0) {
      await transaction.rollback();
      return NextResponse.json(
        {
          success: false,
          message: 'No character save record found for this playerId',
          data: {},
        },
        { status: 404 },
      );
    }

    //Update the character_saves record with the new characterData and progressionData.
    const updateResult = await transaction
      .request()
      .input('playerId', sql.UniqueIdentifier, body.playerId)
      .input('characterData', sql.NVarChar, JSON.stringify(body.characterData))
      .input(
        'progressionData',
        sql.NVarChar,
        JSON.stringify(body.progressionData),
      ).query(`
        UPDATE character_saves
        SET character_data = @characterData,
            progression_data = @progressionData,
            updated_at = SYSUTCDATETIME()
        WHERE player_id = @playerId
      `);

    if (updateResult.rowsAffected[0] === 0) {
      await transaction.rollback();
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to update character save data',
          data: {},
        },
        { status: 500 },
      );
    }

    // query character_saves by player_id after the update
    const updatedSaveResult = await transaction
      .request()
      .input('playerId', sql.UniqueIdentifier, body.playerId).query(`
        SELECT
          character_data,
          progression_data,
          schema_version,
          game_version_last_played,
          updated_at
        FROM character_saves
        WHERE player_id = @playerId
      `);

    if (updatedSaveResult.recordset.length === 0) {
      await transaction.rollback();
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to retrieve updated character save data',
          data: {},
        },
        { status: 500 },
      );
    }

    // If the update is successful, commit the transaction;
    await transaction.commit();

    // build the success response from that returned row.
    const {
      character_data,
      progression_data,
      schema_version,
      game_version_last_played,
      updated_at,
    } = updatedSaveResult.recordset[0];

    // parse character_data and progression_data from the result
    const characterData = JSON.parse(character_data);
    const progressionData = JSON.parse(progression_data);

    // normalize updated_at to ISO string if it's a Date object
    const updatedAtIso = updated_at.toISOString();

    // return your success response
    return NextResponse.json(
      {
        success: true,
        message: 'Player data saved successfully',
        data: {
          characterData,
          progressionData,
          schemaVersion: schema_version,
          gameVersionLastPlayed: game_version_last_played,
          updatedAt: updatedAtIso,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in save player route:', error);

    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error('Error rolling back save transaction:', rollbackError);
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Save failed. Please try again.',
        errorCode: 'SAVE_UNAVAILABLE',
        data: {},
      },
      { status: 500 },
    );
  }
}
