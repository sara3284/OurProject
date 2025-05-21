// import { Link } from "react-router-dom"
// import {  useSelector } from "react-redux";
// import {  useState } from "react"
// import '../css/home.css';
// export const Manager = () => {
//     const passenger = useSelector(state => state.event.passenger);
//     return <>

//         {/* <Link ><button className="buttonhome"></button></Link><br /> */}
//         {/* <Link to={'/mcalendar'}><button className="buttonhome"></button></Link> */}
//         <div className="links">
            
//             <Link to={'/getOrders'}><button className="getOrders"> כל ההזמנות</button></Link>
//             <Link to={'/getFlights'}><button className="getFlights"> כל הטיסות</button></Link>
//             <Link to={'/getPassengers'}><button className="getPassengers">לקוחות</button></Link>
//         </div>
//         <div>שלום ל{passenger.name}</div>
//         {/* <img src="airplane.jpg"/> */}



//     </>


// }
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react"
import '../css/manager.css';

export const Manager = () => {
    const passenger = useSelector(state => state.event.passenger);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [stats, setStats] = useState({
        totalOrders: 245,
        totalFlights: 78,
        totalCustomers: 312,
        pendingOrders: 18
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "בוקר טוב";
        if (hour < 18) return "צהריים טובים";
        return "ערב טוב";
    };

    const formatDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return currentTime.toLocaleDateString('he-IL', options);
    };

    return (
        <div className="manager-dashboard">
            <div className="background-animation"></div>
            
            <div className="dashboard-header">
                <div className="greeting-section">
                    <h1>{formatGreeting()}, {passenger.name}</h1>
                    <p className="date-display">{formatDate()}</p>
                </div>
                <div className="profile-section">
                    <div className="notification-bell">
                        <i className="material-icons">notifications</i>
                        <span className="notification-badge">3</span>
                    </div>
                    <div className="admin-avatar">
                        <span>{passenger.name ? passenger.name.charAt(0).toUpperCase() : 'A'}</span>
                    </div>
                </div>
            </div>
            
            <div className="dashboard-stats">
                <div className="stat-card orders">
                    <div className="stat-icon">
                        <i className="material-icons">receipt_long</i>
                    </div>
                    <div className="stat-content">
                        <h3>הזמנות</h3>
                        <p className="stat-value">{stats.totalOrders}</p>
                        <p className="stat-detail">{stats.pendingOrders} הזמנות ממתינות לאישור</p>
                    </div>
                </div>
                
                <div className="stat-card flights">
                    <div className="stat-icon">
                        <i className="material-icons">flight</i>
                    </div>
                    <div className="stat-content">
                        <h3>טיסות</h3>
                        <p className="stat-value">{stats.totalFlights}</p>
                        <p className="stat-detail">12 טיסות היום</p>
                    </div>
                </div>
                
                <div className="stat-card customers">
                    <div className="stat-icon">
                        <i className="material-icons">people</i>
                    </div>
                    <div className="stat-content">
                        <h3>לקוחות</h3>
                        <p className="stat-value">{stats.totalCustomers}</p>
                        <p className="stat-detail">24 לקוחות חדשים החודש</p>
                    </div>
                </div>
                
                <div className="stat-card revenue">
                    <div className="stat-icon">
                        <i className="material-icons">payments</i>
                    </div>
                    <div className="stat-content">
                        <h3>הכנסות</h3>
                        <p className="stat-value">₪ 128,450</p>
                        <p className="stat-detail">↑ 12% מהחודש הקודם</p>
                    </div>
                </div>
            </div>
            
            <div className="quick-actions-section">
                <h2>פעולות מהירות</h2>
                <div className="quick-actions">
                    <Link to='/getOrders' className="action-card">
                        <div className="action-icon">
                            <i className="material-icons">receipt_long</i>
                        </div>
                        <div className="action-content">
                            <h3>ניהול הזמנות</h3>
                            <p>צפייה ועריכה של כל ההזמנות במערכת</p>
                        </div>
                        <div className="action-arrow">
                            <i className="material-icons">arrow_forward</i>
                        </div>
                    </Link>
                    
                    <Link to='/getManagerFlights' className="action-card">
                        <div className="action-icon">
                            <i className="material-icons">flight</i>
                        </div>
                        <div className="action-content">
                            <h3>ניהול טיסות</h3>
                            <p>הוספה, עריכה וביטול טיסות</p>
                        </div>
                        <div className="action-arrow">
                            <i className="material-icons">arrow_forward</i>
                        </div>
                    </Link>
                    
                    <Link to='/getPassengers' className="action-card">
                        <div className="action-icon">
                            <i className="material-icons">people</i>
                        </div>
                        <div className="action-content">
                            <h3>ניהול לקוחות</h3>
                            <p>צפייה בפרטי לקוחות והזמנותיהם</p>
                        </div>
                        <div className="action-arrow">
                            <i className="material-icons">arrow_forward</i>
                        </div>
                    </Link>
                    
                    <Link to='/reports' className="action-card">
                        <div className="action-icon">
                            <i className="material-icons">bar_chart</i>
                        </div>
                        <div className="action-content">
                            <h3>דוחות וסטטיסטיקות</h3>
                            <p>ניתוח נתונים והפקת דוחות</p>
                        </div>
                        <div className="action-arrow">
                            <i className="material-icons">arrow_forward</i>
                        </div>
                    </Link>
                </div>
            </div>
            
            {/* הוספת אפשרויות חברה */}
            <div className="company-management-section">
                <h2>ניהול חברות תעופה</h2>
                <div className="quick-actions">
                    <Link to='/addOrder' className="action-card">
                        <div className="action-icon">
                            <i className="material-icons">add_circle</i>
                        </div>
                        <div className="action-content">
                            <h3>הוספת הזמנה</h3>
                            <p>הוספת הזמנה חדשה למערכת</p>
                        </div>
                        <div className="action-arrow">
                            <i className="material-icons">arrow_forward</i>
                        </div>
                    </Link>
                    
                    <Link to='/manageCompanies' className="action-card">
                        <div className="action-icon">
                            <i className="material-icons">business</i>
                        </div>
                        <div className="action-content">
                            <h3>ניהול חברות</h3>
                            <p>צפייה ועריכה של חברות התעופה</p>
                        </div>
                        <div className="action-arrow">
                            <i className="material-icons">arrow_forward</i>
                        </div>
                    </Link>
                </div>
            </div>
            
            <div className="dashboard-sections">
                <div className="recent-activity">
                    <div className="section-header">
                        <h2>פעילות אחרונה</h2>
                        <button className="view-all-button">הצג הכל</button>
                    </div>
                    
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon confirmed">
                                <i className="material-icons">check_circle</i>
                            </div>
                            <div className="activity-content">
                                <p className="activity-text">הזמנה #12458 אושרה</p>
                                <p className="activity-time">לפני 10 דקות</p>
                            </div>
                        </div>
                        
                        <div className="activity-item">
                            <div className="activity-icon new-customer">
                                <i className="material-icons">person_add</i>
                            </div>
                            <div className="activity-content">
                                <p className="activity-text">לקוח חדש נרשם למערכת</p>
                                <p className="activity-time">לפני 45 דקות</p>
                            </div>
                        </div>
                        
                        <div className="activity-item">
                            <div className="activity-icon cancelled">
                                <i className="material-icons">cancel</i>
                            </div>
                            <div className="activity-content">
                                <p className="activity-text">הזמנה #12445 בוטלה</p>
                                <p className="activity-time">לפני שעה</p>
                            </div>
                        </div>
                        
                        <div className="activity-item">
                            <div className="activity-icon updated">
                                <i className="material-icons">update</i>
                            </div>
                            <div className="activity-content">
                                <p className="activity-text">פרטי טיסה TLV-NYC עודכנו</p>
                                <p className="activity-time">לפני 3 שעות</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="upcoming-flights">
                    <div className="section-header">
                        <h2>טיסות קרובות</h2>
                        <button className="view-all-button">הצג הכל</button>
                    </div>
                    
                    <div className="flights-list">
                        <div className="flight-item">
                            <div className="flight-time">08:30</div>
                            <div className="flight-route">
                                <div className="flight-cities">
                                    <span>תל אביב</span>
                                    <i className="material-icons">arrow_forward</i>
                                    <span>לונדון</span>
                                </div>
                                <div className="flight-number">LY315</div>
                            </div>
                            <div className="flight-status on-time">בזמן</div>
                        </div>
                        
                        <div className="flight-item">
                            <div className="flight-time">10:15</div>
                            <div className="flight-route">
                                <div className="flight-cities">
                                    <span>תל אביב</span>
                                    <i className="material-icons">arrow_forward</i>
                                    <span>פריז</span>
                                </div>
                                <div className="flight-number">LY323</div>
                            </div>
                            <div className="flight-status delayed">מתעכבת</div>
                        </div>
                        
                        <div className="flight-item">
                            <div className="flight-time">12:45</div>
                            <div className="flight-route">
                                <div className="flight-cities">
                                    <span>תל אביב</span>
                                    <i className="material-icons">arrow_forward</i>
                                    <span>ניו יורק</span>
                                </div>
                                <div className="flight-number">LY001</div>
                            </div>
                            <div className="flight-status on-time">בזמן</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};