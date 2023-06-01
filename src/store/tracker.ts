import { createSlice } from "@reduxjs/toolkit";

type Tracker = {
  id: number;
  timer_name: string;
  time_running: number;
};

export type TrackerStateType = {
  trackers: Tracker[];
  accumulated_time: number;
  count: number;
};

const initialState: TrackerStateType = {
  trackers: [],
  accumulated_time: 0,
  count: 0
};

const trackerSlice = createSlice({
  initialState,
  name: "tracker",
  reducers: {
    updateTimer: (
      state,
      {
        payload
      }: { payload: { timer_name: string; time_running: number; id: number } }
    ) => {
      const { timer_name, time_running, id } = payload;
      console.log(timer_name, time_running, id);
      const foundIndex = state.trackers.findIndex((o) => o.id === id);
      if (foundIndex > -1) {
        // Alter existing one
        const new_obj = { ...state.trackers[foundIndex], time_running };
        state.trackers.splice(foundIndex, 1, new_obj);
      } else {
        // Create new one
        state.trackers.push({ timer_name, time_running, id });
      }
    },
    deleteTimer: (state, { payload }: { payload: { timer_id: number } }) => {
      const { timer_id } = payload;
      const foundIndex = state.trackers.findIndex((o) => o.id === timer_id);
      console.log("foundIndex", foundIndex);
      if (foundIndex > -1) {
        // Delete Item
        state.trackers.splice(foundIndex, 1);
      }
    }
  }
});

export const { updateTimer, deleteTimer } = trackerSlice.actions;

export default trackerSlice.reducer;
