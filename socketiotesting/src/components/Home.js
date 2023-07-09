import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/chat-app-logo-icon-vector.jpg'
const Home = ({ GETname }) => {
    // const [name, setname] = useState("");
    const nameref = useRef();
    useEffect(() => {
        nameref.current.focus()
    }, []);

    const handlesubmit = () => {
        if (nameref.current.value === 'Admin') {
            alert('cannot name yourself Admin')
            return
        }
        GETname(nameref.current.value)
        // console.log(nameref.current.value)
        nameref.current.value = ""
        // navigate('/chats')
    }
    return (
        <div className='homepage'>
            <div className='border'>
                <img src={logo} style={{ width: '300px' }} alt='Socket io image here' />
                {/* <label htmlFor='name'>Enter your name</label> */}
                <input type='text' id="name" placeholder='Enter your name'
                    ref={nameref}
                    onKeyDown={(e) => (e.key === 'Enter') ? handlesubmit() : null} />
                <button onClick={handlesubmit}>
                    LOGIN
                </button>
            </div>
        </div>
    )
}

export default Home
