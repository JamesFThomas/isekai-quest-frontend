export type ToastType = "quest" | "item" | "battle" | "system";

export type ToastId = string;

export type Toast = {
  id: string;
  characterName: string;
  message: string;
  type: ToastType;
  duration: number;
  timestamp?: number;
};
