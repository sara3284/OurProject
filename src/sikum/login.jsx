import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
//import { Route } from "react-router-dom";
//import { Routing } from "./routing";
import { useDispatch ,useSelector} from "react-redux";
//import { login } from "./slices/userSlice";
import { loginThank } from "./slices/loginThank";
import { useNavigate } from "react-router-dom";
import { editUser } from "./slices/userSlice";
import { getEventThank } from "./slices/getEventThank";


export const Login = () => {

    const [details, setDetails] = useState({ username: "", password: "" });
    const tokenn = useSelector(state => state.user?.token);
    const sucsses = useSelector(state => state.user?.sucsses);
    const navigate = useNavigate();


const dispatch = useDispatch();

const funLogin = (details) => {

// alert(details.username+" "+details.password);
        dispatch(loginThank(details));
        //dispatch(getEventThank())
        // if (tokenn !== -1){
        //     finish();
        // }
}

useEffect(() => {
        // alert(tokenn);
        // debugger
        if (tokenn !== null && tokenn !== undefined) {
            if (tokenn !== -1) {
                dispatch(editUser(details.username))

                navigate(`/home`);
            }
            else navigate(`/logon`);
        }
    }, [tokenn])





    return <div>
        <div className="abalogin">
        <div className="bodylogin">
        <img src="logologin.jpg" className="logologin"/> 
        <input type="text" onChange={(e) => setDetails({ ...details, username: e.target.value })} placeholder="name" className="inplogin"/>
        <input type="text" onChange={(e) => setDetails({ ...details, password: e.target.value })} placeholder="password" className="inplogin"/>
    </div>
    <button onClick={() => { funLogin(details) }} className="nextlogin"><span>next</span></button>
    </div>
    </div>



}