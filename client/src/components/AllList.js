import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Form } from 'react-bootstrap';
import DeleteButton from '../components/UniversalDeleteButton';

export default function AllLists() {
  const [lists, setLists] = useState([]);
  const [errors, setErrors] = useState([]);
  const [completed, setCompleted] = useState(false);
  const { listId } = useParams();

  useEffect(() => {
    axios.get('http://localhost:8000/api/getlists')
      .then(res => setLists(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleCompletedChange = (event, listId) => {
    const newCompleted = event.target.checked;
    axios.put(`http://localhost:8000/api/lists/${listId}`, { completed: newCompleted })
      .then(res => {
        console.log(res);
        setLists(prevLists => {
          return prevLists.map(list => {
            if (list._id === listId) {
              return {
                ...list,
                completed: newCompleted
              };
            } else {
              return list;
            }
          });
        });
      })
      .catch(err => {
        console.error(err);
        setErrors([...errors, "Failed to update list completed status."]);
      });
  }

  const handleDelete = (entityType, entityId) => {
    axios.delete(`http://localhost:8000/api/${entityType}/${entityId}`)
      .then(() => {
        setLists(prevLists => {
          if (entityType === 'lists') {
            return prevLists.filter(list => list._id !== entityId);
          }
          if (entityType === 'tasks') {
            return prevLists.map(list => {
              return {
                ...list,
                tasks: list.tasks.filter(task => task._id !== entityId)
              };
            });
          }
          if (entityType === 'steps') {
            return prevLists.map(list => {
              const updatedTasks = list.tasks.map(task => {
                if (task.steps) {
                  return {
                    ...task,
                    steps: task.steps.filter(step => step._id !== entityId)
                  };
                }
                return task;
              });
              return {
                ...list,
                tasks: updatedTasks
              };
            });
          }
          return prevLists;
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Lists</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Completed?</th>
            <th>Title</th>
            <th>Tasks</th>
            <th>Steps</th>
            <th>Delete List</th>
          </tr>
        </thead>
        <tbody>
          {lists.map(list => (
            <tr key={list._id}>
              <td>
              <Form.Check
                type="checkbox"
                checked={list.completed}
                onChange={(e) => handleCompletedChange(e, list._id)}
                label="Complete"
              />
              </td>
              <td>
                <Link to={`/lists/${list._id}`}>{list.title}</Link>
              </td>
              <td>
                <ul style={{listStyleType: "none", paddingLeft: 0}}>
                  {list.tasks && list.tasks.map(task => (
                    <li key={task._id}>
                      <Link to={`/tasks/${task._id}`} style={{textDecoration: "none"}}>- {task.title}</Link>
                      {/* <DeleteButton onDelete={() => handleDelete('tasks', task._id)}>Delete Task</DeleteButton> */}
                      <ul style={{listStyleType: "none", paddingLeft: 0}}>
                      </ul>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
              <ul style={{listStyleType: "none", paddingLeft: 0}}>
                  {list.tasks && list.tasks.map(task => (
                    <li key={task._id}>
                      <ul style={{listStyleType: "none", paddingLeft: 0}}>
                        {task.steps && task.steps.map(step => (
                          <li key={step._id}>
                            <Link to={`/steps/${step._id}`} style={{textDecoration: "none"}}>- {step.title}</Link>
                            {/* <DeleteButton onDelete={() => handleDelete('steps', step._id)}>Delete Step</DeleteButton> */}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <DeleteButton onDelete={() => handleDelete('lists', list._id)}>Delete List</DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}