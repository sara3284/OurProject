import { createAsyncThunk } from "@reduxjs/toolkit";


export const addCompanyThank = createAsyncThunk(
    'addCompanyThank',
    async (company) => {
        const res = await fetch(`https://localhost:7103/api/Companies/AddCompany`,
            {
                method: 'POST',
                body: JSON.stringify(company),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.ok) {
            console.log("success");
            const data = await res.json();
            return data; // להחזיר את data ישירות, לא data.flights
        }
        else throw new Error("Failed to fetch");
    }

)