import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StepForm from '../components/StepForm';

export default function CreateStep() {
const { taskId } = useParams();
const [errors, setErrors] = useState([]);
const navigate = useNavigate();

const createStep = (step) => {
    axios.post(`http://localhost:8000/api/tasks/${taskId}/steps`, step)
    .then((res) => {
        console.log("response", res)
        if (res.data.errors) {
        setErrors(res.data.errors)
        } else {
        navigate(0)
        }
    })
    .catch(err => console.error(err));
}

return (
    <div>
    <h1>Create a New Step</h1>
    {errors.map((err, index) => <p key={index}> {err} </p>)}
    <StepForm onSubmitProp={createStep} initialTitle="" />
    {/* <Link to={`/tasks/${taskId}`}>Back to Task</Link> */}
    </div>
);
}