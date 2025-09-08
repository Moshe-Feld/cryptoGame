import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userContext = createContext();
const API_URL = 'http://localhost:3000'

export function useUser() {
    return useContext(userContext);
};

export function UserProvider({ children }) {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    async function getUser(email) {
        const userData = axios.get(`${API_URL}/users/${email}`)
        setUser(userData.data);
    }
    async function Login(email) {
        try {
            const userLogIn = await axios.get(`${API_URL}/users/${email}`);
            setEmail(userLogIn.data);
            return navigate("/home")
        }
        catch (err) {
            try {
                if (err.response && err.response.status === 404) {
                    await axios.post(`${API_URL}/users`, { email });
                    alert("user added succefuly!");
                    Login(email)
                }
            } catch (err) {
                console.error(err.message);
            }
        }

    }

    async function countWins(email) {
        try{
            const response = await axios.put(`${API_URL}/users/${email}`);
        }catch(err){
            console.error(err.message);
        }
    }


    return (
        <userContext.Provider value={{ email, setEmail, Login, countWins }}>
            {children}
        </userContext.Provider>
    )
}