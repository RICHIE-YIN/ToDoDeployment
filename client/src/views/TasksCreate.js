import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TaskForm from '../components/TaskForm';

export default function CreateTask() {
  const { listId } = useParams();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const createTask = (task) => {
    axios.post(`http://localhost:8000/api/lists/${listId}/tasks`, task)
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
      <h3>Create a New Task</h3>
      {errors.map((err, index) => <p key={index}> {err} </p>)}
      <TaskForm onSubmitProp={createTask} initialTitle="" initialDescription="" />
      {/* <Link to={`/`}>Back to Lists</Link> */}
    </div>
  );
}
