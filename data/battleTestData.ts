import { BattleOption, BattleState } from "@/types/battle";
import { block, evade } from "./gameData/skills";
import { headButt, witherTouch, fistSmash, quickJab, forstPalm, holyJab } from "./gameData/attacks";

const testAttack: BattleOption = {
    id: "basic-attack",
    icon: "/battleaction_icons/sword_icon2.png",
    title: "Basic Attack",
    type: "attack",
    effect: { hp: -7 }
};

const testOpponentAttack: BattleOption = {
    id: "bonk",
    icon: "/battleaction_icons/sword_ico2.png",
    title: "Bonk",
    type: "attack",
    effect: { hp: -4 }
};

const testSkill: BattleOption = {
    id: "evade attack",
    icon: "/battleaction_icons/evade_icon.png",
    title: "Evade Attack",
    type: "skill",
    effect: { mp: -2 }
};

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
    activeOpponent: {
        id: "opp-1",
        name: "Training Dummy",
        avatar: '/opponent_avatars/goblin_avatar.png',
        hp: 25,
        mp: 0,
        attacks: [testOpponentAttack],
    },
    isPlayerTurn: true,
    battleLog: [],
    phase: "chooseAction",
    result: null,
    round: 1
};