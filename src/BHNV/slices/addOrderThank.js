import { createAsyncThunk } from "@reduxjs/toolkit";


export const addOrderThank = createAsyncThunk(
    'addOrderThank',
    async (oredrDetailes) => {
        const res = await fetch(`https://localhost:7103/api/Orders/AddOrder`,
            {
                method: 'POST',
                body: JSON.stringify(oredrDetailes),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.ok) {
            console.log("success");
            const data = await res.json();
            return data; // להחזיר את data ישירות, לא data.flights
        }
        else throw new Error("Failed to fetch");
    }

)