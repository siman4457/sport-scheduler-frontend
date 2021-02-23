import { React, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bulma-components';
import EditModal from './EditModal';



const EmployeeTable = ({data, status, deleteEmployee}) => {
    const [showEdit, setShowEdit] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState({});

    
    const editEmployee = (employee, showModal) => {
        if (showEdit === false){
            setShowEdit(true);
            setEmployeeToEdit(employee);
        }
        else{
            setShowEdit(false);
        }
    }
    
    const closeEditEmployee = () => setShowEdit(false);;
    
    return (
        <>
        <table className="table is-striped is-narrow is-fullwidth">
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
                {status !== "success" ? 
                (<tr><td>{status}</td></tr>)
                : 
                (data.employees.map(employee => (
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
                    <td>
                        <button 
                        className="button is-primary" 
                        onClick={() => editEmployee(employee)} 
                        type="button">
                            <FontAwesomeIcon icon={faEdit}/>&nbsp;<span>Edit</span>
                        </button>
                    </td>
                    <td><button className="button is-danger" onClick={() => deleteEmployee.mutate(employee)} type="button"><FontAwesomeIcon icon={faTrashAlt}/>&nbsp;<span>Delete</span></button></td>
                    </tr>
                    )))}
            </tbody>
            </table>
            <Modal show={showEdit} onClose={closeEditEmployee}>
                <EditModal employee={employeeToEdit} setShowEdit={setShowEdit}/>
            </Modal>
        </>
    )
}

export default EmployeeTable;