import { Link } from "react-router-dom"
import {  useSelector } from "react-redux";
import {  useState } from "react"
import '../css/home.css';
export const Home = () => {
    
    const passenger = useSelector(state => state.event.passenger);
    //alert(passenger.name)
    return <>

        {/* <Link ><button className="buttonhome"></button></Link><br /> */}
        {/* <Link to={'/mcalendar'}><button className="buttonhome"></button></Link> */}
        <div className="links">
            
            <Link to={'/getMyOrders'}><button className="getMyOrders">ההזמנות שלי</button></Link>
            <Link to={'/addOrder'}><button className="addOrder">הוספת הזמנה</button></Link>
            <Link to={'/pay'}><button className="pay">לתשלום</button></Link>
        </div>
        <div>שלום ל{passenger.name}</div>
        {/* <img src="airplane.jpg"/> */}



    </>


}