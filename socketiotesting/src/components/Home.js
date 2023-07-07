import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Home = ({ GETname }) => {
    // const [name, setname] = useState("");
    const nameref = useRef();
    const navigate = useNavigate()
    useEffect(() => {
        nameref.current.focus()
    }, []);

    const handlesubmit = () => {
        if (nameref.current.value === 'Admin') {
            alert('cannot name yourself Admin')
            return
        }
        GETname(nameref.current.value)
        console.log(nameref.current.value)
        nameref.current.value = ""
        // navigate('/chats')
    }
    return (
        <div>
            home page
            <input type='text' id="name"
                ref={nameref}
                onKeyDown={(e) => (e.key == 'Enter') ? handlesubmit() : null} />
            <button onClick={handlesubmit}>
                LOGIN
            </button>
        </div>
    )
}

export default Home
