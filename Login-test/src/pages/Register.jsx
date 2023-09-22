import {React, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

const navigate = useNavigate()
  const registerForm = useRef(null)

  const handleRegister = (e) =>{
    const username = registerForm.current.username.value
    const password = registerForm.current.password1.value
    e.preventDefault()
    fetch("http://127.0.0.1:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password}),
    })
    .then((response) =>{
      if(response.ok){
        navigate("/login");
      } else {
        console.log("Error "+ response.status);
        console.log(JSON.stringify({username, password}))
      }
    })
    .catch((error) =>{
      console.log("Error "+error)
    })
  }
  
  const checkRegister = (e) => {
    const password1 = registerForm.current.password1.value
    const password2 = registerForm.current.password2.value
    if(password1 != password2) {
      console.log("Passwords must match")
    } else {
      handleRegister(e);
    }
  }

  return (
    <div className="container">
      <div className="login-register-container">
      <form ref={registerForm} onSubmit={checkRegister}>

          <div className="form-field-wrapper">
                <label>Name:</label>
                <input 
                  required
                  type="text" 
                  name="username"
                  placeholder="Enter name..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Password:</label>
                <input 
                  type="password"
                  name="password1"
                  placeholder="Enter password..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Confirm Password:</label>
                <input 
                  type="password"
                  name="password2"
                  placeholder="Confirm password..."
                  />
            </div>


            <div className="form-field-wrapper">

                <input 
                  type="submit" 
                  value="Register"
                  className="btn"
                  onClick={checkRegister}
                  />

            </div>

        </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>

      </div>
  </div>
  )
}

export default Register