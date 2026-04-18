import { makeStore } from '@/lib/store';
import {
  setAcceptedQuest,
  setCurrentStoryPointId,
  resetFailedQuestToFirstPoint,
  markQuestCompletedAndClearState,
  markQuestFailedAndClearState,
  setPendingBattleDetails,
  selectCurrentStoryPoint,
  selectPendingBattleDetails,
} from './QuestSlice';
import type { QuestStory, BattleDetails } from '@/types/quest';

const mockOpponent = {
  id: 'opp-1',
  name: 'Goblin',
  avatar: '/goblin.png',
  hp: 50,
  mp: 10,
  attacks: [],
};

const mockBattleDetails: BattleDetails = {
  opponent: mockOpponent,
  escapeAllowed: true,
  nextPoints: { win: 'sp2', lose: 'sp3', flee: 'sp4' },
};

const mockQuest: QuestStory = {
  id: 'quest-1',
  name: 'Test Quest',
  description: 'A test quest',
  coverImageSrc: '/cover.png',
  storyPoints: [
    {
      id: 'sp1',
      imageSrc: '/sp1.png',
      text: 'You are at the start.',
      choices: [{ label: 'a', text: 'Continue', nextPointId: 'sp2', outcome: undefined }],
    },
    {
      id: 'sp2',
      imageSrc: '/sp2.png',
      text: 'You reach the middle.',
      choices: [{ label: 'a', text: 'Finish', nextPointId: null, outcome: { endState: 'completed' } }],
    },
  ],
};

describe('QuestSlice', () => {
  it('setAcceptedQuest sets currentStoryPointId to the first story point', () => {
    const store = makeStore();
    store.dispatch(setAcceptedQuest(mockQuest));
    expect(store.getState().quest.currentStoryPointId).toBe('sp1');
  });

  it('setAcceptedQuest clears lastEndedQuestId', () => {
    const store = makeStore({ quest: { acceptedQuest: null, currentStoryPointId: null, lastEndedQuestId: 'old-quest', pendingBattleDetails: null } });
    store.dispatch(setAcceptedQuest(mockQuest));
    expect(store.getState().quest.lastEndedQuestId).toBeNull();
  });

  it('setAcceptedQuest(null) clears the accepted quest', () => {
    const store = makeStore();
    store.dispatch(setAcceptedQuest(mockQuest));
    store.dispatch(setAcceptedQuest(null));
    expect(store.getState().quest.acceptedQuest).toBeNull();
  });

  it('setAcceptedQuest(null) clears currentStoryPointId', () => {
    const store = makeStore();
    store.dispatch(setAcceptedQuest(mockQuest));
    expect(store.getState().quest.currentStoryPointId).toBe('sp1');
    store.dispatch(setAcceptedQuest(null));
    expect(store.getState().quest.currentStoryPointId).toBeNull();
  });

  it('resetFailedQuestToFirstPoint resets currentStoryPointId to first point', () => {
    const store = makeStore();
    store.dispatch(setAcceptedQuest(mockQuest));
    store.dispatch(setCurrentStoryPointId('sp2'));
    store.dispatch(resetFailedQuestToFirstPoint());
    expect(store.getState().quest.currentStoryPointId).toBe('sp1');
  });

  it('resetFailedQuestToFirstPoint nulls pendingBattleDetails', () => {
    const store = makeStore();
    store.dispatch(setAcceptedQuest(mockQuest));
    store.dispatch(setPendingBattleDetails(mockBattleDetails));
    store.dispatch(resetFailedQuestToFirstPoint());
    expect(store.getState().quest.pendingBattleDetails).toBeNull();
  });

  it('resetFailedQuestToFirstPoint is a no-op when no accepted quest', () => {
    const store = makeStore();
    store.dispatch(resetFailedQuestToFirstPoint());
    expect(store.getState().quest.currentStoryPointId).toBeNull();
  });

  it('markQuestCompletedAndClearState saves lastEndedQuestId before clearing', () => {
    const store = makeStore();
    store.dispatch(setAcceptedQuest(mockQuest));
    store.dispatch(markQuestCompletedAndClearState());
    expect(store.getState().quest.lastEndedQuestId).toBe('quest-1');
  });

  it('markQuestCompletedAndClearState nulls acceptedQuest, currentStoryPointId, pendingBattleDetails', () => {
    const store = makeStore();
    store.dispatch(setAcceptedQuest(mockQuest));
    store.dispatch(setPendingBattleDetails(mockBattleDetails));
    store.dispatch(markQuestCompletedAndClearState());
    const state = store.getState().quest;
    expect(state.acceptedQuest).toBeNull();
    expect(state.currentStoryPointId).toBeNull();
    expect(state.pendingBattleDetails).toBeNull();
  });

  it('markQuestFailedAndClearState saves lastEndedQuestId and nulls same fields', () => {
    const store = makeStore();
    store.dispatch(setAcceptedQuest(mockQuest));
    store.dispatch(setPendingBattleDetails(mockBattleDetails));
    store.dispatch(markQuestFailedAndClearState());
    const state = store.getState().quest;
    expect(state.lastEndedQuestId).toBe('quest-1');
    expect(state.acceptedQuest).toBeNull();
    expect(state.currentStoryPointId).toBeNull();
    expect(state.pendingBattleDetails).toBeNull();
  });

  it('setPendingBattleDetails stores battle details', () => {
    const store = makeStore();
    store.dispatch(setPendingBattleDetails(mockBattleDetails));
    expect(selectPendingBattleDetails(store.getState())).toEqual(mockBattleDetails);
  });

  it('setPendingBattleDetails(null) clears them', () => {
    const store = makeStore();
    store.dispatch(setPendingBattleDetails(mockBattleDetails));
    store.dispatch(setPendingBattleDetails(null));
    expect(selectPendingBattleDetails(store.getState())).toBeNull();
  });

  it('selectCurrentStoryPoint returns the story point matching currentStoryPointId', () => {
    const store = makeStore();
    store.dispatch(setAcceptedQuest(mockQuest));
    store.dispatch(setCurrentStoryPointId('sp2'));
    expect(selectCurrentStoryPoint(store.getState())?.id).toBe('sp2');
  });

  it('selectCurrentStoryPoint returns null when no quest accepted', () => {
    const store = makeStore();
    expect(selectCurrentStoryPoint(store.getState())).toBeNull();
  });
});
