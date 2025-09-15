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
    const [level, setLevel] = useState("");
    const [coins, setCoins] = useState("");
    const navigate = useNavigate();

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

    async function setCoinsToUser(email) {
        try {
            const {data} = await axios.put(`${API_URL}/users/${email}`);
            setCoins(data.coins);
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <userContext.Provider value={{ email, Login, level, setLevel, setCoinsToUser }}>
            {children}
        </userContext.Provider>
    )
}