import BattleActionsPanel from "./BattleActionsPanel";
import BattleStatsPanel from "./BattleStatsPanel";

import { useAppSelector } from "@/lib/reduxHooks";

import { selectActiveCharacter, selectActiveOpponent } from "@/lib/features/battle/BattleSlice";

interface HeadsUpDisplayProps {
    testCall?: () => void
}

const HeadsUpDisplay = ({ testCall }: HeadsUpDisplayProps) => {

    const activeCharacter = useAppSelector(selectActiveCharacter);
    const activeOpponent = useAppSelector(selectActiveOpponent);

    return (
        <div
            id="HUD"
            className="h-full box-border flex flex-col md:flex-row gap-3"
        >



            {activeCharacter &&

                <BattleStatsPanel
                    title="Player Stats"
                    className="basis-full md:basis-[30%] shrink-0"

                    subject={activeCharacter}
                />
            }

            <BattleActionsPanel isVisible={true} className="basis-full md:basis-[40%] shrink-0 md:order-none" />


            {activeOpponent &&
                <BattleStatsPanel
                    title="Opponent Stats"
                    className="basis-full md:basis-[30%] shrink-0"

                    subject={activeOpponent}
                />
            }
        </div>
    )
}

export default HeadsUpDisplay;