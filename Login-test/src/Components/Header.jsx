import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../utils/AuthProvider"

const Header = () => {
    const navigate = useNavigate()
    const {token, setToken} = useAuth()
    const { user, setUser } = useAuth()

    const logoutClick = () => {
        setToken(null)
        setUser(null)
        navigate("/login")
    }

    return (
        <div className="header">
            <div>
                <Link id='head-logo' to="/home">LOGO</Link>
            </div>


            <div className="links--wrapper">
                {user ? (
                    <>
                        <Link to='/home' className='header--link'>Home</Link>
                        <Link to='/profile' className='header--link'>Profile</Link>

                        <button onClick={logoutClick} className='btn'>Logout</button>

                    </>
                ) : (
                    <Link className="btn" to='/login'>Login</Link>
                )}



            </div>
        </div>
    )
}
export default Header