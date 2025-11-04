import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import {useUser} from "../context/userContext"
export default function Login() {
    const [user, setUser] = useState({});
    const {Login} = useUser();
    const navigate = useNavigate();
    return (
        <div className="login-container">
            <h1>Welcome</h1>
            <p>please enter your email to connect</p>
            <input placeholder="user-name"
                onChange={(e) => setUser({...user, userName: e.target.value})} />
            <input placeholder="password"
                onChange={(e)=> setUser({...user, password: e.target.value})}/>
            <button onClick={async () => {
                Login(user);
            }}>Log in</button>
            <p>Don't have an account? <strong onClick={()=>navigate("/sign-up")}>Sign Up</strong></p>
        </div>
    )
}