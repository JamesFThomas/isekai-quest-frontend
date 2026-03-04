# Market Purchase Flow

This flow describes how a player purchases an item from a market booth and updates their inventory.

The process begins when the player navigates from the HomeScreen to the MarketScreen. The player selects a booth category, which routes them to a MarketBooth page where items are displayed. Selecting an item opens the ItemPurchaseModal where the player can confirm or cancel the purchase.

If the purchase is confirmed, the CharacterSlice is updated via a purchase thunk which deducts coins and adds the purchased item to the character inventory. The modal closes and the MarketBooth UI reflects the updated coin values.

This flow interacts with the CharacterSlice in Redux.

---

## Interaction Flow

| Component         | User Action                      | Leads To                              |
| ----------------- | -------------------------------- | ------------------------------------- |
| HomeScreen        | User clicks **Town Market**      | MarketScreen loads                    |
| MarketScreen      | Player selects booth category    | MarketBooth loads item set            |
| MarketBooth       | Available items displayed        | Player selects item                   |
| MarketBooth       | Item clicked                     | Purchase modal opens                  |
| ItemPurchaseModal | Player confirms purchase         | `purchaseBoothItemThunk()` dispatched |
| CharacterSlice    | Inventory and coin state updated | Item added to inventory               |

---

## Flow Diagram

```mermaid
flowchart TD
  A[HomeScreen]
  A -->|Select Market option| B[MarketScreen]

  B -->|Select booth category| C[MarketBooth]

  C -->|Click item you can afford| D[ItemPurchaseModal opens]

  C -->|Click item you cannot afford| E[No change, item button disabled]

  D -->|Click Cancel or Close| F[ItemPurchaseModal closes]
  F --> C

  D -->|Click Purchase or Confirm| G[CharacterSlice purchaseBoothItemThunk()]

  G --> H[Coins deducted and item added]

  H --> I[ItemPurchaseModal closes]

  I --> J[MarketBooth updates coin display and inventory state]
```

---

## Key Components

- HomeScreen
- MarketScreen
- MarketBooth
- ItemPurchaseModal

---

## State Updates

CharacterSlice

- `purchaseBoothItemThunk()` deducts coins from the active character
- Purchased item is added to the active character inventory
- Updated coin counts are reflected in the UI
