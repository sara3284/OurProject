// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginThank } from "../slices/loginThank";



// export const Login = () => {
//     const id = useSelector(state => state.event.passenger.id);
//     const [details, setDetails] = useState({ id: "", name: "", birthDate: "", phone: "", city: "", age: 0 });
//     const dispatch = useDispatch();
//     const navigate = useNavigate();


//     return <div className="aba">
//         <div className="hotefIn">
//             <div>{id}</div>
//             <input type="password" placeholder=".ת.ז"  onChange={(e) => setDetails({ ...details, id: e.target.value })}></input><br />
//             <input type="text" placeholder="שם" onChange={(e) => setDetails({ ...details, name: e.target.value })}></input><br />
//             <input type="date" placeholder="תאריך לידה" onChange={(e) => setDetails({ ...details, birthDate: e.target.value })}></input><br />
//             <input type="text" placeholder="'פלא" onChange={(e) => setDetails({ ...details, phone: e.target.value })}></input><br />
//             <input type="text" placeholder="עיר" onChange={(e) => setDetails({ ...details, city: e.target.value })}></input><br />
//             {/* <input type="number" placeholder="age" onChange={(e)=> setDetails({...details,age:e.target.value})}></input> */}
//         </div>

//         <button onClick={() => (dispatch(loginThank(details)), navigate(`/home`))}>אישור</button>
//     </div>
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThank } from "../slices/loginThank";
import '../css/login.css';

export const Login = () => {
    const id = useSelector(state => state.event.passenger.id);
    const [details, setDetails] = useState({ 
        id: "", 
        name: "", 
        birthDate: "", 
        phone: "", 
        city: "", 
        age: 0 
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // בדיקת תקינות השדות
    const validateForm = () => {
        let tempErrors = {};
        
        // בדיקת תעודת זהות - 9 ספרות
        if (!details.id || !/^\d{9}$/.test(details.id)) {
            tempErrors.id = "יש להזין תעודת זהות תקינה (9 ספרות)";
        }
        
        // בדיקת שם - לפחות 2 תווים
        if (!details.name || details.name.length < 2) {
            tempErrors.name = "יש להזין שם תקין (לפחות 2 תווים)";
        }
        
        // בדיקת תאריך לידה
        if (!details.birthDate) {
            tempErrors.birthDate = "יש להזין תאריך לידה";
        } else {
            const birthDate = new Date(details.birthDate);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            // בדיקת גיל תקין (בין 18 ל-120)
            if (age < 18 || age > 120) {
                tempErrors.birthDate = "גיל חייב להיות בין 18 ל-120";
            } else {
                // עדכון גיל אוטומטי
                setDetails(prev => ({ ...prev, age: age }));
            }
        }
        
        // בדיקת מספר טלפון - 10 ספרות המתחילות ב-05
        if (!details.phone || !/^05\d{8}$/.test(details.phone)) {
            tempErrors.phone = "יש להזין מספר טלפון תקין (10 ספרות המתחילות ב-05)";
        }
        
        // בדיקת עיר - לפחות 2 תווים
        if (!details.city || details.city.length < 2) {
            tempErrors.city = "יש להזין שם עיר תקין";
        }
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setIsSubmitting(true);
            
            // סימולציה של תהליך הרשמה
            setTimeout(() => {
                dispatch(loginThank(details));
                navigate(`/home`);
            }, 1000);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src='לוגו.jpg' alt="לוגו" className="login-logo" />
                    <h1>הרשמה למערכת</h1>
                    <p className="login-subtitle">אנא מלא את הפרטים הבאים</p>
                </div>
                
                <div className="login-form">
                    <div className="form-group">
                        <label htmlFor="id">תעודת זהות</label>
                        <div className="input-wrapper">
                            <input
                                id="id"
                                type="text"
                                placeholder="הזן תעודת זהות"
                                value={details.id}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 9);
                                    setDetails({ ...details, id: value });
                                }}
                                className={errors.id ? 'error' : ''}
                            />
                            <span className="input-icon">
                                <i className="material-icons">badge</i>
                            </span>
                        </div>
                        {errors.id && <div className="error-message">{errors.id}</div>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="name">שם מלא</label>
                        <div className="input-wrapper">
                            <input
                                id="name"
                                type="text"
                                placeholder="הזן שם מלא"
                                value={details.name}
                                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                                className={errors.name ? 'error' : ''}
                            />
                            <span className="input-icon">
                                <i className="material-icons">person</i>
                            </span>
                        </div>
                        {errors.name && <div className="error-message">{errors.name}</div>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="birthDate">תאריך לידה</label>
                        <div className="input-wrapper">
                            <input
                                id="birthDate"
                                type="date"
                                value={details.birthDate}
                                onChange={(e) => setDetails({ ...details, birthDate: e.target.value })}
                                className={errors.birthDate ? 'error' : ''}
                            />
                            <span className="input-icon">
                                <i className="material-icons">cake</i>
                            </span>
                        </div>
                        {errors.birthDate && <div className="error-message">{errors.birthDate}</div>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phone">מספר טלפון</label>
                        <div className="input-wrapper">
                            <input
                                id="phone"
                                type="text"
                                placeholder="הזן מספר טלפון"
                                value={details.phone}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    setDetails({ ...details, phone: value });
                                }}
                                className={errors.phone ? 'error' : ''}
                            />
                            <span className="input-icon">
                                <i className="material-icons">phone</i>
                            </span>
                        </div>
                        {errors.phone && <div className="error-message">{errors.phone}</div>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="city">עיר מגורים</label>
                        <div className="input-wrapper">
                            <input
                                id="city"
                                type="text"
                                placeholder="הזן עיר מגורים"
                                value={details.city}
                                onChange={(e) => setDetails({ ...details, city: e.target.value })}
                                className={errors.city ? 'error' : ''}
                            />
                            <span className="input-icon">
                                <i className="material-icons">location_city</i>
                            </span>
                        </div>
                        {errors.city && <div className="error-message">{errors.city}</div>}
                    </div>
                    
                    <button 
                        className={`submit-button ${isSubmitting ? 'loading' : ''}`} 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            <>
                                <span>אישור</span>
                                <i className="material-icons">check_circle</i>
                            </>
                        )}
                    </button>
                </div>
                
                <div className="login-footer">
                    <p>כבר רשום? <a href="#" onClick={() => navigate('/logon')} className="login-link">להתחברות</a></p>
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