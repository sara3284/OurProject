import './App.css';
import { GetOrderById } from './BHNV/components/getOrdersById';
import { Login } from './BHNV/components/login';
import { AddOrder } from './BHNV/components/addOrder';
import { GetEvent } from './sikum/getEventThank';



import { Routing } from './sikum/routing';
//import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <div>

<Routing></Routing>
{/* <GetOrderById></GetOrderById> */}
{/* <AddOrder></AddOrder> */}
{/* <Login></Login> */}
{/* <GetEvent></GetEvent> */}
    </div>
  );
}

export default App;
