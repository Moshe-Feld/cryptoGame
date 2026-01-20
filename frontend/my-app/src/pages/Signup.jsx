import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
    const navigate = useNavigate();
    const API_URL = 'http://localhost:3000'
    const [newUser, setNewUser] = useState({});
    const [load, setLoad] = useState(false);
    async function postNewUser(newUser) {
        try {
            console.log(newUser);
            setLoad(true);
            const userExists = await axios.get(`${API_URL}/users/user-name/${newUser.userName}`);
            if(userExists) return alert('user alredy exists');
            await axios.post(`${API_URL}/users`, newUser);
            setLoad(false);
            alert("user created succefuly!");
            navigate("/");
        } catch (err) {
            console.error(err.message);
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