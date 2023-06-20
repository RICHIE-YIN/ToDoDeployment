import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const DeleteButton = ({ onDelete, children }) => {
    const handleClick = () => {
    console.log("onDelete:", onDelete);
    onDelete();
    };

    return (
    <Button variant="outline-danger" size="sm" onClick={handleClick}>{children}</Button>
    // <button onClick={handleClick}>{children}</button>
    );
};


export default DeleteButton;