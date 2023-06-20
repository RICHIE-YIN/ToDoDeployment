import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default props => {
    const { initialTitle, onSubmitProp } = props;
    const [title, setTitle] = useState(initialTitle);
    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({title});
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
            <input type="submit" />
            <button>
                    <Link to={"/"}>
                    Cancel
                    </Link>
                </button>
        </form>
    )
}