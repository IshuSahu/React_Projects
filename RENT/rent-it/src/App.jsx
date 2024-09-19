import { useState } from 'react'
import {LoginPage, RegisterPage, HomePage} from './pages/index'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateListing from './pages/CreateListing'

function App() {
  const [count, setCount] = useState(0)

  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/create-listing' element={<CreateListing/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
