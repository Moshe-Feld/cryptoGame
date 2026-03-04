import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Class.css"

function Class() {
    const { _id } = useParams();
    const API_URL = "http://localhost:3000";
    const [myStudents, setMyStudents] = useState([]);
    const [classData, setclassData] = useState("");
    const [myQuotes, setMyQuotes] = useState([]);
    const [newQuote, setNewQuote] = useState({ classId: _id });
    const [showModel, setShowModal] = useState(false);
    const [input, setInput] = useState("");
    const { user } = useUser();

    const navigate = useNavigate();

    async function getClass(id) {
        try {
            const response = await axios.get(`${API_URL}/class/${id}`);
            setclassData(response.data);
            setMyStudents(response.data.joinedUsers);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function loadQuotes(id) {
        try {
            const response = await axios.get(`${API_URL}/quotes/by-class/${id}`);
            setMyQuotes(response.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function postQuote(body) {
        try {
            await axios.post(`${API_URL}/quotes`, body);
            alert("quote added");
        } catch (err) {
            console.error(err.message);
        }
    }

    async function updateClass(id, details) {
        try {
            const res = await axios.put(`${API_URL}/class/${id}`, details)
            setShowModal(false);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function deleteClass(id) {
        try {
            if (!window.confirm('Are you sure? This will delete all quotes!')) return;
            const res = await axios.delete(`${API_URL}/class/${id}`)
            navigate('/class');
        } catch (err) {
            console.error(err.message);
        }
    }

    async function deleteQuote(id) {
        try {
            if (!window.confirm('Are you sure? This will delete all quotes!')) return;
            const res = await axios.delete(`${API_URL}/quotes/${id}`)
            navigate(`/class/${classData._id}`)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getClass(_id);
        loadQuotes(_id);
    }, [myQuotes])

    if (!classData || !user) return <p>Loading...</p>;

    const isTeacher = classData?.userId === user.userName;
    const isStudent = classData?.joinedUsers?.includes(user.userName);
    return (
        <>
            <h1>{classData.subject}</h1>
            {
                isTeacher && (
                    <button className="update-btn" onClick={() => setShowModal(true)}>Update Class</button>
                )
            }
            <div className="class-content">
                <div className="quotes-section">
                    <h3>Quotes</h3>
                    {Array.isArray(myQuotes) && myQuotes.length > 0 ? (
                        myQuotes.map((item, index) => {
                            const isCompleted = user?.levelCompleted?.includes(item._id);

                            return (
                                <div
                                    className="quote-card"
                                    key={item._id}
                                >
                                    <p onClick={() => navigate(`/quote/${item._id}`)}>Level: {index + 1}</p>
                                    {isCompleted && <span> ✔</span>}
                                    {isTeacher && (<button className="dlt-btn" onClick={() => deleteQuote(item._id)}>Delete</button>)}
                                </div>
                            );
                        })

                    ) : (
                        <p>No Quotes yet.</p>
                    )}
                </div>
                {isTeacher && (
                    <div className="students-section">
                        <h3>Students</h3>
                        {Array.isArray(myStudents) && myStudents.length > 0 ? (
                            <ul>
                                {myStudents.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No Students yet.</p>
                        )}
                    </div>
                )}
            </div>

            {isTeacher && (
                <>
                    <div className="form-section">
                        <h3>Add New Quote</h3>
                        <input
                            placeholder="Quote"
                            onChange={(e) =>
                                setNewQuote({ ...newQuote, quote: e.target.value })
                            }
                        />
                        <input
                            placeholder="Author"
                            onChange={(e) =>
                                setNewQuote({ ...newQuote, author: e.target.value })
                            }
                        />
                        <button onClick={() => postQuote(newQuote)}>Add</button>
                    </div>

                    <div className="form-section">
                        <h3>Invite Students</h3>
                        <p>Send them this join code:</p>
                        <h2 className="code-box">{classData.joinCode}</h2>
                        <p>(Students can join by entering this code in their dashboard)</p>
                    </div>
                </>
            )}
            {showModel && (
                <>
                    <div
                        className="modal-overlay"
                        onClick={() => setShowModal(false)}
                    />
                    <div className="modal">
                        <div className="modal-body">
                            <div className="input-group">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    placeholder="Enter new Subject"
                                    onChange={(e) => setInput(e.target.value)}
                                />
                            </div>
                            <button
                                className="delete-btn"
                                onClick={() => deleteClass(_id)}
                            >
                                Delete Class
                            </button>

                        </div>

                        <div className="modal-footer">
                            <button
                                className="cancel-btn"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="save-btn"
                                onClick={() => updateClass(classData._id, { subject: input })}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </>
            )}
            {isStudent && !isTeacher && (
                <div className="student-view">
                    <p>class created by user: {classData.userId}</p>
                    <p>You are a student in this class.</p>
                    <p>Click on a level to start the activity!</p>
                </div>
            )}
        </>
    )
}
export default Class;