import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userContext = createContext();
const API_URL = 'http://localhost:3000'

export function useUser() {
    return useContext(userContext);
};

export function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const [connected, setConnected] = useState(false);
    const [myQoutes, setMyQoutes] = useState([])
    const navigate = useNavigate();

    async function Login(user) {
        try{
            console.log(`connect to: ###-${API_URL}/users/${user.userName}-###`)
            const userLogIn = await axios.get(`${API_URL}/users/${user.userName}`);
            if(user.password !== userLogIn.data.password){
                alert("wrong password");
            }
            setUser(userLogIn.data);
            setConnected(true);
            navigate('/home');
        }catch(err){
            console.error(err.message);
        }
    }

    // async function Login(email) {
    //     try {
    //         const userLogIn = await axios.get(`${API_URL}/users/${email}`);
    //         setEmail(userLogIn.data);
    //         loadGames(email);
    //         setConnected(true);
    //         return navigate("/home")
    //     }
    //     catch (err) {
    //         console.error(err.message);
    //     }

    // }

    async function LogOut() {
        try {
            setConnected(false);
            setUser(null);
            setMyQoutes(null);
            navigate("/");
        } catch (err) {
            console.error(err.message);
        }
    }

    async function loadGames(email) {
        try {
            const response = axios.get(`${API_URL}/qoutes/${email}`);
            setMyQoutes(response.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    // async function editUser(email) {
    //     try {
    //         const { data } = await axios.put(`${API_URL}/users/${email}`, { coins: 10, level: 1 });
    //         setCoins(data.coins);
    //         setLevel(data.level);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }


    return (
        <userContext.Provider value={{ user, connected, Login, LogOut }}>
            {children}
        </userContext.Provider>
    )
}