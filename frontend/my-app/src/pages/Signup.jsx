import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/Login.css';
function Signup() {
    const navigate = useNavigate();
    const API_URL = 'http://localhost:3000'
    const [newUser, setNewUser] = useState({});
    const [load, setLoad] = useState(false);

    function isValidEmail(email){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    async function postNewUser(newUser) {
        try {
            const {userName, password, email} = newUser;
            if(!userName || !password || !email){
                alert("Pleae fill all fileds");
                return;
            }
            if(!isValidEmail(email)){
                alert("Invalid email format")
                return
            }

            setLoad(true);
            await axios.post(`${API_URL}/users`, newUser);
            setLoad(false);
            alert("user created succefuly!");
            navigate("/");
         } catch (err) {
            if(err.response?.status === 409){
                alert(err.response?.data?.message)
            }
            if(err.response?.status === 404){
                alert(err.response?.data.message)
            }
            else{
                alert("Network error")
            }
        }
    }
    return (
        <div className="login-container">
            <h1>Sign Up</h1>
            <input placeholder="user-name" onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })} />
            <input placeholder="password" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            <input placeholder="email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            <button onClick={() => postNewUser(newUser)}>Create User</button>
            {load ? <p>Loading...</p> : <></>}
            <p>already have an account? <strong onClick={() => navigate("/")}>log in</strong></p>
        </div>
    )
}
export default Signup;