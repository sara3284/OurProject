import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderByIdThank } from "../slices/getOrderByIdThank";
import { Home } from "./home";
import { getFlightsThank } from "../slices/getFlightsThank";
import { getOrders_Flights } from "../slices/getOrders_Flights";
import "../css/getOrdersFlights.css";

export const GetOrderById = () => {
  const passenger = useSelector(state => state.event.passenger);
  const Orders_Flights = useSelector(state => state.event.Orders_Flights);
  const dispatch = useDispatch();

  // מצב לעריכת הזמנה
  const [editingOrder, setEditingOrder] = useState(null);
  const [editFormData, setEditFormData] = useState({
    numOfTickets: 0,
    numClass: 0
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
    debugger
    return Orders_Flights.flightslist.find(flight => flight.numOfFlight === flightNumber);
  };

  // פונקציות לטיפול בעריכת הזמנה
  const handleEditClick = (order, orderDetail) => {
    setEditingOrder({
      orderCode: order.code,
      detailCode: orderDetail.orderCode
    });

    setEditFormData({


      numOfTickets: orderDetail.numOfTickets || 
                   (orderDetail.NumOfTicketsForFirstClass + orderDetail.NumOfTicketsForRegilerClass),
      numClass: orderDetail.numClass || 
               (orderDetail.NumOfTicketsForFirstClass > 0 ? 1 : 2)
    });
    
    // שורות חדשות - שמירת ההזמנה הנוכחית ופתיחת המודל
    setCurrentOrderToEdit({ order, orderDetail });
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
    // כאן תצטרך ליצור פעולה לעדכון ההזמנה ב-Redux
    setEditingOrder(null);
  };

  const handleCancelClick = () => {
    setEditingOrder(null);
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
                <th>מספר כרטיסים למחלקה שניה</th>
                <th>יעד</th>
                <th>מוצא</th>
                <th>חברה</th>
                <th>תאריך טיסה</th>
                <th>זמן המראה</th>
                <th>זמן נחיתה</th>
                <th>מחיר כרטיס</th>
                <th>סטטוס</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {Orders_Flights.orderslist.map((order) => {
                // בדיקה שהאובייקט order הוא תקין
                if (!order || typeof order !== 'object') return null;
                
                // מצא את הטיסה המתאימה להזמנה זו
                debugger
                const flight = findFlightByNumber(order.numOfFlight);
                
                // בדיקה שיש פרטי הזמנה
                if (!order.orderdetails) return null;
                
                // אם orderdetails הוא מערך, השתמש ב-map
                if (Array.isArray(order.orderdetails)) {
                  // return order.orderdetails.map((detail, detailIndex) => {
                  //   // בדוק אם הטיסה כבר עברה
                  //   const isPassed = flight && isFlightPassed(flight.date, flight.departureTime);

                  //   return (
                  //     <tr
                  //       key={`${order.code}-${detailIndex}`}
                  //       className={isPassed ? "passed-flight" : ""}
                  //     >
                  //       <td>{order.code}</td>
                  //       <td>{order.numOfFlight}</td>
                  //       <td>{order.date}</td>
                  //       <td>{order.order.orderdetails.numOfTicketsForFirstClass}kkkkkkk</td>
                  //       {/* {editingOrder &&
                  //         editingOrder.orderCode === order.code &&
                  //         editingOrder.detailCode === detail.orderCode ? (
                  //         <>
                  //           <td>
                  //             <input
                  //               type="number"
                  //               name="numOfTickets"
                  //               value={editFormData.numOfTickets}
                  //               onChange={handleEditFormChange}
                  //               min="1"
                  //             />
                  //           </td>
                  //           <td>
                  //             <select
                  //               name="numClass"
                  //               value={editFormData.numClass}
                  //               onChange={handleEditFormChange}
                  //             >
                  //               <option value="1">מחלקה ראשונה</option>
                  //               <option value="2">מחלקה רגילה</option>
                  //             </select>
                  //           </td>
                  //         </>
                  //       ) : (
                  //         <>
                  //           <td>{detail.numOfTickets}</td>
                  //           <td>{getClassType(detail.numClass)}</td>
                  //         </>
                  //       )} */}

                  //       {/* פרטי הטיסה */}
                  //       {flight ? (
                  //         <>
                  //           <td>{flight.destination}</td>
                  //           <td>{flight.origin}</td>
                  //           <td>{flight.company}</td>
                  //           <td>{flight.date}</td>
                  //           <td>{flight.departureTime}</td>
                  //           <td>{flight.landingTime}</td>
                  //           <td>
                  //             {detail.numClass === 1
                  //               ? `${flight.firstClassPrice} ₪`
                  //               : `${flight.regularClassPrice} ₪`}
                  //           </td>
                  //           <td className={isPassed ? "status-passed" : "status-upcoming"}>
                  //             {isPassed ? "טיסה עברה" : "טיסה עתידית"}
                  //           </td>
                  //         </>
                  //       ) : (
                  //         <>
                  //           <td colSpan="7">פרטי טיסה לא נמצאו</td>
                  //           <td>-</td>
                  //         </>
                  //       )}

                  //       {/* כפתורי פעולות */}
                  //       <td>
                  //         {editingOrder &&
                  //           editingOrder.orderCode === order.code &&
                  //           editingOrder.detailCode === detail.orderCode ? (
                  //           <div className="edit-actions">
                  //             <button
                  //               className="save-btn"
                  //               onClick={handleEditFormSubmit}
                  //             >
                  //               שמור
                  //             </button>
                  //             <button
                  //               className="cancel-btn"
                  //               onClick={handleCancelClick}
                  //             >
                  //               בטל
                  //             </button>
                  //           </div>
                  //         ) : (
                  //           <button
                  //             className="edit-btn"
                  //             onClick={() => handleEditClick(order, detail)}
                  //             disabled={isPassed}
                  //           >
                  //             עריכה
                  //           </button>
                  //         )}
                  //       </td>
                  //     </tr>
                  //   );
                  // });
                } else {
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

                      {editingOrder &&
                        editingOrder.orderCode === order.code &&
                        editingOrder.detailCode === detail.orderCode ? (
                        <>
                          <td>
                            <input
                              type="number"
                              name="numOfTicketsForFirstClass"
                              value={editFormData.numOfTickets}
                              onChange={handleEditFormChange}
                              min="1"
                            />
                          </td>
                          <td>
                            <select
                              name="numClass"
                              value={editFormData.numClass}
                              onChange={handleEditFormChange}
                            >
                              <option value="1">מחלקה ראשונה</option>
                              <option value="2">מחלקה רגילה</option>
                            </select>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{detail.NumOfTicketsForFirstClass + detail.NumOfTicketsForRegilerClass}</td>
                          <td>{detail.NumOfTicketsForFirstClass > 0 ? "מחלקה ראשונה" : "מחלקה רגילה"}</td>
                        </>
                      )}

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
                          <td className={isPassed ? "status-passed" : "status-upcoming"}>
                            {isPassed ? "טיסה עברה" : "טיסה עתידית"}
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
                        {editingOrder &&
                          editingOrder.orderCode === order.code &&
                          editingOrder.detailCode === detail.orderCode ? (
                          <div className="edit-actions">
                            <button
                              className="save-btn"
                              onClick={handleEditFormSubmit}
                            >
                              שמור
                            </button>
                            <button
                              className="cancel-btn"
                              onClick={handleCancelClick}
                            >
                              בטל
                            </button>
                          </div>
                        ) : (
                          <button
                            className="edit-btn"
                            onClick={() => handleEditClick(order, detail)}
                            disabled={isPassed}
                          >
                            עריכה
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        ) : (
          <div className="no-orders">
            <p>לא נמצאו הזמנות</p>
          </div>
        )}
      </div>
      {showEditModal && currentOrderToEdit && (
  <div className="modal-overlay">
    <div className="edit-modal">
      <div className="modal-header">
        <h3>עריכת הזמנה</h3>
        <button className="close-button" onClick={() => setShowEditModal(false)}>×</button>
      </div>
      <div className="modal-content">
        <form onSubmit={handleEditFormSubmit}>
          <div className="form-group">
            <label>מספר הזמנה:</label>
            <input type="text" value={currentOrderToEdit.order.code} disabled />
          </div>
          <div className="form-group">
            <label>מספר טיסה:</label>
            <input type="text" value={currentOrderToEdit.order.numOfFlight} disabled />
          </div>
          <div className="form-group">
            <label>מספר כרטיסים:</label>
            <input
              type="number"
              name="numOfTickets"
              value={editFormData.numOfTickets}
              onChange={handleEditFormChange}
              min="1"
            />
          </div>
          <div className="form-group">
            <label>מחלקה:</label>
            <select
              name="numClass"
              value={editFormData.numClass}
              onChange={handleEditFormChange}
            >
              <option value="1">מחלקה ראשונה</option>
              <option value="2">מחלקה רגילה</option>
            </select>
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
