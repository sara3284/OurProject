import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateOrderThank = createAsyncThunk(
    'updateOrderThank',
    async (order) => {
        
        const res = await fetch(`https://localhost:7103/api/Orders/UpdateOrder`,
            {
                method: 'PUT',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
        )
        console.log("ffffffffffffffffff");
        if (res.ok) {
            // const data = await res.json();
            console.log("ffffffffffffffffff");
            return ;
        }
        else throw new Error("Failed to fetch");
    }

)