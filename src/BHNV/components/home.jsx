
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import '../css/home.css';

// export const Home = () => {
//     const passenger = useSelector(state => state.event.passenger);
//     const [greeting, setGreeting] = useState("");
//     const [currentTime, setCurrentTime] = useState("");
    
//     // קביעת ברכה מותאמת לפי שעות היום
//     useEffect(() => {
//         const updateTimeInfo = () => {
//             const now = new Date();
//             const hour = now.getHours();
            
//             // עדכון ברכה
//             if (hour >= 5 && hour < 12) {
//                 setGreeting("בוקר טוב");
//             } else if (hour >= 12 && hour < 18) {
//                 setGreeting("צהריים טובים");
//             } else if (hour >= 18 && hour < 22) {
//                 setGreeting("ערב טוב");
//             } else {
//                 setGreeting("לילה טוב");
//             }
            
//             // עדכון שעה נוכחית
//             const timeString = now.toLocaleTimeString('he-IL', {
//                 hour: '2-digit',
//                 minute: '2-digit'
//             });
//             setCurrentTime(timeString);
//         };
        
//         // עדכון ראשוני
//         updateTimeInfo();
        
//         // עדכון כל דקה
//         const intervalId = setInterval(updateTimeInfo, 60000);
        
//         return () => clearInterval(intervalId);
//     }, []);

//     // הגדרת פריטי התפריט
//     const menuItems = [
//         {
//             path: '/getMyOrders',
//             text: 'ההזמנות שלי',
//             icon: 'receipt_long',
//             description: 'צפייה וניהול בכל ההזמנות הקיימות שלך'
//         },

//         {
//             path: '/flights',
//             text: ' ולהזמנת כרטיס לטיסות',
//             icon: 'flight',
//             description: 'חיפוש וסינון טיסות זמינות'
//         },
//         {
//             path: '/pay',
//             text: 'לתשלום',
//             icon: 'payments',
//             description: 'ביצוע תשלום מאובטח עבור ההזמנות שלך'
//         },
//         {
//             path: '/details',
//             text: 'הפרטים שלי',
//             icon: 'person',
//             description: 'צפייה ועדכון הפרטים האישיים שלך'
//         },
//         {
//             path: '/above',
//             text: 'אודות',
//             icon: 'info',
//             description: 'מידע על החברה והשירותים שלנו'
//         },
//         {
//             path: '/kesher',
//             text: 'צור קשר',
//             icon: 'contact_support',
//             description: 'דרכי התקשרות עם צוות השירות שלנו'
//         }
//     ];

//     return (
//         <div className="home-container">
//             <header className="welcome-header">
//                 <div className="logo-banner">
//                     <img src='לוגו.jpg' alt="לוגו החברה" className="company-logo" />
//                 </div>
//                 <div className="header-content">
//                     <div className="header-text">
//                         <h1 className="welcome-title">ברוכים הבאים למערכת הזמנת טיסות</h1>
//                         <div className="user-greeting">
//                             <span className="greeting-text">{greeting},</span>
//                             <span className="user-name">{passenger.name}</span>
//                         </div>
//                     </div>
//                     <div className="time-display">
//                         <span className="material-icons">schedule</span>
//                         <span className="current-time">{currentTime}</span>
//                     </div>
//                 </div>
//             </header>

//             <main className="main-content">
//                 <div className="menu-grid">
//                     {menuItems.map((item, index) => (
//                         <Link to={item.path} key={index} className="menu-link">
//                             <div className="menu-item">
//                                 <div className="menu-icon">
//                                     <span className="material-icons">{item.icon}</span>
//                                 </div>
//                                 <div className="menu-text">
//                                     <h3 className="menu-title">{item.text}</h3>
//                                     <p className="menu-description">{item.description}</p>
//                                 </div>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </main>

//             <footer className="home-footer">
//                 <div className="footer-content">
//                     <img src='לוגו.jpg' alt="לוגו החברה" className="footer-logo" />
//                     <p className="copyright">© {new Date().getFullYear()} מערכת הזמנת טיסות</p>
//                 </div>
//             </footer>
//         </div>
//     );
// };
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import '../css/home.css';

export const Home = () => {
    const passenger = useSelector(state => state.event.passenger);
    const [greeting, setGreeting] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    
    // קביעת ברכה מותאמת לפי שעות היום
    useEffect(() => {
        const updateTimeInfo = () => {
            const now = new Date();
            const hour = now.getHours();
            
            // עדכון ברכה
            if (hour >= 5 && hour < 12) {
                setGreeting("בוקר טוב");
            } else if (hour >= 12 && hour < 18) {
                setGreeting("צהריים טובים");
            } else if (hour >= 18 && hour < 22) {
                setGreeting("ערב טוב");
            } else {
                setGreeting("לילה טוב");
            }
            
            // עדכון שעה נוכחית
            const timeString = now.toLocaleTimeString('he-IL', {
                hour: '2-digit',
                minute: '2-digit'
            });
            setCurrentTime(timeString);
        };
        
        // עדכון ראשוני
        updateTimeInfo();
        
        // עדכון כל דקה
        const intervalId = setInterval(updateTimeInfo, 60000);
        
        return () => clearInterval(intervalId);
    }, []);

    // הגדרת פריטי התפריט
    const menuItems = [
        {
            path: '/getMyOrders',
            text: 'ההזמנות שלי',
            icon: 'receipt_long',
            description: 'צפייה וניהול בכל ההזמנות הקיימות שלך'
        },
        {
            path: '/flights',
            text: ' ולהזמנת כרטיס לטיסות',
            icon: 'flight',
            description: 'חיפוש וסינון טיסות זמינות'
        },
        
        {
            path: '/getDetails',
            text: 'הפרטים שלי',
            icon: 'person',
            description: 'צפייה ועדכון הפרטים האישיים שלך'
        },
        {
            path: '/above',
            text: 'אודות',
            icon: 'info',
            description: 'מידע על החברה והשירותים שלנו'
        },
        {
            path: '/kesher',
            text: 'צור קשר',
            icon: 'contact_support',
            description: 'דרכי התקשרות עם צוות השירות שלנו'
        }
    ];

    return (
        <div className="home-container">
            <header className="welcome-header">
                <div className="logo-banner">
                    <img src='לוגו.jpg' alt="לוגו החברה" className="company-logo" />
                </div>
                <div className="header-content">
                    <div className="header-text">
                        <h1 className="welcome-title">ברוכים הבאים למערכת הזמנת טיסות</h1>
                        <div className="user-greeting">
                            <span className="greeting-text">{greeting},</span>
                            <span className="user-name">{passenger.name}</span>
                        </div>
                    </div>
                    <div className="time-display">
                        <span className="material-icons">schedule</span>
                        <span className="current-time">{currentTime}</span>
                    </div>
                </div>
            </header>
            <main className="main-content">
                <div className="menu-grid">
                    {menuItems.map((item, index) => (
                        <Link to={item.path} key={index} className="menu-link">
                            <div className="menu-item">
                                <div className="menu-icon">
                                    <span className="material-icons">{item.icon}</span>
                                </div>
                                <div className="menu-text">
                                    <h3 className="menu-title">{item.text}</h3>
                                    <p className="menu-description">{item.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <footer className="home-footer">
                <div className="footer-content">
                    <img src='לוגו.jpg' alt="לוגו החברה" className="footer-logo" />
                    <p className="copyright">© {new Date().getFullYear()} מערכת הזמנת טיסות</p>
                </div>
            </footer>
        </div>
    );
};