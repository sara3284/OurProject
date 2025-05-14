import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateFlightThank = createAsyncThunk(
    'updateFlightThank',
    async (flight) => {
        const res = await fetch(`https://localhost:7103/api/Flights/UpdateFlight`,
            {
                method: 'PUT',
                body: JSON.stringify(flight),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
        )
        console.log("ffffffffffffffffff");
        if (res.ok) {
            const data = await res.json();
            console.log("ffffffffffffffffff");
            return data;
        }
        else throw new Error("Failed to fetch");
    }

)