import { Persistence } from '../../types/persistence';

import {
  authenticateAccountLocalStorage,
  createAccountLocalStorage,
  loadPlayerSaveDataLocalStorage,
  savePlayerProgressLocalStorage,
} from './localPersistence';

export type PERSISTENCE_MODE = 'local' | 'remote';

// const persistenceMode: PERSISTENCE_MODE = 'local';

// const implementation =
//   persistenceMode === 'local' ? localPersistence : remotePersistence;

// This file serves as the main entry point for the persistence layer, providing a unified interface for all persistence operations.
// It currently delegates to localStorage-based implementations, but  will be updated to switch between local and remote persistence based on environment and configuration in the future
export const persistence: Persistence = {
  async createAccount(input) {
    return createAccountLocalStorage(input);
  },

  async authenticateAccount(input) {
    return authenticateAccountLocalStorage(input);
  },

  async loadPlayerSaveData(input) {
    return loadPlayerSaveDataLocalStorage(input);
  },

  async savePlayerProgress(input) {
    return savePlayerProgressLocalStorage(input);
  },
};
