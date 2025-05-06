
import { useSelector, useDispatch } from "react-redux";

import { getThank } from "../slices/getThank";
import { getByCompanyThank } from "../slices/getByCompanyThank";
import {useEffect, useState } from "react"
import { getOrdersThank } from "../slices/getOrdersThank";
import { Manager } from "./manager";
import { GetOrderById } from "./getOrdersById";
export const GetOrders = () => {
    const orders = useSelector(state => state.event.orders);
    const dispatch = useDispatch();
    const [company, setcompany] = useState("");
    const [Selected, setSelected] = useState(false);
    const [details, setDetails] = useState(false);
    useEffect(()=>{
        dispatch(getOrdersThank())
    },[])
    const selected = (order) => {
        setSelected(true);
        
    }

   const Details = (order) => {
setDetails(true);
dispatch(GetOrderById(order))
    }
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

            {orders && orders.map((order, index) => (

                <tbody>
                    <tr onClick={() => (selected(order))}>
                    <th>  {order.code}</th>
                    <th> {order.numOfFlight}</th>
                    <th> {order.passengerId}</th>
                    <th> {Date(order.date)}</th>
                    <th>  {order.orderdetails.numOfTickets}</th>
                    <th>  {order.numClass}</th></tr>
                
                {Selected && <button onClick={() => Details(order.passengerId)}>פרטי המזמין</button>}
          </tbody>  ))}
        </table>
        
    </div>
}

