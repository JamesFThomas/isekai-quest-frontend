# Inventory Interaction Flow

This flow describes how a player reviews and manages their inventory from the PartyScreen.

The process begins when the player navigates from the HomeScreen to the PartyScreen using the ControlPanel. The player can select inventory categories to view different item groups or view their coin totals. Selecting an item opens the InventoryItemModal which displays item details.

Some items are read-only (attacks and skills). Other items allow actions such as using consumables or equipping gear. When the player performs an item action, the CharacterSlice is updated and the UI reflects the updated inventory or equipped gear.

This flow interacts with the CharacterSlice in Redux.

---

## Flow Diagram

```mermaid
flowchart TD
  A[HomeScreen]
  A -->|Click Party icon in ControlPanel| B[PartyScreen]

  B -->|Click inventory category button| C[Inventory grid updates]

  B -->|Click Coins category| D[CoinsPanel displays coin counts]

  C -->|Click inventory item| E[InventoryItemModal opens]

  E -->|Click Close| F[InventoryItemModal closes]
  F --> B

  E -->|Click Use for potion or ration| G[CharacterSlice utilizeInventoryItemThunk()]
  G --> H[Item consumed and stats or inventory updated]
  H --> I[InventoryItemModal closes]
  I --> B

  E -->|Click Equip for weapon or equipment| J[CharacterSlice utilizeInventoryItemThunk()]
  J --> K[Equipped weapon or armor updated]
  K --> L[InventoryItemModal closes]
  L --> B

  E -->|Read-only item attack or skill| M[User views details]
  M -->|Click Close| F
```

---

## Key Components

- HomeScreen
- PartyScreen
- InventoryItemModal
- CoinsPanel

---

## State Updates

CharacterSlice

- Inventory category selection is UI state only
- `utilizeInventoryItemThunk()` updates inventory when items are used or equipped
- Equipped weapon or armor values update the character display
