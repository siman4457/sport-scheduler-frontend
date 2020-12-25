import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";

export default function AssignGames() {
    
    const [games, setGames] = useState([])
    const [employees, setEmployees] = useState([])
    const [schedule, setSchedule] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    useEffect(() => {
        axios.get("http://localhost:5000/games/getGames")
        .then(res => {
            setGames(res.data.games)
        })
        axios.get("http://localhost:5000/employees/getEmployees")
        .then(res => {
            setEmployees(res.data.employees)
        })
    }, [])

    const autoAssign = () =>{
        console.log("auto assign fired")
        axios.get("http://localhost:5000/schedules/autoAssign")
        .then(res =>{
            // setSchedule(res.data.schedule)
            console.log("success")
        })
        .catch(err => {
            console.log("error")
            console.log(err)
        })
    } 

    return (
        <div>
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                    <p className="title">Assign Games</p>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="field">
                    <label className="label">Start Date </label>
                    <div className="control">
                    <DatePicker dateFormat={"MMMM d, yy"} selected={startDate} onChange={date => setStartDate(date)} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">End Date </label>
                    <div className="control">
                    <DatePicker dateFormat={"MMMM d, yy"} selected={endDate} onChange={date => setEndDate(date)} />
                    </div>
                </div>
                <button className="button" onClick={autoAssign}>Auto Assign</button>

                <table className="table is-responsive container">
                    <thead>
                        <tr>
                            <th>Game</th>
                            <th>Employee</th>
                        </tr>
                    </thead>
                        
                    <tbody>
                    {games.map(game => (
                        <tr key={game._id}>
                        <td>{game.title}</td>
                        <td>{game.employeeId ? game.employeeId : "None"}</td>
                        </tr>
                    ))}
                    
                    </tbody>
                
                </table>
            </div>
        </div>
    )
}
