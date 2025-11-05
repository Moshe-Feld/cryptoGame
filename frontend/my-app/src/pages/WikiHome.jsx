import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const categories = [
    { name: "RANDOM", key: "Random" },
    { name: "SCIENCE", key: "Science" },
    { name: "TECHNOLOGY", key: "Technology" },
    { name: "FILM", key: "Film" },
    { name: "MUSIC", key: "Music" },
    { name: "HISTORY", key: "History" },
];

function WikiHome() {
    const navigate = useNavigate();
    const { user, LogOut } = useUser();

    const handleStartGame = (categoryKey) => {
        navigate(`/startWiki/${categoryKey}`);
    };

    return (
        <div className="login-container">
            <h3>wiki levels completed: {user.wikiLevels}</h3>
            <p><strong>your coins: </strong>{user?.coins}</p>
            <h4>chose category:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px' }}>
                {categories.map((cat) => (
                    <button
                        key={cat.key}
                        onClick={() => handleStartGame(cat.key)}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default WikiHome;