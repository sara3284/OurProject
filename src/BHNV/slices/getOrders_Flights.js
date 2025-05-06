import { createAsyncThunk } from "@reduxjs/toolkit";


export const getOrders_Flights = createAsyncThunk(
    'getOrders_Flights',
    async (id) => {
        const res = await fetch(`https://localhost:7103/api/Orders_Flights/GetAll/${id}`,

            {
                method: 'GET',
           
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