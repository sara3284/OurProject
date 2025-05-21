import React, { useState } from 'react';
import '../css/airlines.css';

export const Airlines = () => {
    // נתונים של חברות התעופה
    const airlinesData = [
        {
            id: 1,
            name: "EL AL",
            logo: "מטוס.jpg", // יש להחליף בנתיב התמונה האמיתי
            code: "LY",
            description: "אל על היא חברת התעופה הלאומית של ישראל, המציעה טיסות לכל רחבי העולם. החברה ידועה בסטנדרטים הגבוהים של אבטחה ושירות.",
            founded: 1948,
            fleet: 45,
            destinations: 50,
            hub: "נמל התעופה בן גוריון, תל אביב",
            website: "https://www.elal.com"
        },
        {
            id: 2,
            name: "Delta",
            logo: "", // יש להחליף בנתיב התמונה האמיתי
            code: "DL",
            description: "דלתא איירליינס היא אחת מחברות התעופה הגדולות בארה\"ב, המציעה טיסות לכל רחבי העולם. החברה ידועה בשירות האיכותי ובתוכנית הנוסע המתמיד שלה.",
            founded: 1924,
            fleet: 850,
            destinations: 325,
            hub: "אטלנטה, ג'ורג'יה",
            website: "https://www.delta.com"
        },
        {
            id: 3,
            name: "EasyJet",
            logo: "", // יש להחליף בנתיב התמונה האמיתי
            code: "U2",
            description: "איזיג'ט היא חברת תעופה בריטית המתמחה בטיסות במחירים נמוכים באירופה. החברה מציעה מחירים תחרותיים וגמישות בהזמנות.",
            founded: 1995,
            fleet: 342,
            destinations: 136,
            hub: "לונדון לוטון, בריטניה",
            website: "https://www.easyjet.com"
        },
        {
            id: 4,
            name: "United",
            logo: "דרימליינר-של-יונטייד-איירליינס.-צילום-יחצ-1024x662.jpg", // יש להחליף בנתיב התמונה האמיתי
            code: "UA",
            description: "יונייטד איירליינס היא חברת תעופה אמריקאית גדולה המציעה טיסות לכל רחבי העולם. החברה ידועה ברשת הנרחבת של יעדים ובשירות המקיף שלה.",
            founded: 1926,
            fleet: 857,
            destinations: 342,
            hub: "שיקגו, אילינוי",
            website: "https://www.united.com"
        },
        {
            id: 5,
            name: "AIRBUANACHECK",
            logo: "airbuanacheck_logo.png", // יש להחליף בנתיב התמונה האמיתי
            code: "AB",
            description: "אירבואנה צ'ק היא חברת תעופה חדשנית המציעה חוויית טיסה ייחודית עם דגש על נוחות ושירות אישי. החברה מפעילה טיסות לאירופה, אסיה ואמריקה.",
            founded: 2005,
            fleet: 120,
            destinations: 85,
            hub: "פרנקפורט, גרמניה",
            website: "https://www.airbuanacheck.com"
        },
        {
            id: 6,
            name: "LOT",
            logo: "Lot.embraer.e-170-100st.sp-ldd.arp.jpg", // יש להחליף בנתיב התמונה האמיתי
            code: "LO",
            description: "לוט היא חברת התעופה הלאומית של פולין, המציעה טיסות ברחבי אירופה ומעבר לה. החברה ידועה במחירים התחרותיים ובשירות האיכותי שלה.",
            founded: 1929,
            fleet: 75,
            destinations: 120,
            hub: "ורשה, פולין",
            website: "https://www.lot.com"
        },
        {
            id: 7,
            name: "TRUMP",
            logo: "Trump_Boeing_757-200_(N757AF)_at_McCarran.jpg", // יש להחליף בנתיב התמונה האמיתי
            code: "TR",
            description: "טראמפ איירליינס היא חברת תעופה יוקרתית המציעה טיסות פרימיום לאנשי עסקים ולנוסעים הדורשים את הטוב ביותר. החברה מתמחה בחוויית טיסה ברמה גבוהה.",
            founded: 2018,
            fleet: 25,
            destinations: 30,
            hub: "ניו יורק, ארה\"ב",
            website: "https://www.trumpairlines.com"
        },
        {
            id: 8,
            name: "V-JET",
            logo: "vjet_logo.png", // יש להחליף בנתיב התמונה האמיתי
            code: "VJ",
            description: "וי-ג'ט היא חברת תעופה חדשנית המתמחה בטיסות מהירות ויעילות. החברה מפעילה צי מטוסים מודרני ומציעה שירות איכותי במחירים תחרותיים.",
            founded: 2010,
            fleet: 60,
            destinations: 75,
            hub: "טוקיו, יפן",
            website: "https://www.vjet.com"
        }
    ];

    const [selectedAirline, setSelectedAirline] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // פונקציה לסינון חברות התעופה לפי חיפוש
    const filteredAirlines = airlinesData.filter(airline => 
        airline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airline.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="airlines-container">
            <div className="airlines-header">
                <div className="airlines-banner">
                    <h1>חברות התעופה שלנו</h1>
                    <p>אנו גאים לשתף פעולה עם חברות התעופה המובילות בעולם</p>
                </div>
                <div className="airlines-search">
                    <input 
                        type="text" 
                        placeholder="חיפוש חברת תעופה..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="material-icons">search</span>
                </div>
            </div>

            <div className="airlines-grid">
                {filteredAirlines.map(airline => (
                    <div 
                        key={airline.id} 
                        className={`airline-card ${selectedAirline === airline.id ? 'selected' : ''}`}
                        onClick={() => setSelectedAirline(selectedAirline === airline.id ? null : airline.id)}
                    >
                        <div className="airline-logo-container">
                            <img 
                                src={airline.logo} 
                                alt={`${airline.name} Logo`} 
                                className="airline-logo"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'default_airline_logo.png'; // תמונת ברירת מחדל
                                }}
                            />
                        </div>
                        <div className="airline-info">
                            <div className="airline-header">
                                <h2>{airline.name}</h2>
                                <span className="airline-code">{airline.code}</span>
                            </div>
                            <p className="airline-description">{airline.description}</p>
                            
                            <div className={`airline-details ${selectedAirline === airline.id ? 'show' : ''}`}>
                                <div className="detail-item">
                                    <span className="material-icons">event</span>
                                    <div className="detail-content">
                                        <span className="detail-label">שנת ייסוד</span>
                                        <span className="detail-value">{airline.founded}</span>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <span className="material-icons">flight</span>
                                    <div className="detail-content">
                                        <span className="detail-label">צי מטוסים</span>
                                        <span className="detail-value">{airline.fleet} מטוסים</span>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <span className="material-icons">place</span>
                                    <div className="detail-content">
                                        <span className="detail-label">יעדים</span>
                                        <span className="detail-value">{airline.destinations} יעדים</span>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <span className="material-icons">home</span>
                                    <div className="detail-content">
                                        <span className="detail-label">בסיס ראשי</span>
                                        <span className="detail-value">{airline.hub}</span>
                                    </div>
                                </div>
                                <div className="airline-actions">
                                    <a href={airline.website} target="_blank" rel="noopener noreferrer" className="airline-website-link">
                                        <span className="material-icons">language</span>
                                        בקר באתר החברה
                                    </a>
                                    <a href={`/flights?airline=${airline.code}`} className="airline-flights-link">
                                        <span className="material-icons">search</span>
                                        חפש טיסות
                                    </a>
                                </div>
                            </div>
                            
                            <button className="details-toggle">
                                {selectedAirline === airline.id ? 'הסתר פרטים' : 'הצג פרטים'}
                                <span className="material-icons">
                                    {selectedAirline === airline.id ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredAirlines.length === 0 && (
                <div className="no-results">
                    <span className="material-icons">search_off</span>
                    <p>לא נמצאו חברות תעופה התואמות את החיפוש</p>
                    <button onClick={() => setSearchTerm("")}>נקה חיפוש</button>
                </div>
            )}

            <div className="airlines-footer">
                <h3>למה לבחור בנו?</h3>
                <div className="benefits-grid">
                    <div className="benefit-card">
                        <span className="material-icons">verified</span>
                        <h4>חברות מובילות</h4>
                        <p>אנו עובדים רק עם חברות התעופה המובילות והאמינות ביותר</p>
                    </div>
                    <div className="benefit-card">
                        <span className="material-icons">savings</span>
                        <h4>מחירים תחרותיים</h4>
                        <p>אנו מציעים את המחירים הטובים ביותר עבור כל יעד</p>
                    </div>
                    <div className="benefit-card">
                        <span className="material-icons">support_agent</span>
                        <h4>שירות לקוחות</h4>
                        <p>צוות השירות שלנו זמין 24/7 לכל שאלה או בעיה</p>
                    </div>
                    <div className="benefit-card">
                        <span className="material-icons">loyalty</span>
                        <h4>תוכנית נאמנות</h4>
                        <p>צבור נקודות בכל טיסה והמר אותן להנחות והטבות</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
