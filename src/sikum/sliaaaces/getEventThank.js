import { createAsyncThunk } from "@reduxjs/toolkit";


export const getEventThank  = createAsyncThunk(
    'getEventThank',
    async () => {
        const res = await fetch(`https://localhost:7103/api/Flights/GetAll`,
            {
                method: 'GET',
                //body: JSON.stringify(),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.ok) {
            const data = await res.body();
            console.log("good!!!");
            // console.log(data.token);
            console.log(data.flights);
            return data.flights;
        }
        else throw new Error("Faild to fetch");
    }
)


