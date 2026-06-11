import { useNavigate,NavLink } from "react-router-dom";
import {useState} from "react"
import {CircleUserRound} from "lucide-react"

function Home({onLogout}) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async(e)=>{
      e.preventDefault();
      const success = await onLogout();
      if(success){
        navigate("/");
      }
  }
  return (
    <div>
      <div className = "flex h-25 " >
        {/* <h1 className="text-2xl font-bold">Welcome, {user?.userName}!</h1>
        <h1 className="text-xl">Your Password is {password}</h1> */}
        <div className="h-5 flex ml-15 mt-7">
          <h1 className="text-3xl font-bold text-yellow-500">Fun</h1>
          <h1 className="text-3xl font-bold text-blue-700">Store</h1>
        </div>
        <div className="flex h-10 -mt-1">
          <img className="w-10 h-10 mt-8 ml-5 border border-gray-300 rounded-l-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/500px-Search_Icon.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail"/>
          <input
            type="text"
            placeholder="Search for products..."
            className="border border-gray-300 px-4 py-2 w-200 mt-8 h-10 rounded-r-full "
          />
        </div>
        <div>
          <CircleUserRound className="h-25 w-15 ml-70 cursor-pointer"
          onClick={()=> setShowMenu(!showMenu)}/>

          {showMenu && (
              <div className="h-30 absolute right-0 top-20 bg-white w-55 rounded-sm shadow-md pt-2.5 z-100">
                <NavLink
                  to="/profile"
                  className="ml-2 cursor-pointer"
                >
                  My Profile
                </NavLink>
                <br />
                <NavLink
                  to="/change-password"
                  className="ml-2 cursor-pointer"
                >
                  Change Password
                </NavLink>

                <p onClick={handleLogout} className="ml-2 cursor-pointer">
                  Logout
                </p>
              </div>
            )
          }
        </div>
      </div>
      {/* <div className="h-100 flex justify-center items-center">
          <h1>Welcome {user.userName} </h1>
      </div> */}
    </div>
      
  )
}

export default Home
