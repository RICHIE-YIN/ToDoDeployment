import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import DeleteButton from '../components/UniversalDeleteButton';
import StepCreate from '../views/StepsCreate';
import { Badge, Accordion } from 'react-bootstrap';

export default function TaskDetails() {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [steps, setSteps] = useState([]);
    const [errors, setErrors] = useState([]);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/tasks/${taskId}`)
        .then(res => {
            console.log("task", res)
            setTask(res.data);
            setSteps(res.data.steps);
            setCompleted(res.data.completed);
        })
        .catch(err => console.error(err));
    }, [taskId]);

    const handleCompletedChange = (event, taskId, stepId) => {
        const newCompleted = event.target.checked;
        axios
        .put(`http://localhost:8000/api/tasks/${taskId}/steps/${stepId}`, {
            completed: newCompleted,
        })
        .then((res) => {
            console.log(res);
            setSteps((prevSteps) => {
                const updatedSteps = prevSteps.map((step) => {
                    if (step._id === stepId) {
                        return { ...step, completed: newCompleted, title: step.title };
                    }
                    return step;
                });
                return updatedSteps;
            });
        })
        .catch((err) => {
            console.error(err);
            setErrors([...errors, "Failed to update step completed status."]);
        });
    };
    

    const handleDelete = (taskId, stepId) => {
        axios.delete(`http://localhost:8000/api/tasks/${taskId}/steps/${stepId}`)
        .then(() => {
            setSteps(prevSteps => prevSteps.filter(step => step._id !== stepId));
        })
        .catch(err => console.error(err));
    };

    if (!task) {
        return <p>Loading...</p>;
    }

    return (
        <div>

        <h1>Task: <Badge bg="secondary">{task.title}</Badge></h1>
        <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Create New Step</Accordion.Header>
                            <Accordion.Body>
                                <StepCreate taskId={taskId} />
                            </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
        <br />
        <h1>STEPS:</h1>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Steps Complete?</th>
                <th>Step:</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {steps &&
            steps.map((step) => (
                <tr key={step._id}>
                <td>
                    <Form.Check
                    type="checkbox"
                    checked={step.completed}
                    onChange={(event) => handleCompletedChange(event, taskId, step._id)}
                    label="Completed"
                    />
                </td>
                <td>{step.title}</td>
                <td>
                    <DeleteButton onDelete={() => handleDelete(taskId, step._id)}>
                    Delete Step
                    </DeleteButton>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
        <br />
        <Link to="/">Back to All Lists</Link>
        </div>
    );
}