// import { useSelector, useDispatch } from "react-redux";
// import { getThank } from "../slices/getThank";
// import { getByCompanyThank } from "../slices/getByCompanyThank";
// import { useState, useEffect } from "react"
// import { getFlightsThank } from "../slices/getFlightsThank";
// import { Manager } from "./manager";
// import '../css/home.css';
// export const GetFlights = () => {
//     const passenger = useSelector(state => state.event.passenger);
//     const flights = useSelector(state => state.event.flights);
    
//     const dispatch = useDispatch();
//     const [company, setcompany] = useState("");
//     const [Selected, setSelected] = useState(false);
//     const [color, setColor] = useState("");
//     useEffect(() => {
//         dispatch(getFlightsThank())
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


//                 <th>מספר טיסה:</th><th>מוצא:</th><th>יעד:</th>

//                 <th>:שם החברה</th><th>:קוד החברה</th>


//                 <th>:תאריך טיסה</th><th>:זמן המראה</th><th>:זמן נחיתה</th>


//                 <th>:מספר המקומות במחלקה הראשונה</th><th>:מחיר כרטיס למחלקה הראשונה</th>
//                 <th>:מספר המקומות הפנויים במחלקה ראשונה</th>

//                 <th>:מספר המקומות במחלקה רגילה</th><th>:מחיר כרטיס למחלקה רגילה</th>
//                 <th>:מספר המקומות הפנויים במחלקה רגילה</th>

//                 <th>:ישיר</th>
//                 <th>תחנת ביניים:</th>
//             </thead>

//             {flights && flights.map((flight, index) => (

//                 <tbody>
//                     <tr onClick={() => (selected(flight))} className={color}>
//                     <th>{flight.numOfFlight}</th> <th>{flight.provenance}</th>  <th>{flight.destination}</th>

//                     <th>{flight.companyName}</th>  <th>{flight.companyCode}</th>

//                     <th>{(Date(flight.dete))}</th>  <th>{flight.timeOfDepart}</th>  <th>{flight.timeOfLending}</th>


//                     <th>  {flight.numOfSeetsInFirstClass}</th>  <th>{flight.priceOfFirstClass}</th>  <th>{flight.numOfEmptySeetsInFirstClass}</th>

//                     <th>  {flight.numOfSeetsInRegilerClass}</th>  <th>{flight.priceOfRegilerClass}</th>  <th>{flight.numOfEmptySeetsInRegilerClass}</th>

//                     {(flight.stop === "" && "✔") || "✖"}
                
//                     <th>  {flight.stop}</th>
//                     </tr>
//                 </tbody>
//             ))}
//         </table>
//         {Selected && <button>להזמנת כרטיס בטיסה הנוכחית</button>}
//     </div>
// }
import { useSelector, useDispatch } from "react-redux";
import { getThank } from "../slices/getThank";
import { getByCompanyThank } from "../slices/getByCompanyThank";
import { useState, useEffect } from "react";
import { getFlightsThank } from "../slices/getFlightsThank";
import { Manager } from "./manager";

import { useNavigate } from "react-router-dom";
import '../css/getFlights.css';
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

    useEffect(() => {
        setIsLoading(true);
        dispatch(getFlightsThank()).then(() => {
            setIsLoading(false);
        });
    }, []);

    const handleFlightSelect = (flight) => {
        setSelectedFlight(flight.numOfFlight === selectedFlight?.numOfFlight ? null : flight);
    };

    const handleBooking = () => {
        // כאן תוכל להוסיף לוגיקה להזמנת כרטיס
        navigate(`/addOrder?flightId=${selectedFlight.numOfFlight}`);
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
                <p>gitttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt</p>
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
                            {filteredFlights.map((flight) => (
                                <tr 
                                    key={flight.numOfFlight}
                                    onClick={() => handleFlightSelect(flight)}
                                    className={selectedFlight?.numOfFlight === flight.numOfFlight ? 'selected-row' : ''}
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
                                </tr>
                            ))}
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
                            </div>
                            
                            <div className="class-option regular-class">
                                <h4>מחלקה רגילה</h4>
                                <div className="price">{selectedFlight.priceOfRegilerClass}₪</div>
                                <div className="seats-available">
                                    {selectedFlight.numOfEmptySeetsInRegilerClass} מקומות פנויים מתוך {selectedFlight.numOfSeetsInRegilerClass}
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
        </div>
    );
};

