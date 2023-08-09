import { createSlice } from "@reduxjs/toolkit";

export const covidStatSlice = createSlice({
  name: "covidStatSlice",
  initialState: {
    data: { date: "", regions: [] },
  },
  reducers: {
    add: (state, action) => {
      if (!!action.payload) {
        state.data.regions = [...action.payload.regions];
        state.data.date = action.payload.date;

        // store in local storage
        localStorage.setItem(
          state.data.date,
          JSON.stringify(state.data.regions)
        );
      }
    },
  },
});

export const { add } = covidStatSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCovidStat = (state) => state.covidStat.data;

export default covidStatSlice.reducer;
