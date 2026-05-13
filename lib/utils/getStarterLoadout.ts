import { BattleOption } from "@/types/battle";
import { Equipment, Weapon } from "@/types/character";

import {
  holyJab,
  forstPalm,
  quickJab,
  fistSmash,
  witherTouch,
  headButt,
} from "@/data/gameData/attacks";
import {
  evade,
  block,
  radiantPalm,
  iceGust,
  luckyHook,
  ragingSlam,
  lifeSiphon,
  earthshakerStomp,
} from "@/data/gameData/skills";
import {
  paladinBasicMace,
  elfBasicBow,
  halflingBasicSling,
  barbarianBasicAxe,
  necromancerBasicWand,
  dwarfBasicHammer,
} from "@/data/gameData/weapons";
import {
  paladinStarterArmor,
  elfStarterCloak,
  halflingStarterVest,
  barbarianStarterHarness,
  necromancerStarterRobe,
  dwarfStarterMail,
} from "@/data/gameData/equipment";

export interface StarterLoadout {
  attacks: BattleOption[];
  skills: BattleOption[];
  weapons: Weapon[];
  equipment: Equipment[];
}

export function getStarterLoadout(characterClass: string): StarterLoadout {
  switch (characterClass) {
    case "paladin":
      return {
        attacks: [holyJab],
        skills: [radiantPalm, evade, block],
        weapons: [paladinBasicMace],
        equipment: [paladinStarterArmor],
      };
    case "elf":
      return {
        attacks: [forstPalm],
        skills: [iceGust, evade, block],
        weapons: [elfBasicBow],
        equipment: [elfStarterCloak],
      };
    case "halfling":
      return {
        attacks: [quickJab],
        skills: [luckyHook, evade, block],
        weapons: [halflingBasicSling],
        equipment: [halflingStarterVest],
      };
    case "barbarian":
      return {
        attacks: [fistSmash],
        skills: [ragingSlam, evade, block],
        weapons: [barbarianBasicAxe],
        equipment: [barbarianStarterHarness],
      };
    case "necromancer":
      return {
        attacks: [witherTouch],
        skills: [lifeSiphon, evade, block],
        weapons: [necromancerBasicWand],
        equipment: [necromancerStarterRobe],
      };
    case "dwarf":
      return {
        attacks: [headButt],
        skills: [earthshakerStomp, evade, block],
        weapons: [dwarfBasicHammer],
        equipment: [dwarfStarterMail],
      };
    default:
      return {
        attacks: [],
        skills: [evade, block],
        weapons: [],
        equipment: [],
      };
  }
}
