export type ToastType = "quest" | "item" | "battle" | "system";

export type ToastId = string;

export type ToastSound =
  | "quest_accepted"
  | "quest_completed"
  | "quest_failed"
  | "item_gained"
  | "item_equipped"
  | "item_purchased"
  | "item_used"
  | "battle_damage_dealt"
  | "battle_damage_received"
  | "save_progress";

export type Toast = {
  id: string;
  characterName: string;
  message: string;
  type: ToastType;
  sound?: ToastSound;
  duration: number;
  timestamp?: number;
};
