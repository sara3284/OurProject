// import { useSelector, useDispatch } from "react-redux";
// import { getThank } from "../slices/getThank";
// import { getByCompanyThank } from "../slices/getByCompanyThank";
// import { useState, useEffect } from "react"
// import { getFlightsThank } from "../slices/getFlightsThank";
// import { Manager } from "./manager";
// import '../css/home.css';
// import { GetPassengersThank } from "../slices/getPassengersThank";
// export const GetPassengers = () => {
//     const passenger = useSelector(state => state.event.passenger);
//     const flights = useSelector(state => state.event.flights);

//     const dispatch = useDispatch();
//     const [company, setcompany] = useState("");
//     const [Selected, setSelected] = useState(false);
//     const [color, setColor] = useState("");
//     useEffect(() => {
//         dispatch(GetPassengersThank())
//     }, [])

//     const selected = (flight) => {
//         setSelected(true);

//     }
//     return <div>
//         {passenger.id == "328489976" && <Manager></Manager>}
//         <table >
//             <thead>



//                 {/* 
//             companyCode: 0,
//             companyName: "",
//             date: "",
//             timeOfDepart: "",
//             timeOfLending: "",
//             destination: "",
//             provenance: "",
//             priceOfFirstClass: 0,
//             priceOfRegilerClass: 0,
//             numOfSeetsInFirstClass: 0,
//             numOfSeetsInRegilerClass: 0,
//             isDirect: true,
//             stop: "",
//             numOfEmptySeetsInFirstClass: "",
//             numOfEmptySeetsInRegilerClass: "" */}
//         id: "",
//         name: "",
//         birthDate: "",
//         phone: "",
//         city: "",
//         age: 0

//                 <th>תעודת זהות:</th><th>שם:</th><th>טלפון:</th>
//                 <th>:עיר </th><th>: גיל</th>
//             </thead>

//             {passenger && passenger.map((passenger, index) => (

//                 <tbody>
//                     <tr onClick={() => (selected(passenger))} className={color}>
//                     <th>{passenger.id}</th> <th>{passenger.name}</th>  <th>{passenger.phone}</th>

//                     <th>{passenger.city}</th>  <th>{passenger.age}</th>


//                     </tr>
//                 </tbody>
//             ))}
//         </table>

//     </div>
// }
import { useSelector, useDispatch } from "react-redux";
import { getThank } from "../slices/getThank";
import { getByCompanyThank } from "../slices/getByCompanyThank";
import { useState, useEffect } from "react";
import { getFlightsThank } from "../slices/getFlightsThank";
import { Manager } from "./manager";
import '../css/getPassengers.css';
import { GetPassengersThank } from "../slices/getPassengersThank";
import { getOrderByIdThank } from "../slices/getOrderByIdThank";

