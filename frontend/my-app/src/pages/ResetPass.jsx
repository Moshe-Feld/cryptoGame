import axios from "axios";
import { useState } from "react";
function ResetPass() {
    const API_URL = 'http://localhost:3000'
    const [email, setEmail] = useState("");
    async function reset(email) {
        try {
            const res =  await axios.put(`${API_URL}/users/reset-password/${email}`);
            alert(`your password is reset. go to your profile to check it`);
        } catch (err) {
            console.error(err.mesaage);
        }
    }
    return (
        <div>
            <input placeholder="Enter your email" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <button onClick={()=>reset(email)}>Reset</button>
        </div>
    )
}
export default ResetPass;