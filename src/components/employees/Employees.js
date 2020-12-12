import React from 'react';
import { Link } from 'react-router-dom';
import {useFetch} from "../hooks";
import "./employees.sass"

function Employees(props) {
    const [data, loading] = useFetch("http://localhost:5000/employees/getEmployees");

    return (
    <div>
        <section className="hero is-primary">
            <div className="hero-body">
                <div className="container">
                <p className="title">Employees</p>
                </div>
            </div>
        </section>
        <Link className="button" to={"/availability"}>Availability</Link>
        <table className="table is-responsive container">
        <thead>
            <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Can Set Up</th>
            <th>Needs Training</th>
            <th>Manual Film</th>
            <th>Veo</th>
            <th>Soccer</th>
            <th>Football</th>
            <th>Live Stream</th>
            <th>Address</th>
            </tr>
        </thead>
       
                    
                
        <tbody>
        {loading ? ("Loading...") 
        : (data.employees.map(employee => (
            <tr key={employee._id}>
            <td>{employee.first_name} {employee.last_name}</td>
            <td>{employee.age}</td>
            <td>{employee.canSetUp ? ("Yes") : ("No")}</td>
            <td>{employee.needsTraining ? ("Yes") : ("No")}</td>
            <td>{employee.canManualRecord ? ("Yes") : ("No")}</td>
            <td>{employee.canVeo ? ("Yes") : ("No")}</td>
            <td>{employee.canFilmSoccer ? ("Yes") : ("No")}</td>
            <td>{employee.canFilmFootball ? ("Yes") : ("No")}</td>
            <td>{employee.canLiveStream ? ("Yes") : ("No")}</td>
            <td>{employee.address}</td>
            </tr>
            )))}
        </tbody>
        
        </table>

        </div>
    );
}

export default Employees;