
import { Route, Routes } from 'react-router-dom';

import { Get } from '../BHNV/components/get';
import { Login } from '../BHNV/components/login';
import { Logon } from '../BHNV/components/logon';
import { Home } from '../BHNV/components/home';
import { GetOrderById } from '../BHNV/components/getOrdersById';
import { AddOrder } from '../BHNV/components/addOrder';
import { Pay } from '../BHNV/components/pay';
import { GetFlights } from '../BHNV/components/getFlights';
import { Manager } from '../BHNV/components/manager';
import { GetOrders } from '../BHNV/components/getOrders';


export const Routing = () => {
    return <>
        <Routes>
        {/* <Route path="" element={<Get />} /> */}
        <Route path="" element={<Logon />} />
        <Route path="manager" element={<Manager />}/>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="getMyOrders" element={<GetOrderById/>} />
        <Route path="addOrder" element={<AddOrder/>} />
        <Route path="pay" element={<Pay/>} />
        <Route path="getFlights" element={<GetFlights/>} />
        <Route path="getOrders" element={<GetOrders/>} />



        </Routes>
     
    </>
}




