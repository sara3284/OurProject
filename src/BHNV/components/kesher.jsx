import React, { useState } from 'react';
import '../css/kesher.css';

export const Kesher = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        error: false,
        message: ''
    });

    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // נקה שגיאות כאשר המשתמש מתחיל להקליד
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'נא להזין שם מלא';
        }

        if (!formData.email.trim()) {
            errors.email = 'נא להזין כתובת אימייל';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'נא להזין כתובת אימייל תקינה';
        }

        if (!formData.phone.trim()) {
            errors.phone = 'נא להזין מספר טלפון';
        } else if (!/^0\d{8,9}$/.test(formData.phone)) {
            errors.phone = 'נא להזין מספר טלפון תקין';
        }

        if (!formData.subject.trim()) {
            errors.subject = 'נא לבחור נושא פנייה';
        }

        if (!formData.message.trim()) {
            errors.message = 'נא להזין את תוכן ההודעה';
        } else if (formData.message.trim().length < 10) {
            errors.message = 'ההודעה קצרה מדי, נא להרחיב';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // כאן יש להוסיף את הלוגיקה לשליחת הטופס לשרת
            // לדוגמה: dispatch(sendContactFormThank(formData));

            // מדמה שליחה מוצלחת
            setFormStatus({
                submitted: true,
                error: false,
                message: 'הודעתך התקבלה בהצלחה! נציג יצור איתך קשר בהקדם.'
            });

            // איפוס הטופס
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        }
    };

    const contactInfo = [
        { icon: 'phone', title: 'טלפון', content: '03-1234567', link: 'tel:031234567' },
        { icon: 'email', title: 'אימייל', content: 'info@skyways.co.il', link: 'mailto:info@skyways.co.il' },
        { icon: 'location_on', title: 'כתובת', content: 'רחוב הרצל 123, תל אביב', link: 'https://maps.google.com/?q=הרצל+123+תל+אביב' },
        { icon: 'access_time', title: 'שעות פעילות', content: 'א-ה: 09:00-18:00, ו: 09:00-13:00', link: null }
    ];

    return (
        <div className="contact-page">
            <div className="background-animation"></div>

            <div className="contact-header">
                <h1>צור קשר</h1>
                <p>אנחנו כאן לענות על כל שאלה, בקשה או הצעה. מלאו את הטופס ונחזור אליכם בהקדם.</p>
            </div>

            <div className="contact-container">
                <div className="contact-info-panel">
                    <div className="info-header">
                        <h2>פרטי התקשרות</h2>
                        <p>מוזמנים ליצור איתנו קשר באחת מהדרכים הבאות:</p>
                    </div>

                    <div className="info-items">
                        {contactInfo.map((item, index) => (
                            <div className="info-item" key={index}>
                                <div className="info-icon">
                                    <i className="material-icons">{item.icon}</i>
                                </div>
                                <div className="info-content">
                                    <h3>{item.title}</h3>
                                    {item.link ? (
                                        <a href={item.link} target={item.icon === 'location_on' ? '_blank' : undefined} rel="noopener noreferrer">
                                            {item.content}
                                        </a>
                                    ) : (
                                        <p>{item.content}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="social-links">
                        <h3>עקבו אחרינו</h3>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                                <i className="material-icons">facebook</i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                                <i className="material-icons">photo_camera</i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                                <i className="material-icons">chat</i>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                                <i className="material-icons">work</i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="contact-form-panel">
                    {formStatus.submitted ? (
                        <div className="form-success-message">
                            <div className="success-icon">
                                <i className="material-icons">check_circle</i>
                            </div>
                            <h2>תודה על פנייתך!</h2>
                            <p>{formStatus.message}</p>
                            <button
                                className="new-message-button"
                                onClick={() => setFormStatus({ submitted: false, error: false, message: '' })}
                            >
                                שליחת הודעה נוספת
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-header">
                                <h2>שליחת הודעה</h2>
                                <p>מלאו את הפרטים ונחזור אליכם בהקדם</p>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">שם מלא <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={formErrors.name ? 'error' : ''}
                                        placeholder="הזינו את שמכם המלא"
                                    />
                                    {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">אימייל <span className="required">*</span></label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={formErrors.email ? 'error' : ''}
                                        placeholder="הזינו את כתובת האימייל שלכם"
                                    />
                                    {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">טלפון <span className="required">*</span></label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={formErrors.phone ? 'error' : ''}
                                        placeholder="הזינו את מספר הטלפון שלכם"
                                    />
                                    {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">נושא הפנייה <span className="required">*</span></label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className={formErrors.subject ? 'error' : ''}
                                    >
                                        <option value="">בחרו נושא</option>
                                        <option value="booking">הזמנת טיסה</option>
                                        <option value="cancel">ביטול הזמנה</option>
                                        <option value="change">שינוי פרטי הזמנה</option>
                                        <option value="info">מידע כללי</option>
                                        <option value="complaint">תלונה</option>
                                        <option value="other">אחר</option>
                                    </select>
                                    {formErrors.subject && <div className="error-message">{formErrors.subject}</div>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">תוכן ההודעה <span className="required">*</span></label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={formErrors.message ? 'error' : ''}
                                    placeholder="כתבו את הודעתכם כאן..."
                                    rows="5"
                                ></textarea>
                                {formErrors.message && <div className="error-message">{formErrors.message}</div>}
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="submit-button">
                                    <i className="material-icons">send</i>
                                    שליחת הודעה
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <div className="map-section">
                <h2>מיקום המשרד</h2>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.3289033130297!2d34.77234491520177!3d32.06459882719456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b82a6148a07%3A0x9f5e6e5e6f585463!2z16jXl9eV15Eg15TXqNem15wgMTIzLCDXqtecINeQ15HXmdeR!5e0!3m2!1siw!2sil!4v1651234567890!5m2!1siw!2sil"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="מפת המשרד"
                    ></iframe>
                </div>
            </div>

            <div className="faq-section">
                <h2>שאלות נפוצות</h2>
                <div className="faq-container">
                    <div className="faq-item">
                        <div className="faq-question">
                            <h3>איך אני יכול לשנות את פרטי ההזמנה שלי?</h3>
                            <i className="material-icons">expand_more</i>
                        </div>
                        <div className="faq-answer">
                            <p>ניתן לשנות את פרטי ההזמנה באזור האישי באתר, או ליצור קשר עם שירות הלקוחות שלנו בטלפון 03-1234567. שינויים בהזמנה כפופים למדיניות השינויים והביטולים.</p>
                        </div>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question">
                            <h3>מה מדיניות הביטולים שלכם?</h3>
                            <i className="material-icons">expand_more</i>
                        </div>
                        <div className="faq-answer">
                            <p>מדיניות הביטולים משתנה בהתאם לסוג הכרטיס שרכשתם. ככלל, ביטול עד 48 שעות לפני</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
