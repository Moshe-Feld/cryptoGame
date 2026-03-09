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
    const navigate = useNavigate();

    async function Login(user) {
        try {
            const userLogIn = await axios.get(`${API_URL}/users/user-name/${user.userName}`);
            if (!userLogIn.data.exists) {
                return alert("No account found with this username");
            }
            if (user.password !== userLogIn.data.user.password) {
                return alert("Wrong password");
            }
            setUser(userLogIn.data.user);
            setConnected(true);
            navigate('/home');
        } catch (err) {
            console.error(err.message);
        }
    }

    async function LogOut() {
        try {
            setConnected(false);
            setUser(null);
            navigate("/");
        } catch (err) {
            console.error(err.message);
        }
    }


    async function editUser(user, type, quoteId) {
        try {
            const update = {
                coins: 10,
                quoteId
            };

            if (type === "level") update.level = 1;
            else if (type === "filmLevel") update.filmLevel = 1;
            else if (type === "peopleLevel") update.peopleLevel = 1;
            else if (type === "tvLevel") update.tvLevel = 1;
            else if (type === "restart") {update.coins = -user.coins+50; update.level = -user.level + 1}
            const { data: updatedUser } = await axios.put(`${API_URL}/users/${user._id}`,
                update);
            setUser(updatedUser);
        } catch (err) {
            if (err.response?.status === 404) {
                console.error(err.message);
            } else {
                console.error("Error updating user:", err.message);
            }
        }
    }

    return (
        <userContext.Provider value={{ user, connected, Login, LogOut, editUser }}>
            {children}
        </userContext.Provider>
    )
}