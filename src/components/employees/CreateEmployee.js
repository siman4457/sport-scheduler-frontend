import React from 'react'
import {useForm, Controller} from "react-hook-form"
import Checkbox from "./Checkbox"

// ************ NOT COMPLETE **************

const defaultValues = {
    first_name: "",
    last_name: "",
    age: 0,
    address: "",
    canSetUp: false,
    needsTraining: true,
    canFilmSoccer: false,
    canFilmFootball: false,
    canLiveStream: false,
    canVeo: false,
    canManualRecord: false
  };

export default function CreateEmployee() {
    const {register, handleSubmit, control, errors} = useForm({defaultValues});

    const onSubmit = async data => {
        //TODO: Think of a cleaner way of checking if the value is true or false. 
        //      useForm passes the string "True" instead of a boolean true...
        // for(e in data){
        //     if(e.value === "True"){
        //         e.value = true
        //     }
        //     else{
        //         e.value = false
        //     }
        // }
        console.log(data)
        
        // axios.post("http://localhost:5000/games/createEmployee", data)
        // .then(res => {
        //     console.log(res.data.message)
        // })
        // .catch( err => console.log(err))
    }

    return (
        <div>
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                    <p className="title">Add Employee</p>
                    </div>
                </div>
            </section>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label className="label">First Name</label>
                        <div className="control">
                            <input className="input" type='text' name='first_name' ref={register}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Last Name</label>
                        <div className="control">
                            <input className="input" type='text' name='last_name' ref={register}/>
                        </div>
                    </div>
                    
                    <div className="field">
                        <label className="label">Age</label>
                        <div className="control">
                            <input className="input" type='text' name='age' ref={register}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Address</label>
                        <div className="control">
                            <input className="input" type='text' name='address' ref={register}/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <Controller as={Checkbox} name="canSetUp" type="checkbox" control={control}/>
                                Can they set up a rig on their own?
                            </label>
                        </div>
                    </div>

                    {/* <div className="field">
                        <label className="label">Can they set up a rig on their own?</label>
                        <div className="control">
                            <div className="select">
                                <select name="canSetUp" ref={register}>
                                    <option value="True">Yes</option>
                                    <option value="False">No</option>
                                </select>
                            </div>
                        </div>
                    </div> */}
                    
                    <div className="field">
                        <label className="label">Do they need training?</label>
                        <div className="control">
                            <div className="select">
                                <select name="needsTraining" ref={register}>
                                    <option value="True">Yes</option>
                                    <option value="False">No</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Can they film soccer games?</label>
                        <div className="control">
                            <div className="select">
                                <select name="canFilmSoccer" ref={register}>
                                    <option value="True">Yes</option>
                                    <option value="False">No</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Can they film football games?</label>
                        <div className="control">
                            <div className="select">
                                <select name="canFilmFootball" ref={register}>
                                    <option value="True">Yes</option>
                                    <option value="False">No</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Can they livestream?</label>
                        <div className="control">
                            <div className="select">
                                <select name="canLiveStream" ref={register}>
                                    <option value="True">Yes</option>
                                    <option value="False">No</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Can they operate a Veo?</label>
                        <div className="control">
                            <div className="select">
                                <select name="canVeo" ref={register}>
                                    <option value="True">Yes</option>
                                    <option value="False">No</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Can they record manually?</label>
                        <div className="control">
                            <div className="select">
                                <select name="canManualRecord" ref={register}>
                                    <option value="True">Yes</option>
                                    <option value="False">No</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <h2>Be sure to add this employees availability later to assign games to them.</h2>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link" type="submit">Submit</button>
                        </div>
                        <div className="control">
                            <button className="button is-link is-light">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
