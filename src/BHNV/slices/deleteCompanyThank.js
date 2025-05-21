import { createAsyncThunk } from "@reduxjs/toolkit";


export const deleteCompanyThank = createAsyncThunk(
    'deleteCompanyThank',
    async (companyName) => {
        const res = await fetch(`https://localhost:7103/api/Companies/DeleteCompany${companyName}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.ok) {
            console.log("success");
            const data = await res.json();
            // const data = await res.json();
            return data;// data; // להחזיר את data ישירות, לא data.flights
        }
        else throw new Error("Failed to fetch");
    }

)