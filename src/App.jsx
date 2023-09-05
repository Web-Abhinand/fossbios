import { useState } from 'react'
import './App.css'
import Signup from './Signup'
import Login from './Login'
import Dashboard from './Dashboard'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} ></Route>
          <Route path="/" element={<Login />} ></Route>
          <Route path="/dashboard" element={<Dashboard />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
