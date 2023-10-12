import React, { useState, useId} from 'react'
import makeAnimated from 'react-select/animated';
import axios from "axios";
import {FaRegTimesCircle} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import CreatableSelect from "react-select/creatable";

const methodology = {
    AGILE:"Agile",
    WATERFALL:"Waterfall"
}

const animatedComponents = makeAnimated();


const AddForm = ({data}) => {
    const [post,setPost] = useState({
        id:useId(),
        productId:'',
        productName:'',
        productOwnerName: '',
        Developers: '',
        scrumMasterName: '',
        startDate: '',
        methodology: '',
        location:''
    })

    const handleInput = (event)  => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    const handleClick = (selectedOptions) => {
        setPost({...post, Developers: selectedOptions})

    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(post);
        axios.post("http://localhost:3000/api", post, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then(response => console.log(response))
        document.getElementById("addForm").reset();

    }
    const navigate = useNavigate();

    const onPath = () => {
        navigate('/');
        window.location.reload();
    }

    return (
        <div >
            <h1>Add New Product</h1>

            <FaRegTimesCircle
                onClick={onPath}
                role="button"
                tabIndex="0"
            />

            <form id="addForm">
                <fieldset>
                    <p className="req">All fields are required.</p>
                    <label className="add">
                        Product Id:
                        <input
                            name="productId"
                            onChange={handleInput}
                        />
                    </label>
                    <br/>
                    <label className="add">
                        Product Name:
                        <input
                            name="productName"
                            onChange={handleInput}
                        />
                    </label>
                    <br/>
                    <label className="add">
                        Product Owner:
                        <input
                            name="productOwnerName"
                            onChange={handleInput}
                        />
                    </label>

                    <br/>

                    <label>
                        Developer Names:
                        <CreatableSelect
                            name="Developers"
                            onChange={handleClick}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            blurInputOnSelect ={true}
                            placeholder="Select Developers used"
                            noOptionsMessage={() => 'No other known developer'}
                            isSearchable
                        />
                    </label>
                    <br/>
                    <label className="add">
                        Scrum Master:
                        <input
                            name="scrumMasterName"
                            onChange={handleInput}
                        />
                    </label>
                    <br/>

                    <label className="add">
                        Start Date:
                        <input
                            name="startDate"
                            type="date"
                            onChange={handleInput}
                        />
                    </label>
                    <br/>
                    <label className="add">
                        Methodology:
                        <select
                            name="methodology"
                            onChange={handleInput}
                        >
                            <option>Select methodology</option>
                            <option value={methodology.AGILE}>{methodology.AGILE}</option>
                            <option value={methodology.WATERFALL}>{methodology.WATERFALL}</option>
                        </select>
                    </label>
                    <br/>
                    <label className="add">
                        Location:
                        <input
                            name="location"
                            onChange={handleInput}
                        />
                    </label>

                </fieldset>

                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )

}

export default AddForm;
