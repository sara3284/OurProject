import { useEffect, useState } from "react"
import { useDispatch ,useSelector} from "react-redux";
import { logonThank } from "./slices/logonThank";
import { useNavigate } from "react-router-dom";




export const Logon = () =>{
    
const [details, setdetails] = useState({ username: "", password: "" ,phone:"",email:""});
const tokenn = useSelector(state => state.user?.token);
const sucsses = useSelector(state => state.user?.sucsses);
const navigate = useNavigate();
const dispatch = useDispatch();
const [log, setLog] = useState(false);

const funLogon = () =>{
    if(log){
    if(details.username && details.password)
    {
        dispatch(logonThank(details));
       
    }
}

}

const finish = () => {
    console.log("token" + tokenn);
// if (tokenn!==-1 && sucsses) {
        navigate(`/home`);
// }
}
useEffect(()=>{
    if (tokenn !== -1){
        finish();
    } 
},[tokenn])
useEffect(()=>{
    if (log){
        funLogon()
    } 
},[log])
    return <div className="abalogon">
        <div className="bodylogon">
            <img src="logologin.jpg" className="logologon"/>
        <input type="text" onChange={(e)=>setdetails({...details, username:e.target.value})} placeholder="name" className="inplogon"/>
        <input type="text" onChange={(e)=>setdetails({...details, password:e.target.value})} placeholder="password" className="inplogon"/>
        <input type="text" onChange={(e)=>setdetails({...details, phone:e.target.value})} placeholder="phone" className="inplogon"/>
        <input type="email" onChange={(e)=>setdetails({...details, email:e.target.value})} placeholder="email" className="inplogon"/>
        {/* <button onClick={a()}>next</button> */}
        {/* funLogon(details) */}
    </div>
    <button onClick={()=>{setLog(true);}} className="nextlogon">next</button>
    </div>
}
import { useEffect, useState } from "react"
import { useDispatch ,useSelector} from "react-redux";
import { logonThank } from "./slices/logonThank";
import { useNavigate } from "react-router-dom";




export const Logon = () =>{
    
const [details, setdetails] = useState({ username: "", password: "" ,phone:"",email:""});
const tokenn = useSelector(state => state.user?.token);
const sucsses = useSelector(state => state.user?.sucsses);
const navigate = useNavigate();
const dispatch = useDispatch();
const [log, setLog] = useState(false);

const funLogon = () =>{
    if(log){
    if(details.username && details.password)
    {
        dispatch(logonThank(details));
       
    }
}

}

const finish = () => {
    console.log("token" + tokenn);
// if (tokenn!==-1 && sucsses) {
        navigate(`/home`);
// }
}
useEffect(()=>{
    if (tokenn !== -1){
        finish();
    } 
},[tokenn])
useEffect(()=>{
    if (log){
        funLogon()
    } 
},[log])
    return <div className="abalogon">
        <div className="bodylogon">
            <img src="logologin.jpg" className="logologon"/>
        <input type="text" onChange={(e)=>setdetails({...details, username:e.target.value})} placeholder="name" className="inplogon"/>
        <input type="text" onChange={(e)=>setdetails({...details, password:e.target.value})} placeholder="password" className="inplogon"/>
        <input type="text" onChange={(e)=>setdetails({...details, phone:e.target.value})} placeholder="phone" className="inplogon"/>
        <input type="email" onChange={(e)=>setdetails({...details, email:e.target.value})} placeholder="email" className="inplogon"/>
        {/* <button onClick={a()}>next</button> */}
        {/* funLogon(details) */}
    </div>
    <button onClick={()=>{setLog(true);}} className="nextlogon">next</button>
    </div>
}