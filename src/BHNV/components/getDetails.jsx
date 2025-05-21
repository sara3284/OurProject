import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/getPassengers.css';
import { updatePassenger } from "../slices/updatePassenger";
import { useSelector, useDispatch } from "react-redux";
export const GetDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // קבלת פרטי המשתמש מ-Redux store
    const passenger = useSelector(state => state.event.passenger);
    
    const [showEditModal, setShowEditModal] = useState(true); // מוצג כברירת מחדל
    const [editFormData, setEditFormData] = useState({
        id: "",
        name: "",
        birthDate: "",
        phone: "",
        city: "",
        age: 0
    });

    // עדכון הטופס כאשר מתקבלים פרטי המשתמש
    useEffect(() => {
        if (passenger) {
            setEditFormData({
                id: passenger.id || "",
                name: passenger.name || "",
                birthDate: passenger.birthDate || "",
                phone: passenger.phone || "",
                city: passenger.city || "",
                age: passenger.age || 0
            });
        }
    }, [passenger]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        // כאן יש להוסיף את הלוגיקה לשמירת השינויים בשרת
        // לדוגמה: dispatch(updatePassengerThank(editFormData));
        
        // סגירת המודאל וחזרה לדף הקודם
        setShowEditModal(false);
        navigate(-1); // חזרה לדף הקודם
    };

    const handleEditInputChange = (e) => {
        const { name, value, } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const handleClose = () => {
        setShowEditModal(false);
        navigate(-1); // חזרה לדף הקודם
    };
    const saveChanges = () => {
        dispatch(updatePassenger(editFormData));

    }
    // אם אין פרטי משתמש, מציג הודעה מתאימה
    if (!passenger) {
        return (
            <div className="no-passenger-data">
                <h2>לא נמצאו פרטי משתמש</h2>
                <p>אנא התחבר למערכת כדי לצפות בפרטים שלך</p>
                <button onClick={() => navigate('/')}>חזרה לדף הבית</button>
            </div>
        );
    }

    return (
        <div className={`edit-modal-container ${showEditModal ? 'active' : ''}`}>
            <div className="edit-modal-overlay">
                <div className="edit-modal">
                    <div className="modal-header">
                        <h2>הפרטים שלי</h2>
                        <button
                            className="close-modal-button"
                            onClick={handleClose}
                        >
                            <i className="material-icons">close</i>
                        </button>
                    </div>
                    <form onSubmit={handleEditSubmit} className="edit-form">
                        <div className="form-group">
                            <label htmlFor="id">תעודת זהות:</label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                value={editFormData.id}
                                onChange={handleEditInputChange}
                                disabled // בדרך כלל לא מאפשרים לשנות ת.ז.
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">שם מלא:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={editFormData.name}
                                onChange={handleEditInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">טלפון:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={editFormData.phone}
                                onChange={handleEditInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">עיר:</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={editFormData.city}
                                onChange={handleEditInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">גיל:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={editFormData.age}
                                onChange={handleEditInputChange}
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthDate">תאריך לידה:</label>
                            <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                value={editFormData.birthDate}
                                onChange={handleEditInputChange}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="button" className="cancel-button" onClick={handleClose}>
                                ביטול
                            </button>
                            <button type="submit" className="save-button" onClick={()=>saveChanges()}>
                                שמירת שינויים
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
