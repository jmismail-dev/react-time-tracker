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

const counterSlice = createSlice({
  initialState,
  name: "couter",
  reducers: {
    addToCounter: (
      state,
      {
        payload
      }: { payload: { timer_name: string; time_running: number; id: number } }
    ) => {
      const { timer_name, time_running, id } = payload;
      const foundIndex = state.trackers.findIndex((o) => o.id === id);

      console.log(foundIndex);
      if (foundIndex > -1) {
        // Alter existing one
        console.log(" // Alter existing one");
        const new_obj = { ...state.trackers[foundIndex], time_running };
        console.log(" // Alter existing new_obj", new_obj);
        state.trackers.splice(foundIndex, 1, new_obj);
      } else {
        // Create new one
        console.log(" // Create new one");
        state.trackers.push({ timer_name, time_running, id });
      }
    }
  }
});

export default counterSlice.reducer;
export const { addToCounter } = counterSlice.actions;
