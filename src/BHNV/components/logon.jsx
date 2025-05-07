// import '../css/logon.css';
// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logonThank } from "../slices/logonThank";
// import * as editUserId from "../slices/flightsSlice";
// import '../css/logon.css';

// export const Logon = () => {

//     const [id, setId] = useState("");
//     const bool = useSelector(state => state.event.bool);

//     const passenger = useSelector(state => state.event.passenger);
//     const usersId = useSelector(state => state.event.id);
//     const dispatch = useDispatch();

//     const navigate = useNavigate();

//     useEffect(() => {

//         if (bool !== null && bool !== undefined) {
//             debugger
//             if (bool === -1) {
//             //    dispatch(editUserId(passenger.id))
//                 navigate(`/login`);
//             }
//             if (bool === 0) {
//                 // alert(usersId);
//                 // dispatch(editUser(passenger))
//                 navigate(`/home`);

//             }

//         }
//     }, [bool])
//     const checkId = (id) => {
//         if (id == 328489976)
//             navigate(`/manager`);
//     }

//     return <div>
//         <h1>ברוכים הבאים לסוכנות נסיעות</h1>
//         <h3></h3>
//         <input className="password" type="password" placeholder="הכנס תעודת זהות" onChange={(e) => (setId(e.target.value), checkId(e.target.value))}></input>
//         <h3>לכניסה לחץ כאן</h3>
//         <img src='חץ.jpg'></img>
//         <button className="login" onClick={() => (dispatch(logonThank(id)))}></button>
//     </div>
// }
import '../css/logon.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logonThank } from "../slices/logonThank";
import * as editUserId from "../slices/flightsSlice";

export const Logon = () => {
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const bool = useSelector(state => state.event.bool);
    const passenger = useSelector(state => state.event.passenger);
    const usersId = useSelector(state => state.event.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (bool !== null && bool !== undefined) {
            setIsLoading(false);
            if (bool === -1) {
                navigate(`/login`);
            }
            if (bool === 0) {
                navigate(`/home`);
            }
        }
    }, [bool]);

    const checkId = (id) => {
        if (id == 328489976)
            navigate(`/manager`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id.trim().length > 0) {
            setIsLoading(true);
            dispatch(logonThank(id));
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src='לוגו.jpg' alt="לוגו סוכנות נסיעות" className="login-logo" />
                    <h1>ברוכים הבאים</h1>
                    <p className="login-subtitle">למערכת הזמנת טיסות</p>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="idInput">הזן תעודת זהות להתחברות</label>
                        <div className="input-wrapper">
                            <input 
                                id="idInput"
                                type="password" 
                                placeholder="תעודת זהות" 
                                value={id}
                                onChange={(e) => {
                                    setId(e.target.value);
                                    checkId(e.target.value);
                                }}
                                className="id-input"
                                required
                            />
                            <span className="input-icon">
                                <i className="material-icons">lock</i>
                            </span>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            <>
                                <span>כניסה למערכת</span>
                                <i className="material-icons">arrow_forward</i>
                            </>
                        )}
                    </button>
                </form>
                
                <div className="login-footer">
                    <p>לא רשום למערכת? <a href="#" className="register-link">להרשמה</a></p>
                    <p className="help-text">לעזרה ותמיכה: <span className="help-phone">03-1234567</span></p>
                </div>
            </div>
            
            <div className="login-decoration">
                <div className="decoration-circle circle-1"></div>
                <div className="decoration-circle circle-2"></div>
                <div className="decoration-circle circle-3"></div>
            </div>
        </div>
    );
};
