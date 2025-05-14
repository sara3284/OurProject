import { createSlice } from "@reduxjs/toolkit"
import { getThank } from "../slices/getThank";
import { getByCompanyThank } from "./getByCompanyThank";
import { loginThank } from "./loginThank";
import { logonThank } from "./logonThank";
import { getOrderByIdThank } from "./getOrderByIdThank";
import { addOrderThank } from "./addOrderThank";
import { getFlightsThank } from "./getFlightsThank";
import { getOrdersThank } from "./getOrdersThank";
import { GetPassengersThank } from "./getPassengersThank";
import { getOrders_Flights } from "./getOrders_Flights";
import { UpdatePassenger } from "./updatePassenger";
import { getCompanyThank } from "./getCompanyThank";
import { UpdateFlight, updateFlightThank } from "./updateFlightThank";

export const INITIALSTATE = {
    orders: [{
        code: 0,
        numOfFlight: 0,
        passengerId: "",
        date: "",
        orderdetails: 
            {
                orderCode: 0,
                NumOfTicketsForFirstClass: 0,
                NumOfTicketsForRegilerClass: 0
            }
        
    }],
    Orders_Flights: {
        orderslist: [{
            code: 0,
            numOfFlight: 0,
            passengerId: "",
            date: "",
            orderdetails: 
                {
                    orderCode: 0,
                    NumOfTicketsForFirstClass: 0,
                    NumOfTicketsForRegilerClass: 0
                }
            
        }],
        flightslist: [{
            numOfFlight: 0,
            companyCode: 0,
            companyName: "",
            date: "",
            timeOfDepart: "",
            timeOfLending: "",
            destination: "",
            provenance: "",
            priceOfFirstClass: 0,
            priceOfRegilerClass: 0,
            numOfSeetsInFirstClass: 0,
            numOfSeetsInRegilerClass: 0,
            isDirect: true,
            stop: "",
            numOfEmptySeetsInFirstClass: "",
            numOfEmptySeetsInRegilerClass: ""
        }]
    }
    ,
    passenger: [{
        id: "",
        name: "",
        birthDate: "",
        phone: "",
        city: "",
        age: 0
    }],
    flights: [{
        numOfFlight: 0,
        companyCode: 0,
        companyName: "",
        date: new Date(),
        timeOfDepart: "",
        timeOfLending: "",
        destination: "",
        provenance: "",
        priceOfFirstClass: 0,
        priceOfRegilerClass: 0,
        numOfSeetsInFirstClass: 0,
        numOfSeetsInRegilerClass: 0,
        isDirect: true,
        stop: "",
        numOfEmptySeetsInFirstClass: 0,
        numOfEmptySeetsInRegilerClass: 0
    }],
    companies:[{
        companyCode:0,
        companyName: "",
    }],
    bool: null,
    id: "",
    orderCode: 1000
}



export const flightsSlice = createSlice({
    name: 'event',
    initialState: INITIALSTATE,
    reducers: {
        editUser: (state, action) => {
            state.passenger = action.payload;
        },
        editUserId: (state, action) => {
            state.passenger.id = action.payload;
        }
    },

    extraReducers: (builder) => {

        builder.addCase(getThank.fulfilled, (state, action) => {
            state.flights = action.payload;
        });
        builder.addCase(getByCompanyThank.fulfilled, (state, action) => {
            state.flights = action.payload;
        });
        builder.addCase(getCompanyThank.fulfilled, (state, action) => {
            state.companies = action.payload;
        });
        builder.addCase(loginThank.fulfilled, (state, action) => {
            state.flights = action.payload;

        });
        builder.addCase(logonThank.fulfilled, (state, action) => {
            debugger
            state.passenger = action.payload;
            state.bool = 0;
        });
        builder.addCase(logonThank.rejected, (state, action) => {
            debugger
            state.bool = -1;
        })
        builder.addCase(getOrderByIdThank.fulfilled, (state, action) => {

            state.orders = action.payload;
        });
        builder.addCase(getOrders_Flights.fulfilled, (state, action) => {

            state.Orders_Flights = action.payload;
        });
        builder.addCase(addOrderThank.fulfilled, (state, action) => {
            state.orders = action.payload;
            console.log("success");
            // state.orderCode = state.orderCode+5
        });
        builder.addCase(getFlightsThank.fulfilled, (state, action) => {

            state.flights = action.payload;
        });
        builder.addCase(GetPassengersThank.fulfilled, (state, action) => {

            state.passenger = action.payload;
        });
        builder.addCase(getOrdersThank.fulfilled, (state, action) => {

            state.orders = action.payload;
        });
        builder.addCase(UpdatePassenger.fulfilled, (state, action) => {
            state.passenger = action.payload;

        });
        builder.addCase(updateFlightThank.fulfilled, (state, action) => {
            state.bool = action.payload;

        });
    }
});
export const { } = flightsSlice.actions;
