import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker";
import axios from 'axios';
import { Dropdown } from 'react-bulma-components';
import moment from 'moment';
 

export default function Availability() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({})
    const [date, setDate] = useState(new Date())


    useEffect(async () => {
        await axios.get("http://localhost:5000/employees/getEmployees")
        .then(res => {
            setEmployees(res.data.employees)
            setSelectedEmployee(res.data.employees[0])
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    const addAvailability = () => {
        let req = {
            new_availability: moment(date).startOf('day').toDate(),
            employee: selectedEmployee
        }
        
        axios.post("http://localhost:5000/employees/createAvailability", req)
        .then(res => {            
            if(selectedEmployee){
                const updated_availability = [...selectedEmployee.availability, req.new_availability];
                const newSelectedEmployee = {...selectedEmployee};
                newSelectedEmployee['availability'] = updated_availability;
                setSelectedEmployee(newSelectedEmployee);
            }
        })
        .catch( err => console.log(err))
    }

    const removeAvailability = (employee, availability) => {
        const req = {
            employee: employee,
            availability: availability
        }
        axios.post("http://localhost:5000/employees/removeAvailability", req)
        .then(res => {
            console.log(res.data.message)
            
            if(selectedEmployee){
                const i = selectedEmployee.availability.indexOf(availability);
                const updated_availability = selectedEmployee.availability.splice(i,1);
                let newSelectedEmployee = {...selectedEmployee};
                newSelectedEmployee[availability] = updated_availability;
                setSelectedEmployee(newSelectedEmployee);
            }
        })
        .catch(err => console.log(err))
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
                    <Dropdown value={selectedEmployee} onChange={handleSelect}>
                        {employees && employees.map(employee => (
                            <Dropdown.Item key={employee._id} value={employee}>
                                {employee.first_name} {employee.last_name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
                <h1>Availability</h1>
                <ul>
                    {selectedEmployee.availability && selectedEmployee.availability.map(day => (
                        <li key={day}><span>{new Date(day).toDateString()}</span> <button className="button" onClick={() => removeAvailability(selectedEmployee, day)}>Remove</button></li>
                    ))}
                    
                </ul>
                
                <DatePicker dateFormat={"MMMM d, yy"} selected={date} onChange={date => setDate(date)} />
                <button className="button" onClick={addAvailability}>Add Availability</button>
            </div>
        </div>
    )
}
