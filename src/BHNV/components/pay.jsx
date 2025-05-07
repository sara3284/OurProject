// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logonThank } from "../slices/logonThank";
// import { Home } from "./home";



// export const Pay = () => {

    
//     const Orders_Flights = useSelector(state => state.event.Orders_Flights);
//     const [OK, setOK] = useState(false);
//     const [provenance, setProvenance] = useState("");
//     const fun = () => {
       
//     }
//     return <div>
//         <Home></Home>

//         <h1>הכרטיס שלך:</h1>
//         <text>טיסה מספר {Orders_Flights.numOfFlight}</text>
//         <text>טיסה מספר {Orders_Flights.numOfFlight}</text>
//          <button  onClick={() => setOK(true)}>אישור</button>
//         {OK == true && <div>
//             <input type="number" onBlur={(e) => setProvenance(e.target.value)}>מספר אשראי</input>
//             <input type="number" onBlur={(e) => setProvenance(e.target.value)}>תוקף</input>
//             <input type="number" onBlur={(e) => setProvenance(e.target.value)}>3 ספרות</input>
//             </div>}
//     </div>
// }
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/pay.css';

export const Pay = () => {
    const passenger = useSelector(state => state.event.passenger);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    // מידע על ההזמנה (יכול להגיע מהסטייט או מפרמטרים ב-URL)
    const [orderDetails, setOrderDetails] = useState({
        flightNumber: new URLSearchParams(location.search).get('flightId') || "FL123",
        destination: "פריז",
        date: "2023-12-25",
        price: 1250,
        passengers: 2,
        classType: "רגילה"
    });
    
    // מידע על כרטיס האשראי
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardHolder: passenger?.name || '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        id: passenger?.id || ''
    });
    
    // מצבי תצוגה
    const [currentStep, setCurrentStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    
    // אנימציית כרטיס
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    
    // טיפול בשינויים בטופס
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // בדיקות תקינות בסיסיות
        if (name === 'cardNumber') {
            // מאפשר רק מספרים ומגביל ל-16 ספרות
            const formattedValue = value.replace(/\D/g, '').slice(0, 16);
            setCardDetails({ ...cardDetails, [name]: formattedValue });
        } else if (name === 'cvv') {
            // מאפשר רק מספרים ומגביל ל-3 או 4 ספרות
            const formattedValue = value.replace(/\D/g, '').slice(0, 4);
            setCardDetails({ ...cardDetails, [name]: formattedValue });
        } else {
            setCardDetails({ ...cardDetails, [name]: value });
        }
    };
    
    // פוקוס על שדה ה-CVV
    const handleCvvFocus = () => {
        setIsCardFlipped(true);
    };
    
    // יציאה מפוקוס משדה ה-CVV
    const handleCvvBlur = () => {
        setIsCardFlipped(false);
    };
    
    // פורמט מספר כרטיס אשראי לתצוגה
    const formatCardNumberForDisplay = (number) => {
        if (!number) return '';
        const groups = number.match(/.{1,4}/g) || [];
        return groups.join(' ');
    };
    
    // בדיקת תקינות הטופס
    const validateForm = () => {
        if (cardDetails.cardNumber.length < 16) {
            setError('מספר כרטיס האשראי חייב להכיל 16 ספרות');
            return false;
        }
        
        if (!cardDetails.cardHolder) {
            setError('יש להזין את שם בעל הכרטיס');
            return false;
        }
        
        if (!cardDetails.expiryMonth || !cardDetails.expiryYear) {
            setError('יש להזין תאריך תפוגה תקין');
            return false;
        }
        
        if (cardDetails.cvv.length < 3) {
            setError('קוד האבטחה (CVV) חייב להכיל 3 או 4 ספרות');
            return false;
        }
        
        if (cardDetails.id.length < 9) {
            setError('מספר תעודת זהות חייב להכיל 9 ספרות');
            return false;
        }
        
        setError('');
        return true;
    };
    
    // שליחת הטופס
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsProcessing(true);
        
        // סימולציה של תהליך תשלום
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            
            // ניווט לדף אישור לאחר 2 שניות
            setTimeout(() => {
                navigate('/paymentConfirmation', { 
                    state: { 
                        orderDetails,
                        transactionId: Math.random().toString(36).substring(2, 15)
                    } 
                });
            }, 2000);
        }, 3000);
    };
    
    // המשך לשלב הבא
    const goToNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };
    
    // חזרה לשלב הקודם
    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    return (
        <div className="payment-container">
            <div className="payment-background-animation"></div>
            
            <div className="payment-header">
                <h1>תשלום עבור הזמנת כרטיסי טיסה</h1>
                <div className="payment-steps">
                    <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                        <div className="step-number">1</div>
                        <div className="step-label">פרטי הזמנה</div>
                    </div>
                    <div className="step-connector"></div>
                    <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                        <div className="step-number">2</div>
                        <div className="step-label">פרטי תשלום</div>
                    </div>
                    <div className="step-connector"></div>
                    <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                        <div className="step-number">3</div>
                        <div className="step-label">אישור</div>
                    </div>
                </div>
            </div>
            
            <div className="payment-content">
                {/* שלב 1: פרטי הזמנה */}
                {currentStep === 1 && (
                    <div className="order-details-step">
                        <h2>פרטי ההזמנה שלך</h2>
                        
                        <div className="order-summary">
                            <div className="flight-info">
                                <div className="flight-route">
                                    <div className="origin">תל אביב</div>
                                    <div className="flight-path">
                                        <div className="airplane-icon">
                                            <i className="material-icons">flight</i>
                                        </div>
                                        <div className="path-line"></div>
                                    </div>
                                    <div className="destination">{orderDetails.destination}</div>
                                </div>
                                
                                <div className="flight-details">
                                    <div className="detail-item">
                                        <span className="label">מספר טיסה:</span>
                                        <span className="value">{orderDetails.flightNumber}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">תאריך:</span>
                                        <span className="value">{orderDetails.date}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">מחלקה:</span>
                                        <span className="value">{orderDetails.classType}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">מספר נוסעים:</span>
                                        <span className="value">{orderDetails.passengers}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="price-summary">
                                <div className="price-item">
                                    <span>מחיר כרטיס:</span>
                                    <span>{orderDetails.price} ₪</span>
                                </div>
                                <div className="price-item">
                                    <span>מספר נוסעים:</span>
                                    <span>x {orderDetails.passengers}</span>
                                </div>
                                <div className="price-item">
                                    <span>מיסים ותוספות:</span>
                                    <span>{Math.round(orderDetails.price * 0.17)} ₪</span>
                                </div>
                                <div className="price-divider"></div>
                                <div className="price-total">
                                    <span>סה"כ לתשלום:</span>
                                    <span>{orderDetails.price * orderDetails.passengers + Math.round(orderDetails.price * 0.17)} ₪</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="step-actions">
                            <button className="action-button next" onClick={goToNextStep}>
                                המשך לתשלום
                                <i className="material-icons">arrow_back</i>
                            </button>
                        </div>
                    </div>
                )}
                
                {/* שלב 2: פרטי תשלום */}
                {currentStep === 2 && (
                    <div className="payment-details-step">
                        <h2>פרטי תשלום</h2>
                        
                        <div className="credit-card-container">
                            <div className={`credit-card ${isCardFlipped ? 'flipped' : ''}`}>
                                <div className="card-front">
                                    <div className="card-type">
                                        <div className="card-logo visa"></div>
                                        <div className="card-logo mastercard"></div>
                                        <div className="card-logo amex"></div>
                                    </div>
                                    <div className="card-number">
                                        {formatCardNumberForDisplay(cardDetails.cardNumber) || '•••• •••• •••• ••••'}
                                    </div>
                                    <div className="card-details">
                                        <div className="card-holder">
                                            <div className="label">בעל הכרטיס</div>
                                            <div className="value">{cardDetails.cardHolder || 'שם מלא'}</div>
                                        </div>
                                        <div className="card-expiry">
                                            <div className="label">תוקף</div>
                                            <div className="value">
                                                {cardDetails.expiryMonth || 'MM'}/{cardDetails.expiryYear || 'YY'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-back">
                                    <div className="card-stripe"></div>
                                    <div className="card-cvv">
                                        <div className="cvv-label">CVV</div>
                                        <div className="cvv-value">{cardDetails.cvv || '•••'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <form className="payment-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="cardNumber">מספר כרטיס אשראי</label>
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        name="cardNumber"
                                        value={cardDetails.cardNumber}
                                        onChange={handleInputChange}
                                        placeholder="1234 5678 9012 3456"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="cardHolder">שם בעל הכרטיס</label>
                                    <input
                                        type="text"
                                        id="cardHolder"
                                        name="cardHolder"
                                        value={cardDetails.cardHolder}
                                        onChange={handleInputChange}
                                        placeholder="ישראל ישראלי"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row three-columns">
                                <div className="form-group">
                                    <label htmlFor="expiryMonth">חודש תפוגה</label>
                                    <select
                                        id="expiryMonth"
                                        name="expiryMonth"
                                        value={cardDetails.expiryMonth}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">חודש</option>
                                        {Array.from({ length: 12 }, (_, i) => {
                                            const month = i + 1;
                                            return (
                                                <option key={month} value={month.toString().padStart(2, '0')}>
                                                    {month.toString().padStart(2, '0')}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="expiryYear">שנת תפוגה</label>
                                    <select
                                        id="expiryYear"
                                        name="expiryYear"
                                        value={cardDetails.expiryYear}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">שנה</option>
                                        {Array.from({ length: 10 }, (_, i) => {
                                            const year = new Date().getFullYear() + i;
                                            return 
                                        
                                            })}
                                                     <option  value="">שנה</option>
                                        {Array.from({ length: 10 }, (_, i) => {
                                            const year = new Date().getFullYear() + i;
                                            return (
                                                <option key={year} value={year.toString().slice(2)}>
                                                    {year}
                                                </option>
                                            );
                                        })};
                                        
                                    </select>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="cvv">קוד אבטחה (CVV)</label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        name="cvv"
                                        value={cardDetails.cvv}
                                        onChange={handleInputChange}
                                        onFocus={handleCvvFocus}
                                        onBlur={handleCvvBlur}
                                        placeholder="123"
                                        maxLength="4"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="id">תעודת זהות</label>
                                    <input
                                        type="text"
                                        id="id"
                                        name="id"
                                        value={cardDetails.id}
                                        onChange={handleInputChange}
                                        placeholder="מספר תעודת זהות"
                                        required
                                    />
                                </div>
                            </div>
                            
                            {error && <div className="error-message">{error}</div>}
                            
                            <div className="payment-security">
                                <div className="security-icon">
                                    <i className="material-icons">lock</i>
                                </div>
                                <div className="security-text">
                                    התשלום מאובטח ומוצפן בתקן SSL. פרטי כרטיס האשראי שלך מוגנים.
                                </div>
                            </div>
                            
                            <div className="step-actions">
                                <button type="button" className="action-button back" onClick={goToPreviousStep}>
                                    <i className="material-icons">arrow_forward</i>
                                    חזרה
                                </button>
                                <button type="button" className="action-button next" onClick={goToNextStep}>
                                    המשך לאישור
                                    <i className="material-icons">arrow_back</i>
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                
                {/* שלב 3: אישור */}
                {currentStep === 3 && (
                    <div className="confirmation-step">
                        <h2>אישור הזמנה</h2>
                        
                        <div className="confirmation-details">
                            <div className="confirmation-section">
                                <h3>פרטי טיסה</h3>
                                <div className="detail-row">
                                    <span className="label">מספר טיסה:</span>
                                    <span className="value">{orderDetails.flightNumber}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">יעד:</span>
                                    <span className="value">{orderDetails.destination}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">תאריך:</span>
                                    <span className="value">{orderDetails.date}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">מחלקה:</span>
                                    <span className="value">{orderDetails.classType}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">מספר נוסעים:</span>
                                    <span className="value">{orderDetails.passengers}</span>
                                </div>
                            </div>
                            
                            <div className="confirmation-section">
                                <h3>פרטי תשלום</h3>
                                <div className="detail-row">
                                    <span className="label">סכום לתשלום:</span>
                                    <span className="value highlight">
                                        {orderDetails.price * orderDetails.passengers + Math.round(orderDetails.price * 0.17)} ₪
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">אמצעי תשלום:</span>
                                    <span className="value">
                                        כרטיס אשראי המסתיים ב-{cardDetails.cardNumber.slice(-4)}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">שם בעל הכרטיס:</span>
                                    <span className="value">{cardDetails.cardHolder}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="terms-agreement">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">
                                קראתי ואני מסכים/ה ל<a href="#">תנאי השימוש</a> ול<a href="#">מדיניות הפרטיות</a>
                            </label>
                        </div>
                        
                        <div className="step-actions">
                            <button type="button" className="action-button back" onClick={goToPreviousStep}>
                                <i className="material-icons">arrow_forward</i>
                                חזרה
                            </button>
                            <button 
                                className="action-button submit" 
                                onClick={handleSubmit}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="spinner"></div>
                                        מעבד תשלום...
                                    </>
                                ) : (
                                    <>
                                        אישור ותשלום
                                        <i className="material-icons">payment</i>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
                
                {/* הודעת הצלחה */}
                {isSuccess && (
                    <div className="success-overlay">
                        <div className="success-message">
                            <div className="success-icon">
                                <i className="material-icons">check_circle</i>
                            </div>
                            <h2>התשלום בוצע בהצלחה!</h2>
                            <p>פרטי ההזמנה נשלחו לדוא"ל שלך</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
