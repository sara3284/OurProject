// import { useSelector, useDispatch } from "react-redux";

// //import { getThank } from "../slices/getThank";
// //import { getByCompanyThank } from "../slices/getByCompanyThank";
// import { useEffect, useRef, useState } from "react"
// import { getOrderByIdThank } from "../slices/getOrderByIdThank";
// import { Home } from "./home";
// import { getFlightsThank } from "../slices/getFlightsThank";
// import { getOrders_Flights } from "../slices/getOrders_Flights";

// export const GetOrderById = () => {
//     const passenger = useSelector(state => state.event.passenger);
//     const flights = useSelector(state => state.event.flights);
//     const orders = useSelector(state => state.event.orders);
//     const Orders_Flights = useSelector(state => state.event.Orders_Flights);
//     const dispatch = useDispatch();
//     const [id, setId] = useState("");
//     const [change, setChange] = useState(true);
//     useEffect( () => {  
//          dispatch(getOrders_Flights(passenger.id));
//     },[]);


//     return <div>
//         <Home></Home>
//         {/* <button onClick={() => dispatch(getOrderByIdThank(passenger.id))}>הצג טיסות</button>
//     <div>{passenger.name}</div> */}

//         {/* <button> onClick={() => dispatch(getByCompanyThank(company))}ggg</button>            */}



//             < table >
//             <thead>
//                 <th>מספר טיסה:</th>
//                 <th>יעד:</th>
//                 <th>מוצא:</th>
//                 <th>חברה:</th>
//                 <th>תאריך טיסה:</th>
//                 <th>זמן המראה:</th>
//                 <th>זמן נחיתה:</th>
//                 <th>מחיר כרטיס למחלקה ראשונה:</th>
//                 <th>מחיר כרטיס למחלקה רגילה:</th>
//                 <th>?ישיר:</th>
//                 <th>תחנת ביניים:</th>
//             </thead>

//             {orders && orders.map((order, index) => (

//                 <tbody>
//                     <th>  {order.code}  </th>
//                     <th>  {order.numOfFlight}  </th>
//                     <th>  {order.passengerId}  </th>
//                     <th>  {order.date}  </th>
//                     <th>{order.orderdetails.map((detail, detailIndex) => (
//             <div key={detailIndex} className="order-detail">
//               <th>{detail.orderCode}</th>
//               <p>מספר כרטיסים: {detail.numOfTickets}</p>
//               <p>מחלקה: {detail.numClass}</p>
//             </div>
//           ))}</th>

//                 </tbody>
//             ))}
//     </table>
//     </div >
// }


// ------------------------------------
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderByIdThank } from "../slices/getOrderByIdThank";
import { Home } from "./home";
import { getFlightsThank } from "../slices/getFlightsThank";
import { getOrders_Flights } from "../slices/getOrders_Flights";
//import { updateOrderThank } from "../slices/updateOrderThank"; // יש ליצור slice זה
import "../css/getOrdersFlights.css"; // נוסיף קובץ CSS לעיצוב

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
    return Orders_Flights.flightslist.find(flight => flight.numFlight === flightNumber);
  };

  // פונקציות לטיפול בעריכת הזמנה
  const handleEditClick = (order, orderDetail) => {
    setEditingOrder({
      orderCode: order.code,
      detailCode: orderDetail.orderCode
    });
    
    setEditFormData({
      numOfTickets: orderDetail.numOfTickets,
      numClass: orderDetail.numClass
    });
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
//     dispatch(updateOrderThank({
//       orderCode: editingOrder.orderCode,
//       detailCode: editingOrder.detailCode,
//       numOfTickets: editFormData.numOfTickets,
//       numClass: editFormData.numClass
//     }));
    
//     setEditingOrder(null);
//   };

//   const handleCancelClick = () => {
//     setEditingOrder(null);
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
                <th>מספר כרטיסים</th>
                <th>מחלקה</th>
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
                // מצא את הטיסה המתאימה להזמנה זו
                debugger
                const flight = findFlightByNumber(order.numOfFlight);
                
                return order.orderdetails.map((detail, detailIndex) => {
                  // בדוק אם הטיסה כבר עברה
                  const isPassed = flight && isFlightPassed(flight.date, flight.departureTime);
                  
                  return (
                    <tr 
                      key={`${order.code}-${detailIndex}`}
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
                              name="numOfTickets"
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
                          <td>{detail.numOfTickets}</td>
                          <td>{getClassType(detail.numClass)}</td>
                        </>
                      )}
                      
                      {/* פרטי הטיסה */}
                      {flight ? (
                        <>
                          <td>{flight.destination}</td>
                          <td>{flight.origin}</td>
                          <td>{flight.company}</td>
                          <td>{flight.date}</td>
                          <td>{flight.departureTime}</td>
                          <td>{flight.landingTime}</td>
                          <td>
                            {detail.numClass === 1 
                              ? `${flight.firstClassPrice} ₪` 
                              : `${flight.regularClassPrice} ₪`}
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
                            //   onClick={handleCancelClick}
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
                });
              })}
            </tbody>
          </table>
        ) : (
          <div className="no-orders">
            <p>לא נמצאו הזמנות</p>
          </div>
        )}
      </div>
    </div>
  );
};
