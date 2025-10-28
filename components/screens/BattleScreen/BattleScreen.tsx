'use client';

import styles from './styles/paladin.module.css';

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


export default function BattleScreen() {
  // useProtectedRoute();

  const dispatch = useAppDispatch();

  const testCall = () => {
    dispatch(performBattleAction(testBattleAction_PlayerHitsOpponent));
  }


  return (
    <div className='flex flex-col h-screen'>
      <div
        id='Battlefield'
        className="basis-3/4 bg-blue-200"
      >
        <h1 className='text-4xl font-bold'>Battlefield</h1>
        <BackButton />
        <div className={`${styles.paladin} ${styles.paladinAttack}`} />
      </div>
      <div
        id='HUD'
        className="basis-1/4 bg-green-200"
      >
        <h2 className='text-4xl font-bold'>Heads Up Display</h2>
        <button onClick={testCall}> Test Call</button>
      </div>
    </div>
  );
}
