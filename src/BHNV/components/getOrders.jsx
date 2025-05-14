import { useSelector, useDispatch } from "react-redux";
import { getThank } from "../slices/getThank";
import { getByCompanyThank } from "../slices/getByCompanyThank";
import { useEffect, useState } from "react";
import { getOrdersThank } from "../slices/getOrdersThank";
import { getFlightsThank } from "../slices/getFlightsThank";
import { Manager } from "./manager";
import { GetOrderById } from "./getOrdersById";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/getOrders.css";
import { UpdateFlight, updateFlightThank } from "../slices/updateFlightThank";

export const GetOrders = () => {
    const bool = useSelector(state => state.event.bool);
    const orders = useSelector(state => state.event.orders);
    const flights = useSelector(state => state.event.flights);
    const dispatch = useDispatch();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedFlight, setEditedFlight] = useState(null);
    const [showPassengerDetails, setShowPassengerDetails] = useState(false);
    const [companies, setCompanies] = useState([
        { companyCode: 1, companyName: "אל על" },
        { companyCode: 2, companyName: "ישראייר" },
        { companyCode: 3, companyName: "אמריקן איירליינס" },
        { companyCode: 4, companyName: "טורקיש איירליינס" },
        { companyCode: 5, companyName: "לופטהנזה" },
        { companyCode: 6, companyName: "בריטיש איירווייס" },
        { companyCode: 7, companyName: "איירפראנס" },
        { companyCode: 8, companyName: "דלתא" }
    ]);
    const [countryFilter, setCountryFilter] = useState("");
    const [countries, setCountries] = useState([
        "ארצות הברית", "בריטניה", "צרפת", "גרמניה", "איטליה", "ספרד", 
        "יוון", "טורקיה", "רוסיה", "סין", "יפן", "הודו", "אוסטרליה", 
        "קנדה", "ברזיל", "מקסיקו", "דרום אפריקה", "מצרים", "מרוקו", 
        "איחוד האמירויות", "תאילנד", "וייטנאם", "סינגפור", "הונג קונג"
    ]);

    useEffect(() => {
        dispatch(getOrdersThank()).then(() => {
            dispatch(getFlightsThank());
        });
       
    }, [dispatch]);

    const handleFlightClick = (numOfFlight) => {
        const flight = flights.find(f => f.numOfFlight === numOfFlight);
        setSelectedFlight(flight);
        setEditedFlight({...flight});
        setIsEditing(false);
    };

    const handlePassengerDetails = (passengerId) => {
        setShowPassengerDetails(true);
        dispatch(GetOrderById(passengerId));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // כאן יש להוסיף קריאה לשרת לעדכון פרטי הטיסה
        dispatch(updateFlightThank(editedFlight));
        alert("פרטי הטיסה עודכנו בהצלחה! ============"+  {bool} );
        setIsEditing(false);
        setSelectedFlight(editedFlight);
    };

    const handleCancelEdit = () => {
        setEditedFlight({...selectedFlight});
        setIsEditing(false);
    };

    const handleCompanyCodeChange = (e) => {
        const code = parseInt(e.target.value);
        const company = companies.find(c => c.companyCode === code);
        
        if (company) {
            setEditedFlight({
                ...editedFlight,
                companyCode: code,
                companyName: company.companyName
            });
        } else {
            setEditedFlight({
                ...editedFlight,
                companyCode: code,
                companyName: ""
            });
        }
    };

    const handleCompanyNameChange = (e) => {
        const name = e.target.value;
        const company = companies.find(c => c.companyName === name);
        
        if (company) {
            setEditedFlight({
                ...editedFlight,
                companyName: name,
                companyCode: company.companyCode
            });
        } else {
            setEditedFlight({
                ...editedFlight,
                companyName: name
            });
        }
    };

    const handleDateChange = (date) => {
        // בדיקה שהתאריך לא עבר
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (date >= today) {
            setEditedFlight({
                ...editedFlight,
                date: date
            });
        } else {
            alert("לא ניתן לבחור תאריך שכבר עבר");
        }
    };

    const handleDirectChange = (e) => {
        const isDirect = e.target.value === "true";
        
        setEditedFlight({
            ...editedFlight,
            isDirect: isDirect,
            stop: isDirect ? "" : editedFlight.stop
        });
    };

    const filteredCountries = countries.filter(country => 
        country.toLowerCase().includes(countryFilter.toLowerCase())
    );

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('he-IL');
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div className="orders-container">
            <Manager />
            <h2 className="page-title">ניהול הזמנות וטיסות</h2>
            
            <div className="orders-table-container">
                <h3>רשימת הזמנות</h3>
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>קוד הזמנה</th>
                            <th>מספר טיסה</th>
                            <th>מזמין הכרטיס</th>
                            <th>תאריך</th>
                            <th>מספר כרטיסים במחלקה ראשונה</th>
                            <th>מספר כרטיסים במחלקה רגילה</th>
                            <th>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map((order) => (
                            <tr key={order.code}>
                                <td>{order.code}</td>
                                <td 
                                    className="clickable-cell"
                                    onClick={() => handleFlightClick(order.numOfFlight)}
                                >
                                    {order.numOfFlight}
                                </td>
                                <td>{order.passengerId}</td>
                                <td>{formatDate(order.date)}</td>
                                <td>{order.orderdetails?.numOfTicketsForFirstClass || 0}</td>
                                <td>{order.orderdetails?.numOfTicketsForRegilerClass || 0}</td>
                                <td>
                                    <button 
                                        className="details-button"
                                        onClick={() => handlePassengerDetails(order.passengerId)}
                                    >
                                        פרטי המזמין
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {selectedFlight && (
                <div className="flight-details-container">
                    <h3>פרטי טיסה מספר {selectedFlight.numOfFlight}</h3>
                    
                    {!isEditing ? (
                        <div className="flight-details">
                            <div className="detail-row">
                                <div className="detail-group">
                                    <span className="detail-label">קוד חברה:</span>
                                    <span className="detail-value">{selectedFlight.companyCode}</span>
                                </div>
                                <div className="detail-group">
                                    <span className="detail-label">שם חברה:</span>
                                    <span className="detail-value">{selectedFlight.companyName}</span>
                                </div>
                            </div>
                            
                            <div className="detail-row">
                                <div className="detail-group">
                                    <span className="detail-label">תאריך:</span>
                                    <span className="detail-value">{formatDate(selectedFlight.date)}</span>
                                </div>
                                <div className="detail-group">
                                    <span className="detail-label">שעת המראה:</span>
                                    <span className="detail-value">{selectedFlight.timeOfDepart}</span>
                                </div>
                                <div className="detail-group">
                                    <span className="detail-label">שעת נחיתה:</span>
                                    <span className="detail-value">{selectedFlight.timeOfLending}</span>
                                </div>
                            </div>
                            
                            <div className="detail-row">
                                <div className="detail-group">
                                    <span className="detail-label">מוצא:</span>
                                    <span className="detail-value">{selectedFlight.provenance}</span>
                                </div>
                                <div className="detail-group">
                                    <span className="detail-label">יעד:</span>
                                    <span className="detail-value">{selectedFlight.destination}</span>
                                </div>
                            </div>
                            
                            <div className="detail-row">
                                <div className="detail-group">
                                    <span className="detail-label">מחיר מחלקה ראשונה:</span>
                                    <span className="detail-value">{selectedFlight.priceOfFirstClass}₪</span>
                                </div>
                                <div className="detail-group">
                                    <span className="detail-label">מחיר מחלקה רגילה:</span>
                                    <span className="detail-value">{selectedFlight.priceOfRegilerClass}₪</span>
                                </div>
                            </div>
                            
                            <div className="detail-row">
                                <div className="detail-group">
                                    <span className="detail-label">טיסה ישירה:</span>
                                    <span className="detail-value">{selectedFlight.isDirect ? "כן" : "לא"}</span>
                                </div>
                                {!selectedFlight.isDirect && (
                                    <div className="detail-group">
                                        <span className="detail-label">תחנת ביניים:</span>
                                        <span className="detail-value">{selectedFlight.stop}</span>
                                    </div>
                                )}
                            </div>
                            
                            <button className="edit-button" onClick={handleEditClick}>
                                ערוך פרטי טיסה
                            </button>
                        </div>
                    ) : (
                        <div className="flight-edit-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>קוד חברה:</label>
                                    <select 
                                        value={editedFlight.companyCode} 
                                        onChange={handleCompanyCodeChange}
                                    >
                                        <option value="">בחר חברה</option>
                                        {companies.map(company => (
                                            <option 
                                                key={company.companyCode} 
                                                value={company.companyCode}
                                            >
                                                {company.companyCode} - {company.companyName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>שם חברה:</label>
                                    <select 
                                        value={editedFlight.companyName} 
                                        onChange={handleCompanyNameChange}
                                    >
                                        <option value="">בחר חברה</option>
                                        {companies.map(company => (
                                            <option 
                                                key={company.companyCode} 
                                                value={company.companyName}
                                            >
                                                {company.companyName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>תאריך:</label>
                                    <DatePicker 
                                        selected={new Date(editedFlight.date)} 
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}
                                        className="date-picker"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>שעת המראה:</label>
                                    <input 
                                        type="time" 
                                        value={editedFlight.timeOfDepart} 
                                        onChange={(e) => setEditedFlight({...editedFlight, timeOfDepart: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>שעת נחיתה:</label>
                                    <input 
                                        type="time" 
                                        value={editedFlight.timeOfLending} 
                                        onChange={(e) => setEditedFlight({...editedFlight, timeOfLending: e.target.value})}
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>מוצא:</label>
                                    <input 
                                        type="text" 
                                        value={editedFlight.provenance} 
                                        onChange={(e) => setEditedFlight({...editedFlight, provenance: e.target.value})}
                                        />
                                        </div>
                                        <div className="form-group">
                                            <label>יעד:</label>
                                            <input 
                                                type="text" 
                                                value={editedFlight.destination} 
                                                onChange={(e) => setEditedFlight({...editedFlight, destination: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>מחיר מחלקה ראשונה:</label>
                                            <input 
                                                type="number" 
                                                value={editedFlight.priceOfFirstClass} 
                                                onChange={(e) => setEditedFlight({...editedFlight, priceOfFirstClass: Number(e.target.value)})}
                                                min="0"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>מחיר מחלקה רגילה:</label>
                                            <input 
                                                type="number" 
                                                value={editedFlight.priceOfRegilerClass} 
                                                onChange={(e) => setEditedFlight({...editedFlight, priceOfRegilerClass: Number(e.target.value)})}
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>טיסה ישירה:</label>
                                            <select 
                                                value={editedFlight.isDirect.toString()} 
                                                onChange={handleDirectChange}
                                            >
                                                <option value="true">כן</option>
                                                <option value="false">לא</option>
                                            </select>
                                        </div>
                                        {!editedFlight.isDirect && (
                                            <div className="form-group">
                                                <label>תחנת ביניים:</label>
                                                <div className="search-select">
                                                    <input 
                                                        type="text"
                                                        placeholder="חפש מדינה..."
                                                        value={countryFilter}
                                                        onChange={(e) => setCountryFilter(e.target.value)}
                                                    />
                                                    <div className="country-dropdown">
                                                        {filteredCountries.map(country => (
                                                            <div 
                                                                key={country}
                                                                className="country-option"
                                                                onClick={() => {
                                                                    setEditedFlight({...editedFlight, stop: country});
                                                                    setCountryFilter("");
                                                                }}
                                                            >
                                                                {country}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="selected-stop">
                                                    {editedFlight.stop && (
                                                        <div className="stop-tag">
                                                            {editedFlight.stop}
                                                            <span 
                                                                className="remove-stop"
                                                                onClick={() => setEditedFlight({...editedFlight, stop: ""})}
                                                            >
                                                                ×
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="form-actions">
                                        <button className="cancel-button" onClick={handleCancelEdit}>
                                            ביטול
                                        </button>
                                        <button className="save-button" onClick={handleSaveClick}>
                                            שמור שינויים
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {showPassengerDetails && (
                        <div className="modal-overlay">
                            <div className="passenger-modal">
                                <div className="modal-header">
                                    <h3>פרטי נוסע</h3>
                                    <button 
                                        className="close-button"
                                        onClick={() => setShowPassengerDetails(false)}
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="modal-content">
                                    <GetOrderById />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        };
        