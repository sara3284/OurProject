import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logonThank } from "../slices/logonThank";
import { Home } from "./home";



export const Pay = () => {

    
    const Orders_Flights = useSelector(state => state.event.Orders_Flights);
    const [OK, setOK] = useState(false);
    const [provenance, setProvenance] = useState("");
    const fun = () => {
       
    }
    return <div>
        <Home></Home>

        <h1>הכרטיס שלך:</h1>
        <text>טיסה מספר {Orders_Flights.numOfFlight}</text>
        <text>טיסה מספר {Orders_Flights.numOfFlight}</text>
         <button  onClick={() => setOK(true)}>אישור</button>
        {OK == true && <div>
            <input type="number" onBlur={(e) => setProvenance(e.target.value)}>מספר אשראי</input>
            <input type="number" onBlur={(e) => setProvenance(e.target.value)}>תוקף</input>
            <input type="number" onBlur={(e) => setProvenance(e.target.value)}>3 ספרות</input>
            </div>}
    </div>
}