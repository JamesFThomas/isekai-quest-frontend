import { fistSmash, forstPalm, headButt, holyJab, quickJab, witherTouch } from "@/data/gameData/attacks";
import { block, earthshakerStomp, evade, iceGust, lifeSiphon, luckyHook, radiantPalm, ragingSlam } from "@/data/gameData/skills";
import { BattleOption } from "@/types/battle";
import { characterClass } from "@/types/character";

export const getOptionsByCharacterClass = (characterClass: characterClass) => {
    let defaultAttacks: BattleOption[] = [];
    let defaultSkills: BattleOption[] = [];

    switch (characterClass) {
        case 'paladin':
            defaultAttacks = [holyJab];
            defaultSkills = [evade, block, radiantPalm];
            break;
        case 'elf':
            defaultAttacks = [forstPalm];
            defaultSkills = [evade, block, iceGust];
            break;
        case 'halfling':
            defaultAttacks = [quickJab];
            defaultSkills = [evade, block, luckyHook];
            break;
        case 'barbarian':
            defaultAttacks = [fistSmash];
            defaultSkills = [evade, block, ragingSlam];
        case 'necromancer':
            defaultAttacks = [witherTouch];
            defaultSkills = [evade, block, lifeSiphon];
            break;
        case 'dwarf':
            defaultAttacks = [headButt];
            defaultSkills = [evade, block, earthshakerStomp];
            break;
        default:
            defaultAttacks = [];
            defaultSkills = [];
            break;
    }

    return { defaultAttacks, defaultSkills };
}