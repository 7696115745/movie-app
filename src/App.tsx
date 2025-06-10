 
import './App.css'
import { Route,Routes } from 'react-router'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Home from './pages/Home'
import WatchNow from './pages/WatchNow'
 function App() {
 
  return (
    <>
    <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/watch-now' element={<WatchNow/>}/>
    <Route path='/' element={<Home/>}/>
   </Routes>
     </>
  )
}

export default App
