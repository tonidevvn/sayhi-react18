import { configureStore } from "@reduxjs/toolkit";
import colorModeSlice from "./reducers/ColorMode";

export default configureStore({
  reducer: {
    colorMode: colorModeSlice,
  },
});
