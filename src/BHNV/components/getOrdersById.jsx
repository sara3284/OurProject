import { useSelector, useDispatch } from "react-redux";

//import { getThank } from "../slices/getThank";
//import { getByCompanyThank } from "../slices/getByCompanyThank";
import { useEffect, useRef, useState } from "react"
import { getOrderByIdThank } from "../slices/getOrderByIdThank";
import { Home } from "./home";
import { getFlightsThank } from "../slices/getFlightsThank";

export const GetOrderById = () => {
    const passenger = useSelector(state => state.event.passenger);
    const flights = useSelector(state => state.event.flights);

    const orders = useSelector(state => state.event.orders);
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [change, setChange] = useState(true);
    useEffect(async () => {
        //dispatch(getOrderByIdThank(passenger.id))
         dispatch(getOrderByIdThank(passenger.id));
   
         
    },[]);


//   useEffect(async () => {
//     dispatch(getFlightsThank());
//     }, []);
    return <div>
        <Home></Home>
        {/* <button onClick={() => dispatch(getOrderByIdThank(passenger.id))}>הצג טיסות</button>
    <div>{passenger.name}</div> */}

        {/* <button> onClick={() => dispatch(getByCompanyThank(company))}ggg</button>            */}


        {flights && flights.map((f, i) => (
    <div>ttttttttttttttttttt{f.numOfFlight}aaaaaaaaaaaa{f.companyName}wwwwww{f.isDirect}</div>
))}
            < table >
            <thead>
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
            </thead>

            {orders && orders.map((order, index) => (

                <tbody>
                    <th>  {order.code}  </th>
                    <th>  {order.numOfFlight}  </th>
                    <th>  {order.passengerId}  </th>
                    <th>  {order.date}  </th>
                    <th>  {order.orderdetails.numOfTickets}  </th>
                    <th>  {order.orderdetails.numClass}  </th>

                    {/* <th> {flights.filter((flight, index) => (
                        <th>tttttttttttt</th>
                    ))} </th> */}



                    {/* filter => f.numOfFlight === order.numOfFlight(0).numOfFlight */}

                    {/* <th>{flights && flights.
                        map((flight, index) => (
                            <th>{flight.numOfFlight}</th>
                        ))} kkkkkkkkkkkkkk</th> */}

                </tbody>
            ))}
    </table>
    </div >
}

