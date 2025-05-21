// import { useSelector, useDispatch } from "react-redux";
// import { getThank } from "../slices/getThank";
// import { getByCompanyThank } from "../slices/getByCompanyThank";
// import { useState, useEffect } from "react";
// import { getFlightsThank } from "../slices/getFlightsThank";
// import { Manager } from "./manager";
// import { useNavigate } from "react-router-dom";
// import '../css/getFlights.css';
// import { addOrderThank } from "../slices/addOrderThank";

// export const GetFlights = () => {
//     const passenger = useSelector(state => state.event.passenger);
//     const flights = useSelector(state => state.event.flights);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [company, setCompany] = useState("");
//     const [selectedFlight, setSelectedFlight] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterDestination, setFilterDestination] = useState("");
//     const [filterProvenance, setFilterProvenance] = useState("");
//     const [isLoading, setIsLoading] = useState(true);
//     const [firstClassSeats, setFirstClassSeats] = useState(0);
//     const [regularClassSeats, setRegularClassSeats] = useState(0);
//     const [showPaymentModal, setShowPaymentModal] = useState(false);
//     const [showConfirmation, setShowConfirmation] = useState(false);
//     const [selectedOrder, setSelectedOrder] = useState({
//         code: 0,
//         numOfFlight: 0,
//         passengerId: "",
//         date: "",
//         orderdetails: { 
//             orderCode: 0,
//             NumOfTicketsForFirstClass: 0,
//             NumOfTicketsForRegilerClass: 0 
//         }
//     });

//     useEffect(() => {
//         setIsLoading(true);
//         dispatch(getFlightsThank()).then(() => {
//             setIsLoading(false);
//         });
//     }, []);

//     const handleFlightSelect = (flight) => {
//         // אם התאריך עבר, לא נאפשר בחירה
//         if (isFlightDatePassed(flight.date)) {
//             return;
//         }
//         setSelectedFlight(flight.numOfFlight === selectedFlight?.numOfFlight ? null : flight);
//     };


//     const handleBooking = () => {
//         // Check if any seats are selected
//         if (firstClassSeats === 0 && regularClassSeats === 0) {
//             alert("נא לבחור לפחות מקום אחד");
//             return;
//         }

//         // יצירת אובייקט ההזמנה החדש
//         const newOrder = {
//             code: 0,
//             numOfFlight: selectedFlight.numOfFlight,
//             passengerId: passenger.id,
//             date: new Date().toISOString().slice(0, 10),
//             orderdetails: {
//                 orderCode: 0,
//                 NumOfTicketsForFirstClass: firstClassSeats,
//                 NumOfTicketsForRegilerClass: regularClassSeats
//             }
//         };

//         // עדכון המצב ופתיחת חלונית התשלום
//         setSelectedOrder(newOrder);
//         setShowPaymentModal(true);
//     };

//     const handlePaymentComplete = () => {
//         // שליחת ההזמנה לשרת
//         dispatch(addOrderThank(selectedOrder));

//         // סגירת חלונית התשלום והצגת אישור ההזמנה
//         setShowPaymentModal(false);
//         setShowConfirmation(true);

//         // איפוס הבחירות לאחר 5 שניות
//         setTimeout(() => {
//             setShowConfirmation(false);
//             setSelectedFlight(null);
//             setFirstClassSeats(0);
//             setRegularClassSeats(0);
//         }, 15000);
//     };

//     // פונקציה לבדיקה האם תאריך הטיסה עבר
// const isFlightDatePassed = (flightDate) => {
//     try {
//         const today = new Date();
//         today.setHours(0, 0, 0, 0); // איפוס שעה כדי להשוות רק תאריכים
//         const date = new Date(flightDate);
//         return date < today;
//     } catch (error) {
//         return false;
//     }
// };

//     // פונקציה לסינון הטיסות לפי חיפוש
//     const filteredFlights = flights?.filter(flight => {
//         const matchesSearch = searchTerm === "" ||
//             flight.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             flight.provenance.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             flight.companyName.toLowerCase().includes(searchTerm.toLowerCase());

//         const matchesDestination = filterDestination === "" ||
//             flight.destination.toLowerCase().includes(filterDestination.toLowerCase());

//         const matchesProvenance = filterProvenance === "" ||
//             flight.provenance.toLowerCase().includes(filterProvenance.toLowerCase());

//         return matchesSearch && matchesDestination && matchesProvenance;
//     });

//     // פונקציה לפורמט תאריך
//     const formatDate = (dateString) => {
//         try {
//             const date = new Date(dateString);
//             return date.toLocaleDateString('he-IL', {
//                 year: 'numeric',
//                 month: '2-digit',
//                 day: '2-digit'
//             });
//         } catch (error) {
//             return dateString;
//         }
//     };

//     // רשימת יעדים ייחודיים לסינון
//     const uniqueDestinations = [...new Set(flights?.map(flight => flight.destination) || [])];
//     const uniqueProvenances = [...new Set(flights?.map(flight => flight.provenance) || [])];

//     return (
//         <div className="flights-container">
//             <div className="airplane-animation"></div>

//             {passenger.id === "328489976" && <Manager />}

//             <div className="flights-header">
//                 <h1>טיסות זמינות</h1>
//                 <p>בחר טיסה מהרשימה להזמנת כרטיס</p>
//             </div>

