import { Opponent } from '@/types/battle';
import { Character } from '@/types/character';
import Image from 'next/image';

interface BattleStatsPanelProps {
  title: string;
  className?: string;
  subject: Character | Opponent;
}

const BattleStatsPanel = ({
  className,
  title,
  subject,
}: BattleStatsPanelProps) => {
  return (
    <div
      id='Battle-Stats-Panel'
      className={`${className ?? ''} p-4 rounded-xl bg-slate-100/30 min-w-[240px] min-h-[120px]`}
    >
      <h3>{title}</h3>
      <div
        id='stats-grid'
        className='grid grid-cols-[80px_1fr] items-center gap-3'
      >
        <figure className='w-16 h-16 rounded-md overflow-hidden flex items-center justify-center bg-transparent'>
          <Image
            alt='Chosen player avatar'
            src={subject.avatar || '/character_avatars/default_avatar.png'}
            width={64}
            height={64}
          />
        </figure>
        <div className='flex flex-col gap-1 text-sm'>
          <div className='font-medium'>Name: {subject.name}</div>
          <div>HP: {subject.hp}</div>
          <div>MP: {subject.mp}</div>
        </div>
      </div>
    </div>
  );
};

export default BattleStatsPanel;
