import type { characterClass } from "@/types/character";

import {
  AccountRecord,
  CharacterSaveRecord,
  CreateAccountInput,
  PersistenceResponse,
  PlayerRecord,
  ProgressionData,
} from "@/types/persistence";

const ACCOUNTS_KEY = "isekaiQuest_accounts" as const;
const PLAYERS_KEY = "isekaiQuest_players" as const;
const CHARACTER_SAVES_KEY = "isekaiQuest_character_saves" as const;

type PersistenceKey =
  | typeof ACCOUNTS_KEY
  | typeof PLAYERS_KEY
  | typeof CHARACTER_SAVES_KEY;

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

// Save data to local stroage by key
export const writeLocalStorageDataByKey = <T>(
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
      currentTown: "startsVille",
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
            gold: 0,
            silver: 0,
            copper: 0,
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
    const accountWriteSuccess = writeLocalStorageDataByKey<AccountRecord>(
      ACCOUNTS_KEY,
      accounts,
    );

    const playerWriteSuccess = writeLocalStorageDataByKey<PlayerRecord>(
      PLAYERS_KEY,
      players,
    );

    const characterSaveWriteSuccess =
      writeLocalStorageDataByKey<CharacterSaveRecord>(
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
