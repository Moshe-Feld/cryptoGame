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
    const [myClasses, setMyClasses] = useState([])
    const navigate = useNavigate();

    async function loadClasses(teacherId) {
        try {
            const response = await axios.get(`${API_URL}/class/${teacherId}`);
            setMyClasses(response.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function Login(user) {
        try {
            const userLogIn = await axios.get(`${API_URL}/users/${user.userName}`);
            if (user.password !== userLogIn.data.password) {
                alert("wrong password");
            }
            setUser(userLogIn.data);
            setConnected(true);
            loadClasses(userLogIn.data.email);
            navigate('/home');
        } catch (err) {
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


    async function editUser(user) {
        try {
            const { data: updatedUser } = await axios.put(`${API_URL}/users/${encodeURIComponent(user.email)}`, {
                coins: 10,
                level: 1,
            });
            setUser(updatedUser);
        } catch (err) {
            if (err.response?.status === 404) {
                console.error(`User ${user.email} not found on server.`);
            } else {
                console.error("Error updating user:", err.message);
            }
        }
    }



    return (
        <userContext.Provider value={{ user, connected, myClasses, loadClasses, Login, LogOut, editUser }}>
            {children}
        </userContext.Provider>
    )
}