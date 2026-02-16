import {  useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
function Header() {
    const { user, LogOut } = useUser();
    return (
        <>
            <div className="header">
                <p>Crypto Game</p>
                <p>connect as {user.userName}</p>
                 <button onClick={() => LogOut()}>Log Out</button>
            </div>
        </>
    )
}

export default Header;