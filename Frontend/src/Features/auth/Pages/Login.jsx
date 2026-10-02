import React, { useState } from 'react'
import { useNavigate, Link } from "react-router"
import "./Login.css"
import { useAuth } from "../Hooks/useAuth"
import Loading from "./Loading/Loading.jsx"

const Login = () => {
  const { loading, handleLogin } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      setError("Please fill in both email and password")
      return
    }

    try {
      setError("")
      await handleLogin({ email: email.trim(), password })
      navigate('/generate-report')
    } catch (err) {
      const errMsg = err.response?.data?.message || "Invalid email or password"
      setError(errMsg)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="login-page">
      {/* Logo */}
      <div className="logo">
        <div className="logo-icon">✣</div>
        <h2>
          Prep<span>AI</span>
        </h2>
      </div>

      {/* Login Card */}
      <div className="login-card">
        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to continue your preparation</p>

        <form onSubmit={handleSubmit}>
          {error && <p className="auth-error">{error}</p>}

          <label>Email address</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError("")
            }}
            type="email"
            placeholder="example@example.com"
            required
          />

          <label>Password</label>
          <div className="password-box">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className='login-button'>
            Sign In →
          </button>
        </form>
      </div>

      <div className="signup-link">
        Don't have an account?
        <span>
          <Link to={'/register'}>
            Create account
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Login