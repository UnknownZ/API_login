
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './utils/AuthProvider'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Header from './Components/Header'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {

  return (
    <Router>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes/>}>
            <Route path='/home' element={<Home/>}/>
            <Route path="/profile" element={<Profile/>} />
          </Route>
        </Routes>
        </AuthProvider>
    </Router>
  )
}

export default App