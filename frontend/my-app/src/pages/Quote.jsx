import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreatePuzzle from "../components/CreatePuzzle";

function Quote(){
    const API_URL = "http://localhost:3000";
    const {_id} = useParams();
    const [quote, setQuote] = useState("");
    async function loadQuote(id){
        try{
            const response = await axios.get(`${API_URL}/quotes/${id}`);
            setQuote(response.data.quote);
        }catch(err){
            console.error(err.message);
        }
    }
    useEffect(()=>{
        loadQuote(_id);
    },[]);

    return(
        <>
        <CreatePuzzle text={quote} quoteId={_id}/>
        </>
    )
}
export default Quote;