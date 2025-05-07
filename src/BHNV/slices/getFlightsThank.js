import { createAsyncThunk } from "@reduxjs/toolkit";


export const getFlightsThank = createAsyncThunk(
    'getFlightsThank',
    async () => {
        const res = await fetch(`https://localhost:7103/api/Flights/GetAll`)
        if (res.ok) {
            const data = await res.json();
            return data; // להחזיר את data ישירות, לא data.flights
        }
        else throw new Error("Failed to fetch");
    }

)

