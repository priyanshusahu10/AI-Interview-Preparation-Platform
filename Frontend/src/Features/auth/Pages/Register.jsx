import React, { useState } from 'react'
import { useNavigate, Link } from "react-router"
import "./Register.css"
import { useAuth } from "../Hooks/useAuth"
import Loading from "./Loading/Loading.jsx"

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !email.trim() || !password) {
      setError("Please fill in all fields")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    try {
      setError("")
      await handleRegister({
        username: username.trim(),
        email: email.trim(),
        password
      })
      navigate('/generate-report')
    } catch (err) {
      const errMsg = err.response?.data?.message || "Registration failed. Please try again."
      setError(errMsg)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="register-page">
      {/* Logo */}
      <div className="logo">
        <div className="logo-icon">✣</div>
        <h2>Prep<span>AI</span></h2>
      </div>

      {/* Card */}
      <div className="register-card">
        <h1>Create your account</h1>
        <p className="subtitle">
          Join 42,000+ candidates already preparing
        </p>

        <form onSubmit={handleSubmit}>
          {error && <p className="auth-error">{error}</p>}

          <label>Username</label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              setError("")
            }}
            type="text"
            placeholder="Enter your username"
            required
          />

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
              placeholder="At least 6 characters"
              required
            />
          </div>

          <p className="terms">
            By creating an account you agree to our
            <span> Terms of Service</span> and
            <span> Privacy Policy</span>
          </p>

          <button type="submit">
            Create Free Account →
          </button>
        </form>
      </div>

      <div className="signin-1">
        Already have an account?
        <span>
          {" "}
          <Link to={'/login'}>
            Sign in
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Register