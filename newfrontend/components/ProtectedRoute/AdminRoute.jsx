import { Navigate } from "react-router-dom";

function AdminRoute({user,children}){

    if(!user){
        return <Navigate to="/" />
    }

    if(user.role !== "admin"){
        return <Navigate to="/home" />
    }

    return children;
}

export default AdminRoute;