export const GetPassengers = () => {
    const passenger = useSelector(state => state.event.passenger);
    const flights = useSelector(state => state.event.flights);
    const passengerOrders = useSelector(state => state.event.orders);

    const dispatch = useDispatch();
    const [company, setcompany] = useState("");
    const [selectedPassenger, setSelectedPassenger] = useState(null);
    const [showOrders, setShowOrders] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [loading, setLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingPassenger, setEditingPassenger] = useState(null);
    const [editFormData, setEditFormData] = useState({
        id: "",
        name: "",
        phone: "",
        city: "",
        age: 0,
        birthDate: ""
    });
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        // כאן יש להוסיף את הלוגיקה לשמירת השינויים בשרת
        // לדוגמה: dispatch(updatePassengerThank(editFormData));

        // סגירת המודאל לאחר השמירה
        setShowEditModal(false);
        setEditingPassenger(null);
    };



    useEffect(() => {
        if (editingPassenger) {
            setEditFormData({
                id: editingPassenger.id || "",
                name: editingPassenger.name || "",
                phone: editingPassenger.phone || "",
                city: editingPassenger.city || "",
                age: editingPassenger.age || 0,
                birthDate: editingPassenger.birthDate || ""
            });
        }
    }, [editingPassenger]);
    useEffect(() => {
        dispatch(GetPassengersThank());
    }, []);

    const handlePassengerSelect = (selectedPassenger) => {
        setSelectedPassenger(selectedPassenger);
        setShowOrders(false); // סגירת פאנל ההזמנות בעת בחירת נוסע חדש
    };

    const handleViewOrders = () => {
        if (selectedPassenger) {
            setLoading(true);
            dispatch(getOrderByIdThank(selectedPassenger.id))
                .then(() => {
                    setShowOrders(true);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching passenger orders:", error);
                    setLoading(false);
                });
        }
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('he-IL', options);
    };

    // סינון נוסעים לפי חיפוש
    const filteredPassengers = passenger ? passenger.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id?.toString().includes(searchTerm) ||
        p.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone?.includes(searchTerm)
    ) : [];

    // מיון נוסעים
    const sortedPassengers = [...filteredPassengers].sort((a, b) => {
        if (!sortConfig.key) return 0;

        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className="get-passengers-container">
            <div className="background-animation"></div>

            {passenger && passenger.id === "328489976" && <Manager />}

            <div className="admin-panel">
                <div className="panel-header">
                    <h1>ניהול נוסעים</h1>
                    <p>צפייה ועריכה של פרטי נוסעים במערכת</p>
                </div>

                <div className="search-controls">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="חיפוש לפי שם, ת.ז, עיר או טלפון..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="material-icons">search</i>
                    </div>

                    {selectedPassenger && (
                        <button
                            className="view-orders-button"
                            onClick={handleViewOrders}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="button-spinner"></div>
                                    טוען...
                                </>
                            ) : (
                                <>
                                    <i className="material-icons">visibility</i>
                                    צפייה בהזמנות
                                </>
                            )}
                        </button>
                    )}
                </div>

                <div className="passengers-table-container">
                    <table className="passengers-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')}>
                                    תעודת זהות
                                    {sortConfig.key === 'id' && (
                                        <i className="material-icons">
                                            {sortConfig.direction === 'ascending' ? 'arrow_upward' : 'arrow_downward'}
                                        </i>
                                    )}
                                </th>
                                <th onClick={() => handleSort('name')}>
                                    שם
                                    {sortConfig.key === 'name' && (
                                        <i className="material-icons">
                                            {sortConfig.direction === 'ascending' ? 'arrow_upward' : 'arrow_downward'}
                                        </i>
                                    )}
                                </th>
                                <th onClick={() => handleSort('phone')}>
                                    טלפון
                                    {sortConfig.key === 'phone' && (
                                        <i className="material-icons">
                                            {sortConfig.direction === 'ascending' ? 'arrow_upward' : 'arrow_downward'}
                                        </i>
                                    )}
                                </th>
                                <th onClick={() => handleSort('city')}>
                                    עיר
                                    {sortConfig.key === 'city' && (
                                        <i className="material-icons">
                                            {sortConfig.direction === 'ascending' ? 'arrow_upward' : 'arrow_downward'}
                                        </i>
                                    )}
                                </th>
                                <th onClick={() => handleSort('age')}>
                                    גיל
                                    {sortConfig.key === 'age' && (
                                        <i className="material-icons">
                                            {sortConfig.direction === 'ascending' ? 'arrow_upward' : 'arrow_downward'}
                                        </i>
                                    )}
                                </th>
                                <th>פעולות</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPassengers.length > 0 ? (
                                sortedPassengers.map((p, index) => (
                                    <tr
                                        key={p.id || index}
                                        className={selectedPassenger?.id === p.id ? 'selected-row' : ''}
                                        onClick={() => handlePassengerSelect(p)}
                                    >
                                        <td>{p.id}</td>
                                        <td>{p.name}</td>
                                        <td>{p.phone}</td>
                                        <td>{p.city}</td>
                                        <td>{p.age}</td>
                                        <td className="actions-cell">
                                            <button
                                                className="action-button edit"
                                                title="עריכת פרטים"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingPassenger(p);
                                                    setShowEditModal(true);
                                                }}
                                            >
                                                <i className="material-icons">edit</i>
                                            </button>
                                            <button
                                                className="action-button view-orders"
                                                title="צפייה בהזמנות"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePassengerSelect(p);
                                                    handleViewOrders();
                                                }}
                                            >
                                                <i className="material-icons">receipt</i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="no-results">
                                    <td colSpan="6">
                                        <div className="no-results-message">
                                            <i className="material-icons">person_off</i>
                                            <p>לא נמצאו נוסעים התואמים את החיפוש</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* פאנל הזמנות של נוסע */}
                {showOrders && selectedPassenger && (
                    <div className="passenger-orders-panel">
                        <div className="panel-header">
                            <div className="header-title">
                                <h2>ההזמנות של {selectedPassenger.name}</h2>
                                <button
                                    className="close-panel-button"
                                    onClick={() => setShowOrders(false)}
                                >
                                    <i className="material-icons">close</i>
                                </button>
                            </div>
                        </div>

                        {passengerOrders.length > 0 ? (
                            <div className="orders-list">
                                {passengerOrders.map((order, index) => (
                                    <div key={order.id || index} className="order-card">
                                        <div className="order-header">
                                            <div className="order-id">
                                                <span className="label">מספר הזמנה:</span>
                                                <span className="value">{order.code}</span>
                                            </div>
                                            <div className="order-status">
                                                {/* <span className={`status-badge ${order.status}`}>
                                                    {order.status === 'confirmed' && 'מאושרת'}
                                                    {order.status === 'pending' && 'ממתינה'}
                                                    {order.status === 'cancelled' && 'מבוטלת'}
                                                </span> */}
                                            </div>
                                        </div>

                                        <div className="order-details">
                                            <div className="detail-row">
                                                <div className="detail-item">
                                                    <span className="label">מספר טיסה:</span>
                                                    <span className="value">{order.numOfFlight}</span>
                                                </div>
                                                {/* <div className="detail-item">
                                                    <span className="label">יעד:</span>
                                                    <span className="value">{order.destination}</span>
                                                </div> */}
                                            </div>

                                            <div className="detail-row">
                                                {/* <div className="detail-item">
                                                    <span className="label">תאריך יציאה:</span>
                                                    <span className="value">{formatDate(order.departureDate)}</span>
                                                </div> */}
                                                {/* <div className="detail-item">
                                                    <span className="label">תאריך חזרה:</span>
                                                    <span className="value">{formatDate(order.returnDate)}</span>
                                                </div> */}
                                            </div>

                                            <div className="detail-row">
                                                <div className="detail-item">
                                                    <span className="label">מספר כרטיסים למחלקה ראשונה:</span>
                                                    <span className="value">{order.orderdetails?.numOfTicketsForFirstClass || 0}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="label">מספר כרטיסים למחלקה רגילה:</span>
                                                    <span className="value">{order.orderdetails?.numOfTicketsForRegilerClass || 0}</span>
                                                </div>
                                                {/* <div className="detail-item">
                                                    <span className="label">מחיר:</span>
                                                    <span className="value price">{order.totalPrice} ₪</span>
                                                </div> */}
                                            </div>
                                        </div>

                                        {/* <div className="order-actions">
                                            <button className="action-button view-details">
                                                <i className="material-icons">visibility</i>
                                                פרטים מלאים
                                            </button>

                                            {order.status !== 'cancelled' && (
                                                <button className="action-button cancel-order">
                                                    <i className="material-icons">cancel</i>
                                                    ביטול הזמנה
                                                </button>
                                            )}
                                        </div> */}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-orders-message">
                                <i className="material-icons">flight_off</i>
                                <p>לא נמצאו הזמנות עבור נוסע זה</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        
 
        {showEditModal && editingPassenger && (
            <div className="edit-modal-overlay">
                <div className="edit-modal">
                    <div className="modal-header">
                        <h2>עריכת פרטי נוסע</h2>
                        <button
                            className="close-modal-button"
                            onClick={() => {
                                setShowEditModal(false);
                                setEditingPassenger(null);
                            }}
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
                            <button type="button" className="cancel-button" onClick={() => setShowEditModal(false)}>
                                ביטול
                            </button>
                            <button type="submit" className="save-button">
                                שמירת שינויים
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )};
        </div>
    );
};