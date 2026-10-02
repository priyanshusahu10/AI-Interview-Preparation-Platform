import { useContext} from "react"
import { AuthContext } from "../auth.context"
import { login, register, logOut, getUser } from "../Services/auth.api"



export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an Authprovider")
    }
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            if (data?.user) {
                setUser(data.user)
            }
            return data
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ email, username, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            if (data?.user) {
                setUser(data.user)
            }
            return data
        } finally {
            setLoading(false)
        }
    }

    const handlelogOut = async () => {
        setLoading(true)
        try {
            await logOut()
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, handleRegister, handleLogin, handlelogOut }
}