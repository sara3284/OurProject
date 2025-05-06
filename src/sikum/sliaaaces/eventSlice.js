import { createSlice } from "@reduxjs/toolkit"
// import { Logon } from "../logon";
// import { fetchUsersThunk } from "./fetchUserThunk";
// import { addUserThunk } from "./addUserThunk";
// import { fetchLoginThunk, loginThank } from "./loginThank";

import { getEventThank } from "./getEventThank";
export const INITIALSTATE = {
    
    flights: [{
        NumOfFlight: 0,
        CompanyCode: 0,
        // CompanyName: "",
        Date: new Date(),
        TimeOfDepart: new Date().getTime(),
        TimeOfLending: new Date().getTime(),
        destination: "",
        provenance: "",
        PriceOfFirstClass: 0,
        PriceOfRegilerClass: 0,
        NumOfSeetsInFirstClass: 0,
        NumOfSeetsInRegilerClass: 0,
        IsDirect: true,
        Stop: "",
        NumOfEmptySeetsInFirstClass: "",
        NumOfEmptySeetsInRegilerClass: ""
    }],
    // events: [{
    //     name: "",
    //     date: new Date(),
    //     time: new Date().getTime(),
    //     description: "",
    //     id: ""
    // }],
    // searchEvents: [{
    //     name: "",
    //     date: new Date(),
    //     time: new Date().getTime(),
    //     description: "",
    //     id: ""
    // }]

    // , selected: ''
    // , edit: false
    // , selectedEvent: {},
    // sucsses: false,
    // massage: "",
}

export const eventSlice = createSlice({
    name: 'event',
    initialState: INITIALSTATE,
    reducers: {
        // editSelected:(state,action)=>{
        // state.selected=action.payload;
        // },
        // editSelectedEvent:(state,action)=>{
        // state.selectedEvent=action.payload;
        // if(action.payload)
        //      state.selected = action.payload.date;
        //     },
        // isEdit(state,action){
        // state.edit = action.payload;
        // },
        // editEvent:(state,action)=>{
        // state.eventsArr=action.payload;
        // state.selected = action.payload;
        //     },
        // editEventWithDate:(state,action)=>{
        //     state.eventsArr=action.payload;
        // },
    },

    extraReducers: (builder) => {


        // builder.addCase(addEventThank.pending, (state,action) => {
        //     // state.loading = true;
        // });
        // // הוספת מקרה שהטנק הסתיים בהצלחה
        // builder.addCase(addEventThank.fulfilled, (state, action) => {
        //     // state.token = action.payload;
        //     // state.sucsses = true;
        //     // state.loading = false;
        //     state.events = action.payload;
        //     state.selectedEvent={}
        //     console.log("success");
        // });
        // // הוספת מקרה שהטנק נכשל 
        // builder.addCase(addEventThank.rejected, (state, action) => {
        //     // state.loading = false;
        //     console.log("failed");

        // });
        builder.addCase(getEventThank.pending, (state) => {
            // state.loading = true;

        });
        // הוספת מקרה שהטנק הסתיים בהצלחה
        builder.addCase(getEventThank.fulfilled, (state, action) => {

            // state.token = action.payload;
            state.flights = action.payload;
            console.log("stop");
            // state.sucsses = true;
            // state.loading = false;
        });
        // הוספת מקרה שהטנק נכשל 
        builder.addCase(getEventThank.rejected, (state, action) => {
            //  state.loading = false;
        });
        // builder.addCase(searchEventThank.pending, (state) => {
        //     // state.loading = true;

        // });
        // הוספת מקרה שהטנק הסתיים בהצלחה
        //     builder.addCase(searchEventThank.fulfilled, (state, action) => {
        //         // state.token = action.payload;
        //         state.searchEvents = action.payload;
        //         console.log("stop");
        //         // state.sucsses = true;
        //         // state.loading = false;
        //     });
        //     // הוספת מקרה שהטנק נכשל 
        //     builder.addCase(searchEventThank.rejected, (state, action) => {
        //         // state.loading = false;
        //     });
        //     // builder.addCase(deleteEventThank.pending, (state) => {
        //     //     // state.loading = true;

        //     // });
        //     // הוספת מקרה שהטנק הסתיים בהצלחה
        //     builder.addCase(deleteEventThank.fulfilled, (state, action) => {
        //         // state.token = action.payload;
        //         // state.massage = action.payload;
        //   state.events=action.payload
        //         // state.sucsses = true;
        //         // state.loading = false;
        //     });
        //     // הוספת מקרה שהטנק נכשל 
        //     builder.addCase(deleteEventThank.rejected, (state, action) => {
        //         // state.loading = false;
        //     });
        //         // הוספת מקרה שהטנק הסתיים בהצלחה
        //         builder.addCase(editEventThank.fulfilled, (state, action) => {

        //             // state.token = action.payload;
        //             state.eventsArr = action.payload;
        //             console.log("stop");
        //             // state.sucsses = true;
        //             // state.loading = false;
        //         });
        //         // הוספת מקרה שהטנק נכשל 
        //         builder.addCase(editEventThank.rejected, (state, action) => {
        //             // state.loading = false;
        //         });
    }

});
export const { editEventWithDate, editSelected, editEvent, editSelectedEvent, isEdit } = eventSlice.actions;
