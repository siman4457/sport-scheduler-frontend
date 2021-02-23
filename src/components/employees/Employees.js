import React, { useState } from 'react';
// import "./employees.sass";
import { useQuery , useMutation } from 'react-query';
import axios from 'axios';
import EmployeeTable from './EmployeeTable';
 
const fetchEmployees = async () => {
    const res = await fetch("employees/getEmployees");
    return res.json()
}

const Employees = () => {
    const {data, status} = useQuery('data', fetchEmployees);

    const deleteEmployee = useMutation(async employee => {
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
            <div className="columns is-multiline">
                <div className="column">
                    <EmployeeTable data={data} status={status} deleteEmployee={deleteEmployee}/>
                </div>
            </div>
        
            </>
        )
        }
        </div>
    );
}

export default Employees;