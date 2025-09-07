import { NavLink } from "react-router-dom";
function Header() {
    return (
        <>
            <div className="header">
                <p>Crypto Game</p>
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