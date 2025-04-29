import {createSlice} from "@reduxjs/toolkit"

import { getEventThank } from "./getEventThank.js";




export const INITIALSTATE = {
username:"",
password:"",
token:null,
sucsses: false,
 eventsArr:{}
}

export const userSlice = createSlice({
name: 'user',
initialState: INITIALSTATE,
reducers: {
editPassword:()=>{

},
editUser:(state,action)=>{
state.username=action.payload;
},
editEvent:(state,action)=>{
    state.eventsArr=action.payload;
    },
    editEventWithDate:(state,action)=>{
        state.eventsArr=action.payload;
        },
editToken:()=>{

}
},

extraReducers: (builder) => {

    // הוספת מקרה שהטנק התחיל
    // builder.addCase(loginThank.pending, (state,action) => {
    //     state.loading = true;
    // });
    // // הוספת מקרה שהטנק הסתיים בהצלחה
    // builder.addCase(loginThank.fulfilled, (state, action) => {
    //     debugger
    //     state.token = action.payload;
    //     state.sucsses = true;
    //     state.loading = false;
    // });
    // הוספת מקרה שהטנק נכשל 
    // builder.addCase(loginThank.rejected, (state, action) => {
    //     state.token =-1;
    //     state.loading = false;
    //  })


    // builder.addCase(logonThank.pending, (state,action) => {
    //     state.loading = true;
    // });
    // // הוספת מקרה שהטנק הסתיים בהצלחה
    // builder.addCase(logonThank.fulfilled, (state, action) => {
    //     state.token = action.payload;
    //     state.sucsses = true;
    //     state.loading = false;
    // });
    // // הוספת מקרה שהטנק נכשל 
    // builder.addCase(logonThank.rejected, (state, action) => {
    //     state.loading = false;
    // })
    // builder.addCase(addEventThank.pending, (state,action) => {
    //     state.loading = true;
    // });
    // // הוספת מקרה שהטנק הסתיים בהצלחה
    // builder.addCase(addEventThank.fulfilled, (state, action) => {
    //     state.token = action.payload;
    //     state.sucsses = true;
    //     state.loading = false;
    // });
    // // הוספת מקרה שהטנק נכשל 
    // builder.addCase(addEventThank.rejected, (state, action) => {
    //     state.loading = false;
    // })

}

});
export const {editPassword,editUser,editToken,editEvent,editEventWithDate} = userSlice.actions;
