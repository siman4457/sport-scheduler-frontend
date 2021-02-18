import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideBar({title}) {
    if(title === "Schedule"){    
        return(
            <div id="side-bar">
                <br/>
            <h1 className="title side-title">{title}</h1>
                <NavLink className="side-button" to={'/createGame'}>Add Game</NavLink>
                <NavLink className="side-button" to={'/createGame'}>View Unscheduled</NavLink>
                <NavLink className="side-button" to={'/createGame'}>View Scheduled</NavLink>
            </div>
        )
    }
    else if(title === "Employees"){
        return(
            <div id="side-bar">
                <br/>
            <h1 className="title side-title">{title}</h1>
                <NavLink className="side-button" to={"/employees"}>View Employees</NavLink>
                <NavLink className="side-button" to={"/availability"}>Availability</NavLink>
                <NavLink className="side-button" to={"/createEmployee"}>Add Employee</NavLink>
            </div>
        )
    }
    else{
        return(<h1>Default Case</h1>)
    }
            
}
