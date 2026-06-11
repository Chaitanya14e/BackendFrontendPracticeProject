
function AdminDashboard(){
    return(
        <div>
            <div className="flex justify-center items-center text-3xl font-bold">
                <h1>Admin Dashboard</h1>
            </div>
            <div className="h-100 flex justify-center items-center">
                <button className="w-25 h-10 border-black rounded-2xl bg-gray-400 ">Products</button>
                <button className="w-25 h-10 border rounded-2xl ml-5 bg-gray-400">Categories</button>
                <button className="w-25 h-10 border rounded-2xl ml-5 bg-gray-400">Orders</button>
                <button className="w-25 h-10 border rounded-2xl ml-5 bg-gray-400">Users</button>
            </div>
        </div>
    )
}

export default AdminDashboard;