'use client';

// import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

import Battlefield from './components/Battlefield';
import HeadsUpDisplay from './components/HeadsUpDisplay';


export default function BattleScreen() {

  // useProtectedRoute();

  return (
    <div
      className="flex flex-col min-h-screen p-4 bg-[url('/battlescreen_images/forest_battle2.png')] bg-cover bg-center bg-no-repeat"
    >
      <Battlefield />
      < HeadsUpDisplay />
    </div>
  );
}
