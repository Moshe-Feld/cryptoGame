import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const categories = [
    { name: "🎬 FILMS", key: "films" },
    { name: "👤 ACTORS", key: "people" },
    { name: "📺 TV SHOWS", key: "tv" },
];

function WikiHome() {
    const navigate = useNavigate();
    const { user, LogOut } = useUser();

    const handleStartGame = (categoryKey) => {
        navigate(`/startWiki/${categoryKey}`);
    };

    return (
        <div className="login-container">
            <h3>🎬 Films: {user.filmLevel ?? 0} | 👤 Actors: {user.peopleLevel ?? 0} |  📺 TV Shows: {user.tvLevel ?? 0}</h3>            <p><strong>your coins: </strong>{user?.coins}</p>
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