import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListForm from '../components/ListForm';

export default function CreateList() {
const [errors, setErrors] = useState([]);
const navigate = useNavigate();

const createList = (list) => {
    axios.post('http://localhost:8000/api/createlists', list)
    .then((res) => {
        console.log("response", res)
        if (res.data.errors) {
        setErrors(res.data.errors)
        } else {
        navigate("/")
        }
    })
    .catch(err => console.error(err));
}

return (
    <div>
    <h1>Create a New List</h1>
    {errors.map((err, index) => <p key={index}> {err} </p>)}
    <ListForm onSubmitProp={createList} initialTitle="" />
    <Link to="/">Back to Lists</Link>
    </div>
);
}
