# Create Character Flow

This flow describes how a new player creates a character and enters the game.

The process begins when the user selects **Start Quest** on the SplashScreen. The player is taken to the CreateCharacterScreen where they configure their character. Once confirmed, the RegistrationModal appears to finalize the character creation process.

After confirmation, the CharacterSlice is updated with the newly created character and the AuthSlice logs the user into the application. The player is then redirected to the HomeScreen.

This flow interacts with both the CharacterSlice and AuthSlice in Redux.

---

## Interaction Flow

| Component                 | User Action                     | Leads To                         |
| ------------------------- | ------------------------------- | -------------------------------- |
| SplashScreen              | User clicks **Start New Quest** | Character Creation Screen opens  |
| Character Creation Screen | User enters character name      | Character data prepared          |
| Character Creation Screen | User selects character class    | Character class assigned         |
| CharacterSlice            | `createCharacter()` dispatched  | Character added to Redux state   |
| CharacterSlice            | Active character updated        | New character becomes active     |
| Application Router        | Redirect triggered              | User navigated to **HomeScreen** |

---

## Flow Diagram

```mermaid
flowchart TD
  A[SplashScreen]
  A -->|Click Start Quest| B[CreateCharacterScreen]

  B -->|User enters character data and clicks Create| C[RegistrationModal opens]

  C -->|Click Cancel| D[RegistrationModal closes]
  D --> B

  C -->|Confirm character creation| E[CharacterSlice createCharacter()]

  E --> F[AuthSlice login()]

  F --> G[RegistrationModal closes]

  G --> H[Redirect to HomeScreen]
```

---

## Key Components

- SplashScreen
- CreateCharacterScreen
- RegistrationModal
- HomeScreen

---

## State Updates

CharacterSlice

- `createCharacter()` initializes the player character
- Character is stored in Redux state (currently not persisted)

AuthSlice

- `login()` sets `isAuthenticated = true`
- `user` object is populated
