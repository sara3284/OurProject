import { createAsyncThunk } from "@reduxjs/toolkit";


export const getDetailsByIdThank = createAsyncThunk(
    'getDetailsByIdThank',
    async (Id) => {
        const res = await fetch(`https://localhost:7103/api/Passengers/GetPassengerById/${Id}`,

            {
                method: 'GET',
           
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.ok) {
            const data = await res.json();
            return data; 
        }
        else throw new Error("Failed to fetch");
    }

)