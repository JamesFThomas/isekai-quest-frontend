import { makeStore } from '@/lib/store';
import { setActiveCharacter, applyQuestEffect } from './CharacterSlice';
import type { Character } from '@/types/character';
import type { Effect } from '@/types/quest';

const mockCharacter: Character = {
  id: 'char-1',
  name: 'Test Hero',
  hp: 50,
  mp: 30,
  avatar: '/avatar.png',
  inventory: {
    attacks: [],
    skills: [],
    potions: [],
    rations: [],
    weapons: [],
    equipment: [],
    questItems: [],
    coins: { gold: 10, silver: 5, copper: 20 },
  },
};

function storeWithCharacter() {
  const store = makeStore();
  store.dispatch(setActiveCharacter(mockCharacter));
  return store;
}

describe('CharacterSlice — applyQuestEffect', () => {
  it('applies positive hp', () => {
    const store = storeWithCharacter();
    store.dispatch(applyQuestEffect({ hp: 10 }));
    expect(store.getState().character.ActiveCharacter?.hp).toBe(60);
  });

  it('hp cannot go below 0', () => {
    const store = storeWithCharacter();
    store.dispatch(applyQuestEffect({ hp: -100 }));
    expect(store.getState().character.ActiveCharacter?.hp).toBe(0);
  });

  it('applies mp with same floor', () => {
    const store = storeWithCharacter();
    store.dispatch(applyQuestEffect({ mp: -50 }));
    expect(store.getState().character.ActiveCharacter?.mp).toBe(0);
  });

  it('applies coin reward', () => {
    const store = storeWithCharacter();
    store.dispatch(applyQuestEffect({ coins: { gold: 5, silver: 0, copper: 0 } }));
    expect(store.getState().character.ActiveCharacter?.inventory.coins.gold).toBe(15);
  });

  it('coin values cannot go below 0', () => {
    const store = storeWithCharacter();
    store.dispatch(applyQuestEffect({ coins: { gold: -100, silver: -100, copper: -100 } }));
    const coins = store.getState().character.ActiveCharacter?.inventory.coins;
    expect(coins?.gold).toBe(0);
    expect(coins?.silver).toBe(0);
    expect(coins?.copper).toBe(0);
  });

  it('adds quest item to questItems inventory', () => {
    const store = storeWithCharacter();
    const effect: Effect = {
      items: [{
        id: 'relic-1',
        icon: '/relic.png',
        title: 'Ancient Relic',
        type: 'quest',
        description: 'A mysterious artifact',
        effect: {},
      }],
    };
    store.dispatch(applyQuestEffect(effect));
    expect(store.getState().character.ActiveCharacter?.inventory.questItems).toHaveLength(1);
    expect(store.getState().character.ActiveCharacter?.inventory.questItems[0].id).toBe('relic-1');
  });

  it('adds item to correct inventory category', () => {
    const store = storeWithCharacter();
    const effect: Effect = {
      items: [{
        id: 'potion-1',
        icon: '/potion.png',
        title: 'Health Potion',
        type: 'potion',
        description: 'Restores HP',
        effect: { hp: 20 },
      }],
    };
    store.dispatch(applyQuestEffect(effect));
    expect(store.getState().character.ActiveCharacter?.inventory.potions).toHaveLength(1);
  });

  it('applyQuestEffect assigns correct instanceId for duplicate items', () => {
    const store = storeWithCharacter();
    const potion = { id: 'potion-1', icon: '/p.png', title: 'HP', type: 'potion' as const, description: 'd', effect: { hp: 10 } };
    store.dispatch(applyQuestEffect({ items: [potion] }));
    store.dispatch(applyQuestEffect({ items: [potion] }));
    const potions = store.getState().character.ActiveCharacter?.inventory.potions;
    expect(potions?.[0].instanceId).toBe(1);
    expect(potions?.[1].instanceId).toBe(2);
  });

  it('handles partial effect — only hp, others unchanged', () => {
    const store = storeWithCharacter();
    store.dispatch(applyQuestEffect({ hp: 5 }));
    const state = store.getState().character.ActiveCharacter;
    expect(state?.hp).toBe(55);
    expect(state?.mp).toBe(30);
    expect(state?.inventory.coins.gold).toBe(10);
  });

  it('is a no-op when no ActiveCharacter', () => {
    const store = makeStore();
    store.dispatch(applyQuestEffect({ hp: 10 }));
    expect(store.getState().character.ActiveCharacter).toBeNull();
  });
});
