import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userContext = createContext();
const API_URL = 'http://localhost:3000'

export function useUser() {
    return useContext(userContext);
};

export function UserProvider({ children }) {
    const [user, setUser] = useState("");
    const navigate = useNavigate();
   async function Login(user) {
        try {
            const userLogIn = await axios.get(`${API_URL}/users/${user}`);
            navigate("/home")
        }
        catch (err) {
            try {
                if (err.response === 404) {
                    axios.post(`${API_URL}/users`, { user });
                    alert("user added succefuly");
                    alert("log in now")
                }
            } catch (err) {
                console.error(err.message);
            }
        }

    }

    return(
        <userContext.Provider value={{user, setUser, Login}}>
            {children}
        </userContext.Provider>
    )
}