//             <div className="search-filters">
//                 <div className="search-bar">
//                     <input
//                         type="text"
//                         placeholder="חיפוש טיסה לפי יעד, מוצא או חברה..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <i className="material-icons">search</i>
//                 </div>

//                 <div className="filter-options">
//                     <div className="filter-select">
//                         <label>סינון לפי יעד:</label>
//                         <select
//                             value={filterDestination}
//                             onChange={(e) => setFilterDestination(e.target.value)}
//                         >
//                             <option value="">כל היעדים</option>
//                             {uniqueDestinations.map((destination, index) => (
//                                 <option key={index} value={destination}>{destination}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="filter-select">
//                         <label>סינון לפי מוצא:</label>
//                         <select
//                             value={filterProvenance}
//                             onChange={(e) => setFilterProvenance(e.target.value)}
//                         >
//                             <option value="">כל המוצאים</option>
//                             {uniqueProvenances.map((provenance, index) => (
//                                 <option key={index} value={provenance}>{provenance}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             {isLoading ? (
//                 <div className="loading-container">
//                     <div className="loading-spinner"></div>
//                     <p>טוען טיסות...</p>
//                 </div>
//             ) : filteredFlights?.length > 0 ? (
//                 <div className="flights-table-container">
//                     <table className="flights-table">
//                         <thead>
//                             <tr>
//                                 <th>מספר טיסה</th>
//                                 <th>חברת תעופה</th>
//                                 <th>מוצא</th>
//                                 <th>יעד</th>
//                                 <th>תאריך</th>
//                                 <th>המראה</th>
//                                 <th>נחיתה</th>
//                                 <th>מחלקה ראשונה</th>
//                                 <th>מחלקה רגילה</th>
//                                 <th>ישיר</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                         {filteredFlights.map((flight) => {
//     const isPassed = isFlightDatePassed(flight.date);
//     return (
//         <tr
//             key={flight.numOfFlight}
//             onClick={() => handleFlightSelect(flight)}
//             className={`${selectedFlight?.numOfFlight === flight.numOfFlight ? 'selected-row' : ''} ${isPassed ? 'passed-flight' : ''}`}
//         >
//             <td>{flight.numOfFlight}</td>
//             <td>
//                 <div className="company-info">
//                     <span>{flight.companyName}</span>
//                     <small>({flight.companyCode})</small>
//                 </div>
//             </td>
//             <td>{flight.provenance}</td>
//             <td>{flight.destination}</td>
//             <td>{formatDate(flight.date)}</td>
//             <td>{flight.timeOfDepart}</td>
//             <td>{flight.timeOfLending}</td>
//             <td>
//                 <div className="price-info">
//                     <span className="price">{flight.priceOfFirstClass}₪</span>
//                     <small className="seats-info">
//                         {flight.numOfEmptySeetsInFirstClass} מקומות פנויים
//                     </small>
//                 </div>
//             </td>
//             <td>
//                 <div className="price-info">
//                     <span className="price">{flight.priceOfRegilerClass}₪</span>
//                     <small className="seats-info">
//                         {flight.numOfEmptySeetsInRegilerClass} מקומות פנויים
//                     </small>
//                 </div>
//             </td>
//             <td>
//                 {flight.stop === "" ? (
//                     <span className="direct-flight">✓ ישיר</span>
//                 ) : (
//                     <span className="stop-flight">
//                         <span className="stop-icon">✗</span>
//                         <span className="stop-name">{flight.stop}</span>
//                     </span>
//                 )}
//             </td>
//             {isPassed && (
//                 <td className="passed-flight-indicator">
//                     <span>טיסה עברה</span>
//                 </td>
//             )}
//         </tr>
//     );
// })}

//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <div className="no-flights">
//                     <i className="material-icons">flight_off</i>
//                     <p>לא נמצאו טיסות התואמות את החיפוש</p>
//                 </div>
//             )}

//             {selectedFlight && (
//                 <div className="selected-flight-details">
//                     <div className="details-header">
//                         <h3>פרטי הטיסה הנבחרת</h3>
//                         <div className="flight-route">
//                             <span className="city">{selectedFlight.provenance}</span>
//                             <span className="flight-icon">
//                                 <i className="material-icons">flight</i>
//                             </span>
//                             <span className="city">{selectedFlight.destination}</span>
//                         </div>
//                     </div>

//                     <div className="details-content">
//                         <div className="detail-item">
//                             <span className="label">מספר טיסה:</span>
//                             <input 
//                                 type="text" 
//                                 value={selectedFlight.numOfFlight} 
//                                 disabled={true} 
//                                 className="flight-number-input" 
//                             />
//                         </div>
//                         <div className="detail-item">
//                             <span className="label">חברת תעופה:</span>
//                             <span className="value">{selectedFlight.companyName}</span>
//                         </div>
//                         <div className="detail-item">
//                             <span className="label">תאריך:</span>
//                             <span className="value">{formatDate(selectedFlight.date)}</span>
//                         </div>
//                         <div className="detail-item">
//                             <span className="label">שעת המראה:</span>
//                             <span className="value">{selectedFlight.timeOfDepart}</span>
//                         </div>
//                         <div className="detail-item">
//                             <span className="label">שעת נחיתה:</span>
//                             <span className="value">{selectedFlight.timeOfLending}</span>
//                         </div>

