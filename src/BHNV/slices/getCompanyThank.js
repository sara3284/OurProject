import { createAsyncThunk } from "@reduxjs/toolkit";


export const getCompanyThank = createAsyncThunk(
    'getCompanyThank',
    async () => {
        const res = await fetch(`https://localhost:7103/api/Companies/GetAll`,

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