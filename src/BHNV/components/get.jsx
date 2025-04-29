import { useSelector, useDispatch } from "react-redux";

import { getThank } from "../slices/getThank";
import { getByCompanyThank } from "../slices/getByCompanyThank";
import {useState } from "react"

export const Get = () => {
    const flights = useSelector(state => state.event.flights);
    const dispatch = useDispatch();
    const [company, setcompany] = useState("");
    return <div>
        <button onClick={() => dispatch(getThank())}>הצג טיסות</button>
        <input type="text" onChange={(e)=> setcompany(e.target.value)}></input>
        <button> onClick={() => dispatch(getByCompanyThank(company))}ggg</button>           
        <table>
            <td>
                <th>מספר טיסה:</th>
                <th>יעד:</th>
                <th>מוצא:</th>
                <th>חברה:</th>
                <th>תאריך טיסה:</th>
                <th>זמן המראה:</th>
                <th>זמן נחיתה:</th>
                <th>מחיר כרטיס למחלקה ראשונה:</th>
                <th>מחיר כרטיס למחלקה רגילה:</th>
                <th>?ישיר:</th>
                <th>תחנת ביניים:</th>
            </td>

            {flights && flights.map((flight, index) => (

                <td>
                    <th>  {flight.numOfFlight}</th>
                    <th> {flight.destination}</th>
                    <th> {flight.provenance}</th>
                    <th> {flight.companyName}</th>
                    <th>  {flight.dete}</th>
                    <th>  {flight.timeOfDepart}</th>
                    <th>  {flight.timeOfLending}</th>
                    <th>  {flight.priceOfFirstClass}</th>
                    <th>  {flight.priceOfRegilerClass}</th>
                    <th>  {flight.isDirect}</th>
                    <th>  {flight.stop}</th>
                </td>
            ))}
        </table>
    </div>
}