//                         <div className="class-options">
//                             <div className="class-option first-class">
//                                 <h4>מחלקה ראשונה</h4>
//                                 <div className="price">{selectedFlight.priceOfFirstClass}₪</div>
//                                 <div className="seats-available">
//                                     {selectedFlight.numOfEmptySeetsInFirstClass} מקומות פנויים מתוך {selectedFlight.numOfSeetsInFirstClass}
//                                 </div>
//                                 <div className="seat-selector">
//                                     <label>בחר מספר מקומות:</label>
//                                     <div className="seat-controls">
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 setFirstClassSeats(Math.max(0, firstClassSeats - 1));
//                                             }}
//                                             disabled={firstClassSeats <= 0}
//                                         >-</button>
//                                         <span>{firstClassSeats}</span>
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 setFirstClassSeats(Math.min(selectedFlight.numOfEmptySeetsInFirstClass, firstClassSeats + 1));
//                                             }}
//                                             disabled={firstClassSeats >= selectedFlight.numOfEmptySeetsInFirstClass}
//                                         >+</button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="class-option regular-class">
//                                 <h4>מחלקה רגילה</h4>
//                                 <div className="price">{selectedFlight.priceOfRegilerClass}₪</div>
//                                 <div className="seats-available">
//                                     {selectedFlight.numOfEmptySeetsInRegilerClass} מקומות פנויים מתוך {selectedFlight.numOfSeetsInRegilerClass}
//                                 </div>
//                                 <div className="seat-selector">
//                                     <label>בחר מספר מקומות:</label>
//                                     <div className="seat-controls">
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 setRegularClassSeats(Math.max(0, regularClassSeats - 1));
//                                             }}
//                                             disabled={regularClassSeats <= 0}
//                                         >-</button>
//                                         <span>{regularClassSeats}</span>
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 setRegularClassSeats(Math.min(selectedFlight.numOfEmptySeetsInRegilerClass, regularClassSeats + 1));
//                                             }}
//                                             disabled={regularClassSeats >= selectedFlight.numOfEmptySeetsInRegilerClass}
//                                         >+</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <button className="booking-button" onClick={handleBooking}>
//                         <i className="material-icons">confirmation_number</i>
//                         <span>להזמנת כרטיס בטיסה זו</span>
//                     </button>
//                 </div>
//             )}

//             {/* חלונית תשלום */}
//             {showPaymentModal && (
//                 <div className="modal-overlay">
//                     <div className="payment-modal">
//                         <div className="modal-header">
//                             <h3>תשלום עבור הזמנת טיסה</h3>
//                             <button className="close-button" onClick={() => setShowPaymentModal(false)}>
//                                 <i className="material-icons">close</i>
//                             </button>
//                         </div>

//                         <div className="payment-details">
//                             <div className="flight-summary">
//                                 <h4>פרטי הטיסה</h4>
//                                 <div className="summary-item">
//                                     <span>מספר טיסה:</span>
//                                     <span>{selectedFlight.numOfFlight}</span>
//                                 </div>
//                                 <div className="summary-item">
//                                     <span>מסלול:</span>
//                                     <span>{selectedFlight.provenance} - {selectedFlight.destination}</span>
//                                 </div>
//                                 <div className="summary-item">
//                                     <span>תאריך:</span>
//                                     <span>{formatDate(selectedFlight.date)}</span>
//                                 </div>
//                                 <div className="summary-item">
//                                     <span>שעה:</span>
//                                     <span>{selectedFlight.timeOfDepart}</span>
//                                 </div>
//                             </div>

//                             <div className="order-summary">
//                                 <h4>סיכום הזמנה</h4>
//                                 {firstClassSeats > 0 && (
//                                     <div className="summary-item">
//                                         <span>מחלקה ראשונה:</span>
//                                         <span>{firstClassSeats} כרטיסים × {selectedFlight.priceOfFirstClass}₪ = {firstClassSeats * selectedFlight.priceOfFirstClass}₪</span>
//                                     </div>
//                                 )}
//                                 {regularClassSeats > 0 && (
//                                     <div className="summary-item">
//                                         <span>מחלקה רגילה:</span>
//                                         <span>{regularClassSeats} כרטיסים × {selectedFlight.priceOfRegilerClass}₪ = {regularClassSeats * selectedFlight.priceOfRegilerClass}₪</span>
//                                     </div>
//                                 )}
//                                 <div className="summary-total">
//                                     <span>סה"כ לתשלום:</span>
//                                     <span>{(firstClassSeats * selectedFlight.priceOfFirstClass) + (regularClassSeats * selectedFlight.priceOfRegilerClass)}₪</span>
//                                 </div>
//                             </div>

