import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Signup'
import Login from './Login'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} ></Route>
          <Route path="/login" element={<Login />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
