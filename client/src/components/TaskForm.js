import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default props => {
    const { initialTitle, initialDescription, onSubmitProp } = props;
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({title, description});
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Title</label><br />
                <input
                    type="text"
                    name="title" value={title}
                    onChange={(e) => { setTitle(e.target.value) }} />
            </p>
            <p>
            <label>Description</label><br />
            <textarea name="description" value={description} 
            onChange={(e) => { setDescription(e.target.value) }} />
            </p>
            <input type="submit" />
            <button>
                    <Link to={"/"}>
                    Cancel
                    </Link>
                </button>
        </form>
    )
}