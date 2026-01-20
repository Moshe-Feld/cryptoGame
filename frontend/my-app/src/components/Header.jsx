import { NavLink, useNavigate } from "react-router-dom";
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
            {/* <div className="navbar">
                <div className="a"><NavLink to={"/home"}>Home</NavLink></div>
                <div className="a"><NavLink to={"/startGame"}>start</NavLink></div>
                <div className="a"><NavLink to={"/class"}>Creat Class</NavLink></div>
            </div> */}
        </>
    )
}

export default Header;