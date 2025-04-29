import { createAsyncThunk } from "@reduxjs/toolkit";


export const logonThank = createAsyncThunk(
    'logonThank',
    async (details) => {
        const res = await fetch("http://localhost:1234/register",
            {
                method: 'POST',
                body: JSON.stringify(details),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        if (res.ok) {
            const data = await res.json();
            console.log("nicelogon!!!");

            console.log(data.token);
            return data.token;
        }
        else throw new Error("Faild to fetch");
    }
)


