import axios from "axios";
import { useState } from "react";
import "../css/Login.css"
import { useNavigate } from "react-router-dom";
function ResetPass() {
    const API_URL = 'http://localhost:3000'
    const [email, setEmail] = useState("");
    const navigate = useNavigate()

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    async function reset(email) {
        try {
            if (!isValidEmail(email)) {
                alert("Invalid email format")
                return
            }
            const res = await axios.put(`${API_URL}/users/reset-password/${email}`);
            alert(`your password is reset. go to your profile to check it`);
            navigate("/")
        } catch (err) {
            if (err.response?.status === 404) {
                alert("No account found with this email address");
                setEmail("")
                return;
            }
            console.error(err.mesaage);
        }
    }
    return (
        <div className="login-container">
            <h1>Reset Password</h1>

            <div className="reset-info">
                <p>Enter your email address below</p>
                <p>Your password will be reset to <strong>0000</strong></p>
                <p>After logging in, go to your profile to set a new password</p>
            </div>

            <input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={() => reset(email)}>Reset Password</button>
        </div>
    )
}
export default ResetPass;