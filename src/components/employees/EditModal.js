import React from 'react'

export default function EditModal({employee, setShowEdit}) {
    return (
        <div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Editing Employee {employee.first_name} {employee.last_name}</p>
                <button onClick={() => setShowEdit(false)} className="delete" aria-label="close"></button>
              </header>
              <section className="modal-card-body">
                <p className="has-text-black">To assign or reassign, choose from the dropdown below:</p>
                <br/>
                <br/>
                <br/>
              </section>
              <footer className="modal-card-foot">
                <button className="button is-success" onClick={() => this.handleSave(this.state.selectedEmployee, this.state.selectedEvent)}>Save changes</button>
                <button className="button" onClick={() => setShowEdit(false)}>Cancel</button>
              </footer>
            </div>
        </div>
    )
}
