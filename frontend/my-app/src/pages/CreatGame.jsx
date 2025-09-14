import { useState } from "react";
import CreatePuzzle from "../components/CreatePuzzle";
function CreatGame() {
    const [myGame, setMyGame] = useState({ quote: "", author: "" })
    const [status, setStatus] = useState(false);

    return (
        status ? <CreatePuzzle text={myGame.quote} /> :
            <>
                <div className="login-container">
                    <h1>Creat Game</h1>
                    <p>hi plaese enter a Quote</p>
                    <input placeholder="My Quote" onChange={(e) => setMyGame({ ...myGame, quote: e.target.value })} />
                    <input placeholder="Author" onChange={(e) => setMyGame({ ...myGame, author: e.target.value })} />
                    <button onClick={() => { alert(myGame.quote + "created"); setStatus(true) }}>Create</button>
                </div>
            </>
    )
}

export default CreatGame;