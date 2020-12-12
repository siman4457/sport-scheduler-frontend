import React, {useState, useEffect} from 'react'
import {useFetch} from "../hooks";
import DatePicker from "react-datepicker";
import axios from 'axios';
import { Dropdown } from 'react-bulma-components';
 

export default function Availability() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({})
    const [date, setDate] = useState(new Date())


    useEffect(() => {
        axios.get("http://localhost:5000/employees/getEmployees")
        .then(res => {
            const employees = res.data.employees
            setEmployees(employees)
            setSelectedEmployee(employees[0])
        })
    }, [])
    
    const addAvailability = () => {
        console.log(date)
        console.log(selectedEmployee)
    }

    const handleSelect = (option) => {
        setSelectedEmployee(option)
    }

    return (
        <div>
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                    <p className="title">Employee Availability</p>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="select">
                    <Dropdown onChange={handleSelect}>
                        {employees && employees.map(employee => (
                            <Dropdown.Item key={employee._id} value={employee}>
                                {employee.first_name} {employee.last_name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
                <h1>Availability</h1>
                <uo>
                    <li><button className="button">Remove</button></li> 
                </uo>
                
                <DatePicker dateFormat={"MMMM d, yy h:mm aa"} showTimeSelect timeIntervals={15} selected={date} onChange={date => setDate(date)} />
                <button className="button" onClick={addAvailability}>Add Availability</button>
            </div>
        </div>
    )
}
