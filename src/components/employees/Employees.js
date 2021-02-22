import React from 'react';
// import "./employees.sass";
import { useQuery , useMutation } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
 
const fetchEmployees = async () => {
    const res = await fetch("employees/getEmployees");
    return res.json()
}

// const deleteEmployee = (employee) => {
//     console.log("Delete triggered")
//     console.log(employee)
// }

const editEmployee = (employee) => {
    console.log("Edit triggered")
    console.log(employee)
}

const Employees = () => {
    const {data, status} = useQuery('data', fetchEmployees);
    const deleteEmployee = useMutation(async employee => {
        // console.log("/employees/" + employee._id);
        await axios.delete("employees/deleteEmployee/" + employee._id)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
        
    });

    return (
        <div className="main" id="main">
        {deleteEmployee.isLoading ? (
            "Deleting Employee..."
        ) : (
            <>
                
            <br/>
            <h1 className="title">View Employees</h1>
            <div class="columns is-multiline">
                <div class="column">
                    <table class="table is-striped is-narrow is-fullwidth">
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
                        <td><button className="button is-primary" onClick={() => editEmployee(employee)} type="button"><FontAwesomeIcon icon={faEdit}/>&nbsp;<span>Edit</span></button></td>
                        <td><button className="button is-danger" onClick={() => deleteEmployee.mutate(employee)} type="button"><FontAwesomeIcon icon={faTrashAlt}/>&nbsp;<span>Delete</span></button></td>
                        </tr>
                        )))}
                    </tbody>
                    </table>
                </div>
            </div>
        
            </>
        )
        }
        </div>
    );
}

export default Employees;