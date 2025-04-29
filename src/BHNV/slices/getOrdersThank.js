import { createAsyncThunk } from "@reduxjs/toolkit";


export const getOrdersThank = createAsyncThunk(
    'getOrdersThank',
    async () => {
        const res = await fetch(`https://localhost:7103/api/Orders/GetOrders`)
        if (res.ok) {
            const data = await res.json();
            return data; // להחזיר את data ישירות, לא data.flights
        }
        else throw new Error("Failed to fetch");
    }

)

