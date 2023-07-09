import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import logo from '../assets/logo icon.png'
// import logo from '../assets/chat icon.jpg'
let socket
const ENDPOINT = `http://localhost:4004/`

const Chat = ({ name }) => {
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
            // console.log("socket connecte")
        })
        socket.emit('joined', { name })

        socket.on('welcome', (prop) => {
            setallchats(prevChats => [...prevChats, prop]);

            // console.log(prop)
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
                    <div className='icon'>
                        <a href='/'>
                            <img src={logo} alt='Icon here' width={'70px'}  />
                        </a>
                    </div>
                    <div className='heading'>
                        Welcome, {name}
                    </div>
                    <a href='/'><i className="cross fa fa-times" style={{ fontSize: '40px' }} aria-hidden="true"></i></a>
                </div>
                <ReactScrollToBottom className='chatbox'>
                    {allchats?.map((ele, ind) => {
                        return (
                            <p className={'chats ' + ((ele.user === 'Admin') ? ' admin ' : '') + ((ele.user === name) ? 'right' : 'left')} key={ind}>
                                {
                                    (ele.user === name) ? 'YOU' : <p className='username'>{ele.user}</p>
                                }
                                : {ele.msg}
                            </p>
                        )
                    })}
                </ReactScrollToBottom>

                <div className='inputtag'>
                    <input type='text' id="chat" ref={chatref} placeholder='🔍 Message'
                        onKeyDown={(e) => (e.key === 'Enter') ? sendmsg() : null}
                    // console.log((e.key))}
                    />
                    <button className='send' onClick={sendmsg}><i class="fa fa-paper-plane" style={{ fontSize: '30px' }} aria-hidden="true"></i></button>
                </div>


            </div>
            {/* <a href='/' style={{ fontSize: '3rem' }}>BACK</a> */}

        </>
    )
}

export default Chat
