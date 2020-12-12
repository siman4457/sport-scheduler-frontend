import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {useForm} from "react-hook-form"
import axios from "axios"

export default function CreateGame() {
    const {register, handleSubmit, errors} = useForm();

    const [startDate, setStartDate] = useState(new Date())
    const [ageGroups, setAgeGroups] = useState([])

    const onSubmit = async data => {
        data["datetime"] = new Date(startDate.toISOString())
        console.log(data)
        axios.post("http://localhost:5000/games/createGame", data)
        .then(res => {
            console.log(res.data.message)
        })
        .catch( err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:5000/options/getAgeGroups").then(
            res => {setAgeGroups(res.data.options)}
        )
    }, [])

    return (
        <div>
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                    <p className="title">Create Game</p>
                    </div>
                </div>
            </section>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input className="input" type='text' name='title' ref={register}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Date and Time </label>
                        <div className="control">
                            <DatePicker dateFormat={"MMMM d, yy h:mm aa"} showTimeSelect timeIntervals={15} selected={startDate} onChange={date => setStartDate(date)} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Age Group</label>
                        <div className="control">
                            <div class="select">
                                <select name="ageGroup" ref={register}>
                                    {ageGroups.map(ageGroup => (
                                        <option>{ageGroup}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="field">
                        <label className="label">Film Type</label>
                        <div className="control">
                            <div class="select">
                                <select name="filmType" ref={register}>
                                    <option>Manual Film</option>
                                    <option>Veo</option>
                                    <option>Live Stream</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Field</label>
                        <div className="control">
                            <input className="input" type='text' name='fieldNumber' ref={register}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Location</label>
                        <div className="control">
                            <input className="input" type='text' name='location' ref={register}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Address</label>
                        <div className="control">
                            <input className="input" type='text' name='address' ref={register}/>
                        </div>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link" type="submit">Submit</button>
                        </div>
                        <div class="control">
                            <button class="button is-link is-light">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
