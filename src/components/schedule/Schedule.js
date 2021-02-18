import React from 'react'
import BigCalendar from '../calendar/BigCalendar'
import SideBar from '../sideBar/SideBar';

function Schedule() {
    return (
        <>
            <div className="columns">
            <div className="column is-one-fifth">
                <SideBar title={"Schedule"}/>
            </div>
            <div className="column">
                <br/>
                <BigCalendar/>
            </div>
            </div>
        </>
    )
    
}

export default Schedule;