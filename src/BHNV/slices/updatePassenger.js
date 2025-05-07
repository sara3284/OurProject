import { createAsyncThunk } from "@reduxjs/toolkit";


export const UpdatePassenger = createAsyncThunk(
    'UpdatePassenger',
    async (passenger) => {
        const res = await fetch(`https://localhost:7103/api/Passengers/UpdatePassenger`,
            {
                method: 'PUT',
                body: JSON.stringify(passenger),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.ok) {
            const data = await res.json();
            console.log("ffffffffffffffffff");
            return data;
        }
        else throw new Error("Failed to fetch");
    }

)