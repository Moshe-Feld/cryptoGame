import { useState } from "react";
import CreatePuzzle from "../src/components/CreatePuzzle";
function CreatGame() {
    const [myGame, setMyGame] = useState({ quote: "", author: "" })
    const [status, setStatus] = useState(false);
    const code = {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7,
        h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14,
        o: 15, p: 16, q: 17, r: 18, s: 19, t: 20,
        u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
    };
    return (
        status ? <CreatePuzzle text={myGame.quote}/> :
            <div className="login-container">
                <h1>Creat Game</h1>
                <p>hi plaese enter a Quote</p>
                <input placeholder="My Quote" onChange={(e) => setMyGame({ ...myGame, quote: e.target.value })} />
                <input placeholder="Author" onChange={(e) => setMyGame({ ...myGame, author: e.target.value })} />
                <button onClick={() => { alert(myGame.quote + "created"); setStatus(true) }}>Create</button>
            </div>
    )
}

export default CreatGame;