# Accept Quest Flow

This flow describes how a player accepts a quest from the guild quest board.

The process begins when the player navigates from the HomeScreen to the GuildScreen. From there the player opens the QuestBoardScreen where available quests are displayed. Selecting a quest opens the DetailsModal which displays the quest description and acceptance options.

If the player confirms acceptance, the QuestSlice updates the current quest state and stores the accepted quest information. The modal closes and the quest board updates to visually indicate that the quest has been accepted.

This flow interacts with the QuestSlice in Redux.

---

## Flow Diagram

```mermaid
flowchart TD
  A[HomeScreen]
  A -->|Select Guild option| B[GuildScreen]

  B -->|Select Quest Board option| C[QuestBoardScreen]

  C -->|Click quest scroll icon| D[DetailsModal opens]

  D -->|Click Cancel| E[DetailsModal closes]
  E --> C

  D -->|Click Accept| F[QuestSlice setAcceptedQuest()]

  F --> G[QuestSlice sets currentStoryPointId]

  G --> H[DetailsModal closes]

  H --> I[QuestBoardScreen shows accepted quest styling]
```

---

## Key Components

- HomeScreen
- GuildScreen
- QuestBoardScreen
- DetailsModal

---

## State Updates

QuestSlice

- `setAcceptedQuest()` stores the selected quest in state
- `currentStoryPointId` is initialized to the first story point

```

```
