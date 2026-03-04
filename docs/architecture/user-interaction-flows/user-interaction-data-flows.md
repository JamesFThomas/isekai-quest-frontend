# User Interaction Data Flows

This document outlines the primary user interaction flows within the Isekai Quest application. Each flow demonstrates how a player moves through the interface and how user actions trigger updates to application state.

These diagrams are intended to help developers understand:

- How users navigate between screens
- Where UI interactions occur
- Where Redux state updates happen
- How core gameplay systems are triggered

The flows documented here represent the current Version 1 gameplay loop.

---

## Gameplay Interaction Flows

Below are simplified text summaries of the primary gameplay interaction flows in the current Version 1 gameplay loop.

---

### Login / Continue Quest

SplashScreen
→ User selects **Continue Quest**
→ LoginModal opens
→ User enters login credentials
→ AuthSlice login() updates authentication state
→ LoginModal closes
→ User redirected to **HomeScreen**

---

### Create Character

SplashScreen
→ User selects **Start New Quest**
→ Character creation screen opens
→ User selects class and name
→ CharacterSlice creates character
→ Character becomes active character
→ User redirected to **HomeScreen**

---

### Accept Quest

HomeScreen
→ User selects **Quest Board**
→ QuestBoardScreen loads
→ User selects available quest
→ QuestSlice acceptQuest() updates quest state
→ Quest added to player’s accepted quests

---

### Commence Quest

HomeScreen
→ User selects **Commence Quest**
→ QuestSlice retrieves accepted quest
→ StoryScreen loads first StoryPoint
→ StoryPoint narrative displayed
→ Player selects choice
→ Quest progression begins

---

### Market Purchase

HomeScreen
→ User selects **Town Market**
→ MarketScreen loads
→ User selects booth category
→ MarketBooth loads available items
→ Player selects item
→ Purchase modal opens
→ purchaseBoothItemThunk() dispatch updates character inventory and coins

---

### Inventory Interaction

HomeScreen
→ User selects **PartyScreen**
→ Character inventory displayed
→ Player selects inventory item
→ InventoryItemModal opens
→ Player can inspect item details

## Documented Flows

### Login / Continue Quest

[Login Flow](./login-continue-quest-flow.md)

### Create Character

[Create Character Flow](./create-character-flow.md)

### Accept Quest

[Accept Quest Flow](./accept-quest-flow.md)

### Commence Quest

[Commence Quest Flow](./commence-quest-flow.md)

### Market Purchase

[Market Purchase Flow](./market-purchase-flow.md)

### Inventory Interaction

[Inventory Interaction Flow](./inventory-interaction-flow.md)
