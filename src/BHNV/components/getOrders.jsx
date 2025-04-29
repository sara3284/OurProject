
import { useSelector, useDispatch } from "react-redux";

import { getThank } from "../slices/getThank";
import { getByCompanyThank } from "../slices/getByCompanyThank";
import {useEffect, useState } from "react"
import { getOrdersThank } from "../slices/getOrdersThank";
import { Manager } from "./manager";
export const GetOrders = () => {
    const orders = useSelector(state => state.event.orders);
    const dispatch = useDispatch();
    const [company, setcompany] = useState("");
    useEffect(()=>{
        dispatch(getOrdersThank())
    },[])
    return <div>
        <Manager></Manager>
        <table>
            <thead>
                <th>קוד הזמנה :</th>
                <th>מספר טיסה:</th>
                <th>מזמין הכרטיס:</th>
                <th>תאריך:</th>
                <th> מספר כרטיסים:</th>
                <th>מחלקה :</th>
            </thead>

            {orders && orders.map((flight, index) => (

                <tbody>
                    <th>  {flight.code}</th>
                    <th> {flight.numOfFlight}</th>
                    <th> {flight.passengerId}</th>
                    <th> {Date(flight.date)}</th>
                    <th>  {flight.orderdetails.numOfTickets}</th>
                    <th>  {flight.numClass}</th>
                </tbody>
            ))}
        </table>
    </div>
}

