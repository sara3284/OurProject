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
        orderdetails: [{ 
            orderCode: 0,
            NumOfTicketsForFirstClass: 0,
            NumOfTicketsForRegilerClass: 0 
        }]
    });

    useEffect(() => {
        setIsLoading(true);
        dispatch(getFlightsThank()).then(() => {
            setIsLoading(false);
        });
    }, []);

    const handleFlightSelect = (flight) => {
        // אם התאריך עבר, לא נאפשר בחירה
        if (isFlightDatePassed(flight.date)) {
            return;
        }
        setSelectedFlight(flight.numOfFlight === selectedFlight?.numOfFlight ? null : flight);
    };
    

    const handleBooking = () => {
        // Check if any seats are selected
        if (firstClassSeats === 0 && regularClassSeats === 0) {
            alert("נא לבחור לפחות מקום אחד");
            return;
        }

        // יצירת אובייקט ההזמנה החדש
        const newOrder = {
            code: 0,
            numOfFlight: selectedFlight.numOfFlight,
            passengerId: passenger.id,
            date: new Date().toISOString().slice(0, 10),
            orderdetails: [{
                orderCode: 0,
                NumOfTicketsForFirstClass: firstClassSeats,
                NumOfTicketsForRegilerClass: regularClassSeats
            }]
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
        
        // איפוס הבחירות לאחר 5 שניות
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

    // רשימת יעדים ייחודיים לסינון
    const uniqueDestinations = [...new Set(flights?.map(flight => flight.destination) || [])];
    const uniqueProvenances = [...new Set(flights?.map(flight => flight.provenance) || [])];

    return (
        <div className="flights-container">
            <div className="airplane-animation"></div>

            {passenger.id === "328489976" && <Manager />}

            <div className="flights-header">
                <h1>טיסות זמינות</h1>
                <p>בחר טיסה מהרשימה להזמנת כרטיס</p>
            </div>

            <div className="search-filters">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="חיפוש טיסה לפי יעד, מוצא או חברה..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="material-icons">search</i>
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

            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>טוען טיסות...</p>
                </div>
            ) : filteredFlights?.length > 0 ? (
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
            className={`${selectedFlight?.numOfFlight === flight.numOfFlight ? 'selected-row' : ''} ${isPassed ? 'passed-flight' : ''}`}
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
                    <span className="direct-flight">✓ ישיר</span>
                ) : (
                    <span className="stop-flight">
                        <span className="stop-icon">✗</span>
                        <span className="stop-name">{flight.stop}</span>
                    </span>
                )}
            </td>
            {isPassed && (
                <td className="passed-flight-indicator">
                    <span>טיסה עברה</span>
                </td>
            )}
        </tr>
    );
})}

                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="no-flights">
                    <i className="material-icons">flight_off</i>
                    <p>לא נמצאו טיסות התואמות את החיפוש</p>
                </div>
            )}

            {selectedFlight && (
                <div className="selected-flight-details">
                    <div className="details-header">
                        <h3>פרטי הטיסה הנבחרת</h3>
                        <div className="flight-route">
                            <span className="city">{selectedFlight.provenance}</span>
                            <span className="flight-icon">
                                <i className="material-icons">flight</i>
                            </span>
                            <span className="city">{selectedFlight.destination}</span>
                        </div>
                    </div>

                    <div className="details-content">
                        <div className="detail-item">
                            <span className="label">מספר טיסה:</span>
                            <span className="value">{selectedFlight.numOfFlight}</span>
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

                        <div className="class-options">
                            <div className="class-option first-class">
                                <h4>מחלקה ראשונה</h4>
                                <div className="price">{selectedFlight.priceOfFirstClass}₪</div>
                                <div className="seats-available">
                                    {selectedFlight.numOfEmptySeetsInFirstClass} מקומות פנויים מתוך {selectedFlight.numOfSeetsInFirstClass}
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
                                        >-</button>
                                        <span>{firstClassSeats}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFirstClassSeats(Math.min(selectedFlight.numOfEmptySeetsInFirstClass, firstClassSeats + 1));
                                            }}
                                            disabled={firstClassSeats >= selectedFlight.numOfEmptySeetsInFirstClass}
                                        >+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="class-option regular-class">
                                <h4>מחלקה רגילה</h4>
                                <div className="price">{selectedFlight.priceOfRegilerClass}₪</div>
                                <div className="seats-available">
                                    {selectedFlight.numOfEmptySeetsInRegilerClass} מקומות פנויים מתוך {selectedFlight.numOfSeetsInRegilerClass}
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
                                        >-</button>
                                        <span>{regularClassSeats}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setRegularClassSeats(Math.min(selectedFlight.numOfEmptySeetsInRegilerClass, regularClassSeats + 1));
                                            }}
                                            disabled={regularClassSeats >= selectedFlight.numOfEmptySeetsInRegilerClass}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="booking-button" onClick={handleBooking}>
                        <i className="material-icons">confirmation_number</i>
                        <span>להזמנת כרטיס בטיסה זו</span>
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
                                <i className="material-icons">close</i>
                            </button>
                        </div>
                        
                        <div className="payment-details">
                            <div className="flight-summary">
                                <h4>פרטי הטיסה</h4>
                                <div className="summary-item">
                                    <span>מספר טיסה:</span>
                                    <span>{selectedFlight.numOfFlight}</span>
                                </div>
                                <div className="summary-item">
                                    <span>מסלול:</span>
                                    <span>{selectedFlight.provenance} - {selectedFlight.destination}</span>
                                </div>
                                <div className="summary-item">
                                    <span>תאריך:</span>
                                    <span>{formatDate(selectedFlight.date)}</span>
                                </div>
                                <div className="summary-item">
                                    <span>שעה:</span>
                                    <span>{selectedFlight.timeOfDepart}</span>
                                </div>
                            </div>
                            
                            <div className="order-summary">
                                <h4>סיכום הזמנה</h4>
                                {firstClassSeats > 0 && (
                                    <div className="summary-item">
                                        <span>מחלקה ראשונה:</span>
                                        <span>{firstClassSeats} כרטיסים × {selectedFlight.priceOfFirstClass}₪ = {firstClassSeats * selectedFlight.priceOfFirstClass}₪</span>
                                    </div>
                                )}
                                {regularClassSeats > 0 && (
                                    <div className="summary-item">
                                        <span>מחלקה רגילה:</span>
                                        <span>{regularClassSeats} כרטיסים × {selectedFlight.priceOfRegilerClass}₪ = {regularClassSeats * selectedFlight.priceOfRegilerClass}₪</span>
                                    </div>
                                )}
                                <div className="summary-total">
                                    <span>סה"כ לתשלום:</span>
                                    <span>{(firstClassSeats * selectedFlight.priceOfFirstClass) + (regularClassSeats * selectedFlight.priceOfRegilerClass)}₪</span>
                                </div>
                            </div>
                            
                            <div className="payment-form">
                                <h4>פרטי תשלום</h4>
                                <div className="form-group">
                                    <label>מספר כרטיס אשראי:</label>
                                    <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>תוקף:</label>
                                        <input type="text" placeholder="MM/YY" />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV:</label>
                                        <input type="text" placeholder="XXX" />
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
                            </div>
                        </div>
                        
                        <div className="payment-actions">
                            <button className="cancel-button" onClick={() => setShowPaymentModal(false)}>ביטול</button>
                            <button className="confirm-button" onClick={handlePaymentComplete}>
                                <i className="material-icons">payment</i>
                                אישור תשלום
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* הודעת אישור הזמנה */}
            {showConfirmation && (
                <div className="modal-overlay">
                    <div className="confirmation-modal">
                        <div className="confirmation-icon">
                            <i className="material-icons">check_circle</i>
                        </div>
                        <h2>ההזמנה בוצעה בהצלחה!</h2>
                        <div className="confirmation-details">
                            <p>תודה שבחרת לטוס איתנו, {passenger.firstName} {passenger.lastName}!</p>
                            <p>הזמנתך לטיסה מספר <strong>{selectedFlight.numOfFlight}</strong> מ<strong>{selectedFlight.provenance}</strong> ל<strong>{selectedFlight.destination}</strong> התקבלה.</p>
                            <p>אנו מצפים לראותך בשדה התעופה בתאריך <strong>{formatDate(selectedFlight.date)}</strong>.</p>
                            <p>נא להגיע לשדה התעופה כשעתיים לפני מועד ההמראה ({selectedFlight.timeOfDepart}).</p>
                            
                            <div className="ticket-summary">
                                <div className="ticket-header">
                                    <div className="company-logo">
                                        <span>{selectedFlight.companyName}</span>
                                    </div>
                                    <div className="flight-number">
                                        <span>טיסה #{selectedFlight.numOfFlight}</span>
                                    </div>
                                </div>
                                
                                <div className="ticket-route">
                                    <div className="departure">
                                        <div className="city-code">{selectedFlight.provenance}</div>
                                        <div className="time">{selectedFlight.timeOfDepart}</div>
                                    </div>
                                    <div className="route-line">
                                        <i className="material-icons">flight</i>
                                    </div>
                                    <div className="arrival">
                                        <div className="city-code">{selectedFlight.destination}</div>
                                        <div className="time">{selectedFlight.timeOfLending}</div>
                                    </div>
                                </div>
                                
                                <div className="ticket-details">
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
                            </div>
                            
                            <p className="confirmation-message">פרטי ההזמנה נשלחו לכתובת האימייל שלך.</p>
                            <p className="confirmation-message">נסיעה טובה ובטוחה!</p>
                        </div>
                        <button className="close-confirmation" onClick={() => setShowConfirmation(false)}>
                            סגור
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
