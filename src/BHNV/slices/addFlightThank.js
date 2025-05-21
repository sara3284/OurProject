import { createAsyncThunk } from "@reduxjs/toolkit";


export const addFlightThank = createAsyncThunk(
    'addFlightThank',
    async (flight) => {
        const res = await fetch(`https://localhost:7103/api/Flights/AddFlight`,
            {
                method: 'POST',
                body: JSON.stringify(flight),
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