'use client';

import styles from './styles/paladin.module.css';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

import { BattleAction, performBattleAction } from '@/lib/features/battle/BattleSlice';

import { useAppDispatch } from '@/lib/reduxHooks';
import Battlefield from './components/Battlefield';
import HeadsUpDisplay from './components/HeadsUpDisplay';

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
      <Battlefield />
      < HeadsUpDisplay />
    </div>
  );
}
