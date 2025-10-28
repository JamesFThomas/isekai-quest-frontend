import BattleActionsPanel from "./BattleActionsPanel";
import BattleStatsPanel from "./BattleStatsPanel";

interface HeadsUpDisplayProps {
    testCall?: () => void
}

const HeadsUpDisplay = ({ testCall }: HeadsUpDisplayProps) => {
    return (
        <div
            id='HUD'
            className="flex flex-row basis-1/4 bg-green-200"
        >
            <BattleStatsPanel
                title="Player Stats"
                className="flex flex-col basis-1/4 shrink-0 bg-red-200 items-center"
                src=""
                name={"PLayer 1"}
                HP={"35/50"}
                MP={"20/20"}
            />
            < BattleActionsPanel isVisible={true} />
            <BattleStatsPanel
                title="Opponent Stats"
                className="flex flex-col basis-1/4 shrink-0 bg-red-200 items-center"
                src=""
                name="First Opp"
                HP={"5/10"}
                MP={"5/5"}
            />
        </div>
    )
}

export default HeadsUpDisplay;