//                             <div className="payment-form">
//                                 <h4>פרטי תשלום</h4>
//                                 <div className="form-group">
//                                     <label>מספר כרטיס אשראי:</label>
//                                     <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" />
//                                 </div>
//                                 <div className="form-row">
//                                     <div className="form-group">
//                                         <label>תוקף:</label>
//                                         <input type="text" placeholder="MM/YY" />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>CVV:</label>
//                                         <input type="text" placeholder="XXX" />
//                                     </div>
//                                 </div>
//                                 <div className="form-group">
//                                     <label>שם בעל הכרטיס:</label>
//                                     <input type="text" placeholder="שם מלא כפי שמופיע על הכרטיס" />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>מספר תעודת זהות:</label>
//                                     <input type="text" placeholder="מספר ת.ז." />
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="payment-actions">
//                             <button className="cancel-button" onClick={() => setShowPaymentModal(false)}>ביטול</button>
//                             <button className="confirm-button" onClick={handlePaymentComplete}>
//                                 <i className="material-icons">payment</i>
//                                 אישור תשלום
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* הודעת אישור הזמנה */}
//             {showConfirmation && (
//                 <div className="modal-overlay">
//                     <div className="confirmation-modal">
//                         <div className="confirmation-icon">
//                             <i className="material-icons">check_circle</i>
//                         </div>
//                         <h2>ההזמנה בוצעה בהצלחה!</h2>
//                         <div className="confirmation-details">
//                             <p>תודה שבחרת לטוס איתנו, {passenger.firstName} {passenger.lastName}!</p>
//                             <p>הזמנתך לטיסה מספר <strong>{selectedFlight.numOfFlight}</strong> מ<strong>{selectedFlight.provenance}</strong> ל<strong>{selectedFlight.destination}</strong> התקבלה.</p>
//                             <p>אנו מצפים לראותך בשדה התעופה בתאריך <strong>{formatDate(selectedFlight.date)}</strong>.</p>
//                             <p>נא להגיע לשדה התעופה כשעתיים לפני מועד ההראה ({selectedFlight.timeOfDepart}).</p>

//                             <div className="ticket-summary">
//                                 <div className="ticket-header">
//                                     <div className="company-logo">
//                                         <span>{selectedFlight.companyName}</span>
//                                     </div>
//                                     <div className="flight-number">
//                                         <span>טיסה #{selectedFlight.numOfFlight}</span>
//                                     </div>
//                                 </div>

//                                 <div className="ticket-route">
//                                     <div className="departure">
//                                         <div className="city-code">{selectedFlight.provenance}</div>
//                                         <div className="time">{selectedFlight.timeOfDepart}</div>
//                                     </div>
//                                     <div className="route-line">
//                                         <i className="material-icons">flight</i>
//                                     </div>
//                                     <div className="arrival">
//                                         <div className="city-code">{selectedFlight.destination}</div>
//                                         <div className="time">{selectedFlight.timeOfLending}</div>
//                                     </div>
//                                 </div>

//                                 <div className="ticket-details">
//                                     <div className="detail-column">
//                                         <div className="detail-item">
//                                             <span className="label">תאריך:</span>
//                                             <span className="value">{formatDate(selectedFlight.date)}</span>
//                                         </div>
//                                         <div className="detail-item">
//                                             <span className="label">נוסע:</span>
//                                             <span className="value">{passenger.firstName} {passenger.lastName}</span>
//                                         </div>
//                                     </div>
//                                     <div className="detail-column">
//                                         <div className="detail-item">
//                                             <span className="label">מחלקה ראשונה:</span>
//                                             <span className="value">{firstClassSeats} כרטיסים</span>
//                                         </div>
//                                         <div className="detail-item">
//                                             <span className="label">מחלקה רגילה:</span>
//                                             <span className="value">{regularClassSeats} כרטיסים</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <p className="confirmation-message">פרטי ההזמנה נשלחו לכתובת האימייל שלך.</p>
//                             <p className="confirmation-message">נסיעה טובה ובטוחה!</p>
//                         </div>
//                         <button className="close-confirmation" onClick={() => setShowConfirmation(false)}>
//                             סגור
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
import { useSelector, useDispatch } from "react-redux";
import { getThank } from "../slices/getThank";
import { getByCompanyThank } from "../slices/getByCompanyThank";
import { useState, useEffect } from "react";
import { getFlightsThank } from "../slices/getFlightsThank";
import { Manager } from "./manager";
import { useNavigate } from "react-router-dom";
import '../css/getFlights.css';
import { addOrderThank } from "../slices/addOrderThank";

