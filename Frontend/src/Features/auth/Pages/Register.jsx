import React,{useState} from 'react'
import { useNavigate, Link } from "react-router"
import "./Register.css"
import {useAuth} from "../Hooks/useAuth"
import Loading from "./Loading/Loading.jsx"


const Register = () => {
const navigate = useNavigate();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

const {loading,handleRegister} = useAuth()


  const handleSubmit = async (e) =>{
    e.preventDefault()
    await handleRegister({username,email,password})
    navigate('/generate-report')

  }

  if(loading){
    return (
    <main>
    <Loading/>
    </main>
    )
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


        <form>


          <label>Username</label>
          <input
         onChange={(e)=>{setUsername(e.target.value)}}
            type="text"
            placeholder="Enter your username"
          />


          <label>Email address</label>
          <input
          onChange={(e)=>{setEmail(e.target.value)}}
            type="email"
            placeholder="example@example.com"
          />


          <label>Password</label>

          <div className="password-box">

            <input
            onChange={(e)=>{setPassword(e.target.value)}}
              type="password"
              placeholder="At least 8 characters"
            />


          </div>


          <p className="terms">
            By creating an account you agree to our
            <span> Terms of Service</span> and
            <span> Privacy Policy</span>
          </p>



          <button onClick={handleSubmit}>
            Create Free Account →
          </button>


        </form>


      </div>


      <div className="signin-1">
        Already have an account?
        <span> <Link to={'/login'}>
          Sign in
          </Link>
          </span>
      </div>

    </div>
  );
};

export default Register