import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
    const { user } = useUser();
    return (
        <>

            <div className="home-container">
                <div className="home-item" onClick={() => navigate("/startGame")}>Current Level: {user.level}</div>
                <div className="home-item" onClick={() => navigate("/homeWiki")}>Wiki Level: {user.wikiLevels}</div>
                <div className="home-item" onClick={() => navigate("/class")}>My Classes</div>
            </div>
        </>
    )
}
export default Home;