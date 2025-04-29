import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThank } from "../slices/loginThank";



export const Login = () => {
    const id = useSelector(state => state.event.passenger.id);
    const [details, setDetails] = useState({ id: "", name: "", birthDate: "", phone: "", city: "", age: 0 });
    const dispatch = useDispatch();
    const navigate = useNavigate();


    return <div className="aba">
        <div className="hotefIn">
            <div>{id}</div>
            <input type="password" placeholder=".ת.ז"  onChange={(e) => setDetails({ ...details, id: e.target.value })}></input><br />
            <input type="text" placeholder="שם" onChange={(e) => setDetails({ ...details, name: e.target.value })}></input><br />
            <input type="date" placeholder="תאריך לידה" onChange={(e) => setDetails({ ...details, birthDate: e.target.value })}></input><br />
            <input type="text" placeholder="'פלא" onChange={(e) => setDetails({ ...details, phone: e.target.value })}></input><br />
            <input type="text" placeholder="עיר" onChange={(e) => setDetails({ ...details, city: e.target.value })}></input><br />
            {/* <input type="number" placeholder="age" onChange={(e)=> setDetails({...details,age:e.target.value})}></input> */}
        </div>

        <button onClick={() => (dispatch(loginThank(details)), navigate(`/home`))}>אישור</button>
    </div>
}