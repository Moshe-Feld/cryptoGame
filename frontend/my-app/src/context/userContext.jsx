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
    const [myClasse, setMyClasses] = useState([])
    const navigate = useNavigate();

    async function loadClasses(teacherId) {
        try {
            const response = await axios.get(`${API_URL}/class/${teacherId}`);
            setMyClasses(response.data);
            alert(response.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function Login(user) {
        try{
            const userLogIn = await axios.get(`${API_URL}/users/${user.userName}`);
            if(user.password !== userLogIn.data.password){
                alert("wrong password");
            }
            setUser(userLogIn.data);
            setConnected(true);
            if(userLogIn.data.profile === 'teacher'){
                loadClasses(userLogIn.data.email);
            }
            navigate('/home');
        }catch(err){
            console.error(err.message);
        }
    }

    async function LogOut() {
        try {
            setConnected(false);
            setUser(null);
            setMyClasses(null);
            navigate("/");
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
        <userContext.Provider value={{ user, connected, myClasse, Login, LogOut }}>
            {children}
        </userContext.Provider>
    )
}