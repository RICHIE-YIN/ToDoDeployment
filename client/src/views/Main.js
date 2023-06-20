import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AllList from '../components/AllList'
import ListForm from '../components/ListForm';
import { Accordion } from 'react-bootstrap';

export default () => {
    const [list, setList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8000/api/getlists')
            .then(res =>{
                setList(res.data)
                setLoaded(true);
            });
    }, [])
    const removeFromDom = listId => {
        setList(list.filter(list => list._id != listId));
    }

    const createList = (list) => {
        axios.post('http://localhost:8000/api/createlists', list)
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
            <h1>To-Do List!!!</h1>
            <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Create a New List</Accordion.Header>
                            <Accordion.Body>
                                {errors.map((err, index) => <p key={index}> {err} </p>)}
                                <ListForm onSubmitProp={createList} initialTitle="" />
                            </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <br/>
            {loaded && <AllList list={list} removeFromDom={removeFromDom}/>}
        </div>
    )
}