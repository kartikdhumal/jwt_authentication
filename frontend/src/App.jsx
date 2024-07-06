import Login from './components/Login'
import Register from './components/Register'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </div>
  )
}

export default App
