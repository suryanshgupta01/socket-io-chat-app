import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import { Link, useNavigate } from 'react-router-dom'
import ReactScrollToBottom from 'react-scroll-to-bottom'
let socket
const ENDPOINT = `http://localhost:4004/`

const Chat = ({ name }) => {
    const navigate = useNavigate()
    // if (name === '') navigate('/')
    const [ID, setID] = useState();
    const [allchats, setallchats] = useState([]);
    let chatref = useRef("")
    useEffect(() => {
        chatref.current.focus()
    }, []);
    const sendmsg = () => {
        if (chatref.current.value === "") return
        socket.emit('message', { id: ID, msg: chatref.current.value })
        chatref.current.value = ""
    }

    useEffect(() => {
        socket = socketIOClient(ENDPOINT, { transports: ['websocket'] })


        socket.on('connect', () => {
            // alert("connected")
            setID(socket.id)
            console.log("socket connecte")
        })
        socket.emit('joined', { name })

        socket.on('welcome', (prop) => {
            setallchats(prevChats => [...prevChats, prop]);

            console.log(prop)
        })

        socket.on('UserJoined', (prop) => {
            setallchats(prevChats => [...prevChats, prop]);
            // console.log(user, msg)
        })

        socket.on('userleft', (prop) => {
            // console.log(user, msg);

            setallchats(prevChats => [...prevChats, prop]);


            // setallchats(prevChats => [...prevChats, { user: user, msg: msg }]);

        })
        // socket.emit('disconnect1')
        // socket.off()


    }, [])

    useEffect(() => {
        const handleReceivedMsg = (props) => {
            // console.log(user, id, msg);
            setallchats(prevChats => [...prevChats, props]);
            // console.log("all", allchats)
            chatref.current.focus()

        };
        socket.on('sendMsg', handleReceivedMsg)

        return () => {

            socket.off();
            // socket.off('sendMsg', handleReceivedMsg);
        };
    }, []);
    return (
        <>
            <div className='chatapp'>
                <div className='header'>
                    <div className='heading'>
                        socket chat . Welcome, {name}
                    </div>
                    <a href='/'><i className="fa fa-times" style={{ fontSize: '30px' }} aria-hidden="true"></i></a>
                </div>
                <ReactScrollToBottom className='chatbox'>
                    {allchats?.map((ele, ind) => {
                        return (
                            <p className={'chats ' + ((ele.user === 'Admin') ? ' admin ' : '') + ((ele.user === name) ? 'right' : 'left')} key={ind}>
                                {
                                    (ele.user === name) ? 'YOU' : <p className='username'>{ele.user}</p>
                                }
                                {/* {ele.user} */}
                                : {ele.msg}
                            </p>
                        )
                    })}
                </ReactScrollToBottom>

                <div className='inputtag'>
                    <input type='text' id="chat" ref={chatref}
                        onKeyDown={(e) => (e.key === 'Enter') ? sendmsg() : null}
                    // console.log((e.key))}
                    />
                    <button className='send' onClick={sendmsg}>SEND</button>
                </div>


            </div>
            <a href='/' style={{ fontSize: '3rem' }}>BACK</a>

        </>
    )
}

export default Chat
