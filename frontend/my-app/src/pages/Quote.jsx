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
    async function loadQuote(id) {
        try {
            const response = await axios.get(`${API_URL}/quotes/${id}`);
            setQuote(response.data.text);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        loadQuote(_id);
    }, []);
    const isCompleted = user?.levelCompleted?.includes(_id);
    return (
        <>
            {
                isCompleted ? <p>{quote}</p> :
                <CreatePuzzle text={quote} quoteId={_id} />
            }

        </>
    )
}
export default Quote;