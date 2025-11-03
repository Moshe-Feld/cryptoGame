import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import TeacherInfo from "../components/TeacherInfo";
import StudentInfo from "../components/StudentInfo";
function Home() {
    const navigate = useNavigate();
   const {user, LogOut} = useUser();
    return (
        <div className="login-container">
            <p>Welcome</p>
            <button onClick={()=>LogOut()}>Log Out</button>
            <button onClick={()=>navigate("/startGame")}>Current Level: {user.level}</button>
            {
                user.profile === "teacher" ? <TeacherInfo/> : <StudentInfo/>
            }
        </div>
    )
}
export default Home;