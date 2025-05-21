import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderByIdThank } from "../slices/getOrderByIdThank";
import { Home } from "./home";
import { getFlightsThank } from "../slices/getFlightsThank";
import { getOrders_Flights } from "../slices/getOrders_Flights";
import "../css/getOrdersFlights.css";
import { updateOrderThank } from "../slices/updateOrderThank";
import { deleteOrderThank } from "../slices/deleteOrderThank";

export const GetOrderById = () => {
  const passenger = useSelector(state => state.event.passenger);
  const Orders_Flights = useSelector(state => state.event.Orders_Flights);
  const dispatch = useDispatch();

  // מצב לעריכת הזמנה
  const [editingOrder, setEditingOrder] = useState(null);
  const [editFormData, setEditFormData] = useState({
    numOfFlight: 0,
    // numOfTicketsForFirstClass: 0,
    // numOfTicketsForRegilerClass: 0
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentOrderToEdit, setCurrentOrderToEdit] = useState(null);

  useEffect(() => {
    if (passenger && passenger.id) {
      dispatch(getOrders_Flights(passenger.id));
    }
  }, [dispatch, passenger]);

  // פונקציה לבדיקה האם הטיסה כבר עברה
  const isFlightPassed = (flightDate, flightTime) => {
    if (!flightDate || !flightTime) return false;

    const [day, month, year] = flightDate.split('/');
    const [hours, minutes] = flightTime.split(':');

    const flightDateTime = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );

    return flightDateTime < new Date();
  };

  // פונקציה למציאת פרטי הטיסה לפי מספר טיסה
  const findFlightByNumber = (flightNumber) => {
    return Orders_Flights.flightslist.find(flight => flight.numOfFlight === flightNumber);
  };

  const handleDeleteOrder = (orderCode) => {
 debugger
      dispatch(deleteOrderThank(orderCode))
        .then(() => {
          // רענון רשימת ההזמנות לאחר המחיקה
          dispatch(getOrderByIdThank(passenger.id));
        })
        .catch((error) => {
          console.error("שגיאה במחיקת ההזמנה:", error);
          alert("אירעה שגיאה במחיקת ההזמנה. אנא נסי שוב מאוחר יותר.");
        });
  };

  // פונקציות לטיפול בעריכת הזמנה
  const handleEditClick = (order, orderDetail) => {
    setCurrentOrderToEdit(
      order,
      //orderDetail
    );

    setEditFormData({
      numOfFlight: order.numOfFlight,
      numOfTicketsForFirstClass: orderDetail.numOfTicketsForFirstClass || 0,
      numOfTicketsForRegilerClass: orderDetail.numOfTicketsForRegilerClass || 0
    });

    setShowEditModal(true);
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: parseInt(value)
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    // יצירת אובייקט ההזמנה המעודכן
    const updatedOrder = {
      // ...currentOrderToEdit.order,
      // numOfFlight: editFormData.numOfFlight,
      // orderdetails: {
      //   ...currentOrderToEdit.order.orderdetails,
      //   numOfTicketsForFirstClass: editFormData.numOfTicketsForFirstClass,
      //   numOfTicketsForRegilerClass: editFormData.numOfTicketsForRegilerClass
      // }
...currentOrderToEdit,
orderdetails: {...currentOrderToEdit.orderdetails,
  numOfTicketsForFirstClass: editFormData.numOfTicketsForFirstClass,
    numOfTicketsForRegilerClass: editFormData.numOfTicketsForRegilerClass
    }

  }

    // שליחת העדכון לשרת
    
    dispatch(updateOrderThank(updatedOrder));

    // סגירת המודל
    setShowEditModal(false);
  };

  // מחלקות עבור הטבלה
  const getClassType = (classNum) => {
    return classNum === 1 ? "מחלקה ראשונה" : "מחלקה רגילה";
  };

  return (
    <div className="orders-page">
      <Home />
      <div className="orders-container">
        <h2 className="orders-title">ההזמנות שלי</h2>

        {Orders_Flights.orderslist && Orders_Flights.orderslist.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>מספר הזמנה</th>
                <th>מספר טיסה</th>
                <th>תאריך הזמנה</th>
                <th>מספר כרטיסים למחלקה ראשונה</th>
                <th>מספר כרטיסים למחלקה רגילה</th>
                <th>יעד</th>
                <th>מוצא</th>
                <th>חברה</th>
                <th>תאריך טיסה</th>
                <th>זמן המראה</th>
                <th>זמן נחיתה</th>
                <th>מחיר כרטיס</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {Orders_Flights.orderslist.map((order) => {
                // בדיקה שהאובייקט order הוא תקין
                if (!order || typeof order !== 'object') return null;

                // מצא את הטיסה המתאימה להזמנה זו
                const flight = findFlightByNumber(order.numOfFlight);

                // בדיקה שיש פרטי הזמנה
                if (!order.orderdetails) return null;

                // אם orderdetails הוא אובייקט בודד, טפל בו ישירות
                const detail = order.orderdetails;
                const isPassed = flight && isFlightPassed(flight.date, flight.departureTime);

                return (
                  <tr
                    key={order.code}
                    className={isPassed ? "passed-flight" : ""}
                  >
                    <td>{order.code}</td>
                    <td>{order.numOfFlight}</td>
                    <td>{order.date}</td>
                    <td>{order.orderdetails?.numOfTicketsForFirstClass || 0}</td>
                    <td>{order.orderdetails?.numOfTicketsForRegilerClass || 0}</td>

                    {/* פרטי הטיסה */}
                    {flight ? (
                      <>
                        <td>{flight.destination}</td>
                        <td>{flight.origin || flight.provenance}</td>
                        <td>{flight.company || flight.companyName}</td>
                        <td>{flight.date}</td>
                        <td>{flight.departureTime || flight.timeOfDepart}</td>
                        <td>{flight.landingTime || flight.timeOfLending}</td>
                        <td>
                          {detail.NumOfTicketsForFirstClass > 0
                            ? `${flight.firstClassPrice || flight.priceOfFirstClass} ₪`
                            : `${flight.regularClassPrice || flight.priceOfRegilerClass} ₪`}
                        </td>

                      </>
                    ) : (
                      <>
                        <td colSpan="7">פרטי טיסה לא נמצאו</td>
                        <td>-</td>
                      </>
                    )}

                    {/* כפתורי פעולות */}
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(order, detail)}
                        disabled={isPassed}
                      >
                        עריכה
                      </button>
                    </td>
                    <td className="order-actions">
                      <button
                        className="delete-booking-button"
                        onClick={()=>handleDeleteOrder(order.code)}
                      >
                        <span className="material-icons">delete</span>
                        <span>מחק הזמנה</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="no-orders">
            <p>לא נמצאו הזמנות</p>
          </div>
        )}
      </div>

      {/* חלונית עריכת הזמנה */}
      {showEditModal && currentOrderToEdit && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <h3>עריכת הזמנה מספר: {currentOrderToEdit.code}</h3>
              <button className="close-button" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <form onSubmit={handleEditFormSubmit}>
                <div className="form-group">
                  <label>מספר טיסה:</label>
                  <input
                    type="number"
                    name="numOfFlight"
                    value={editFormData.numOfFlight}
                    onChange={handleEditFormChange}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>מספר כרטיסים למחלקה ראשונה:</label>
                  <input
                    type="number"
                    name="numOfTicketsForFirstClass"
                    value={editFormData.numOfTicketsForFirstClass}
                    onChange={handleEditFormChange}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>מספר כרטיסים למחלקה רגילה:</label>
                  <input
                    type="number"
                    name="numOfTicketsForRegilerClass"
                    value={editFormData.numOfTicketsForRegilerClass}
                    onChange={handleEditFormChange}
                    min="0"
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                    ביטול
                  </button>
                  <button type="submit" className="save-btn">
                    שמור שינויים
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
