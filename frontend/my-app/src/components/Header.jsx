import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
function Header() {
    const { user } = useUser();
    const navigate = useNavigate();
    return (
        <>
            <div className="header">
                <p>Crypto Game</p>
                <p onClick={() => navigate('/profile')}>connect as {user.userName}</p>
            </div>
            <div className="navbar">
                <div className="a"><NavLink to={"/home"}>Home</NavLink></div>
                <div className="a"><NavLink to={"/startGame"}>start</NavLink></div>
                <div className="a"><NavLink to={"/class"}>Creat Class</NavLink></div>
            </div>
        </>
    )
}

export default Header;