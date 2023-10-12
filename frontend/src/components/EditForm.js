
import React, {useState} from "react";
import axios from "axios";
import makeAnimated from "react-select/animated";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FaRegEdit, FaTrashAlt} from "react-icons/fa";
import CreatableSelect from "react-select/creatable";

const EditForm = ({prodId, data}) => {

    const methodology = {
        AGILE:"Agile",
        WATERFALL:"Waterfall"
    }

    const animatedComponents = makeAnimated();


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [post,
        setPost] = useState({
        id: data.id,
        productId:data.productId,
        productName:data.productName,
        productOwnerName: data.productOwnerName,
        Developers:data.Developers,
        scrumMasterName:data.scrumMasterName,
        startDate:data.startDate,
        methodology:data.methodology,
        location:data.location
    })

    const handleInput = (event)  => {
        setPost(
            {...post, [event.target.name]: event.target.value});
        console.log(post);
    };

    const handleDelete = (event,param) => {
        console.log(event);
        axios.delete("http://localhost:3000/api/" + param)
            .then(r => console.log(r))
            .catch((e) => {
                console.log(e)
            })
        window.alert("done");
        window.location.reload(false);

    }

    function handleSubmit(event) {

        axios.put("http://localhost:3000/api/"+prodId, post, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => console.log(response))
            .catch((e) => {
                console.log(e)
            })
        console.log(post);
        console.log(event);
        setTimeout(function(){
            window.location.reload();
        }, 2000);
    }


    const handleClick = (selectedOptions) => {
        setPost({...post, Developers: selectedOptions});
        console.log("handleClick", selectedOptions);
        console.log(post);

    }
    return (
        <>
            <Button variant="white">
                <FaTrashAlt
                    onClick={event => handleDelete(event, data.productId)}
                    role="button"
                    tabIndex="0"
                />
            </Button>

            <Button variant="white" onClick={handleShow}>
                <FaRegEdit
                    role="button"
                    tabIndex="0"
                />
            </Button>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="addForm">
                        <fieldset>
                            <p className="req">All fields are required.</p>
                            <label className="add">
                                Product Id:
                                <input
                                    type="text"
                                    name="productId"
                                    onChange={handleInput}
                                    defaultValue={prodId}
                                    disabled
                                />
                            </label>
                            <br/>
                            <label className="add">
                                Product Name:
                                <input
                                    type="text"
                                    name="productName"
                                    onChange={handleInput}
                                    defaultValue={data.productName}
                                />
                            </label>
                            <br/>
                            <label className="add">
                                Product Owner:
                                <input
                                    type="text"
                                    name="productOwnerName"
                                    onChange={handleInput}
                                    defaultValue={data.productOwnerName}
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
                                    defaultValue={data.Developers}
                                />
                            </label>
                            <br/>
                            <label className="add">
                                Scrum Master:
                                <input
                                    type="text"
                                    name="scrumMasterName"
                                    onChange={handleInput}
                                    defaultValue= {data.scrumMasterName}
                                />
                            </label>
                            <br/>

                            <label className="add">
                                Start Date:
                                <input
                                    name="startDate"
                                    type="date"
                                    onChange={handleInput}
                                    defaultValue={data.startDate}
                                />
                            </label>
                            <br/>
                            <label className="add">
                                Methodology:
                                <select
                                    defaultValue={data.methodology}
                                    name="methodology"
                                    onChange={handleInput}
                                >
                                    <option value={methodology.AGILE}>{methodology.AGILE}</option>
                                    <option value={methodology.WATERFALL}>{methodology.WATERFALL}</option>
                                </select>
                            </label>
                            <br/>
                            <label className="add">
                                Location:
                                <input
                                    name="location"
                                    type="text"
                                    onChange={handleInput}
                                    defaultValue={data.location}
                                />
                            </label>
                        </fieldset>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div role="button"  onClick={handleClose}>
                        Close
                    </div>
                    <Button variant="primary"
                            type="submit"
                            onClick={handleSubmit}
                    >
                        Edit Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export  default EditForm;
