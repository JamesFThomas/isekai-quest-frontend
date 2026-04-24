import { getDbConnection } from '@/lib/server/db/azureSql';
import { NextResponse } from 'next/server';
import sql from 'mssql';
import { PlayerRecord } from '@/types/persistence';

/*
The load player route accepts an accountId and retrieves the associated
player and character save data from the database.

Flow:
1. Validate the incoming request body to ensure accountId is present.
2. Query the database using a JOIN between players and character_saves
   to retrieve all relevant data in a single request.
3. If no records are found, return a 404 response indicating no saved data exists.
4. Parse the stored JSON fields (character_data and progression_data).
5. Normalize timestamp fields (created_at, updated_at) to ISO strings
   for consistency with the frontend and localStorage format.
6. Construct a response object that matches the existing persistence interface.
7. Return the player, character data, progression data, and metadata
   in a standardized PersistenceResponse.

This route replaces the localStorage load method while preserving
the same response contract for seamless frontend integration.
*/

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // check body for accountId and respond with 400 if not present
    if (!body.accountId || typeof body.accountId !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required accountId in request data',
          data: {},
        },
        { status: 400 },
      );
    }

    // create db connection pool
    const pool = await getDbConnection();

    // lookup player and character save records by accountId using join
    const playerResult = await pool
      .request()
      .input('accountId', sql.UniqueIdentifier, body.accountId).query(`
        SELECT
          p.id AS playerId,
          p.account_id,
          p.display_name,
          p.created_at,
          cs.id AS characterSaveId,
          cs.character_data,
          cs.progression_data,
          cs.schema_version,
          cs.game_version_last_played,
          cs.updated_at
        FROM players p
        INNER JOIN character_saves cs ON p.id = cs.player_id
        WHERE p.account_id = @accountId
        `);

    if (playerResult.recordset.length === 0) {
      // return 404 if no player/save data exists for that account
      return NextResponse.json(
        {
          success: false,
          message: 'No player found for account',
          data: {},
        },
        { status: 404 },
      );
    }

    // destructure playerResult.recordset[0] to get needed values for response
    const {
      playerId,
      account_id,
      display_name,
      created_at,
      character_data,
      progression_data,
      schema_version,
      game_version_last_played,
      updated_at,
    } = playerResult.recordset[0];

    // parse character_data and progression_data from the result
    const characterData = JSON.parse(character_data);
    const progressionData = JSON.parse(progression_data);

    // normalize created_at and updated_at to ISO strings from Date objects
    const createdAtIso = created_at.toISOString();
    const updatedAtIso = updated_at.toISOString();

    // building a player object with id, account_id, display_name, and created_at
    const player: PlayerRecord = {
      id: playerId,
      account_id: account_id,
      display_name: display_name,
      created_at: createdAtIso,
    };

    // return success response with player and character save data
    return NextResponse.json(
      {
        success: true,
        message: 'Player save data loaded successfully',
        data: {
          player,
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
    console.error('Error in load player route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load player data. Please try again.',
        errorCode: 'LOAD_UNAVAILABLE',
        data: {},
      },
      { status: 500 },
    );
  }
}
