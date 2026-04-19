import {
  CreateAccountInput,
  LoadPlayerSaveDataInput,
  LoginCredentials,
  Persistence,
  PersistenceResponse,
  SavePlayerProgressInput,
} from '@/types/persistence';

// helper function to reduce fetch calls in each method
const postRequest = async <TInput>(
  endpoint: string,
  input: TInput,
  fallbackMessage: string,
): Promise<PersistenceResponse> => {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    let data;

    try {
      data = await res.json();
    } catch {
      return {
        success: false,
        message: 'Invalid server response',
        data: null,
      };
    }

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || fallbackMessage,
        data: {},
      };
    }

    return data;
  } catch {
    return {
      success: false,
      message: 'Network request failed',
      data: {},
    };
  }
};

export const remotePersistence: Persistence = {
  async createAccount(input: CreateAccountInput) {
    return postRequest('/api/auth/register', input, 'Failed to create account');
  },

  async authenticateAccount(input: LoginCredentials) {
    return postRequest(
      '/api/auth/login',
      input,
      'Failed to authenticate account',
    );
  },

  async loadPlayerSaveData(input: LoadPlayerSaveDataInput) {
    return postRequest(
      '/api/player/load',
      input,
      'Failed to load player save data',
    );
  },

  async savePlayerProgress(input: SavePlayerProgressInput) {
    return postRequest(
      '/api/player/save',
      input,
      'Failed to save player progress',
    );
  },
};
