import { useEffect, useState } from "react";
import CreatePuzzle from "../components/CreatePuzzle";
import axios from "axios";
import { useParams } from "react-router-dom";
function CreatGame() {
    const {classId} = useParams;
    const [myQoute, setMyQoute] = useState({ quote: "", author: "" })
    const [myQoutes, setMyQoutes] = useState([]);
    const [status, setStatus] = useState(false);
    const API_URL = 'http://localhost:3000'
    async function loadQoutes(classId) {
        try{
            const response = await axios.get(`${API_URL}/qoutes/${classId}`);
            setMyQoutes(response.data);
        }catch(err){
            console.error(err.message);
        }
    }
    useEffect(()=>{
        loadQoutes()
    },[myQoutes]);
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