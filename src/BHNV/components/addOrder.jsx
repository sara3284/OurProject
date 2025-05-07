import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThank } from "../slices/loginThank";
import { addOrderThank } from "../slices/addOrderThank";
import '../css/home.css';
import '../css/add.css';
import { Home } from "./home";
import { getThank } from "../slices/getThank";
export const AddOrder = () => {
    const passenger = useSelector(state => state.event.passenger);
    const flights = useSelector(state => state.event.flights);
    const [orderDetails, setorderDetails] = useState({ code: 0, numOfFlight: 0, passengerId: "", orderdetails: [{ orderCode: 0, numOfTickets: 0, numClass: 0 }] });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [provenance, setProvenance] = useState("");
    const [destination, setDestination] = useState("");
    const [FirstClass, setFirstClass] = useState(false);
    const [RegilerClass, setRegilerClass] = useState(false);
    const [Selected, setSelected] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState({
        numOfFlighttt: 0, companyCode: 0, companyName: "", date: "", timeOfDepart: "", timeOfLending: "",
        destination: "", provenance: "", priceOfFirstClass: 0, priceOfRegilerClass: 0, numOfSeetsInFirstClass: 0, numOfSeetsInRegilerClass: 0,
        isDirect: true, stop: "", numOfEmptySeetsInFirstClass: "", numOfEmptySeetsInRegilerClass: ""
    });
    const [color, setColor] = useState("thh");
    const setorderDetail = () => {
        setorderDetails({ ...orderDetails, passengerId: passenger.id })
    }
    const fun = () => {

        dispatch(getThank())
    }

    const selected = (flight) => {
        setSelected(true);
        setorderDetails({ ...orderDetails, numOfFlight: flight.numOfFlight })
        //setColor("selecte");
    }

    useEffect(() => {
        console.log('selected flight', { selectedFlight })
    }, [selectedFlight])
    const funn = () => {

        alert("selectedFlight.numOfFlighttt" + selectedFlight.numOfFlighttt)
        setorderDetails({ ...orderDetails, code: 0 });
        setorderDetails({ ...orderDetails, numOfFlight: selectedFlight.numOfFlight });
        setorderDetails({ ...orderDetails, orderdetails: passenger.passengerId });
        setorderDetails({ ...orderDetails, date: selectedFlight.date });
    }

    return <div>
        <Home></Home>
        <input type="text" placeholder="מוצא" onBlur={(e) => (setProvenance(e.target.value), fun())}></input>
        <input type="text" placeholder="יעד" onChange={(e) => setDestination(e.target.value)}></input>
        
        
        {flights && <table>
            <thead>
                <tr>
                    <th>numOfFlight</th>
                    <th>destination</th>
                    <th>provenance</th>
                    <th>companyName</th>
                    <th>dete</th>
                    <th>timeOfDepart</th>
                    <th>timeOfLending</th>
                    <th>priceOfFirstClass</th>
                    <th>priceOfRegilerClass</th>
                    <th>isDirect</th>
                    <th>stop</th>
                </tr>
            </thead>
            {flights.filter(f => (f.destination === destination) && (f.provenance === provenance) && (f.provenance !== "")).map((flight) => (
                <tbody>
                    <tr onClick={() => (selected(flight), funn())} className={color}>
                        <th>{flight.numOfFlight}</th>
                        <th>{flight.destination}</th>
                        <th>{flight.provenance}</th>
                        <th>{flight.companyName}</th>
                        <th type="date">{flight.dete}</th>
                        <th>{flight.timeOfDepart}</th>
                        <th>{flight.timeOfLending}</th>
                        <th>{flight.priceOfFirstClass}</th>
                        <th>{flight.priceOfRegilerClass}</th>
                        <th type="bool">{flight.isDirect}</th>
                        <th>{flight.stop}</th>
                    </tr>
                </tbody>
            ))}
        </table>
        }
        {Selected == true && <div>
            <h3>למחלקה ראשונה</h3>
        <img  src='seat-on-a-plane.jpg' onClick={() => setFirstClass(true)}></img>
         
        {FirstClass == true &&
            <input type="number" placeholder="הכנס מספר מקומות" onChange={(e) => (setorderDetails({ ...orderDetails.orderdetails, numClass: e.target.value }), setorderDetails({ ...orderDetails, passengerId: passenger.id }))}></input>
        }
        <h3>למחלקה רגילה</h3>
        <img title="aaaaaaaaaaa" src='dreamliner-1.jpg' onClick={() => setRegilerClass(true)}></img>
        {RegilerClass == true &&
            <input type="number" placeholder="הכנס מספר מקומות" onChange={(e) => (setorderDetails({ ...orderDetails.orderdetails, numClass: e.target.value }), setorderDetails({ ...orderDetails, passengerId: passenger.id }))}></input>
        }
        </div>}
        <button onClick={() => (setorderDetail(), dispatch(addOrderThank(orderDetails)))}>שמור</button>
    </div>
}