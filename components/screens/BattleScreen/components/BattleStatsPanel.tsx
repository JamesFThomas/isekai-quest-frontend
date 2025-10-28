import Image from 'next/image';


interface BattleStatsPanelProps {
    src: string,
    name: string,
    title: string,
    HP: string,
    MP: string,
    className?: string
}

const BattleStatsPanel = ({ className, src, title, name, HP, MP }: BattleStatsPanelProps) => {
    return (
        <div
            id="Battle-Stats-Panel"
            className={className ?? "flex flex-col basis-1/4 shrink-0 bg-red-200 items-center"}
        >
            <h3>{title}</h3>
            {/* <div id='stats-grid'></div> */}
            <p>Image: {src}</p>
            <p>Name: {name}</p>
            <p>HP: {HP}</p>
            <p>MP: {MP}</p>
        </div>
    )
}

export default BattleStatsPanel;