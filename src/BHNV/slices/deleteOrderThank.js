import { createAsyncThunk } from "@reduxjs/toolkit";


export const deleteOrderThank = createAsyncThunk(
    'deleteOrderThank',
    async (numOfOrder) => {
        const res = await fetch(`https://localhost:7103/api/Orders/DeleteOrderByNumOfOrder/${numOfOrder}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.ok) {
            console.log("success");
            // const data = await res.json();
            return;// data; // להחזיר את data ישירות, לא data.flights
        }
        else throw new Error("Failed to fetch");
    }

)