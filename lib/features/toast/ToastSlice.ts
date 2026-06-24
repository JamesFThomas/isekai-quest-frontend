import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../store";

import { Toast, ToastId } from "@/types/toast";

interface ToastState {
  queue: Toast[][];
}

const initialState: ToastState = {
  queue: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast[]>) => {
      state.queue.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<ToastId>) => {
      state.queue[0] = state.queue[0].filter(
        (toast) => toast.id !== action.payload,
      );
    },
    shiftToastGroup: (state) => {
      state.queue.shift();
    },
    clearToasts: (state) => {
      state.queue = [];
    },
  },
});

export const { addToast, removeToast, clearToasts, shiftToastGroup } =
  toastSlice.actions;

export const selectToastQueue = (state: RootState) => state.toast.queue;

export default toastSlice.reducer;
