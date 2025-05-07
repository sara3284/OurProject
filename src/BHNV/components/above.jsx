import React from 'react';
import { Link } from 'react-router-dom';
import '../css/above.css';

export const Above = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1 className="about-title">אודות סוכנות הנסיעות שלנו</h1>
                <div className="about-divider"></div>
            </div>

            <div className="about-content">
                <div className="about-section">
                    <div className="about-image-container">
                        <img src='לוגו.jpg' alt="סוכנות נסיעות" className="about-image" />
                        <div className="image-overlay"></div>
                    </div>
                    
                    <div className="about-text">
                        <h2>מי אנחנו?</h2>
                        <p>
                            סוכנות הנסיעות שלנו הוקמה בשנת 2010 במטרה לספק חוויות נסיעה בלתי נשכחות ללקוחותינו.
                            אנו מתמחים בהתאמה אישית של חבילות נופש, טיסות, בתי מלון וחוויות ייחודיות בכל רחבי העולם.
                        </p>
                        <p>
                            הצוות המקצועי שלנו מורכב מאנשי מקצוע בעלי ניסיון רב בתחום התיירות, המחויבים לספק את השירות הטוב ביותר ללקוחותינו.
                            אנו מאמינים שכל נסיעה צריכה להיות חוויה מיוחדת, ולכן אנו מקפידים על תשומת לב לפרטים הקטנים ביותר.
                        </p>
                    </div>
                </div>

                <div className="about-features">
                    <h2 className="features-title">למה לבחור בנו?</h2>
                    
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="material-icons">flight</i>
                            </div>
                            <h3>מגוון יעדים</h3>
                            <p>אנו מציעים מגוון רחב של יעדים ברחבי העולם, מהיעדים הפופולריים ביותר ועד למקומות אקזוטיים ונידחים.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="material-icons">savings</i>
                            </div>
                            <h3>מחירים תחרותיים</h3>
                            <p>אנו עובדים עם ספקים רבים כדי להבטיח את המחירים הטובים ביותר עבור לקוחותינו, ללא פשרות על איכות.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="material-icons">support_agent</i>
                            </div>
                            <h3>שירות אישי</h3>
                            <p>צוות השירות שלנו זמין עבורכם לאורך כל הדרך, מרגע ההזמנה ועד לחזרה הביתה.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="material-icons">verified</i>
                            </div>
                            <h3>אמינות ובטחון</h3>
                            <p>אנו מחויבים לספק שירות אמין ובטוח, עם אחריות מלאה על כל הזמנה.</p>
                        </div>
                    </div>
                </div>

                <div className="about-team">
                    <h2 className="team-title">הצוות שלנו</h2>
                    
                    <div className="team-grid">
                        <div className="team-member">
                            <div className="member-image">
                                <img src="/images/team-1.jpg" alt="מנהל סוכנות" />
                            </div>
                            <h3>יוסי כהן</h3>
                            <p className="member-role">מנכ"ל ומייסד</p>
                            <p className="member-desc">בעל 20 שנות ניסיון בתחום התיירות והנסיעות</p>
                        </div>
                        
                        <div className="team-member">
                            <div className="member-image">
                                <img src="/images/team-2.jpg" alt="מנהלת שירות" />
                            </div>
                            <h3>מיכל לוי</h3>
                            <p className="member-role">מנהלת שירות לקוחות</p>
                            <p className="member-desc">מומחית ביחסי לקוחות ופתרון בעיות</p>
                        </div>
                        
                        <div className="team-member">
                            <div className="member-image">
                                <img src="/images/team-3.jpg" alt="יועץ נסיעות" />
                            </div>
                            <h3>דני אברהם</h3>
                            <p className="member-role">יועץ נסיעות בכיר</p>
                            <p className="member-desc">מומחה ליעדים אקזוטיים ונסיעות הרפתקאות</p>
                        </div>
                    </div>
                </div>

                <div className="about-testimonials">
                    <h2 className="testimonials-title">מה לקוחותינו אומרים</h2>
                    
                    <div className="testimonials-slider">
                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <p>"שירות מעולה! הצוות עזר לנו לתכנן חופשה משפחתית מושלמת. כל הפרטים היו מסודרים להפליא."</p>
                            </div>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    <img src="/images/avatar-1.jpg" alt="לקוח" />
                                </div>
                                <div className="author-info">
                                    <h4>רונית שמעוני</h4>
                                    <div className="rating">
                                        <i className="material-icons">star</i>
                                        <i className="material-icons">star</i>
                                        <i className="material-icons">star</i>
                                        <i className="material-icons">star</i>
                                        <i className="material-icons">star</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <p>"הזמנתי טיסה ברגע האחרון והצוות הצליח למצוא לי את הדיל הטוב ביותר. מומלץ בחום!"</p>
                            </div>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    <img src="/images/avatar-2.jpg" alt="לקוח" />
                                </div>
                                <div className="author-info">
                                    <h4>אלון דוידוב</h4>
                                    <div className="rating">
                                        <i className="material-icons">star</i>
                                        <i className="material-icons">star</i>
                                        <i className="material-icons">star</i>
                                        <i className="material-icons">star</i>
                                        <i className="material-icons">star_half</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-cta">
                <h2>מוכנים להתחיל את ההרפתקה הבאה שלכם?</h2>
                <p>צרו קשר עם הצוות שלנו עוד היום ונעזור לכם לתכנן את החופשה המושלמת.</p>
                <div className="cta-buttons">
                    <Link to="/kesher" className="cta-button primary">צור קשר</Link>
                    <Link to="/flights" className="cta-button secondary">חפש טיסות</Link>
                </div>
            </div>
        </div>
    );
};