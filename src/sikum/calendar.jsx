import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addEventThank } from "./slices/addEventThank";


import { useNavigate } from "react-router-dom";
import { editSelected, editSelectedEvent } from "./slices/eventSlice";
import { getEventThank } from "./slices/getEventThank";
import { deleteEventThank } from "./slices/deleteEventThank copy";

export const Calendar = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user?.username);
    const events = useSelector(state => state.event.events);
    // const [events,setEvents] = useState([{}]);
    const [dates, setDates] = useState([]);
    const arr = [0, 1, 2, 3, 4, 5, 6];
    const [week, setweek] = useState(0);
    const [flag, setFlag] = useState([false, false, false, false, false, false, false]);
    const [chooseDay, setchooseDay] = useState('');
    const date = new Date();
    const today = date.toLocaleDateString();
    const token = useSelector(state => state.user?.token);
    const [flag2, setflag2] = useState([false, false, false, false, false, false, false]);
    const [names, setNames] = useState(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Shabat"]);
    const monthes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [theEvent, setTheEvent] = useState({});
    const [thisMonth, setThisMonth] = useState(date.getMonth());
    const [counter, setCounter] = useState(0);


    const dispatch = useDispatch();

    useEffect(() => {
        console.log("best");

        getEvent();
        console.log("bestbest");

    }, [])

    const getEvent = () => {
        dispatch(getEventThank(token));
        console.log("bestbestbest");

    }



    const addEvent = (index) => {
        if (index === -1) {
            dispatch(editSelectedEvent({}))
            dispatch(editSelected(''));

        }
        else {
            dispatch(editSelectedEvent({}))
            dispatch(editSelected(dates[index]));
        }
        navigate('/event');
    }


    const deleteEvent = () => {
        dispatch(deleteEventThank({ myid: token, eventId: theEvent.id }));
    }
    const editEvent = () => {
        dispatch(editSelectedEvent(theEvent));
        navigate('/eventedit');
    }

    const empty = () => {
        setDates([]);
        let d = ((date.getDate() - date.getDay()) + week);
        date.setDate(d);
    }

    useEffect(() => {
        empty();
        for (let i = 0; i < 7; i++) {
            let d = ((date.getDate() - date.getDay()) + i);
            date.setDate(d);
            let dd = date.toLocaleDateString();
            // ('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' });
            setDates(prevState => [...prevState, dd]);
            console.log(dates);
        }

    }, [week])

    // const theMonth = (num) => {
    //     setCounter(counter + 1);
    //     if (counter === 4) {
    //         if (num === 1) {
    //             if (thisMonth < 11)
    //                 setThisMonth(thisMonth + 1);
    //             else setThisMonth(0);
    //         }
    //         else if (num === -1) {
    //             if (thisMonth > 0)
    //                 setThisMonth(thisMonth - 1);
    //             else setThisMonth(11);
    //         }
    //         setCounter(0);
    //     }
    // }
    const setIsTrue = (ind) => {
        let newflag = [false, false, false, false, false, false, false];
        //    setflag2(newflag);
        //    console.log(newflag);
        //    setFlag(newflag);
        // flag=[false, false, false, false, false, false, false];
        // flag[ind] = true;
        newflag[ind] = true
        setFlag(newflag);

    }
    const setIsTrue2 = (ind) => {
        debugger
        let newflag2 = [false, false, false, false, false, false, false];
        //    console.log(newflag);
        //    setFlag(newflag);
        // flag=[false, false, false, false, false, false, false];
        // flag[ind] = true;
        //  setFlag(newflag);
        newflag2[ind] = true;
        setflag2(newflag2);

    }
    return <div className="abac" onClick={(e) => { setFlag([false, false, false, false, false, false, false]); setflag2([false, false, false, false, false, false, false]) }}>
        <div className="header">
            {/* <h3 className="h3cal">welcome {user}</h3> */}
            <h1 className="h1cal">{new Date(dates[0]).getMonth() === new Date(dates[6]).getMonth() ? monthes[new Date(dates[0]).getMonth()] : monthes[new Date(dates[0]).getMonth()] + "-" + monthes[new Date(dates[6]).getMonth()]}</h1>
        </div>
        <div className="buttons">
            <button onClick={() => { setweek(week - 7); }} className="last">◀</button>
            <button onClick={() => { setweek(week + 7); }} className="next">▶</button>
            {/* <button className="empty"></button> */}
            {/* <button className="empty"></button> */}
            <button className="add" onClick={() => { addEvent(-1) }}>Add event</button>
            <button className="move" onClick={() => { setweek(0); setThisMonth(date.getMonth()) }}>Go to today</button>
            <button className="search" onClick={() => { navigate('/search') }}>Search event</button>
            <button className="search" onClick={() => { navigate('/home') }}>Back</button>
        </div>

        <div className="daysOfWeek">
            {arr.map(element =>
                <div className="arounddayweek" >
                    <label className="dayname">{names[element]} </label>
                    <div onContextMenu={(e) => { setIsTrue(element); setchooseDay(dates[element]); e.preventDefault(); console.log(flag); }} className={dates[element] === today ? "week-today" : "week-day"}>{dates[element]}
                        <div>

                            {events && events.length > 0 && <>
                                {events.filter(e => { if (new Date(e.date).toLocaleDateString() === dates[element]) return e })

                                    .map((e, index) => {
                                        return <div>
                                            <div onContextMenu={() => { setIsTrue2(element); setTheEvent(e) }} className="Cevent">
                                                <div >{e.name}</div>

                                                <div>{e.description}</div>
                                            </div>
                                        </div>
                                    }
                                    )}

                            </>}


                        </div>
                        {flag[element] &&
                            <div >
                                <button onClick={() => { setweek(0) }} className="oncontext">Go to today</button>
                                <button onClick={() => { addEvent(element) }} className="oncontext">Add event</button></div>
                        }
                        {flag2[element] &&
                            <div>
                                <button onClick={() => { editEvent() }} className="oncontext">Edit</button>
                                <button onClick={() => { deleteEvent() }} className="oncontext">Delete</button>
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
        <div className="nameuserc">{user}</div>
    </div>
}
