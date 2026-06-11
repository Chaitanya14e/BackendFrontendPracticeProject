import { NavLink } from "react-router-dom"

function Profile({ user }) {
  return (
    <div className="border-3 border-gray-500 h-100 w-150 flex justify-center items-center bg-white p-5 ml-120 mt-20">
      <div className="w-95 bg-white p-9 rounded-sm text-center ">

        <img
          src={
            user?.avatar ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="avatar"
          className="w-22.5 h-22.5 object-cover rounded-2xl mb-4.5 border-#2563eb ml-25"
        />

        <p className="m-2 text-xl text-#6b7280">@{user?.userName}</p>
        <p className="m-2 text-xl text-#6b7280">{user?.email}</p>

        <NavLink to="/home">
          <button className="mt-5.5 w-full p-3 border-0 rounded-xl bg-blue-500 text-white cursor-pointer text-xl">
            Back
          </button>
        </NavLink>

      </div>
    </div>
  )
}

export default Profile
