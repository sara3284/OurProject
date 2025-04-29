import '../css/logon.css';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logonThank } from "../slices/logonThank";
import * as editUserId from "../slices/flightsSlice";
import '../css/logon.css';

export const Logon = () => {

    const [id, setId] = useState("");
    const bool = useSelector(state => state.event.bool);

    const passenger = useSelector(state => state.event.passenger);
    const usersId = useSelector(state => state.event.id);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {

        if (bool !== null && bool !== undefined) {
            debugger
            if (bool === -1) {
            //    dispatch(editUserId(passenger.id))
                navigate(`/login`);
            }
            if (bool === 0) {
                // alert(usersId);
                // dispatch(editUser(passenger))
                navigate(`/home`);

            }

        }
    }, [bool])
    const checkId = (id) => {
        if (id == 328489976)
            navigate(`/manager`);
    }

    return <div>
        <h1>ברוכים הבאים לסוכנות נסיעות</h1>
        <h3></h3>
        <input className="password" type="password" placeholder="הכנס תעודת זהות" onChange={(e) => (setId(e.target.value), checkId(e.target.value))}></input>
        <h3>לכניסה לחץ כאן</h3>
        <img src='חץ.jpg'></img>
        <button className="login" onClick={() => (dispatch(logonThank(id)))}></button>
    </div>
}