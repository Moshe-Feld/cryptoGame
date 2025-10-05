import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userContext = createContext();
const API_URL = 'http://localhost:3000'

export function useUser() {
    return useContext(userContext);
};

export function UserProvider({ children }) {
    const [email, setEmail] = useState({});
    const [connected, setConnected] = useState(false);
    const [myQoutes, setMyQoutes] = useState([])
    const navigate = useNavigate();

    async function Login(email) {
        try {
            const userLogIn = await axios.get(`${API_URL}/users/${email}`);
            setEmail(userLogIn.data);
            loadGames(email);
            setConnected(true);
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

    async function LogOut() {
        try{
            setConnected(false);
            setEmail(null);
            setMyQoutes(null);
            navigate("/");
        }catch(err){
            console.error(err.message);
        }
    }

    async function loadGames(email) {
        try{
            const response = axios.get(`${API_URL}/qoutes/${email}`);
            setMyQoutes(response.data);
        }catch(err){
            console.error(err.message);
        }
    }

    async function editUser(email) {
        try {
            const {data} = await axios.put(`${API_URL}/users/${email}`, {coins: 10, level: 1});
            setCoins(data.coins);
            setLevel(data.level);
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <userContext.Provider value={{ email, connected, Login, LogOut, editUser, myQoutes }}>
            {children}
        </userContext.Provider>
    )
}