import {React, useEffect, useRef} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthProvider.jsx'

const Login = () => {
  const navigate = useNavigate()
  const {user, setUser, setToken} = useAuth()

  const loginForm = useRef(null)

  useEffect(() =>{
    if(user){
      navigate('/home')
    }
  }, [])   

  
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.clear()
    const username = loginForm.current.username.value
    const password = loginForm.current.password.value
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid credentials');
        }
      })
      .then((data) => {        
        setUser(data.user)
        setToken(data.access_token)
        navigate('/home');
      })
      .catch((error) => {
        console.log("error: "+error)
      });
  };

  return (
    <div className="container">
        <div className="login-register-container">
          <form ref={loginForm} onSubmit={handleLogin}>

            <div className="form-field-wrapper">
                <label>Username:</label>
                <input 
                  required
                  type="username" 
                  name="username"
                  placeholder="Enter username..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Password:</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Enter password..."
                  />
            </div>


            <div className="form-field-wrapper">
    
                <input 
                  type="submit" 
                  value="Login"
                  className="btn"
                  />

            </div>

          </form>

          <p>Don't have an account? <Link to="/register">Register</Link></p>

        </div>
    </div>
  )
}

export default Login