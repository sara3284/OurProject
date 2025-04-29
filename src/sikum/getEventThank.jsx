import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getEventThank } from "./sliaaaces/getEventThank";
import { Login } from "../BHNV/components/login";
import { Logon } from "../BHNV/components/logon";

export const GetEvent = () => {

    const user = useSelector(state => state.event.flights);
    const dispatch = useDispatch();
    const funLogin = async () => {

        // alert(details.username+" "+details.password);
        // dispatch(loginThank(details));
        dispatch(getEventThank())
        // if (tokenn !== -1){
        //     finish();
        // }
    }


    return <div>
        <button onClick={() => funLogin()}>dddddddddddddddd</button>
        <div>Welcome {user}!</div>
        <h1>gfdhgjhkjkjjj</h1>
        <div className="divv">
            {/* <img src="logohome.jpg" className="logohome" /><br /> */}

        </div>
        <Link to={'/calendar'}><button className="buttonhome"></button></Link><br />
        <Link to={'/mcalendar'}><button className="buttonhome"></button></Link>
        <Login></Login>
        <Logon></Logon>
    </div>
}