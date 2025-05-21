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
            icon: 'receipt_long'
        },
        {
            path: '/flights',
            text: 'הזמנת טיסה',
            icon: 'flight'
        },
        {
            path: '/getDetails',
            text: 'הפרטים שלי',
            icon: 'person'
        },
        {
            path: '/above',
            text: 'אודות',
            icon: 'info'
        },
        {
            path: '/kesher',
            text: 'צור קשר',
            icon: 'contact_support'
        },
        {
            path: '/airlines',
            text: 'חברות תעופה',
            icon: 'business',
            description: 'מידע על חברות התעופה השותפות שלנו'
        }
    ];

    return (
        <div className="modern-home-container">
            {/* כותרת עליונה עם לוגו ותפריט */}
            <header className="modern-header">
                <div className="header-container">
                    <div className="logo-container">
                        <img src='לוגו.jpg' alt="לוגו החברה" className="header-logo" />
                    </div>

                    <nav className="modern-nav">
                        <ul className="nav-list">
                            {menuItems.map((item, index) => (
                                <li key={index} className="nav-item">
                                    <Link to={item.path} className="nav-link">
                                        <span className="material-icons">{item.icon}</span>
                                        <span className="nav-text">{item.text}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="user-info">
                        <div className="greeting-container">
                            <span className="greeting-text">{greeting},</span>
                            <span className="user-name">{passenger.name}</span>
                        </div>
                        <div className="time-display">
                            <span className="material-icons">schedule</span>
                            <span className="current-time">{currentTime}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="modern-main">
                {/* סקשן חיפוש טיסה עם תמונת מטוס */}

                <section className="hero-section" 
                // style={{ backgroundImage: `url(${require('../מטוס.jpg')})` }}
                >
                    <div className="hero-content">
                        <h1>גלו את העולם עם הטיסות שלנו</h1>
                        <p>אלפי יעדים, מחירים אטרקטיביים ושירות מעולה</p>
                        <Link to="/flights" className="hero-button">
                            <span className="material-icons">flight_takeoff</span>
                            חפש טיסות
                        </Link>
                    </div>
                </section>
                {/* סקשן יעדים פופולריים */}
                <section className="popular-destinations">
                    <h2 className="section-title">יעדים פופולריים</h2>

                    <div className="destinations-grid">
                        <div className="destination-card">
                            <div className="destination-image">
                                <img src="amsterdam-738x355.jpg" alt="פריז" />
                            </div>
                            <div className="destination-content">
                                <h3>פריז</h3>
                                <div className="destination-info">
                                    <span className="destination-price">החל מ-$299</span>
                                    <span className="destination-duration">
                                        <span className="material-icons">schedule</span>
                                        4.5 שעות
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="destination-card">
                            <div className="destination-image">
                                <img src="KREMLIN.jpg" alt="לונדון" />
                            </div>
                            <div className="destination-content">
                                <h3>לונדון</h3>
                                <div className="destination-info">
                                    <span className="destination-price">החל מ-$349</span>
                                    <span className="destination-duration">
                                        <span className="material-icons">schedule</span>
                                        5 שעות
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="destination-card">
                            <div className="destination-image">
                                <img src="_big_90DCD7269E4193594E070F953024685E (1).jpg" alt="ברצלונה" />
                            </div>
                            <div className="destination-content">
                                <h3>הולנד</h3>
                                <div className="destination-info">
                                    <span className="destination-price">החל מ-$279</span>
                                    <span className="destination-duration">
                                        <span className="material-icons">schedule</span>
                                        4 שעות
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="destination-card">
                            <div className="destination-image">
                                <img src="amsterdam-738x355.jpg" alt="רומא" />
                            </div>
                            <div className="destination-content">
                                <h3>רומא</h3>
                                <div className="destination-info">
                                    <span className="destination-price">החל מ-$259</span>
                                    <span className="destination-duration">
                                        <span className="material-icons">schedule</span>
                                        3.5 שעות
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* סקשן שירותי טיסות - עודכן לשירותים רלוונטיים לטיסות בלבד */}
                <section className="services-section">
                    <h2 className="section-title">השירותים שלנו</h2>

                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">
                                <span className="material-icons">flight_takeoff</span>
                            </div>
                            <h3>טיסות בינלאומיות</h3>
                            <p>מגוון רחב של טיסות ליעדים ברחבי העולם במחירים אטרקטיביים</p>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">
                                <span className="material-icons">flight</span>
                            </div>
                            <h3>טיסות פנים</h3>
                            <p>טיסות פנים ארציות מהירות ונוחות בכל רחבי המדינה</p>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">
                                <span className="material-icons">luggage</span>
                            </div>
                            <h3>מזוודות ומטען</h3>
                            <p>אפשרויות מגוונות למשקל מזוודות ומטען מיוחד בטיסות</p>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">
                                <span className="material-icons">airline_seat_recline_extra</span>
                            </div>
                            <h3>בחירת מושבים</h3>
                            <p>בחירת מושבים מראש לנוחות מקסימלית בטיסה</p>
                        </div>
                    </div>
                </section>

                {/* סקשן טיפים לטיסה - עודכן לטיפים רלוונטיים */}
                <section className="travel-tips">
                    <h2 className="section-title">טיפים לטיסה מוצלחת</h2>

                    <div className="tips-grid">
                        <div className="tip-card">
                            <div className="tip-icon">
                                <span className="material-icons">schedule</span>
                            </div>
                            <h3>הגעה מוקדמת</h3>
                            <p>הגיעו לשדה התעופה לפחות 3 שעות לפני טיסות בינלאומיות</p>
                        </div>

                        <div className="tip-card">
                            <div className="tip-icon">
                                <span className="material-icons">water_drop</span>
                            </div>
                            <h3>שתייה מרובה</h3>
                            <p>הקפידו לשתות מים במהלך הטיסה למניעת התייבשות</p>
                        </div>

                        <div className="tip-card">
                            <div className="tip-icon">
                                <span className="material-icons">power</span>
                            </div>
                            <h3>מטען נייד</h3>
                            <p>קחו איתכם מטען נייד לשמירה על סוללת הטלפון</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="modern-footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src='לוגו.jpg' alt="לוגו החברה" />
                        <p>© {new Date().getFullYear()} מערכת הזמנת טיסות</p>
                    </div>

                    <div className="footer-contact">
                        <div className="contact-item">
                            <span className="material-icons">phone</span>
                            <span>03-1234567</span>
                        </div>
                        <div className="contact-item">
                            <span className="material-icons">email</span>
                            <span>info@flights.co.il</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
