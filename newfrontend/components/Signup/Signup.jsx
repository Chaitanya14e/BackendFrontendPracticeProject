import {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./Signup.css"

export default function Signup({onSignup,message}) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const success = await onSignup({
      email,
      userName: username,
      password
    });

    if (success) {
      navigate("/");
    }
  }
  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submitHandler}>
        <h2>Signup</h2>


        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-btn green-btn">
          Signup
        </button>

        <p className="msg">{message}</p>

        <p>
          Already have account?{" "}
          <Link to="/" className="auth-link">
            Login
          </Link>
        </p>
      </form>
     
    </div>
  )
}


