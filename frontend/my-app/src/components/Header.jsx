import { NavLink } from "react-router-dom";
import { useUser } from "../../context/userContext";
function Header() {
    const {email} = useUser();
    return (
        <>
            <div className="header">
                <p>Crypto Game</p>
                <p>connect as {email.email}</p>
            </div>
            <div className="navbar">
                <div className="a"><NavLink to={"/home"}>Home</NavLink></div>
                <div className="a"><NavLink to={"/startGame"}>start</NavLink></div>
                <div className="a"><NavLink to={"/creatGame"}>Creat Game</NavLink></div>
            </div>
        </>
    )
}

export default Header;