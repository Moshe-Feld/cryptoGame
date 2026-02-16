import { useState } from "react";
import '../css/Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext"
export default function Login() {
    const [user, setUser] = useState({});
    const { Login } = useUser();
    const navigate = useNavigate();

    return (
        <div className="login-container">
            <h1>Welcome</h1>

            <input placeholder="user-name"
                onChange={(e) => setUser({ ...user, userName: e.target.value })} />
            <input placeholder="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <p style={{ "cursor": "pointer" }}>Forgat password? <strong onClick={() => navigate("/reset-pass")}>Reset Password</strong></p>
            <button onClick={async () => {
                Login(user);
            }}>Log in</button>
            <p style={{ "cursor": "pointer" }}>Don't have an account? <strong onClick={() => navigate("/sign-up")}>Sign Up</strong></p>
        </div>
    )
}