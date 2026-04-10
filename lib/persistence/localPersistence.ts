import type { characterClass } from "@/types/character";

import {
  AccountRecord,
  CharacterSaveRecord,
  CreateAccountInput,
  LoadPlayerSaveDataInput,
  LoginCredentials,
  PersistenceResponse,
  PlayerRecord,
  ProgressionData,
  SavePlayerProgressInput,
  SessionRefreshData,
} from "@/types/persistence";

const ACCOUNTS_KEY = "isekaiQuest_accounts" as const;
const PLAYERS_KEY = "isekaiQuest_players" as const;
const CHARACTER_SAVES_KEY = "isekaiQuest_character_saves" as const;
const SESSION_REFRESH_KEY = "isekaiQuest_session_data" as const;

type PersistenceKey =
  | typeof ACCOUNTS_KEY
  | typeof PLAYERS_KEY
  | typeof CHARACTER_SAVES_KEY
  | typeof SESSION_REFRESH_KEY;

// Get data from local storage by key
export const getLocalStorageDataByKey = <T>(key: PersistenceKey): T[] => {
  try {
    const storedData = localStorage.getItem(key);

    if (!storedData) return [];

    return JSON.parse(storedData) as T[];
  } catch (error) {
    console.error(`Error parsing localStorage data for key: ${key}`, error);
    return [];
  }
};

