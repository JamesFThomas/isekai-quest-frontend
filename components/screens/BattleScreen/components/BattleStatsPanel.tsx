import { Opponent } from '@/types/battle';
import { Character } from '@/types/character';
import Image from 'next/image';


interface BattleStatsPanelProps {
    title: string,
    className?: string
    subject: Character | Opponent
}

const BattleStatsPanel = ({ className, title, subject }: BattleStatsPanelProps) => {
    return (
        <div
            id="Battle-Stats-Panel"
            className={`${className ?? ''} p-4 rounded-xl bg-slate-200 min-w-[240px] min-h-[120px]`}
        >
            <h3>{title}</h3>
            <div
                id='stats-grid'
                className="grid grid-cols-[80px_1fr] items-center gap-3"
            >
                <figure className="w-16 h-16 rounded-md border border-slate-300 overflow-hidden flex items-center justify-center bg-white">
                    <Image
                        alt='Chosen player avatar'
                        src={subject.avatar || '/default-avatar.png'}
                        width={64}
                        height={64}
                    />
                    {/* <p>Image: {subject.avatar}</p> */}
                </figure>
                <div className="flex flex-col gap-1 text-sm">
                    <div className="font-medium">Name: {subject.name}</div>
                    <div>HP: {subject.hp}</div>
                    <div>MP: {subject.mp}</div>
                </div>
            </div>
        </div>
    )
}

export default BattleStatsPanel;