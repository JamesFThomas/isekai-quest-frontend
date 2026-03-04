# Login / Continue Quest Flow

This flow describes how a returning player logs into the game and enters the main gameplay hub.

The login process begins on the SplashScreen. From there the player may choose to continue their existing quest, which opens the LoginModal. After successful authentication the player is redirected to the HomeScreen.

This flow interacts with the AuthSlice in Redux.

---

## Interaction Flow

| Component          | User Action                                       | Leads To                                     |
| ------------------ | ------------------------------------------------- | -------------------------------------------- |
| SplashScreen       | User clicks **Continue Quest**                    | LoginModal opens                             |
| LoginModal         | User clicks **Cancel**                            | LoginModal closes, return to SplashScreen    |
| LoginModal         | User enters valid login data and clicks **Login** | AuthSlice `login()` dispatched               |
| AuthSlice          | `login()` updates authentication state            | `isAuthenticated = true`, user object stored |
| LoginModal         | Authentication successful                         | LoginModal closes                            |
| Application Router | Redirect triggered                                | User navigated to **HomeScreen**             |

---

## Flow Diagram

```mermaid
flowchart TD
  A[SplashScreen]
  A -->|Click Continue Quest| B[LoginModal opens]

  B -->|Click Cancel| C[LoginModal closes]
  C --> A

  B -->|Enter valid login data and click Login| D[AuthSlice login()]
  D --> E[LoginModal closes]
  E --> F[Redirect to HomeScreen]
```

---

## Key Components

- SplashScreen
- LoginModal
- HomeScreen

---

## State Updates

AuthSlice

- `login()` sets `isAuthenticated = true`
- `user` object is populated
