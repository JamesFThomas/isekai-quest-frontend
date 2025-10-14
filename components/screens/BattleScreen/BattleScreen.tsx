'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

import { BattleAction, performBattleAction } from '@/lib/features/battle/BattleSlice';

import { useAppDispatch } from '@/lib/reduxHooks';

const testBattleAction_PlayerHitsOpponent: BattleAction = {
  actorId: "char-1",
  targetId: "opp-1",
  actionDetails: { id: "basic-attack", title: "Basic Attack", type: "attack" },
  effects: { hp: -5 }
};

// Optional: use this to test the reverse direction
// const testBattleAction_OpponentHitsPlayer: BattleAction = {
//   actorId: "opp-1",
//   targetId: "char-1",
//   actionDetails: { id: "bonk", title: "Bonk", type: "attack" },
//   effects: { hp: -4 }
// };


export default function BattleScreen() {
  // useProtectedRoute();

  const dispatch = useAppDispatch();

  const testCall = () => {
    // dispatch(updateBattleState(testBattleAction_PlayerHitsOpponent));
    dispatch(performBattleAction(testBattleAction_PlayerHitsOpponent));
  }


  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>Battle Screen</h1>
      <p className='mt-4'>Coming Soon!</p>
      <div className='mt-2'>
        <button onClick={testCall}> Test Call</button>
        <BackButton />
      </div>
    </div>
  );
}
