import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Employees(props) {
    const [employees, setEmployees] = useState ({hits: []});

    useEffect(() => {
        async function fetchData() {
            const response = await axios("http://localhost:5000/getEmployees");
            setEmployees(response.data)
        }
        fetchData();
    },[]);

    return (
        <div>
            <ul>
                {employees.hits.map(employee => (
                    <li key={employee._id}>
                        <p>{employee.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Employees;