import { createAsyncThunk } from "@reduxjs/toolkit";


export const getByCompanyThank = createAsyncThunk(
    'getByCompanyThank',
    async (companyName) => {
        const res = await fetch(`https://localhost:7103/api/Flights/GetByCompany/${companyName}`,

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