import { useEffect } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const { user, editUser } = useUser();

    return (
        <div className="home-wrapper">

            <section className="hero">
                <h1>Welcome to Crypto Game</h1>
                <p>
                    Learn how to break ciphers, improve logical thinking, and progress
                    through interactive challenges.
                </p>
                <p className="scroll-hint">Scroll down to begin</p>
            </section>

            <section className="section reveal game-bg" onClick={() => navigate("/startGame")}>
                <h2>Cipher Game</h2>
                <p>
                    Solve encrypted sentences, improve your decoding skills, and unlock
                    the next levels.
                </p>
                <span>Your level: {user.level}</span>
                {
                    user.level >= 1400 ? 
                    <div>
                        <p>you finished all the levels!!</p>
                        <button onClick={()=> editUser(user, "restart")}>Restart Levels</button>
                    </div> : <></>
                }
            </section>

            <section className="section reveal wiki-bg" onClick={() => navigate("/homeWiki")}>
                <h2>Cipher Wiki</h2>
                <p>
                    Learn how encryption works, explore common cipher techniques,
                    and get hints to solve harder challenges.
                </p>
                <span>Your knowledge level: {user.wikiLevels}</span>
            </section>

            <section className="section reveal class-bg" onClick={() => navigate("/class")}>
                <h2>My Classes</h2>
                <p>
                    Track your progress, assignments, and challenges within your class.
                </p>
            </section>

        </div>
    );
}

export default Home;
