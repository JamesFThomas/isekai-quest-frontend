import { BattleOption, BattleState } from "@/types/battle";
import { block, evade } from "./gameData/skills";
import { headButt, witherTouch, fistSmash, quickJab, forstPalm, holyJab } from "./gameData/attacks";
import { goblin } from "./gameData/opponents";

const testPotion: BattleOption = {
    id: "small-health-potion",
    icon: "/battleaction_icons/potion_icon.png",
    title: "Health Potion/S",
    type: "potion",
    effect: { hp: +3 }
};

export const initialTestState: BattleState = {
    battleId: "test-001",
    activeCharacter: {
        id: "char-1",
        name: "Adele the Dev",
        avatar: "/character_avatars/paladin_avatar2.png",
        hp: 30,
        mp: 10,
        attacks: [headButt, witherTouch, fistSmash, quickJab, forstPalm, holyJab],
        equippedWeapon: "wooden-sword",
        skills: [evade, block],
        inventory: {
            potions: [testPotion],
        }
    },
    activeOpponent: goblin,
    isPlayerTurn: true,
    battleLog: [],
    phase: "chooseAction",
    result: null,
    round: 1
};