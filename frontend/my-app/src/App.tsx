

import './App.css'

import { Route, Routes } from 'react-router-dom'
import Register from './register/Register'
import ChatSpace from './chat/ChatSpace'


function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/chat'  element={<ChatSpace/>}/>
      
    </Routes>

      
    </>
  )
}

export default App
