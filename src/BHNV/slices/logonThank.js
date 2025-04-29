import { createAsyncThunk } from "@reduxjs/toolkit";


export const logonThank = createAsyncThunk(
    'logonThank',
    async (id) => {
        const res = await fetch(`https://localhost:7103/api/Passengers/GetPassengerById/${id}`,
            {
                method: 'GET',
               
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.ok) {
            const data = await res.json();
            //data.bool = -1;
            return data;
            //return data; // להחזיר את data ישירות, לא data.flights
        }
        else 
        return false;
    }

)