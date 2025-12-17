import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

import { Character, Coins, InventoryItemBase } from '@/types/character';
import { BattleOption } from '@/types/battle';

interface CharacterState {
  ActiveCharacter: Character | null;
  characterLocation: string | null;
  party: Character[];
}

const initialState: CharacterState = {
  ActiveCharacter: null,
  characterLocation: null,
  party: [],
};

type InventorySelection = BattleOption | InventoryItemBase;

type UpdateActiveCharacterPayload = {
  character: Character;
  item: InventorySelection;
};

export const convertItemTypeString = (item: InventorySelection): string => {
  console.log('Converting item type for:', item.type);
  switch (item.type) {
    case 'weapon':
      return "weapons";
    case 'equipment':
      return "equipment";
    case 'potion':
      return "potions";
    case 'ration':
      return "rations";
    default:
      return 'unknown';
  }
}

export const utilizeInventoryItemThunk = createAsyncThunk<
  void,
  InventorySelection,
  { state: RootState }
>(
  'character/useInventoryItemThunk',
  async (item, { dispatch, getState }) => {

    // Get the active character from state
    const { ActiveCharacter } = getState().character;

    // Ensure there is an active character
    if (!ActiveCharacter) return;

    // weapon equip use logic
    if (item.type === 'weapon' || item.type === 'equipment') {
      // Equip weapon logic here
      // console.log(`Equipping ${item.title} to ${ActiveCharacter?.name}`);
      dispatch(equipCharcaterInventoryItem(item));
    }

    // potion/ration use logic
    else if (item.type === 'potion' || item.type === 'ration') {
      // use item and update character state
      // console.log(`Using ${item.type} a ${item.title} on ${ActiveCharacter?.name}`);
      dispatch(useCharcaterInventoryItem({ character: ActiveCharacter, item }));
    }

  }
);

export const purchaseBoothItemThunk = createAsyncThunk<
  void,
  InventoryItemBase,
  { state: RootState }
>(
  'character/purchaseBoothItemThunk',
  async (item, { dispatch, getState }) => {

    // Get the active character from state
    const { ActiveCharacter } = getState().character;

    // Ensure there is an active character
    if (!ActiveCharacter) return;

    // purchase item logic
    console.log(`Purchasing ${item.title} for ${ActiveCharacter?.name}`);

    // add item to character inventory

    // subtract item price from character coins in inventory
    if (item.price) {
      dispatch(addItemToCharacterInventory({ item }));
      dispatch(subtractItemPriceFromCharacterCoins({ price: item.price }));
    }


  }
);

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setActiveCharacter: (state, action: PayloadAction<Character | null>) => {
      state.ActiveCharacter = action.payload;
    },
    setCharacterLocation: (state, action: PayloadAction<string | null>) => {
      state.characterLocation = action.payload;
    },
    addCharacterToParty: (state, action: PayloadAction<Character>) => {
      state.party.push(action.payload);
    },
    removeCharacterFromParty: (state, action: PayloadAction<string>) => {
      state.party = state.party.filter(
        (character) => character.id !== action.payload
      );
    },
    subtractItemPriceFromCharacterCoins: (state, action: PayloadAction<{ price: Coins }>) => {
      const price = action.payload.price;

      if (!state.ActiveCharacter || !state.ActiveCharacter.inventory || !state.ActiveCharacter.inventory.coins) {
        return;
      }

      console.log('Subtracting item price from character coins:', price);

      // remove purchases item price from character coins
      state.ActiveCharacter.inventory.coins = {
        gold: state.ActiveCharacter.inventory.coins.gold - price.gold,
        silver: state.ActiveCharacter.inventory.coins.silver - price.silver,
        copper: state.ActiveCharacter.inventory.coins.copper - price.copper
      };

    },
    addItemToCharacterInventory: (state, action: PayloadAction<{ item: InventoryItemBase }>) => {
      const item = action.payload.item;

      if (!state.ActiveCharacter) return;

      const active = state.ActiveCharacter;

      // check item type and add to appropriate inventory array
      const itemCategory = convertItemTypeString(item);

      if (itemCategory in active.inventory) {

        // console.log(`Adding ${item.title} item to ${itemCategory} inventory array.`);
        (active.inventory as unknown as Record<string, InventoryItemBase[]>)[itemCategory].push(item);
      }


    },
    equipCharcaterInventoryItem: (state, action: PayloadAction<InventoryItemBase>) => {

      if (!state.ActiveCharacter) return;

      const active = state.ActiveCharacter;
      const item = action.payload;


      if (item.type === 'weapon') {
        if (active.equippedWeapon?.id !== item.id) {
          active.equippedWeapon = item;
        }
        else {
          active.equippedWeapon = undefined;
        }
      }

      else if (action.payload.type === 'equipment') {
        if (active.equippedArmor?.id !== item.id) {
          active.equippedArmor = item;
        }
        else {
          active.equippedArmor = undefined;
        }
      }
    },
    useCharcaterInventoryItem: (state, action: PayloadAction<UpdateActiveCharacterPayload>) => {
      const { character, item } = action.payload;

      const targetCharacter = state.ActiveCharacter?.id === character.id ? state.ActiveCharacter : state.party.find(c => c.id === character.id);

      // Implement inventory item usage logic here
      if (targetCharacter && item.effect.hp) {
        targetCharacter.hp += item.effect.hp;
      }

      if (targetCharacter && item.effect.mp) {
        targetCharacter.mp += item.effect.mp;
      }

      // remove item from inventory
      // map the inventory using item and filter out used item
      const itemCategory = convertItemTypeString(item);

      // console.log('Removing item from category:', itemCategory);

      if (targetCharacter?.inventory && itemCategory in targetCharacter.inventory) {
        const updatedItems =
          (targetCharacter.inventory as unknown as Record<string, InventoryItemBase[]>)[itemCategory]
            .filter((invItem: InventorySelection) => invItem.id !== item.id);

        (targetCharacter.inventory as unknown as Record<string, InventoryItemBase[]>)[itemCategory] = updatedItems;
      }
    }
  },
});

// export actions when made
export const {
  setActiveCharacter,
  setCharacterLocation,
  useCharcaterInventoryItem,
  equipCharcaterInventoryItem,
  addItemToCharacterInventory,
  subtractItemPriceFromCharacterCoins,
  // Will use later when implementing party screen
  addCharacterToParty,
  removeCharacterFromParty,
} = characterSlice.actions;

export const selectActiveCharacter = (state: RootState) =>
  state.character.ActiveCharacter;

export const selectCharacterParty = (state: RootState) => state.character.party;

export const selectCharacterLocation = (state: RootState) =>
  state.character.characterLocation;

export const selectParty = (state: RootState) => state.character.party;

export default characterSlice.reducer;
