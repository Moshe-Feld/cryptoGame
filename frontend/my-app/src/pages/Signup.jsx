import { useState } from "react";
import axios from "axios";
function Signup(){
    const API_URL = 'http://localhost:3000' 
    const [newUser, setNewUser] = useState({});
    async function postNewUser(newUser) {
        try{
            console.log(newUser);
            await axios.post(`${API_URL}/users`, newUser);
            alert("user created succefuly!")
        }catch(err){
            console.error(err.message);
        }
    }
    return(
        <div className="login-container">
            <h1>Sign Up</h1>
            <input placeholder="user-name" onChange={(e)=> setNewUser({...newUser, userName: e.target.value})}/>
            <input placeholder="password" onChange={(e)=> setNewUser({...newUser, password: e.target.value})}/>
            <input placeholder="email" onChange={(e)=> setNewUser({...newUser, email: e.target.value})}/>
            <label>Choose a profile</label>
            <select onChange={(e)=> setNewUser({...newUser, profile: e.target.value})}>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
            </select>
            <button onClick={()=>postNewUser(newUser)}>Create User</button>
        </div>
    )
}
export default Signup;