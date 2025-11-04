import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
   const {user, LogOut} = useUser();
    return (
        <div className="login-container">
            <p>Welcome</p>
            <button onClick={()=>LogOut()}>Log Out</button>
            <button onClick={()=>navigate("/startGame")}>Current Level: {user.level}</button>
           
        </div>
    )
}
export default Home;