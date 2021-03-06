import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {useForm} from "react-hook-form"
import { useParams } from 'react-router-dom';
import axios from "axios"
import { useQuery } from 'react-query';

let defaultValues = {
    title: "",
    fieldNumber: "",
    location: "",
    address: "",
    ageGroup: "",
    filmType: ""
  };

const fetchGame = async(id) => {
    const res = await axios.get(`/games/getGame/${id}`)
    return res.json();
}

export default function EditGame() {
    let { id } = useParams();
    const [startDate, setStartDate] = useState(new Date())
    const [ageGroups, setAgeGroups] = useState([])

    const {status} = useQuery({
        queryKey: "game",
        queryFn: () => fetchGame(id),
        onSuccess: (data) => {
            console.log({data});
        } 
    });

    const {register, handleSubmit, reset} = useForm();


    const onSubmit = async data => {
        data["datetime"] = new Date(startDate.toISOString())
        // console.log(data)
        axios.post("/editGame", data)
        .then(res => {
            console.log(res.data.message)
            reset();

        })
        .catch( err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:5000/options/getAgeGroups").then(
            res => {setAgeGroups(res.data.options)}
        )
    }, [])

    return (
        <div className="main" id="main">
            <div className="container">
            <p className="title">Add Game</p>
            </div>
            <br/>
                
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="columns is-multiline">
                    <div className="column is-9">
                        <div class="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Description</label>
                            </div>
                            <div className="field-body">
                                <div class="field">
                                    <p class="control is-expanded">
                                        <input className="input" type='text' name='title' placeholder="Title" ref={register}/>
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-user"></i>
                                        </span>
                                    </p>
                                </div>
                                <div class="field">
									<p class="control is-expanded">
                                        <input className="input" type='text' name='fieldNumber' placeholder="Field Number" ref={register}/>
									</p>
								</div>
                            </div>
                        </div>
                    
                        <div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Location</label>
							</div>

                            <div className="field-body">
                                <div class="field">
									<p class="control is-expanded">
                                        <input className="input" type='text' name='location' placeholder="Toyota Soccer Complex" ref={register}/>
									</p>
								</div>
                            </div>
                        </div>

                        <div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Address</label>
							</div>

                            <div className="field-body">
                                <div class="field">
									<p class="control is-expanded">
                                        <input className="input" type='text' name='address' placeholder="9200 World Cup Way, Ste 202" ref={register}/>
									</p>
								</div>
                            </div>
                        </div>
                    
                        <div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Date</label>
							</div>

                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <DatePicker 
                                        className="input"
                                        dateFormat={"MMMM d, yy h:mm aa"} 
                                        showTimeSelect 
                                        timeIntervals={15} 
                                        selected={startDate} 
                                        onChange={date => setStartDate(date)} 
                                        popperPlacement="bottom"
                                        />
                                    </div>
                                </div>
                            </div>
                        
                        </div>

                        <div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Age Group</label>
							</div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <div className="select">
                                            <select name="ageGroup" ref={register}>
                                                {ageGroups.map(ageGroup => (
                                                    <option>{ageGroup}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>

                        <div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Film Type</label>
							</div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <div className="select">
                                            <select name="filmType" ref={register}>
                                                <option>Manual Film</option>
                                                <option>Veo</option>
                                                <option>Live Stream</option>
                                            </select>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <br/>
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link" type="submit">Submit</button>
                            </div>
                            <div className="control">
                                <button 
                                className="button is-link is-light"
                                onClick={() => reset()}>
                                Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form> 
            
        </div>
    )
}
