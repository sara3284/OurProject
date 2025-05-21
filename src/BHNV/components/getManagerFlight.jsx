import { useSelector, useDispatch } from "react-redux";
import { getThank } from "../slices/getThank";
import { getByCompanyThank } from "../slices/getByCompanyThank";
import { useState, useEffect } from "react";
import { getFlightsThank } from "../slices/getFlightsThank";
import { Manager } from "./manager";
import { useNavigate } from "react-router-dom";
import '../css/getFlights.css';
import { getOrders_Flights } from "../slices/getOrders_Flights";
import { GetOrders } from "./getOrders";
import { getOrdersThank } from "../slices/getOrdersThank";
import { GetPassengersThank } from "../slices/getPassengersThank";
import { addFlightThank } from "../slices/addFlightThank";

export const GetManagerFlights = () => {
    const passenger = useSelector(state => state.event.passenger);
    const flights = useSelector(state => state.event.flights);
    const orders = useSelector(state => state.event.orders);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [company, setCompany] = useState("");
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDestination, setFilterDestination] = useState("");
    const [filterProvenance, setFilterProvenance] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [flightOrders, setFlightOrders] = useState([]);
    const [showPassedFlights, setShowPassedFlights] = useState(false);
    const [selectedPassenger, setSelectedPassenger] = useState(null);
    const [showAddFlightModal, setShowAddFlightModal] = useState(false);
    const [newFlight, setNewFlight] = useState({
        numOfFlight: "",
        companyCode: "",
        companyName: "",
        date: "",
        timeOfDepart: "",
        timeOfLending: "",
        destination: "",
        provenance: "",
        priceOfFirstClass: 0,
        priceOfRegilerClass: 0,
        numOfSeetsInFirstClass: 0,
        numOfSeetsInRegilerClass: 0,
        isDirect: true,
        stop: "",
        numOfEmptySeetsInFirstClass: 0,
        numOfEmptySeetsInRegilerClass: 0
    });
    const [companies, setCompanies] = useState([
        { companyCode: 1, companyName: "אל על" },
        { companyCode: 2, companyName: "ישראייר" },
        { companyCode: 8, companyName: "אמריקן איירליינס" },
        { companyCode: 4, companyName: "טורקיש איירליינס" },
        { companyCode: 5, companyName: "לופטהנזה" },
        { companyCode: 6, companyName: "בריטיש איירווייס" },
        { companyCode: 7, companyName: "איירפראנס" },
        { companyCode: 3, companyName: "Delta" }
    ]);

    useEffect(() => {
        setIsLoading(true);
        // ביצוע בקשות ברצף במקום במקביל
        dispatch(getFlightsThank())
            .then(() => dispatch(getOrdersThank()))
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleFlightSelect = (flight) => {
        setSelectedFlight(flight.numOfFlight === selectedFlight?.numOfFlight ? null : flight);

        // אם נבחרה טיסה, מצא את כל ההזמנות עבורה
        if (flight.numOfFlight !== selectedFlight?.numOfFlight) {
            const relevantOrders = orders.filter(order => order.numOfFlight === flight.numOfFlight);
            console.log("Order structure:", relevantOrders[0]); // הדפסת המבנה של הזמנה לקונסול
            if (relevantOrders[0]) {
                console.log("OrderDetails structure:", relevantOrders[0].orderdetails); // הדפסת המבנה של פרטי ההזמנה
            }
            setFlightOrders(relevantOrders);
        } else {
            setFlightOrders([]);
        }
    };

    const closePassengerModal = () => {
        setSelectedPassenger(null);
    };

    const handlePassengerClick = (passengerId) => {
        // חיפוש הנוסע לפי תעודת זהות
        dispatch(GetPassengersThank(passengerId));
        const passengerData = passenger.find(passenger => passenger.id === passengerId)
        setSelectedPassenger(passengerData);
    };
    
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
        const matchesPassedFilter = showPassedFlights || !isFlightDatePassed(flight.date);

        return matchesSearch && matchesDestination && matchesProvenance && matchesPassedFilter;
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

    // פונקציה לאיפוס טופס הטיסה الجديدة
    const resetNewFlightForm = () => {
        setNewFlight({
            numOfFlight: "",
            companyCode: "",
            companyName: "",
            date: "",
            timeOfDepart: "",
            timeOfLending: "",
            destination: "",
            provenance: "",
            priceOfFirstClass: "",
            priceOfRegilerClass: "",
            numOfSeetsInFirstClass: "",
            numOfSeetsInRegilerClass: "",
            isDirect: true,
            stop: "",
            numOfEmptySeetsInFirstClass: "",
            numOfEmptySeetsInRegilerClass: ""
        });
    };

    // פונקציה להוספת טיסה חדשה
    const handleAddFlight = () => {
        // בדיקת תקינות הנתונים
        if (!newFlight.numOfFlight || !newFlight.companyCode || !newFlight.companyName || 
            !newFlight.date || !newFlight.timeOfDepart || !newFlight.timeOfLending || 
            !newFlight.destination || !newFlight.provenance || !newFlight.priceOfFirstClass || 
            !newFlight.priceOfRegilerClass || !newFlight.numOfSeetsInFirstClass || 
            !newFlight.numOfSeetsInRegilerClass) {
            alert("נא למלא את כל השדות החובה");
            return;
        }

        // בדיקה שהתאריך עתידי
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const flightDate = new Date(newFlight.date);
        if (flightDate < today) {
            alert("לא ניתן להוסיף טיסה בתאריך שעבר");
            return;
        }

        // בדיקה שהוזנה תחנת ביניים אם הטיסה אינה ישירה
        if (!newFlight.isDirect && !newFlight.stop) {
            alert("נא להזין תחנת ביניים עבור טיסה שאינה ישירה");
            return;
        }

        // המרת ערכים למספרים
        const flightToAdd = {
            ...newFlight,
            numOfFlight: parseInt(newFlight.numOfFlight),
            companyCode: parseInt(newFlight.companyCode),
            priceOfFirstClass: parseInt(newFlight.priceOfFirstClass),
            priceOfRegilerClass: parseInt(newFlight.priceOfRegilerClass),
            numOfSeetsInFirstClass: parseInt(newFlight.numOfSeetsInFirstClass),
            numOfSeetsInRegilerClass: parseInt(newFlight.numOfSeetsInRegilerClass),
            numOfEmptySeetsInFirstClass: parseInt(newFlight.numOfSeetsInFirstClass),
            numOfEmptySeetsInRegilerClass: parseInt(newFlight.numOfSeetsInRegilerClass)
        };

        // לצורך הדגמה בלבד - יש להחליף בקוד אמיתי
        dispatch(addFlightThank(flightToAdd));
        setShowAddFlightModal(false);
        resetNewFlightForm();
    };

    return (
        <div className="flights-container">
            <div className="airplane-animation"></div>
            {passenger.id === "328489976" && (
                <>
                
                    <Manager />
                    
                </>
            )}
            <div className="flights-header">
                <h1>טיסות זמינות</h1>
                <p>צפייה בטיסות והזמנות</p>
            </div>
            <button 
                        className="add-flight-button" 
                        onClick={() => {
                            resetNewFlightForm();
                            setShowAddFlightModal(true);
                        }}
                    >
                        <i className="material-icons">add_circle</i>
                        <span>הוספת טיסה חדשה</span>
                    </button>
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
                    <div className="filter-checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={showPassedFlights}
                                onChange={(e) => setShowPassedFlights(e.target.checked)}
                            />
                            הצג גם טיסות שעברו
                        </label>
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
                                <th>סטטוס</th>
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
                                        <td>
                                            {isPassed ? (
                                                <span className="status-passed">טיסה עברה</span>
                                            ) : (
                                                <span className="status-active">פעילה</span>
                                            )}
                                        </td>
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
                        <div className="detail-item">
                            <span className="label">מחיר מחלקה ראשונה:</span>
                            <span className="value">{selectedFlight.priceOfFirstClass}₪</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">מחיר מחלקה רגילה:</span>
                            <span className="value">{selectedFlight.priceOfRegilerClass}₪</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">מקומות פנויים במחלקה ראשונה:</span>
                            <span className="value">{selectedFlight.numOfEmptySeetsInFirstClass} מתוך {selectedFlight.numOfSeetsInFirstClass}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">מקומות פנויים במחלקה רגילה:</span>
                            <span className="value">{selectedFlight.numOfEmptySeetsInRegilerClass} מתוך {selectedFlight.numOfSeetsInRegilerClass}</span>
                        </div>

                        {/* הצגת ההזמנות לטיסה זו */}
                        <div className="flight-orders">
                            <h4>הזמנות לטיסה זו</h4>
                            {flightOrders.length > 0 ? (
                                <div className="orders-table-container">
                                    <table className="orders-table">
                                        <thead>
                                            <tr>
                                                <th>קוד הזמנה</th>
                                                <th>מזהה נוסע</th>
                                                <th>תאריך הזמנה</th>
                                                <th>כרטיסים במחלקה ראשונה</th>
                                                <th>כרטיסים במחלקה רגילה</th>
                                                <th>סה"כ מחיר</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {flightOrders.map((order) => (
                                                <tr key={order.code}>
                                                    <td>{order.code}</td>
                                                    <td
                                                        className="passenger-id-cell"
                                                        onClick={() => handlePassengerClick(order.passengerId)}
                                                        title="לחץ לצפייה בפרטי הנוסע"
                                                    >
                                                        {order.passengerId}
                                                    </td>
                                                    <td>{formatDate(order.date)}</td>
                                                    <td>{order.orderdetails?.numOfTicketsForFirstClass || 0}</td>
                                                    <td>{order.orderdetails?.numOfTicketsForRegilerClass || 0}</td>
                                                    <td>
                                                        {((order.orderdetails?.numOfTicketsForFirstClass || 0) * selectedFlight.priceOfFirstClass) +
                                                            ((order.orderdetails?.numOfTicketsForRegilerClass || 0) * selectedFlight.priceOfRegilerClass)}₪
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="no-orders-message">אין הזמנות לטיסה זו</p>
                            )}
                        </div>

                        {/* סיכום הכנסות לטיסה */}
                        {flightOrders.length > 0 && (
                            <div className="flight-revenue-summary">
                                <h4>סיכום הכנסות לטיסה</h4>
                                <div className="revenue-details">
                                    <div className="revenue-item">
                                        <span className="label">סה"כ כרטיסים במחלקה ראשונה:</span>
                                        <span className="value">
                                            {flightOrders.reduce((total, order) =>
                                                total + (order.orderdetails?.numOfTicketsForFirstClass || 0), 0)}
                                        </span>
                                    </div>
                                    <div className="revenue-item">
                                        <span className="label">סה"כ כרטיסים במחלקה רגילה:</span>
                                        <span className="value">
                                            {flightOrders.reduce((total, order) =>
                                                total + (order.orderdetails?.numOfTicketsForRegilerClass || 0), 0)}
                                        </span>
                                    </div>
                                    <div className="revenue-item total">
                                        <span className="label">סה"כ הכנסות:</span>
                                        <span className="value">
                                            {flightOrders.reduce((total, order) =>
                                                total +
                                                ((order.orderdetails?.numOfTicketsForFirstClass || 0) * selectedFlight.priceOfFirstClass) +
                                                ((order.orderdetails?.numOfTicketsForRegilerClass || 0) * selectedFlight.priceOfRegilerClass), 0)}₪
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* תפוסת הטיסה */}
                        <div className="flight-occupancy">
                            <h4>תפוסת הטיסה</h4>
                            <div className="occupancy-bars">
                                <div className="occupancy-bar first-class">
                                    <div className="bar-label">מחלקה ראשונה</div>
                                    <div className="bar-container">
                                        <div
                                            className="bar-fill"
                                            style={{
                                                width: `${100 - (selectedFlight.numOfEmptySeetsInFirstClass / selectedFlight.numOfSeetsInFirstClass * 100)}%`
                                            }}
                                        ></div>
                                    </div>
                                    <div className="bar-percentage">
                                        {Math.round(100 - (selectedFlight.numOfEmptySeetsInFirstClass / selectedFlight.numOfSeetsInFirstClass * 100))}% תפוסה
                                    </div>
                                </div>
                                <div className="occupancy-bar regular-class">
                                    <div className="bar-label">מחלקה רגילה</div>
                                    <div className="bar-container">
                                        <div
                                            className="bar-fill"
                                            style={{
                                                width: `${100 - (selectedFlight.numOfEmptySeetsInRegilerClass / selectedFlight.numOfSeetsInRegilerClass * 100)}%`
                                            }}
                                        ></div>
                                    </div>
                                    <div className="bar-percentage">
                                        {Math.round(100 - (selectedFlight.numOfEmptySeetsInRegilerClass / selectedFlight.numOfSeetsInRegilerClass * 100))}% תפוסה
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedPassenger && (
                <div className="modal-overlay">
                    <div className="passenger-details-modal">
                        <div className="modal-header">
                            <h3>פרטי נוסע</h3>
                            <button className="close-button" onClick={closePassengerModal}>
                                <i className="material-icons">close</i>
                            </button>
                        </div>

                        <div className="passenger-info">
                            <div className="passenger-avatar">
                                <i className="material-icons">person</i>
                                <div className="passenger-id">{selectedPassenger.id}</div>
                            </div>

                            <div className="passenger-details-grid">
                                <div className="detail-group">
                                    <div className="detail-label">שם מלא</div>
                                    <div className="detail-value">
                                        {selectedPassenger.firstName} {selectedPassenger.lastName || selectedPassenger.name}
                                    </div>
                                </div>

                                {selectedPassenger.birthDate && (
                                    <div className="detail-group">
                                        <div className="detail-label">תאריך לידה</div>
                                        <div className="detail-value">{formatDate(selectedPassenger.birthDate)}</div>
                                    </div>
                                )}

                                {selectedPassenger.age !== undefined && (
                                    <div className="detail-group">
                                        <div className="detail-label">גיל</div>
                                        <div className="detail-value">{selectedPassenger.age}</div>
                                    </div>
                                )}

                                {selectedPassenger.phone && (
                                    <div className="detail-group">
                                        <div className="detail-label">טלפון</div>
                                        <div className="detail-value">{selectedPassenger.phone}</div>
                                    </div>
                                )}

                                {selectedPassenger.city && (
                                    <div className="detail-group">
                                        <div className="detail-label">עיר</div>
                                        <div className="detail-value">{selectedPassenger.city}</div>
                                    </div>
                                )}

                                {selectedPassenger.email && (
                                    <div className="detail-group">
                                        <div className="detail-label">דוא"ל</div>
                                        <div className="detail-value">{selectedPassenger.email}</div>
                                    </div>
                                )}

                                {selectedPassenger.address && (
                                    <div className="detail-group">
                                        <div className="detail-label">כתובת</div>
                                        <div className="detail-value">{selectedPassenger.address}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="close-modal-button" onClick={closePassengerModal}>סגור</button>
                        </div>
                    </div>
                </div>
            )}

            {/* חלונית הוספת טיסה חדשה */}
            {showAddFlightModal && (
                <div className="modal-overlay">
                    <div className="add-flight-modal">
                        <div className="modal-header">
                            <h3>הוספת טיסה חדשה</h3>
                            <button 
                                className="close-button" 
                                onClick={() => {
                                    setShowAddFlightModal(false);
                                    resetNewFlightForm();
                                }}
                            >
                                <i className="material-icons">close</i>
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>מספר טיסה:</label>
                                    <input 
                                        type="text" 
                                        value={newFlight.numOfFlight} 
                                        onChange={(e) => setNewFlight({...newFlight, numOfFlight: e.target.value})}
                                        placeholder="הזן מספר טיסה"
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>חברת תעופה:</label>
                                    <select 
                                        value={newFlight.companyCode} 
                                        onChange={(e) => {
                                            const selectedCompany = companies.find(c => c.companyCode === parseInt(e.target.value));
                                            setNewFlight({
                                                ...newFlight, 
                                                companyCode: e.target.value,
                                                companyName: selectedCompany ? selectedCompany.companyName : ""
                                            });
                                        }}
                                    >
                                        <option value="">בחר חברת תעופה</option>
                                        {companies.map(company => (
                                            <option key={company.companyCode} value={company.companyCode}>
                                                {company.companyName} ({company.companyCode})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>תאריך:</label>
                                    <input 
                                        type="string" 
                                        value={newFlight.date instanceof Date ? newFlight.date.toISOString().split('T')[0] : ''}
                                        onChange={(e) => setNewFlight({...newFlight, date: new Date(e.target.value)})}
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>שעת המראה:</label>
                                    <input 
                                        type="time" 
                                        value={newFlight.timeOfDepart} 
                                        onChange={(e) => setNewFlight({...newFlight, timeOfDepart: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>שעת נחיתה:</label>
                                    <input 
                                        type="time" 
                                        value={newFlight.timeOfLending} 
                                        onChange={(e) => setNewFlight({...newFlight, timeOfLending: e.target.value})}
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>מוצא:</label>
                                    <input 
                                        type="text" 
                                        value={newFlight.provenance} 
                                        onChange={(e) => setNewFlight({...newFlight, provenance: e.target.value})}
                                        placeholder="הזן מוצא"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>יעד:</label>
                                    <input 
                                        type="text" 
                                        value={newFlight.destination} 
                                        onChange={(e) => setNewFlight({...newFlight, destination: e.target.value})}
                                        placeholder="הזן יעד"
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>מחיר מחלקה ראשונה:</label>
                                    <input 
                                        type="number" 
                                        value={newFlight.priceOfFirstClass} 
                                        onChange={(e) => setNewFlight({...newFlight, priceOfFirstClass: e.target.value})}
                                        placeholder="הזן מחיר"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>מחיר מחלקה רגילה:</label>
                                    <input 
                                        type="number" 
                                        value={newFlight.priceOfRegilerClass} 
                                        onChange={(e) => setNewFlight({...newFlight, priceOfRegilerClass: e.target.value})}
                                        placeholder="הזן מחיר"
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>מספר מושבים במחלקה ראשונה:</label>
                                    <input 
                                        type="number" 
                                        value={newFlight.numOfSeetsInFirstClass} 
                                        onChange={(e) => setNewFlight({
                                            ...newFlight, 
                                            numOfSeetsInFirstClass: e.target.value,
                                            numOfEmptySeetsInFirstClass: e.target.value
                                        })}
                                        placeholder="הזן מספר מושבים"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>מספר מושבים במחלקה רגילה:</label>
                                    <input 
                                        type="number" 
                                        value={newFlight.numOfSeetsInRegilerClass} 
                                        onChange={(e) => setNewFlight({
                                            ...newFlight, 
                                            numOfSeetsInRegilerClass: e.target.value,
                                            numOfEmptySeetsInRegilerClass: e.target.value
                                        })}
                                        placeholder="הזן מספר מושבים"
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>טיסה ישירה:</label>
                                    <select 
                                        value={newFlight.isDirect.toString()} 
                                        onChange={(e) => setNewFlight({
                                            ...newFlight, 
                                            isDirect: e.target.value === "true",
                                            stop: e.target.value === "true" ? "" : newFlight.stop
                                        })}
                                    >
                                        <option value="true">כן</option>
                                        <option value="false">לא</option>
                                    </select>
                                </div>
                                
                                {!newFlight.isDirect && (
                                    <div className="form-group">
                                        <label>תחנת ביניים:</label>
                                        <input 
                                            type="text" 
                                            value={newFlight.stop} 
                                            onChange={(e) => setNewFlight({...newFlight, stop: e.target.value})}
                                            placeholder="הזן תחנת ביניים"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button 
                                className="cancel-button" 
                                onClick={() => {
                                    setShowAddFlightModal(false);
                                    resetNewFlightForm();
                                }}
                            >
                                ביטול
                            </button>
                            <button 
                                className="save-button" 
                                onClick={handleAddFlight}
                            >
                                הוסף טיסה
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
