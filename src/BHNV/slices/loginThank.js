import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginThank = createAsyncThunk(
    'loginThank',
    async (detailes) => {
        const res = await fetch(`https://localhost:7103/api/Passengers/AddPassenger`,
            {
                method: 'POST',
                body: JSON.stringify(detailes),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.ok) {
            const data = await res.json();
            return data; // להחזיר את data ישירות, לא data.flights
        }
        else throw new Error("Failed to fetch");
    }

)