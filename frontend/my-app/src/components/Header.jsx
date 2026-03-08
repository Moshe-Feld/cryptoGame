import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
function Header() {
    const { user, LogOut } = useUser();
    const navigate = useNavigate()
    return (
        <>
            <div className="header">
                <p onClick={() => navigate("/home")}>Crypto Game</p>
                <div className="header-user-info" onClick={() => navigate(`/profile`)}>
                    <span className="user-label">Connected as</span>
                    <span className="user-name">{user.userName}</span>
                    <span className="user-coins">🪙 {user.coins} coins</span>
                </div>
                <button onClick={() => LogOut()}>Log Out</button>
            </div>
        </>
    )
}

export default Header;