import { Persistence } from '../../types/persistence';

import { localPersistence } from './localPersistence';
import { remotePersistence } from './remotePersistence';

/**
 * Defines the available persistence modes for the application.
 *
 * - 'local'  → uses browser localStorage (development / offline testing)
 * - 'remote' → uses API routes backed by Azure SQL (production)
 */

export type PERSISTENCE_MODE = 'local' | 'remote';

/**
 * Reads the persistence mode from environment configuration.
 *
 * NEXT_PUBLIC_ prefix allows access on the client side.
 * Falls back to 'local' to ensure safe default behavior during development.
 *
 * Note: The type cast does NOT validate runtime values.
 * If an invalid value is provided, it will not be caught here.
 */

const persistenceMode: PERSISTENCE_MODE =
  (process.env.NEXT_PUBLIC_PERSISTENCE_MODE as PERSISTENCE_MODE) || 'local';

/**
 * Selects the correct persistence implementation based on environment.
 *
 * This is the single decision point for storage behavior in the app.
 * Both implementations must satisfy the same Persistence interface.
 *
 * This ensures:
 * - Components remain storage-agnostic
 * - Local and remote implementations are interchangeable
 * - No conditional logic is needed throughout the app
 */

const implementation: Persistence =
  persistenceMode === 'local' ? localPersistence : remotePersistence;

/**
 * Public persistence interface used throughout the application.
 *
 * This is the ONLY export consumers should use.
 * It hides whether data is coming from localStorage or a remote API.
 *
 * Acts as the abstraction boundary between:
 * - UI / state management
 * - data persistence layer
 */

export const persistence: Persistence = implementation;