// Remove data from local storage by key
export const removeLocalStorageDataByKey = (key: PersistenceKey): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage data for key: ${key}`, error);
    return false;
  }
};

// Save data to local stroage by key as a collection (array of records)
export const writeLocalStorageDataCollectionByKey = <T>(
  key: PersistenceKey,
  data: T[],
): boolean => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);

    const storedData = localStorage.getItem(key);

    return storedData !== null;
  } catch (error) {
    console.error(`Error writing localStorage data for key: ${key}`, error);
    return false;
  }
};

// save data to local storage by kay as a single object (not a collection)
export const writeLocalStorageDataObjectByKey = <T>(
  key: PersistenceKey,
  data: T,
): boolean => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);

    const storedData = localStorage.getItem(key);

    return storedData !== null;
  } catch (error) {
    console.error(`Error writing localStorage data for key: ${key}`, error);
    return false;
  }
};

// Generate unique id for new save records
export const generateId = (): string => {
  try {
    return crypto.randomUUID();
  } catch (error) {
    console.warn(
      "crypto.randomUUID() not available, using fallback ID generation.",
      error,
    );
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
};

// Create a SHA-256 hash from a plain text password
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBytes);

    return Array.from(new Uint8Array(hashBuffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Unable to hash password.");
  }
};

// Compare a plain text password against a stored hash
export const comparePassword = async (
  password: string,
  storedHash: string,
): Promise<boolean> => {
  try {
    const hashedPassword = await hashPassword(password);
    return hashedPassword === storedHash;
  } catch (error) {
    console.error("Error comparing password hash:", error);
    return false;
  }
};

// Create user account in local storage
export const createAccountLocalStorage = async (
  input: CreateAccountInput,
): Promise<PersistenceResponse> => {
  try {
    // Step 1: Read existing collections from localStorage
    const accounts = getLocalStorageDataByKey<AccountRecord>(ACCOUNTS_KEY);
    const players = getLocalStorageDataByKey<PlayerRecord>(PLAYERS_KEY);
    const characterSaves =
      getLocalStorageDataByKey<CharacterSaveRecord>(CHARACTER_SAVES_KEY);

    // Step 2: Prevent duplicate accounts by email
    const existingAccount = accounts.find(
      (account) => account.email.toLowerCase() === input.email.toLowerCase(),
    );

    if (existingAccount) {
      return {
        success: false,
        message: "An account with this email already exists.",
        data: {},
      };
    }

    // Step 3: Create the account record
    const newAccount: AccountRecord = {
      id: generateId(),
      email: input.email,
      password_hash: await hashPassword(input.password),
      created_at: new Date().toISOString(),
      last_login_at: new Date().toISOString(),
    };

    // Step 4: Create the matching player record
    const newPlayer: PlayerRecord = {
      id: generateId(),
      account_id: newAccount.id,
      display_name: input.characterName,
      created_at: new Date().toISOString(),
    };

    // Step 5: Create the initial progression data
    const initialProgressionData: ProgressionData = {
      completedQuestIds: [],
      currentTown: "StartsVille",
      acceptedQuestId: null,
      currentStoryPointId: null,
      lastEndedQuestId: null,
    };

    // Step 6: Create the initial character save record
    const newCharacterSave: CharacterSaveRecord = {
      id: generateId(),
      player_id: newPlayer.id,
      character_data: {
        id: generateId(),
        name: input.characterName,
        avatar: input.avatar,
        hp: 100,
        maxHp: 100,
        mp: 100,
        maxMp: 100,
        class: input.characterClass as characterClass,
        level: 1,
        inventory: {
          attacks: [],
          skills: [],
          coins: {
            gold: 100, // TODO: return to 0 after testing
            silver: 100, // TODO: return to 0 after testing
            copper: 100, // TODO: return to 0 after testing
          },
          weapons: [],
          equipment: [],
          rations: [],
          potions: [],
        },
        partyMembers: [],
      },
      progression_data: initialProgressionData,
      schema_version: "1.0.0",
      game_version_last_played: "1.0.0",
      updated_at: new Date().toISOString(),
    };

    // Step 7: Add the new records to their collections
    accounts.push(newAccount);
    players.push(newPlayer);
    characterSaves.push(newCharacterSave);

    // Step 8: Persist all collections back to localStorage
    const accountWriteSuccess =
      writeLocalStorageDataCollectionByKey<AccountRecord>(
        ACCOUNTS_KEY,
        accounts,
      );

    const playerWriteSuccess =
      writeLocalStorageDataCollectionByKey<PlayerRecord>(PLAYERS_KEY, players);

    const characterSaveWriteSuccess =
      writeLocalStorageDataCollectionByKey<CharacterSaveRecord>(
        CHARACTER_SAVES_KEY,
        characterSaves,
      );

    // Step 9: Return failure if any write operation fails
    if (
      !accountWriteSuccess ||
      !playerWriteSuccess ||
      !characterSaveWriteSuccess
    ) {
      return {
        success: false,
        message: "There was a problem saving the new account data.",
        data: {},
      };
    }

    // Step 10: Return the successful persistence response
    return {
      success: true,
      message: "Account created successfully.",
      data: {
        account: newAccount,
        player: newPlayer,
        characterData: newCharacterSave.character_data,
        progressionData: newCharacterSave.progression_data,
        schemaVersion: newCharacterSave.schema_version,
        gameVersionLastPlayed: newCharacterSave.game_version_last_played,
        updatedAt: newCharacterSave.updated_at,
      },
    };
  } catch (error) {
    console.error("Error creating account in localStorage:", error);

    return {
      success: false,
      message: "There was an error creating the account. Please try again.",
      data: {},
    };
  }
};

// Authenticate user account in localStorage
export const authenticateAccountLocalStorage = async (
  credentials: LoginCredentials,
): Promise<PersistenceResponse> => {
  try {
    // Step 1: Read accounts collection from localStorage
    const accounts = getLocalStorageDataByKey<AccountRecord>(ACCOUNTS_KEY);

    // Step 2: Find the account with the matching email
    const account = accounts.find(
      (acc) => acc.email.toLowerCase() === credentials.email.toLowerCase(),
    );

    // Step 3: If no account is found, return an authentication failure response
    if (!account) {
      return {
        success: false,
        message: "Invalid email or password.",
        data: {},
      };
    }

    // Step 4: Compare the provided password with the stored hash
    const isMatch = await comparePassword(
      credentials.password,
      account.password_hash,
    );

    // Step 5: If the password does not match, return an authentication failure response
    if (!isMatch) {
      return {
        success: false,
        message: "Invalid email or password.",
        data: {},
      };
    }

    // Step 6: Update the last login timestamp for the authenticated account
    const updatedAccount: AccountRecord = {
      ...account,
      last_login_at: new Date().toISOString(),
    };

    // Step 7: Persist the updated account collection
    const updatedAccounts = accounts.map((acc) =>
      acc.id === updatedAccount.id ? updatedAccount : acc,
    );

    // Step 8: Log a warning if the write operation fails, but still return success since authentication was successful
    const writeSuccess = writeLocalStorageDataCollectionByKey<AccountRecord>(
      ACCOUNTS_KEY,
      updatedAccounts,
    );

    // Not returning failure here since authentication was successful, but logging the issue
    if (!writeSuccess) {
      console.error(
        "Failed to update last login timestamp for account:",
        updatedAccount.id,
      );
    }

    // Step 9: Return the successful authentication response with account data
    return {
      success: true,
      message: "Authentication successful.",
      data: { account: updatedAccount },
    };
  } catch (error) {
    console.error("Error during account authentication:", error);

    // Step 10: Return a generic error response if any unexpected issues occur during authentication
    return {
      success: false,
      message: "An unexpected error occurred.",
      data: {},
    };
  }
};

// Load saved player data from local stroage by account id
export const loadPlayerSaveDataLocalStorage = async (
  input: LoadPlayerSaveDataInput,
): Promise<PersistenceResponse> => {
  try {
    // Step 1: Read players and character saves from localStorage
    const players = getLocalStorageDataByKey<PlayerRecord>(PLAYERS_KEY);
    const characterSaves =
      getLocalStorageDataByKey<CharacterSaveRecord>(CHARACTER_SAVES_KEY);

    // Step 2: Find the player record associated with the given account ID
    const player = players.find((p) => p.account_id === input.accountId);

    // Step 3: If no player record is found, return an error response
    if (!player) {
      return {
        success: false,
        message: "Player save data not found.",
        data: {},
      };
    }

    // Step 4: Find the character save record associated with the player ID
    const characterSave = characterSaves.find(
      (save) => save.player_id === player.id,
    );

    // Step 5: If no character save is found, return an error response
    if (!characterSave) {
      return {
        success: false,
        message: "Player save data not found.",
        data: {},
      };
    }

    // Step 6: Construct the response data with player, character, and progression info
    const responseData = {
      player,
      characterData: characterSave.character_data,
      progressionData: characterSave.progression_data,
      schemaVersion: characterSave.schema_version,
      gameVersionLastPlayed: characterSave.game_version_last_played,
      updatedAt: characterSave.updated_at,
    };

    // Step 7: Return the successful persistence response with the loaded data
    return {
      success: true,
      message: "Player save data loaded successfully.",
      data: responseData,
    };
  } catch (error) {
    console.error("Error loading player save data from localStorage:", error);

    // Step 8: Return a generic error response if any unexpected issues occur
    return {
      success: false,
      message: "Player save data not found.",
      data: {},
    };
  }
};

// Save Player Progress to local storage
export const savePlayerProgressLocalStorage = async (
  input: SavePlayerProgressInput,
): Promise<PersistenceResponse> => {
  try {
    // Step 1: Read character saves from localStorage
    const characterSaves =
      getLocalStorageDataByKey<CharacterSaveRecord>(CHARACTER_SAVES_KEY);

    // Step 2: Find the character save record associated with the given player ID
    const characterSaveIndex = characterSaves.findIndex(
      (save) => save.player_id === input.playerId,
    );
    // Step 3: If no character save is found, return an error response
    if (characterSaveIndex === -1) {
      return {
        success: false,
        message: "Player save data not found.",
        data: {},
      };
    }

    // Step 4: Update the character save record with the new character and progression data
    const existingSave = characterSaves[characterSaveIndex];
    const updatedSave: CharacterSaveRecord = {
      ...existingSave,
      character_data: input.characterData,
      progression_data: input.progressionData,
      updated_at: new Date().toISOString(),
    };

    // Step 5: Persist the updated character saves collection
    characterSaves[characterSaveIndex] = updatedSave;
    const writeSuccess =
      writeLocalStorageDataCollectionByKey<CharacterSaveRecord>(
        CHARACTER_SAVES_KEY,
        characterSaves,
      );

    // Step 6: Return failure if the write operation fails
    if (!writeSuccess) {
      return {
        success: false,
        message: "There was a problem saving the player progress.",
        data: {},
      };
    }

    // Step 7: Return the successful persistence response
    return {
      success: true,
      message: "Player progress saved successfully.",
      data: {
        characterData: updatedSave.character_data,
        progressionData: updatedSave.progression_data,
        schemaVersion: updatedSave.schema_version,
        gameVersionLastPlayed: updatedSave.game_version_last_played,
        updatedAt: updatedSave.updated_at,
      },
    };
  } catch (error) {
    console.error("Error saving player progress to localStorage:", error);

    // Step 8: Return a generic error response if any unexpected issues occur during saving
    return {
      success: false,
      message:
        "There was an error saving the player progress. Please try again.",
      data: {},
    };
  }
};

// Save session refresh data to local storage (for restoring session on app reload)
export const saveSessionRefreshData = async (
  input: SessionRefreshData,
): Promise<PersistenceResponse> => {
  try {
    // Step 1: Save the session refresh data object to localStorage
    const writeSuccess = writeLocalStorageDataObjectByKey<SessionRefreshData>(
      SESSION_REFRESH_KEY,
      input,
    );

    // Step 2: Return failure if the write operation fails
    if (!writeSuccess) {
      return {
        success: false,
        message: "There was a problem saving the session refresh data.",
        data: {},
      };
    }

    // Step 3: Return the successful persistence response
    return {
      success: true,
      message: "Session refresh data saved successfully.",
      data: {},
    };
  } catch (error) {
    console.error("Error saving session refresh data to localStorage:", error);

    // Step 4: Return a generic error response if any unexpected issues occur during saving
    return {
      success: false,
      message:
        "There was an error saving the session refresh data. Please try again.",
      data: {},
    };
  }
};

// Load session refresh data from local storage
export const loadSessionRefreshData = (): PersistenceResponse => {
  try {
    // Step 1: Read the session refresh data object from localStorage
    const storedData = localStorage.getItem(SESSION_REFRESH_KEY);

    // Step 2: If no data is found, return an error response
    if (!storedData) {
      return {
        success: false,
        message: "No session refresh data found.",
        data: {},
      };
    }

    // Step 3: Parse the stored JSON data into the SessionRefreshData type
    const parsedData = JSON.parse(storedData) as SessionRefreshData;

    // Step 4: Return the successful persistence response with the loaded session refresh data
    return {
      success: true,
      message: "Session refresh data loaded successfully.",
      data: { refreshSessionData: parsedData },
    };
  } catch (error) {
    console.error(
      "Error loading session refresh data from localStorage:",
      error,
    );

    // Step 5: Return a generic error response if any unexpected issues occur during loading
    return {
      success: false,
      message: "No session refresh data found.",
      data: {},
    };
  }
};

// Remove session refresh data from local storage (e.g. on logout)
export const clearSessionRefreshData = (): PersistenceResponse => {
  try {
    // Step 1: Remove the session refresh data from localStorage
    const removeSuccess = removeLocalStorageDataByKey(SESSION_REFRESH_KEY);
    // Step 2: Return failure if the remove operation fails
    if (!removeSuccess) {
      return {
        success: false,
        message: "There was a problem clearing the session refresh data.",
        data: {},
      };
    }

    // Step 3: Return success if the remove operation succeeds
    return {
      success: true,
      message: "Session refresh data cleared successfully.",
      data: {},
    };
  } catch (error) {
    console.error(
      "Error clearing session refresh data from localStorage:",
      error,
    );
    return {
      success: false,
      message: "There was an error clearing the session refresh data.",
      data: {},
    };
  }
};