export const GetFlights = () => {
    const passenger = useSelector(state => state.event.passenger);
    const flights = useSelector(state => state.event.flights);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [company, setCompany] = useState("");
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDestination, setFilterDestination] = useState("");
    const [filterProvenance, setFilterProvenance] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [firstClassSeats, setFirstClassSeats] = useState(0);
    const [regularClassSeats, setRegularClassSeats] = useState(0);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({
        code: 0,
        numOfFlight: 0,
        passengerId: "",
        date: "",
        orderdetails: {
            orderCode: 0,
            NumOfTicketsForFirstClass: 0,
            NumOfTicketsForRegilerClass: 0
        }
    });

    useEffect(() => {
        setIsLoading(true);
        dispatch(getFlightsThank()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    const handleFlightSelect = (flight) => {
        // אם התאריך עבר, לא נאפשר בחירה
        if (isFlightDatePassed(flight.date)) {
            return;
        }
        setSelectedFlight(flight.numOfFlight === selectedFlight?.numOfFlight ? null : flight);
        // איפוס בחירת המושבים בעת החלפת טיסה
        if (flight.numOfFlight !== selectedFlight?.numOfFlight) {
            setFirstClassSeats(0);
            setRegularClassSeats(0);
        }
    };

    const handleBooking = () => {
       
        // יצירת אובייקט ההזמנה החדש
        const newOrder = {
            code: 0,
            numOfFlight: selectedFlight.numOfFlight,
            passengerId: passenger.id,
            date: new Date().toISOString().slice(0, 10),
            orderdetails: {
                orderCode: 0,
                NumOfTicketsForFirstClass: firstClassSeats,
                NumOfTicketsForRegilerClass: regularClassSeats
            }
        };

        // עדכון המצב ופתיחת חלונית התשלום
        setSelectedOrder(newOrder);
        setShowPaymentModal(true);
    };

    const handlePaymentComplete = () => {
        // שליחת ההזמנה לשרת
        dispatch(addOrderThank(selectedOrder));

        // סגירת חלונית התשלום והצגת אישור ההזמנה
        setShowPaymentModal(false);
        setShowConfirmation(true);

        // איפוס הבחירות לאחר 15 שניות
        setTimeout(() => {
            setShowConfirmation(false);
            setSelectedFlight(null);
            setFirstClassSeats(0);
            setRegularClassSeats(0);
        }, 15000);
    };

    // פונקציה לבדיקה האם תאריך הטיסה עבר
    const isFlightDatePassed = (flightDate) => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // איפוס שעה כדי להשוות רק תאריכים
            const date = new Date(flightDate);
            return date < today;
        } catch (error) {
            return false;
        }
    };

    // פונקציה לסינון הטיסות לפי חיפוש
    const filteredFlights = flights?.filter(flight => {
        const matchesSearch = searchTerm === "" ||
            flight.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            flight.provenance.toLowerCase().includes(searchTerm.toLowerCase()) ||
            flight.companyName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDestination = filterDestination === "" ||
            flight.destination.toLowerCase().includes(filterDestination.toLowerCase());

        const matchesProvenance = filterProvenance === "" ||
            flight.provenance.toLowerCase().includes(filterProvenance.toLowerCase());

        return matchesSearch && matchesDestination && matchesProvenance;
    });

    // פונקציה לפורמט תאריך
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('he-IL', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        } catch (error) {
            return dateString;
        }
    };

    // חישוב סכום ההזמנה
    const calculateTotal = () => {
        if (!selectedFlight) return 0;
        return (firstClassSeats * selectedFlight.priceOfFirstClass) +
            (regularClassSeats * selectedFlight.priceOfRegilerClass);
    };

    // רשימת יעדים ייחודיים לסינון
    const uniqueDestinations = [...new Set(flights?.map(flight => flight.destination) || [])];
    const uniqueProvenances = [...new Set(flights?.map(flight => flight.provenance) || [])];

    return (
        <div className="modern-flights-container">
            <div className="flights-hero">
                <div className="flights-hero-content">
                    <h1>חיפוש והזמנת טיסות</h1>
                    <p>בחר טיסה מהרשימה להזמנת כרטיס</p>
                </div>
            </div>

            {passenger.id === "328489976" && <Manager />}

            <div className="search-filters-container">
                <div className="search-filters">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="חיפוש טיסה לפי יעד, מוצא או חברה..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="material-icons">search</span>
                    </div>

                    <div className="filter-options">
                        <div className="filter-select">
                            <label>סינון לפי יעד:</label>
                            <select
                                value={filterDestination}
                                onChange={(e) => setFilterDestination(e.target.value)}
                            >
                                <option value="">כל היעדים</option>
                                {uniqueDestinations.map((destination, index) => (
                                    <option key={index} value={destination}>{destination}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-select">
                            <label>סינון לפי מוצא:</label>
                            <select
                                value={filterProvenance}
                                onChange={(e) => setFilterProvenance(e.target.value)}
                            >
                                <option value="">כל המוצאים</option>
                                {uniqueProvenances.map((provenance, index) => (
                                    <option key={index} value={provenance}>{provenance}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>טוען טיסות...</p>
                </div>
            ) : filteredFlights?.length > 0 ? (
                <div className="flights-results-container">
                    <div className="flights-table-container">
                        <table className="flights-table">
                            <thead>
                                <tr>
                                    <th>מספר טיסה</th>
                                    <th>חברת תעופה</th>
                                    <th>מוצא</th>
                                    <th>יעד</th>
                                    <th>תאריך</th>
                                    <th>המראה</th>
                                    <th>נחיתה</th>
                                    <th>מחלקה ראשונה</th>
                                    <th>מחלקה רגילה</th>
                                    <th>ישיר</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFlights.map((flight) => {
                                    const isPassed = isFlightDatePassed(flight.date);
                                    return (
                                        <tr
                                            key={flight.numOfFlight}
                                            onClick={() => handleFlightSelect(flight)}
                                            className={`
                                                flight-row
                                                ${selectedFlight?.numOfFlight === flight.numOfFlight ? 'selected-row' : ''}
                                                ${isPassed ? 'passed-flight' : ''}
                                            `}
                                        >
                                            <td>{flight.numOfFlight}</td>
                                            <td>
                                                <div className="company-info">
                                                    <span>{flight.companyName}</span>
                                                    <small>({flight.companyCode})</small>
                                                </div>
                                            </td>
                                            <td>{flight.provenance}</td>
                                            <td>{flight.destination}</td>
                                            <td>{formatDate(flight.date)}</td>
                                            <td>{flight.timeOfDepart}</td>
                                            <td>{flight.timeOfLending}</td>
                                            <td>
                                                <div className="price-info">
                                                    <span className="price">{flight.priceOfFirstClass}₪</span>
                                                    <small className="seats-info">
                                                        {flight.numOfEmptySeetsInFirstClass} מקומות פנויים
                                                    </small>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="price-info">
                                                    <span className="price">{flight.priceOfRegilerClass}₪</span>
                                                    <small className="seats-info">
                                                        {flight.numOfEmptySeetsInRegilerClass} מקומות פנויים
                                                    </small>
                                                </div>
                                            </td>
                                            <td>
                                                {flight.stop === "" ? (
                                                    <span className="direct-flight">
                                                        <span className="material-icons">check_circle</span>
                                                        ישיר
                                                    </span>
                                                ) : (
                                                    <span className="stop-flight">
                                                        <span className="material-icons">flight_land</span>
                                                        <span className="stop-name">{flight.stop}</span>
                                                    </span>
                                                )}
                                            </td>
                                            {isPassed && (
                                                <td className="passed-flight-indicator">
                                                    <span className="material-icons">event_busy</span>
                                                    <span>טיסה עברה</span>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {selectedFlight && (
                        <div className="selected-flight-details">
                            <div className="details-header">
                                <h3>פרטי הטיסה הנבחרת</h3>
                                <div className="flight-route">
                                    <span className="city">{selectedFlight.provenance}</span>
                                    <span className="flight-icon">
                                        <span className="material-icons">flight</span>
                                    </span>
                                    <span className="city">{selectedFlight.destination}</span>
                                </div>
                            </div>

                            <div className="details-content">
                                <div className="flight-info-grid">
                                    <div className="detail-item">
                                        <span className="label">מספר טיסה:</span>
                                        <input 
                                            type="text" 
                                            value={selectedFlight.numOfFlight} 
                                            disabled={true} 
                                            className="flight-number-input" 
                                        />
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">חברת תעופה:</span>
                                        <span className="value">{selectedFlight.companyName}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">תאריך:</span>
                                        <span className="value">{formatDate(selectedFlight.date)}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">שעת המראה:</span>
                                        <span className="value">{selectedFlight.timeOfDepart}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">שעת נחיתה:</span>
                                        <span className="value">{selectedFlight.timeOfLending}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">סוג טיסה:</span>
                                        <span className="value">
                                            {selectedFlight.stop === "" ? "ישירה" : `עצירת ביניים ב${selectedFlight.stop}`}
                                        </span>
                                    </div>
                                </div>

                                <div className="class-options">
                                    <div className="class-option first-class">
                                        <div className="class-header">
                                            <span className="material-icons">airline_seat_legroom_extra</span>
                                            <h4>מחלקה ראשונה</h4>
                                        </div>
                                        <div className="class-price">{selectedFlight.priceOfFirstClass}₪</div>
                                        <div className="seats-available">
                                            <span className="material-icons">event_seat</span>
                                            <span>{selectedFlight.numOfEmptySeetsInFirstClass} מקומות פנויים מתוך {selectedFlight.numOfSeetsInFirstClass}</span>
                                        </div>
                                        <div className="seat-selector">
                                            <label>בחר מספר מקומות:</label>
                                            <div className="seat-controls">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFirstClassSeats(Math.max(0, firstClassSeats - 1));
                                                    }}
                                                    disabled={firstClassSeats <= 0}
                                                    className="seat-button"
                                                >
                                                    <span className="material-icons">remove</span>
                                                </button>
                                                <span className="seat-count">{firstClassSeats}</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFirstClassSeats(Math.min(selectedFlight.numOfEmptySeetsInFirstClass, firstClassSeats + 1));
                                                    }}
                                                    disabled={firstClassSeats >= selectedFlight.numOfEmptySeetsInFirstClass}
                                                    className="seat-button"
                                                >
                                                    <span className="material-icons">add</span>
                                                </button>
                                            </div>
                                        </div>
                                        {firstClassSeats > 0 && (
                                            <div className="subtotal">
                                                סה"כ: {firstClassSeats * selectedFlight.priceOfFirstClass}₪
                                            </div>
                                        )}
                                    </div>

                                    <div className="class-option regular-class">
                                        <div className="class-header">
                                            <span className="material-icons">airline_seat_recline_normal</span>
                                            <h4>מחלקה רגילה</h4>
                                        </div>
                                        <div className="class-price">{selectedFlight.priceOfRegilerClass}₪</div>
                                        <div className="seats-available">
                                            <span className="material-icons">event_seat</span>
                                            <span>{selectedFlight.numOfEmptySeetsInRegilerClass} מקומות פנויים מתוך {selectedFlight.numOfSeetsInRegilerClass}</span>
                                        </div>
                                        <div className="seat-selector">
                                            <label>בחר מספר מקומות:</label>
                                            <div className="seat-controls">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setRegularClassSeats(Math.max(0, regularClassSeats - 1));
                                                    }}
                                                    disabled={regularClassSeats <= 0}
                                                    className="seat-button"
                                                >
                                                    <span className="material-icons">remove</span>
                                                </button>
                                                <span className="seat-count">{regularClassSeats}</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setRegularClassSeats(Math.min(selectedFlight.numOfEmptySeetsInRegilerClass, regularClassSeats + 1));
                                                    }}
                                                    disabled={regularClassSeats >= selectedFlight.numOfEmptySeetsInRegilerClass}
                                                    className="seat-button"
                                                >
                                                    <span className="material-icons">add</span>
                                                </button>
                                            </div>
                                        </div>
                                        {regularClassSeats > 0 && (
                                            <div className="subtotal">
                                                סה"כ: {regularClassSeats * selectedFlight.priceOfRegilerClass}₪
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {(firstClassSeats > 0 || regularClassSeats > 0) && (
                                    <div className="order-summary">
                                        <div className="summary-title">סיכום הזמנה</div>
                                        <div className="summary-details">
                                            {firstClassSeats > 0 && (
                                                <div className="summary-item">
                                                    <span>מחלקה ראשונה:</span>
                                                    <span>{firstClassSeats} × {selectedFlight.priceOfFirstClass}₪ = {firstClassSeats * selectedFlight.priceOfFirstClass}₪</span>
                                                </div>
                                            )}
                                            {regularClassSeats > 0 && (
                                                <div className="summary-item">
                                                    <span>מחלקה רגילה:</span>
                                                    <span>{regularClassSeats} × {selectedFlight.priceOfRegilerClass}₪ = {regularClassSeats * selectedFlight.priceOfRegilerClass}₪</span>
                                                </div>
                                            )}
                                            <div className="summary-total">
                                                <span>סה"כ לתשלום:</span>
                                                <span>{calculateTotal()}₪</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                className="booking-button"
                                onClick={handleBooking}
                                disabled={firstClassSeats === 0 && regularClassSeats === 0}
                            >
                                <span className="material-icons">confirmation_number</span>
                                <span>להזמנת כרטיס בטיסה זו</span>
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="no-flights">
                    <span className="material-icons">flight_off</span>
                    <p>לא נמצאו טיסות התואמות את החיפוש</p>
                    <button className="reset-search" onClick={() => {
                        setSearchTerm("");
                        setFilterDestination("");
                        setFilterProvenance("");
                    }}>
                        <span className="material-icons">refresh</span>
                        <span>נקה חיפוש</span>
                    </button>
                </div>
            )}

            {/* חלונית תשלום */}
            {showPaymentModal && (
                <div className="modal-overlay">
                    <div className="payment-modal">
                        <div className="modal-header">
                            <h3>תשלום עבור הזמנת טיסה</h3>
                            <button className="close-button" onClick={() => setShowPaymentModal(false)}>
                                <span className="material-icons">close</span>
                            </button>
                        </div>

                        <div className="payment-details">
                            <div className="flight-summary">
                                <h4>פרטי הטיסה</h4>
                                <div className="flight-card">
                                    <div className="flight-card-header">
                                        <div className="company-logo-small">
                                            <span>{selectedFlight.companyName}</span>
                                        </div>
                                        <div className="flight-number-small">
                                            <span>טיסה #{selectedFlight.numOfFlight}</span>
                                        </div>
                                    </div>

                                    <div className="flight-route-visual">
                                        <div className="departure-point">
                                            <div className="city-code">{selectedFlight.provenance}</div>
                                            <div className="time">{selectedFlight.timeOfDepart}</div>
                                        </div>
                                        <div className="route-line">
                                            <div className="plane-icon">
                                                <span className="material-icons">flight</span>
                                            </div>
                                            <div className="line"></div>
                                            {selectedFlight.stop !== "" && (
                                                <div className="stopover">
                                                    <div className="stop-dot"></div>
                                                    <div className="stop-name-small">{selectedFlight.stop}</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="arrival-point">
                                            <div className="city-code">{selectedFlight.destination}</div>
                                            <div className="time">{selectedFlight.timeOfLending}</div>
                                        </div>
                                    </div>

                                    <div className="flight-date">
                                        <span className="material-icons">event</span>
                                        <span>{formatDate(selectedFlight.date)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="order-summary-modal">
                                <h4>סיכום הזמנה</h4>
                                <div className="summary-items">
                                    {firstClassSeats > 0 && (
                                        <div className="summary-item">
                                            <div className="item-label">
                                                <span className="material-icons">airline_seat_legroom_extra</span>
                                                <span>מחלקה ראשונה:</span>
                                            </div>
                                            <div className="item-value">
                                                {firstClassSeats} כרטיסים × {selectedFlight.priceOfFirstClass}₪ = {firstClassSeats * selectedFlight.priceOfFirstClass}₪
                                            </div>
                                        </div>
                                    )}
                                    {regularClassSeats > 0 && (
                                        <div className="summary-item">
                                            <div className="item-label">
                                                <span className="material-icons">airline_seat_recline_normal</span>
                                                <span>מחלקה רגילה:</span>
                                            </div>
                                            <div className="item-value">
                                                {regularClassSeats} כרטיסים × {selectedFlight.priceOfRegilerClass}₪ = {regularClassSeats * selectedFlight.priceOfRegilerClass}₪
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="summary-total-modal">
                                    <span>סה"כ לתשלום:</span>
                                    <span className="total-price">{calculateTotal()}₪</span>
                                </div>
                            </div>

                            <div className="payment-form">
                                <h4>פרטי תשלום</h4>
                                <div className="form-group">
                                    <label>מספר כרטיס אשראי:</label>
                                    <div className="card-input-container">
                                        <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" />
                                        <span className="material-icons card-icon">credit_card</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>תוקף:</label>
                                        <input type="text" placeholder="MM/YY" />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV:</label>
                                        <div className="cvv-input-container">
                                            <input type="text" placeholder="XXX" />
                                            <span className="material-icons cvv-icon">lock</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>שם בעל הכרטיס:</label>
                                    <input type="text" placeholder="שם מלא כפי שמופיע על הכרטיס" />
                                </div>
                                <div className="form-group">
                                    <label>מספר תעודת זהות:</label>
                                    <input type="text" placeholder="מספר ת.ז." />
                                </div>

                                <div className="secure-payment-notice">
                                    <span className="material-icons">security</span>
                                    <span>התשלום מאובטח ומוצפן בתקן SSL</span>
                                </div>
                            </div>
                        </div>

                        <div className="payment-actions">
                            <button className="cancel-button" onClick={() => setShowPaymentModal(false)}>
                                <span className="material-icons">cancel</span>
                                <span>ביטול</span>
                            </button>
                            <button className="confirm-button" onClick={handlePaymentComplete}>
                                <span className="material-icons">payment</span>
                                <span>אישור תשלום</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* הודעת אישור הזמנה */}
            {showConfirmation && (
                <div className="modal-overlay">
                    <div className="confirmation-modal">
                        <div className="confirmation-header">
                            <div className="confirmation-icon">
                                <span className="material-icons">check_circle</span>
                            </div>
                            <h2>ההזמנה בוצעה בהצלחה!</h2>
                        </div>

                        <div className="confirmation-details">
                            <p className="confirmation-greeting">תודה שבחרת לטוס איתנו, {passenger.firstName} {passenger.lastName}!</p>

                            <div className="e-ticket">
                                <div className="e-ticket-header">
                                    <div className="e-ticket-title">כרטיס אלקטרוני</div>
                                    <div className="e-ticket-logo">
                                        <span>{selectedFlight.companyName}</span>
                                    </div>
                                </div>

                                <div className="e-ticket-body">
                                    <div className="e-ticket-flight-info">
                                        <div className="e-ticket-flight-number">
                                            <span className="label">מספר טיסה:</span>
                                            <span className="value">{selectedFlight.numOfFlight}</span>
                                        </div>

                                        <div className="e-ticket-route">
                                            <div className="departure">
                                                <div className="city-code">{selectedFlight.provenance}</div>
                                                <div className="time">{selectedFlight.timeOfDepart}</div>
                                            </div>
                                            <div className="route-line">
                                                <div className="plane-icon">
                                                    <span className="material-icons">flight</span>
                                                </div>
                                                <div className="line"></div>
                                            </div>
                                            <div className="arrival">
                                                <div className="city-code">{selectedFlight.destination}</div>
                                                <div className="time">{selectedFlight.timeOfLending}</div>
                                            </div>
                                        </div>

                                        <div className="e-ticket-details">
                                            <div className="detail-column">
                                                <div className="detail-item">
                                                    <span className="label">תאריך:</span>
                                                    <span className="value">{formatDate(selectedFlight.date)}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="label">נוסע:</span>
                                                    <span className="value">{passenger.firstName} {passenger.lastName}</span>
                                                </div>
                                            </div>
                                            <div className="detail-column">
                                                <div className="detail-item">
                                                    <span className="label">מחלקה ראשונה:</span>
                                                    <span className="value">{firstClassSeats} כרטיסים</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="label">מחלקה רגילה:</span>
                                                    <span className="value">{regularClassSeats} כרטיסים</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="barcode-section">
                                            <div className="barcode"></div>
                                            <div className="booking-reference">
                                                קוד הזמנה: {Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="e-ticket-footer">
                                    <div className="boarding-info">
                                        <span className="material-icons">info</span>
                                        <span>נא להגיע לשדה התעופה כשעתיים לפני מועד ההראה ({selectedFlight.timeOfDepart})</span>
                                    </div>
                                </div>
                            </div>

                            <div className="confirmation-instructions">
                                <h4>מה עכשיו?</h4>
                                <ul className="instructions-list">
                                    <li>
                                        <span className="material-icons">email</span>
                                        <span>פרטי ההזמנה נשלחו לכתובת האימייל שלך</span>
                                    </li>
                                    <li>
                                        <span className="material-icons">print</span>
                                        <span>ניתן להדפיס את הכרטיס או להציגו בטלפון הנייד</span>
                                    </li>
                                    <li>
                                        <span className="material-icons">schedule</span>
                                        <span>מומלץ לבדוק את זמני הטיסה לפני ההגעה לשדה התעופה</span>
                                    </li>
                                    <li>
                                        <span className="material-icons">luggage</span>
                                        <span>זכור להביא תעודה מזהה ולבדוק את מגבלות המטען</span>
                                    </li>
                                </ul>
                            </div>

                            <p className="confirmation-message">נסיעה טובה ובטוחה!</p>
                        </div>

                        <div className="confirmation-actions">
                            <button className="close-confirmation" onClick={() => setShowConfirmation(false)}>
                                <span className="material-icons">close</span>
                                <span>סגור</span>
                            </button>
                            <button className="view-orders-button" onClick={() => navigate('/getMyOrders')}>
                                <span className="material-icons">receipt_long</span>
                                <span>צפה בהזמנות שלי</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

