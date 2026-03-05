import {  useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
function Header() {
    const { user, LogOut } = useUser();
    const navigate = useNavigate()
    return (
        <>
            <div className="header">
                <p onClick={()=> navigate("/home")}>Crypto Game</p>
                <p onClick={()=>navigate(`/profile`)}>connect as {user.userName} <br/> your coins: {user.coins}</p>
                 <button onClick={() => LogOut()}>Log Out</button>
            </div>
        </>
    )
}

export default Header;