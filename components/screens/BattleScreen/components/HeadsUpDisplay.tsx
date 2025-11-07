import BattleActionsPanel from "./BattleActionsPanel";
import BattleStatsPanel from "./BattleStatsPanel";

import { useAppSelector } from "@/lib/reduxHooks";

import { selectActiveCharacter, selectActiveOpponent } from "@/lib/features/battle/BattleSlice";


const HeadsUpDisplay = () => {

    const activeCharacter = useAppSelector(selectActiveCharacter);
    const activeOpponent = useAppSelector(selectActiveOpponent);

    return (
        <div
            id="HUD"
            className="shrink-0 box-border flex flex-col md:flex-row md:justify-between gap-3 md:gap-6 xl:gap-12"

        >

            {activeCharacter &&

                <BattleStatsPanel
                    title="Player Stats"
                    className="basis-full md:basis-[27%] shrink-0"


                    subject={activeCharacter}
                />
            }

            <BattleActionsPanel
                isVisible={true}
                className="basis-full md:basis-[34%] shrink-0"
            />


            {activeOpponent &&
                <BattleStatsPanel
                    title="Opponent Stats"
                    className="basis-full md:basis-[27%] shrink-0"
                    subject={activeOpponent}
                />
            }
        </div>
    )
}

export default HeadsUpDisplay;