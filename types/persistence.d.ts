import { Character, CharacterStateSnapshot } from "./character";
import { QuestStory, QuestStoryId, StoryPointId } from "./quest";

export interface AccountRecord {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
  last_login_at: string;
}

export interface AuthenticatedAccount {
  id: string;
  email: string;
}

export interface PlayerRecord {
  id: string;
  account_id: string;
  display_name: string;
  created_at: string;
}

export interface ProgressionData {
  completedQuestIds: string[];
  currentTown: string;
  acceptedQuestId: string | null;
  currentStoryPointId: string | null;
  lastEndedQuestId: string | null;
}

export interface CharacterSaveRecord {
  id: string;
  player_id: string;
  character_data: Character;
  progression_data: ProgressionData;
  schema_version: string;
  game_version_last_played: string;
  updated_at: string;
}

export interface SessionRefreshData {
  accountId: string;
  email: string; // Optional email field for potential future use, not strictly needed for rehydration
  playerId: string;
  characterSnapshot: CharacterStateSnapshot;
  acceptedQuest: QuestStory | null;
  currentStoryPointId: StoryPointId | null;
  lastEndedQuestId: QuestStoryId | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  characterName: string;
  avatar: string;
  characterClass: string;
}

export interface LoadPlayerSaveDataInput {
  accountId: string;
}

export interface SavePlayerProgressInput {
  playerId: string;
  characterData: Character;
  progressionData: ProgressionData;
}

export interface PersistenceResponseData {
  account?: AuthenticatedAccount;
  player?: PlayerRecord;
  characterData?: Character;
  progressionData?: ProgressionData;
  schemaVersion?: string;
  gameVersionLastPlayed?: string;
  updatedAt?: string;
  refreshSessionData?: SessionRefreshData;
}

export interface PersistenceResponse {
  success: boolean;
  message: string;
  data: PersistenceResponseData | null;
}

export interface Persistence {
  createAccount(input: CreateAccountInput): Promise<PersistenceResponse>;

  authenticateAccount(input: LoginCredentials): Promise<PersistenceResponse>;

  loadPlayerSaveData(
    input: LoadPlayerSaveDataInput,
  ): Promise<PersistenceResponse>;

  savePlayerProgress(
    input: SavePlayerProgressInput,
  ): Promise<PersistenceResponse>;
}
