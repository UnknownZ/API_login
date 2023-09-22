import { useContext, useState, useEffect, createContext } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
const [loading, setLoading] = useState(false)
const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
const [token, setToken] = useState(localStorage.getItem('access_token') || null)

useEffect(() => {
    setLoading(false)
}, [])

const contextData = {
    token,
    setToken,
    user,
    setUser
}

return (
    <AuthContext.Provider value={contextData}>
        {loading ? <p>loading...</p> : children}
    </AuthContext.Provider>
)}

export const useAuth = () => { return useContext(AuthContext) }
export default AuthProvider