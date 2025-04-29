
import { configureStore } from "@reduxjs/toolkit";
import { combineSlices } from "@reduxjs/toolkit";
// import { userSlice } from "./slices/userSlice";
// import { eventSlice } from "./sliaaaces/eventSlice";
import { flightsSlice } from "../slices/flightsSlice";

const reducers = combineSlices(flightsSlice);

export const STORE = configureStore({
    reducer: reducers,
    
})