import React from 'react';
import "./employees.sass"
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const fetchEmployees = async () => {
    const res = await fetch("http://localhost:5000/employees/getEmployees");
    return res.json()
}

const deleteEmployee = (employee) => {
    console.log("Delete triggered")
    console.log(employee)
}

const editEmployee = (employee) => {
    console.log("Edit triggered")
    console.log(employee)
}

const Employees = () => {
    // const [data, loading] = useFetch("http://localhost:5000/employees/getEmployees");
    const {data, status} = useQuery('data', fetchEmployees);
    
    return (
        <>
            <article className="container">
                <section>
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
                        <td><FontAwesomeIcon icon={faEdit} type="button" onClick={() => editEmployee(employee)} /></td>
                        <td><FontAwesomeIcon icon={faTrashAlt} type="button" onClick={() => deleteEmployee(employee)} /></td>
                        </tr>
                        )))}
                    </tbody>
                    </table>
                </section>
            </article>
        </>
    );
}

export default Employees;