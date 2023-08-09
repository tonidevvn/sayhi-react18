import { configureStore } from "@reduxjs/toolkit";
import colorModeSlice from "./reducers/ColorMode";
import usersSlice from "./reducers/Users";
import covidStatSlice from "./reducers/CovidStat";

export default configureStore({
  reducer: {
    colorMode: colorModeSlice,
    users: usersSlice,
    covidStat: covidStatSlice,
  },
});
