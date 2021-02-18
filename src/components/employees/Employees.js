import React from 'react';
import "./employees.sass"
import SideBar from '../sideBar/SideBar'
import { useQuery } from 'react-query';

const fetchEmployees = async () => {
    const res = await fetch("http://localhost:5000/employees/getEmployees");
    return res.json()
}

const Employees = () => {
    // const [data, loading] = useFetch("http://localhost:5000/employees/getEmployees");
    const {data, status} = useQuery('data', fetchEmployees);
    
    return (
        <>
            <div className="columns">
                <div className="column is-one-fifth">
                    <SideBar title={"Employees"}/>
                </div>
                <div className="column">
                    <br/>
                    <h1 className="title">View Employees</h1>
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
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                    {status !== "success" ? (<tr><td>{status}</td></tr>) 
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
                        <td>Edit</td>
                        <td>Delete</td>
                        </tr>
                        )))}
                    </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Employees;