import axios from "axios";
import { useState } from "react";
import "../css/Login.css"
function ResetPass() {
    const API_URL = 'http://localhost:3000'
    const [email, setEmail] = useState("");
     function isValidEmail(email){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    async function reset(email) {
        try {
             if(!isValidEmail(email)){
                alert("Invalid email format")
                return
            }
            const res =  await axios.put(`${API_URL}/users/reset-password/${email}`);
            alert(`your password is reset. go to your profile to check it`);
        } catch (err) {
            console.error(err.mesaage);
        }
    }
    return (
        <div className="login-container">
            <input placeholder="Enter your email" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <button onClick={()=>reset(email)}>Reset</button>
        </div>
    )
}
export default ResetPass;