import React from 'react'
import BigCalendar from '../calendar/BigCalendar'
import {Link} from 'react-router-dom'

function Schedule() {
    return (
        <div>
            <Link className="button is-primary" to={'/createGame'}>Add Game</Link>
            &nbsp;
            <Link className="button is-primary" to={'/assignGames'}>Assign Games</Link>
            <BigCalendar/>
        </div>
    )
    
}

export default Schedule;