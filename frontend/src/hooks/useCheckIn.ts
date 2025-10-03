import { useAppDispatch, useAppSelector } from "./redux";
import { updateState } from "../store/slices/checkinSlice";
import type { CheckinState } from "../types/checkIn";

export const useCheckin = () => {
  const state = useAppSelector((state) => state.checkin);
  const dispatch = useAppDispatch();

  return {
    state,
    dispatch: (action: { type: string; payload: Partial<CheckinState> }) => {
      if (action.type === "UPDATE_STATE") {
        dispatch(updateState(action.payload));
      }
    },
  };
};
