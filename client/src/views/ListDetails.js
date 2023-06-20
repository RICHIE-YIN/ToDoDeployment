import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteButton from '../components/UniversalDeleteButton';
import TaskCreate from './TasksCreate';
import Table from 'react-bootstrap/Table';
import { Accordion, Badge, Button, Form } from 'react-bootstrap';

export default function ListDetail() {
const { listId, taskId } = useParams();
const [list, setList] = useState(null);
const [errors, setErrors] = useState([]);
const [completed, setCompleted] = useState(false);

useEffect(() => {
    axios.get(`http://localhost:8000/api/getlists/${listId}`)
    .then(res => {
        setList(res.data);
        setCompleted(res.data.completed);
    })
    .catch(err => console.error(err));
}, [listId]);

const handleCompletedChange = (event) => {
    const newCompleted = event.target.checked;
    axios.put(`http://localhost:8000/api/lists/${listId}`, { completed: newCompleted })
    .then(res => {
        console.log(res);
        setCompleted(newCompleted);
    })
    .catch(err => {
        console.error(err);
        setErrors([...errors, "Failed to update list completed status."]);
    });
}

const handleCompletedChangeTask = (event, taskId) => {
    const newCompleted = event.target.checked;
    axios
    .put(`http://localhost:8000/api/tasks/${taskId}`, { completed: newCompleted })
    .then((res) => {
        console.log(res);
        // Update the completed status of the specific task
        setList((prevList) => {
        const updatedTasks = prevList.tasks.map((task) => {
            if (task._id === taskId) {
            return { ...task, completed: newCompleted };
            }
            return task;
        });
        return { ...prevList, tasks: updatedTasks };
        });
    })
    .catch((err) => {
        console.error(err);
        setErrors([...errors, "Failed to update task completed status."]);
    });
};

const handleDelete = (entityType, entityId, taskId) => {
    let url = `http://localhost:8000/api/${entityType}/${entityId}`;
    if (entityType === 'steps') {
    url = `http://localhost:8000/api/tasks/${taskId}/steps/${entityId}`;
    }

    axios.delete(url)
    .then(() => {
        setList(prevList => {
        if (entityType === 'lists') {
            return null;
        }
        if (entityType === 'tasks') {
            return {
            ...prevList,
            tasks: prevList.tasks.filter(task => task._id !== entityId)
            };
        }
        if (entityType === 'steps') {
            const updatedTasks = prevList.tasks.map(task => {
            if (task._id === taskId) {
                return {
                ...task,
                steps: task.steps.filter(step => step._id !== entityId)
                };
            }
            return task;
            });
            return {
            ...prevList,
            tasks: updatedTasks
            };
        }
        return prevList;
        });
    })
    .catch(err => console.error(err));
};



if (!list) {
    return <p>Loading...</p>;
}

    return (
        <div>
            <br/>
            <h1>Title: <Badge bg="secondary">{list.title}</Badge></h1>
            <br/>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Create New Task</Accordion.Header>
                    <Accordion.Body>
                        <TaskCreate listId={listId} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <br/>
            <br/>
            <h2>List Details</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Tasks Complete?</th>
                        <th>Tasks</th>
                        <th>Description</th>
                        <th>Steps</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.tasks && list.tasks.map((task) => (
                        <tr key={task._id}>
                            <td>
                                <Form.Check
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={(event) => handleCompletedChangeTask(event, task._id)}
                                    label="Completed"
                                />
                            </td>
                            <td>
                                <Link to={`/tasks/${task._id}`}>{task.title}</Link>
                            </td>
                            <td>
                                {task.description}
                            </td>
                            <td>
                                {task.steps && task.steps.map((step) => (
                                    <div key={step._id}>
                                        - {step.title}
                                        &nbsp;&nbsp;
                                        {/* <DeleteButton onDelete={() => handleDelete('steps', step._id, task._id)}>
                                            Delete Step
                                        </DeleteButton> */}
                                    </div>
                                ))}
                            </td>
                            <td>
                                <DeleteButton onDelete={() => handleDelete('tasks', task._id)}>
                                    Delete Task
                                </DeleteButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <Link to="/">Back to All Lists</Link>
            <br />
        </div>
    );
}
