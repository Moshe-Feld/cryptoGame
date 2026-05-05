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

    async function deleteQuote(id) {
        try {
            if (!window.confirm('Are you sure? This will delete all quotes!')) return;
            const res = await axios.delete(`${API_URL}/quotes/${id}`)
            navigate(-1)
        } catch (err) {
            alert("Network error")
        }
    }

    useEffect(() => {
        loadQuote(_id);
    }, []);

    const isCompleted = user?.levelCompleted?.includes(_id);
    return (
        <>
            <div className="quote-header">
                <button className="back" onClick={() => navigate(`/class/${classId}`)}>Go Back</button>
            </div>

            <div className="quote-title-section">
                <span className="quote-label">level: {state.level}</span>
                <h1>{state.className}</h1>
            </div>

            {
                isCompleted || state.isTeacher ?
                    <div className="completed-card">
                        <span className="completed-badge">✔</span>
                        <p className="completed-text">{quote.text}</p>
                        <p className="completed-author">— {quote.author}</p>
                        {state.isTeacher && (<button className="dlt-btn" onClick={() => deleteQuote(_id)}>Delete</button>)}
                    </div>
                    :
                    <CreatePuzzle text={quote.text} type={"class"} quoteId={_id.toString()} classId={classId} author={quote.author} />
            }

        </>
    )
}
export default Quote;