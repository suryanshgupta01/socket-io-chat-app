import { useEffect, useState } from 'react'
import Home from './components/Home'
import Chat from './components/Chat'

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
function App() {
  const [name, setname] = useState();
  const GETname = (name1) => {
    setname(name1)
  }

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={name ? <Chat name={name} /> : <Home GETname={GETname} />} />
        <Route path='/chats' element={name ? <Chat name={name} /> : <Home GETname={GETname} />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
