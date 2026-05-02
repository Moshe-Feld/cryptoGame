import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import CreatePuzzle from "../components/CreatePuzzle";
import { useUser } from "../context/userContext";
import "../css/Quote.css"

function Quote() {
    const API_URL = "http://localhost:3000";
    const navigate = useNavigate()
    const { _id } = useParams();
    const { state } = useLocation();
    const { user } = useUser()

    const [quote, setQuote] = useState(state || "");
    const [classId, setClassId] = useState(state.classId || "")

    async function loadQuote(id) {
        try {
            if (state) return;
            const response = await axios.get(`${API_URL}/quotes/${id}`);
            setQuote(response.data);
            setClassId(response.data.classId);
        } catch (err) {
            if (err.response?.status === 404) {
                alert(err.response?.data.message)
            }
            else {
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
        <button onClick={()=>navigate(`/class/${classId}`)}>Go Back</button>
            <div className="quote-section">
                <h1>{state.className}</h1>
                <p>level: {state.level}</p>
            </div>
            {
                isCompleted ? <div className="completed"><p>{quote.text}</p></div> :
                    <CreatePuzzle text={quote.text} type={"class"} quoteId={_id.toString()} classId={classId} author={quote.author} />
            }

        </>
    )
}
export default Quote;