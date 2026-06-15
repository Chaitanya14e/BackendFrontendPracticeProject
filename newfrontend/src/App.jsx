import {useState, useEffect} from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
} from "./lib/api.js"
import Login from "../components/Login/Login.jsx"
import Signup from "../components/Signup/Signup.jsx"
import Home from "../components/Home/Home.jsx"
import Profile from "../components/Profile/Profile.jsx"
import AdminRoute from '../components/ProtectedRoute/AdminRoute.jsx'
import AdminDashboard from '../components/Admin/Dashboard/AdminDashboard.jsx'
import './App.css'

function App() {
  const [user,setUser] = useState(null);
  const [message,setMessage] = useState("");
   useEffect(() => {

    const fetchUser = async () => {

      try {

        const response = await getCurrentUser();

        setUser(response.data);

      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };

    fetchUser();

  }, []);

  // BELOW THIS
  const handleLogin = async (Username, password) => {

    try {

      const response = await loginUser({
        userName:Username,
        password
      });

      setUser(response.data.user);

      setMessage("");

      return response.data.user;

    } catch (error) {

      setMessage(error.message);

      return false;
    }
  }
  const handleSignup = async (formData) => {
    try{
      await registerUser(formData);
      setMessage("");
      return true;
    }catch(error){
      setMessage(error.message);
      return false;
    }
  }

  const handleLogout = async () => {
    try {
      await logoutUser();
      setMessage("");
      return true;
    } catch (error) {
      setMessage(error.message);
      return false;
    }
  }
  const router = createBrowserRouter([
    {
      path:"/",
      element:(
        <Login
        onLogin={handleLogin}
        message={message}
        />
      )
    },
    {
      path:"/signup",
      element:(
        <Signup 
          onSignup = {handleSignup}
          message = {message}  
        />
      )
    },
    {
      path:"/home",
      element:(
        <Home
          user={user}
          // user={user}
          // password={password}
          onLogout={handleLogout}
        />
      )
    },
    {
      path:"/profile",
      element:(
        <Profile
          user={user}
        />
      )
    },
    {
      path:"/admin",
      element:(
        <AdminRoute user={user}>
          <AdminDashboard />
        </AdminRoute>
      )
    }
  ])
  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
