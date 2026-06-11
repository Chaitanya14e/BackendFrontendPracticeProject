import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import "./Login.css"

export default function Login({onLogin,message}) {
    const [emailorUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 
    const submitHandler = async (e) => {
        e.preventDefault();
        const user = await onLogin(
            emailorUsername,
            password
        )
        if(!user) return;
        if(user.role === "admin"){
            navigate("/admin");
        }
        else{
          navigate("/home");
        }
    }
  return (
    <div>
      <div className="auth-container">
      <form className="auth-card" onSubmit={submitHandler}>
        <h2>Login</h2>

        <input
          className="auth-input"
          placeholder="Email or Username"
          value={emailorUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn blue-btn" type="submit">
          Login
        </button>

        <p className="msg">{message}</p>

        <p>
          Don't have account?{" "}
          <Link to="/signup" className="auth-link">
            Signup
          </Link>
        </p>
      </form>
      
    </div>
    </div>
  )
}

