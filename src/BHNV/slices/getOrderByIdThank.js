import { createAsyncThunk } from "@reduxjs/toolkit";


export const getOrderByIdThank = createAsyncThunk(
    'getOrderByIdThank',
    async (id) => {
        const res = await fetch(`https://localhost:7103/api/Orders/GetOrdersByPassengerId/${id}`,

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