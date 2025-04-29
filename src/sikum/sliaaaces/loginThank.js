import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginThank = createAsyncThunk(
    'loginThank',
    async (detailes) => {
        const res = await fetch("http://localhost:1234/login",
            {
                method: 'POST',
                body: JSON.stringify(detailes),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.ok) {
            const data = await res.json();
            console.log("nicelogin!!!");
            console.log(data.token);
            return data;
        }
        else throw new Error("Faild to fetch");
    }
)


