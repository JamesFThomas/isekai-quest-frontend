import { Persistence } from '../../types/persistence';

import { localPersistence } from './localPersistence';

/* ------------------------------------------------------------------
 * STORAGE BACKEND
 * ------------------------------------------------------------------
 * Isekai Quest persists everything in the browser via localStorage.
 *
 * A second, database backed implementation used to sit behind this
 * module, selected at build time by NEXT_PUBLIC_PERSISTENCE_MODE. It has
 * been removed. The project no longer pays for a hosted database, and
 * shipping an unreachable fetch client to every player was dead weight in
 * the bundle.
 *
 * Removed, and preserved in git history at commit 41e2dcc:
 *   - lib/persistence/remotePersistence.ts  (fetch client)
 *   - app/api/auth/login/route.ts
 *   - app/api/auth/register/route.ts
 *   - app/api/player/load/route.ts
 *   - app/api/player/save/route.ts
 *   - lib/server/db/azureSql.ts             (Azure SQL connection pool)
 *
 * Recover any of them with:
 *
 *   git show 41e2dcc:lib/persistence/remotePersistence.ts
 *
 * The `mssql`, `@types/mssql` and `bcryptjs` packages went with them.
 *
 * To add a backend later, write an implementation that satisfies the
 * `Persistence` interface in `types/persistence.d.ts` and swap it in
 * below. Nothing else in the application needs to change: every consumer
 * imports the `persistence` export and stays unaware of where the data
 * lives. Preserving that boundary is the entire purpose of this file.
 * ------------------------------------------------------------------ */

/**
 * Public persistence interface used throughout the application.
 *
 * This is the ONLY export consumers should use.
 *
 * Acts as the abstraction boundary between:
 * - UI / state management
 * - data persistence layer
 */

export const persistence: Persistence = localPersistence;
