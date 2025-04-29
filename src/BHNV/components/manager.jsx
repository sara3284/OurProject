import { Link } from "react-router-dom"
import {  useSelector } from "react-redux";
import {  useState } from "react"
import '../css/home.css';
export const Manager = () => {
    const passenger = useSelector(state => state.event.passenger);
    return <>

        {/* <Link ><button className="buttonhome"></button></Link><br /> */}
        {/* <Link to={'/mcalendar'}><button className="buttonhome"></button></Link> */}
        <div className="links">
            
            <Link to={'/getOrders'}><button className="getOrders"> כל ההזמנות</button></Link>
            <Link to={'/getFlights'}><button className="getFlights"> כל הטיסות</button></Link>
            <Link to={'/pay'}><button className="pay">לתשלום</button></Link>
        </div>
        <div>שלום ל{passenger.name}</div>
        {/* <img src="airplane.jpg"/> */}



    </>


}