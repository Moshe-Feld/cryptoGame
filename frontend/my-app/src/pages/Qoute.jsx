import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreatePuzzle from "../components/CreatePuzzle";

function Qoute(){
    const API_URL = "http://localhost:3000";
    const {_id} = useParams();
    const [qoute, setQoute] = useState("");
    async function loadQoute(id){
        try{
            const response = await axios.get(`${API_URL}/qoutes/${id}`);
            setQoute(response.data.qoute);
        }catch(err){
            console.error(err.message);
        }
    }
    useEffect(()=>{
        loadQoute(_id);
    },[]);

    return(
        <>
        <CreatePuzzle text={qoute} qouteId={_id}/>
        </>
    )
}
export default Qoute;