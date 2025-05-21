import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getCompanyThank } from "../slices/getCompanyThank";
import { Manager } from "./manager";
import '../css/manageCompanies.css';

export const ManageCompanies = () => {
    const dispatch = useDispatch();
    const companies = useSelector(state => state.event.companies);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
    const [showEditCompanyModal, setShowEditCompanyModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [newCompany, setNewCompany] = useState({
        companyCode: "",
        companyName: "",
        country: "",
        foundedYear: "",
        logo: "",
        website: "",
        fleetSize: "",
        description: ""
    });

    useEffect(() => {
        setIsLoading(true);
        dispatch(getCompanyThank())
            .finally(() => {
                setIsLoading(false);
            });
    }, [dispatch]);

    const handleAddCompany = () => {
        // בדיקת תקינות הנתונים
        if (!newCompany.companyName || !newCompany.country) {
            alert("נא למלא את כל שדות החובה");
            return;
        }

        // לצורך הדגמה בלבד - יש להחליף בקוד אמיתי
        console.log("מוסיף חברה חדשה:", newCompany);
        alert("החברה נוספה בהצלחה!");
        setShowAddCompanyModal(false);
        resetCompanyForm();
    };

    // const handleEditCompany = () => {
    //     // לצורך הדגמה בלבד - יש להחליף בקוד אמיתי
    //     console.log("עורך חברה:", selectedCompany);
    //     alert("פרטי החברה עודכנו בהצלחה!");
    //     setShowEditCompanyModal(false);
    // };

    const handleDeleteCompany = (companyCode) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את החברה?")) {
            // לצורך הדגמה בלבד - יש להחליף בקוד אמיתי
           dispatch(deleteCompanyThank(companyCode));
        }
    };

    const resetCompanyForm = () => {
        setNewCompany({
            companyCode: "",
            companyName: "",
            country: "",
            foundedYear: "",
            logo: "",
            website: "",
            fleetSize: "",
            description: ""
        });
    };

    const handleCompanySelect = (company) => {
        setSelectedCompany(company);
        setShowEditCompanyModal(true);
    };

    return (
        <div className="companies-container">
            <Manager />
            <div className="companies-header">
                <h1>ניהול חברות תעופה</h1>
                <button 
                    className="add-company-button" 
                    onClick={() => {
                        resetCompanyForm();
                        setShowAddCompanyModal(true);
                    }}
                >
                    <i className="material-icons">add_circle</i>
                    <span>הוספת חברה חדשה</span>
                </button>
            </div>

            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>טוען חברות תעופה...</p>
                </div>
            ) : companies && companies.length > 0 ? (
                <div className="companies-grid">
                    {companies.map((company) => (
                        <div key={company.companyCode} className="company-card">
                            <div className="company-logo">
                                {company.logo ? (
                                    <img src={company.logo} alt={company.companyName} />
                                ) : (
                                    <div className="default-logo">
                                        <i className="material-icons">flight</i>
                                    </div>
                                )}
                            </div>
                            <div className="company-info">
                                <h3>{company.companyName}</h3>
                                <p className="company-code">קוד חברה: {company.companyCode}</p>
                                {company.country && <p className="company-country">מדינה: {company.country}</p>}
                                {company.foundedYear && <p className="company-founded">נוסדה: {company.foundedYear}</p>}
                                {company.fleetSize && <p className="company-fleet">גודל צי: {company.fleetSize} מטוסים</p>}
                            </div>
                            <div className="company-actions">
                                <button 
                                    className="edit-button" 
                                    onClick={() => handleCompanySelect(company)}
                                    title="ערוך פרטי חברה"
                                >
                                    <i className="material-icons">edit</i>
                                </button>
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleDeleteCompany(company.companyCode)}
                                    title="מחק חברה"
                                >
                                    <i className="material-icons">delete</i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-companies">
                    <i className="material-icons">flight_off</i>
                    <p>לא נמצאו חברות תעופה במערכת</p>
                    <button 
                        className="add-first-company-button" 
                        onClick={() => {
                            resetCompanyForm();
                            setShowAddCompanyModal(true);
                        }}
                    >
                        הוסף חברה ראשונה
                    </button>
                </div>
            )}

            {/* חלונית הוספת חברה חדשה */}
            {showAddCompanyModal && (
                <div className="modal-overlay">
                    <div className="company-modal">
                        <div className="modal-header">
                            <h3>הוספת חברת תעופה חדשה</h3>
                            <button 
                                className="close-button" 
                                onClick={() => {
                                    setShowAddCompanyModal(false);
                                    resetCompanyForm();
                                }}
                            >
                                <i className="material-icons">close</i>
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>שם החברה: <span className="required">*</span></label>
                                    <input 
                                        type="text" 
                                        value={newCompany.companyName} 
                                        onChange={(e) => setNewCompany({...newCompany, companyName: e.target.value})}
                                        placeholder="הזן שם חברה"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>קוד חברה:</label>
                                    <input 
                                        type="number" 
                                        value={newCompany.companyCode} 
                                        onChange={(e) => setNewCompany({...newCompany, companyCode: e.target.value})}
                                        placeholder="הקוד יוקצה אוטומטית אם לא יוזן"
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>מדינת מקור: <span className="required">*</span></label>
                                    <input 
                                        type="text" 
                                        value={newCompany.country} 
                                        onChange={(e) => setNewCompany({...newCompany, country: e.target.value})}
                                        placeholder="הזן מדינת מקור"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>שנת הקמה:</label>
                                    <input 
                                        type="number" 
                                        value={newCompany.foundedYear} 
                                        onChange={(e) => setNewCompany({...newCompany, foundedYear: e.target.value})}
                                        placeholder="הזן שנת הקמה"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>כתובת אתר:</label>
                                    <input 
                                        type="url" 
                                        value={newCompany.website} 
                                        onChange={(e) => setNewCompany({...newCompany, website: e.target.value})}
                                        placeholder="הזן כתובת אתר"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>גודל צי (מספר מטוסים):</label>
                                    <input 
                                        type="number" 
                                        value={newCompany.fleetSize} 
                                        onChange={(e) => setNewCompany({...newCompany, fleetSize: e.target.value})}
                                        placeholder="הזן גודל צי"
                                        min="1"
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group full-width">
                                    <label>קישור ללוגו:</label>
                                    <input 
                                        type="url" 
                                        value={newCompany.logo} 
                                        onChange={(e) => setNewCompany({...newCompany, logo: e.target.value})}
                                        placeholder="הזן קישור לתמונת לוגו"
                                    />
                                </div>
                                </div>
                            
                            <div className="form-row">
                                <div className="form-group full-width">
                                    <label>תיאור החברה:</label>
                                    <textarea 
                                        value={newCompany.description} 
                                        onChange={(e) => setNewCompany({...newCompany, description: e.target.value})}
                                        placeholder="הזן תיאור קצר של החברה"
                                        rows="4"
                                    ></textarea>
                                </div>
                            </div>
                            
                            <div className="form-note">
                                <span className="required">*</span> שדות חובה
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button 
                                className="cancel-button" 
                                onClick={() => {
                                    setShowAddCompanyModal(false);
                                    resetCompanyForm();
                                }}
                            >
                                ביטול
                            </button>
                            <button 
                                className="save-button" 
                                onClick={handleAddCompany}
                            >
                                הוסף חברה
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* חלונית עריכת חברה */}
            {showEditCompanyModal && selectedCompany && (
                <div className="modal-overlay">
                    <div className="company-modal">
                        <div className="modal-header">
                            <h3>עריכת פרטי חברת תעופה</h3>
                            <button 
                                className="close-button" 
                                onClick={() => setShowEditCompanyModal(false)}
                            >
                                <i className="material-icons">close</i>
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>שם החברה: <span className="required">*</span></label>
                                    <input 
                                        type="text" 
                                        value={selectedCompany.companyName} 
                                        onChange={(e) => setSelectedCompany({...selectedCompany, companyName: e.target.value})}
                                        placeholder="הזן שם חברה"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>קוד חברה:</label>
                                    <input 
                                        type="number" 
                                        value={selectedCompany.companyCode} 
                                        disabled
                                        className="disabled-input"
                                    />
                                    <small className="input-note">לא ניתן לשנות את קוד החברה</small>
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>מדינת מקור: <span className="required">*</span></label>
                                    <input 
                                        type="text" 
                                        value={selectedCompany.country || ""} 
                                        onChange={(e) => setSelectedCompany({...selectedCompany, country: e.target.value})}
                                        placeholder="הזן מדינת מקור"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>שנת הקמה:</label>
                                    <input 
                                        type="number" 
                                        value={selectedCompany.foundedYear || ""} 
                                        onChange={(e) => setSelectedCompany({...selectedCompany, foundedYear: e.target.value})}
                                        placeholder="הזן שנת הקמה"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>כתובת אתר:</label>
                                    <input 
                                        type="url" 
                                        value={selectedCompany.website || ""} 
                                        onChange={(e) => setSelectedCompany({...selectedCompany, website: e.target.value})}
                                        placeholder="הזן כתובת אתר"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>גודל צי (מספר מטוסים):</label>
                                    <input 
                                        type="number" 
                                        value={selectedCompany.fleetSize || ""} 
                                        onChange={(e) => setSelectedCompany({...selectedCompany, fleetSize: e.target.value})}
                                        placeholder="הזן גודל צי"
                                        min="1"
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group full-width">
                                    <label>קישור ללוגו:</label>
                                    <input 
                                        type="url" 
                                        value={selectedCompany.logo || ""} 
                                        onChange={(e) => setSelectedCompany({...selectedCompany, logo: e.target.value})}
                                        placeholder="הזן קישור לתמונת לוגו"
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group full-width">
                                    <label>תיאור החברה:</label>
                                    <textarea 
                                        value={selectedCompany.description || ""} 
                                        onChange={(e) => setSelectedCompany({...selectedCompany, description: e.target.value})}
                                        placeholder="הזן תיאור קצר של החברה"
                                        rows="4"
                                    ></textarea>
                                </div>
                            </div>
                            
                            <div className="form-note">
                                <span className="required">*</span> שדות חובה
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button 
                                className="cancel-button" 
                                onClick={() => setShowEditCompanyModal(false)}
                            >
                                ביטול
                            </button>
                            <button 
                                className="save-button" 
                                onClick={handleEditCompany}
                            >
                                שמור שינויים
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


