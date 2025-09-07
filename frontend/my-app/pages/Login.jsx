import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import {useUser} from "../context/userContext"
export default function Login() {
    const [user, setUser] = useState("");
    const {Login} = useUser();
    return (
        <div className="login-container">
            <h1>Welcome</h1>
            <p>please enter your email to connect</p>
            <input placeholder="email"
                onChange={(e) => setUser(e.target.value)} />

            <button onClick={async () => {
                Login(user);
            }}>Log in</button>
        </div>
    )
}