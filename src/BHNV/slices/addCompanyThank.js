import { createAsyncThunk } from "@reduxjs/toolkit";

export const addCompanyThank = createAsyncThunk(
    'addCompanyThank',
    async (company, { rejectWithValue }) => {
        try {
            // שלח רק את שם החברה כ-string, לא כאובייקט
            const companyName = typeof company === 'string' ? company : company.companyName;
            
            console.log('🔵 Data being sent:', companyName);
            
            const res = await fetch(`https://localhost:7103/api/Companies/AddCompany`, {
                method: 'POST',
                body: JSON.stringify(companyName), // שלח רק את השם
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('🔵 Response status:', res.status);
            
            if (res.ok) {
                const data = await res.json();
                console.log('🟢 Server returned:', data);
                return data;
            } else {
                const errorText = await res.text();
                console.error('🔴 Server error:', errorText);
                throw new Error(`Server error: ${res.status}`);
            }
        } catch (error) {
            console.error('🔴 Network error:', error);
            return rejectWithValue(error.message);
        }
    }
);