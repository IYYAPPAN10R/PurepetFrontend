import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('pp_token') || null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('pp_token')
            if (storedToken) {
                try {
                    api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
                    const { data } = await api.get('/auth/me')
                    setUser(data.user)
                    setToken(storedToken)
                } catch {
                    localStorage.removeItem('pp_token')
                    delete api.defaults.headers.common['Authorization']
                    setUser(null)
                    setToken(null)
                }
            }
            setLoading(false)
        }
        initAuth()
    }, [])

    const login = (userData, authToken) => {
        localStorage.setItem('pp_token', authToken)
        api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
        setUser(userData)
        setToken(authToken)
    }

    const logout = () => {
        localStorage.removeItem('pp_token')
        delete api.defaults.headers.common['Authorization']
        setUser(null)
        setToken(null)
    }

    const updateUser = (updatedUser) => setUser(updatedUser)

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
