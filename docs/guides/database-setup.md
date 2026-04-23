# Database Setup (Azure SQL)

This guide outlines how to configure and initialize the Isekai Quest database for test and production environments.

## Required Tables

The application depends on the following tables:

- accounts
- players
- character_saves

These tables must be created in the correct order due to foreign key relationships.

## Table Creation Order

Tables must be created in the following order:

1. accounts
2. players
3. character_saves

This ensures all foreign key constraints can be applied successfully.

## Schema Creation

Run the following SQL statements to create the required tables and relationships:

```sql
CREATE TABLE dbo.accounts (
    id UNIQUEIDENTIFIER NOT NULL,
    email NVARCHAR(255) NOT NULL,
    password_hash NVARCHAR(255) NOT NULL,
    created_at DATETIME2 NOT NULL CONSTRAINT DF_accounts_created_at DEFAULT (sysdatetime()),
    last_login_at DATETIME2 NULL,
    CONSTRAINT PK_accounts PRIMARY KEY CLUSTERED (id),
    CONSTRAINT UQ_accounts_email UNIQUE (email)
);

CREATE TABLE dbo.players (
    id UNIQUEIDENTIFIER NOT NULL,
    account_id UNIQUEIDENTIFIER NOT NULL,
    display_name NVARCHAR(255) NOT NULL,
    created_at DATETIME2 NOT NULL CONSTRAINT DF_players_created_at DEFAULT (sysdatetime()),
    CONSTRAINT PK_players PRIMARY KEY CLUSTERED (id),
    CONSTRAINT FK_players_accounts
        FOREIGN KEY (account_id) REFERENCES dbo.accounts(id)
        ON DELETE CASCADE
);

CREATE TABLE dbo.character_saves (
    id UNIQUEIDENTIFIER NOT NULL,
    player_id UNIQUEIDENTIFIER NOT NULL,
    character_data NVARCHAR(MAX) NOT NULL,
    progression_data NVARCHAR(MAX) NOT NULL,
    schema_version NVARCHAR(50) NOT NULL,
    game_version_last_played NVARCHAR(50) NOT NULL,
    updated_at DATETIME2 NOT NULL CONSTRAINT DF_character_saves_updated_at DEFAULT (sysdatetime()),
    CONSTRAINT PK_character_saves PRIMARY KEY CLUSTERED (id),
    CONSTRAINT FK_character_saves_players
        FOREIGN KEY (player_id) REFERENCES dbo.players(id)
        ON DELETE CASCADE
);

```

## Verification

After running the schema, verify setup by:

1. Registering a new account in the application
2. Confirming records exist in:
   - accounts
   - players
   - character_saves
3. Querying the Accounts_Players_Characters_Join view to confirm relationships
