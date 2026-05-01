import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreatePuzzle from "../components/CreatePuzzle";
import { useUser } from "../context/userContext";
import "../css/Quote.css"

function Quote() {
    const API_URL = "http://localhost:3000";
    const { _id } = useParams();
    const {user} = useUser()
    const [quote, setQuote] = useState("");
    const [classId, setClassId] = useState("")
    async function loadQuote(id) {
        try {
            const response = await axios.get(`${API_URL}/quotes/${id}`);
            setQuote(response.data);
            setClassId(response.data.classId);
         } catch (err) {
            if(err.response?.status === 404){
                alert(err.response?.data.message)
            }
            else{
                alert("Network error");
            }
        }
    }
    
    useEffect(() => {
        loadQuote(_id);
    }, []);

    const isCompleted = user?.levelCompleted?.includes(_id);
    return (
        <>
            {
                isCompleted ? <div className="completed"><p>{quote.text}</p></div> :
                <CreatePuzzle text={quote.text} type={"class"} quoteId={_id.toString()} classId={classId} author={quote.author}/>
            }

        </>
    )
}
export default Quote;