import { useSelector, useDispatch } from "react-redux";
import { getThank } from "../slices/getThank";
import { getByCompanyThank } from "../slices/getByCompanyThank";
import { useState, useEffect } from "react"
import { getFlightsThank } from "../slices/getFlightsThank";
import { Manager } from "./manager";
export const GetFlights = () => {
    const flights = useSelector(state => state.event.flights);
    const dispatch = useDispatch();
    const [company, setcompany] = useState("");
    useEffect(() => {
        dispatch(getFlightsThank())
    }, [])
    return <div>
        <Manager></Manager>
        <table >
            <thead>



                {/* 
            companyCode: 0,
            companyName: "",
            date: "",
            timeOfDepart: "",
            timeOfLending: "",
            destination: "",
            provenance: "",
            priceOfFirstClass: 0,
            priceOfRegilerClass: 0,
            numOfSeetsInFirstClass: 0,
            numOfSeetsInRegilerClass: 0,
            isDirect: true,
            stop: "",
            numOfEmptySeetsInFirstClass: "",
            numOfEmptySeetsInRegilerClass: "" */}


                <th>מספר טיסה:</th><th>מוצא:</th><th>יעד:</th>

                <th>:שם החברה</th><th>:קוד החברה</th>


                <th>:תאריך טיסה</th><th>:זמן המראה</th><th>:זמן נחיתה</th>


                <th>:מספר המקומות במחלקה הראשונה</th><th>:מחיר כרטיס למחלקה הראשונה</th>
                <th>:מספר המקומות הפנויים במחלקה ראשונה</th>

                <th>:מספר המקומות במחלקה רגילה</th><th>:מחיר כרטיס למחלקה רגילה</th>
                <th>:מספר המקומות הפנויים במחלקה רגילה</th>

                <th>:ישיר</th>
                <th>תחנת ביניים:</th>
            </thead>

            {flights && flights.map((flight, index) => (

                <tbody>
                    <th>{flight.numOfFlight}</th> <th>{flight.provenance}</th>  <th>{flight.destination}</th>

                    <th>{flight.companyName}</th>  <th>{flight.companyCode}</th>

                    <th>{(Date(flight.dete))}</th>  <th>{flight.timeOfDepart}</th>  <th>{flight.timeOfLending}</th>


                    <th>  {flight.numOfSeetsInFirstClass}</th>  <th>{flight.priceOfFirstClass}</th>  <th>{flight.numOfEmptySeetsInFirstClass}</th>

                    <th>  {flight.numOfSeetsInRegilerClass}</th>  <th>{flight.priceOfRegilerClass}</th>  <th>{flight.numOfEmptySeetsInRegilerClass}</th>

                    {(flight.stop === "" && "✔") || "✖"}
                
                    <th>  {flight.stop}</th>
                </tbody>
            ))}
        </table>
    </div>
}

