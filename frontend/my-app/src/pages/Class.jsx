import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Class.css"

function Class() {
    const { _id } = useParams();
    const API_URL = "http://localhost:3000";
    const [joinedUsers, setJoinedUsers] = useState([])
    const [joinedIds, setJoinedIds] = useState([])
    const [classData, setclassData] = useState("");
    const [createdBy, setCreatedBy] = useState("")
    const [myQuotes, setMyQuotes] = useState([]);
    const [newQuote, setNewQuote] = useState({ classId: _id, text: "", author: "" });
    const [showModel, setShowModal] = useState(false);
    const [progress, setProgress] = useState({})
    const [input, setInput] = useState("");
    const { user } = useUser();

    const navigate = useNavigate();

    async function getClass(id) {
        try {
            const response = await axios.get(`${API_URL}/class/${id}`);
            setclassData(response.data);
            getCreatedUser(response.data.userId)
        } catch (err) {
            if (err.response?.status === 404) {
                alert(err.response?.data?.message)
            }
            else {
                alert("Network error");
            }
        }
    }

    async function getJoinedUsers(id) {
        try {
            const result = await axios.get(`${API_URL}/userClass/joined-users/${id}`)
            setJoinedIds(result.data)
            const requests = result.data.map((item) =>
                axios.get(`${API_URL}/users/${item}`)
            )
            const responses = await Promise.all(requests)
            const usersData = responses.map(u => u.data)
            setJoinedUsers(usersData)
        } catch (err) {
            if (err.response?.status === 404) {
                alert(err.response?.data.message)
            }
            else {
                alert("Network error");
            }
        }
    }

    async function getCreatedUser(id) {
        try {
            const response = await axios.get(`${API_URL}/users/${id}`)
            setCreatedBy(response.data.userName)
        } catch (err) {
            if (err.response?.status === 404) {
                alert(err.response?.data.message)
            }
            else {
                alert("Network error");
            }
        }
    }
    async function loadQuotes(id) {
        try {
            const response = await axios.get(`${API_URL}/quotes/by-class/${id}`);
            setMyQuotes(response.data);
        } catch (err) {
            if (err.response?.status === 404) {
                alert(err.response?.data.message)
            }
            else {
                alert("Network error");
            }
        }
    }

    async function postQuote(body) {
        try {
            setNewQuote({ classId: _id, text: "", author: "" })
            await axios.post(`${API_URL}/quotes`, body);
            loadQuotes(_id);
            alert("quote added");
        } catch (err) {
            alert("Network error")
        }
    }

    async function updateClass(id, details) {
        try {
            const res = await axios.put(`${API_URL}/class/${id}`, details)
            setShowModal(false);
            navigate('/create-class')
        } catch (err) {
            if (err.response?.status === 404) {
                alert(err.response?.data.message)
            }
            alert("Network error")
        }
    }

    async function deleteClass(id) {
        try {
            if (!window.confirm('Are you sure? This will delete all quotes!')) return;
            const res = await axios.delete(`${API_URL}/class/${id}`)
            navigate('/create-class');
        } catch (err) {
            alert("Network error")
        }
    }

    async function fetchAllProgress() {
        try {
            const progressObj = {}
            await Promise.all(
                joinedUsers.map(async (ju) => {
                    const res = await axios.get(`${API_URL}/users/user-progress/${ju._id}`, { params: { classId: _id } })
                    progressObj[ju._id] = res.data
                })
            )
            setProgress(progressObj)
        } catch (err) {
            if (err.response?.status === 404) {
                alert(err.response?.data.message)
            }
            else {
                alert("Network error");
            }
        }
    }

    async function leaveClass(id) {
        try {
            if (!window.confirm('Are you sure you want leave this class?')) return;
            const responae = await axios.delete(`${API_URL}/userClass/${id}`)
            navigate('/class')
        } catch (err) {
            if (err.responae?.status == 404) {
                alert(err.responae?.data.message)
            }
            else {
                alert("Network error")
            }
        }
    }

    useEffect(() => {
        getClass(_id);
        loadQuotes(_id);
        getJoinedUsers(_id)
    }, [_id])

    useEffect(() => {
        if (joinedUsers.length > 0) {
            fetchAllProgress()
        }
    }, [joinedUsers, myQuotes])

    if (!classData || !user) return <p>Loading...</p>;

    const isTeacher = classData?.userId === user._id;
    const isStudent = joinedIds.includes(user._id)
    return (
        <>
            <div className="class-header">
                <button className="back" onClick={() => {
                    isTeacher ? navigate('/create-class') :
                        navigate('/class')
                }}>Go back</button>
                {
                    isTeacher && (
                        <button className="update-btn" onClick={() => setShowModal(true)}>Update Class</button>
                    )
                }
            </div>

            <div className="title">
                <span className="label">class</span>
                <h1>{classData.subject}</h1>
            </div>

            <div className="class-content">
                <div className="quotes-section">
                    <h3>Quotes</h3>
                    {Array.isArray(myQuotes) && myQuotes.length > 0 ? (
                        myQuotes.map((item, index) => {
                            const isCompleted = user?.levelCompleted?.includes(item._id);

                            return (
                                <div onClick={() => {
                                    navigate(`/quote/${item._id}`, {
                                        state: {
                                            text: item.text,
                                            author: item.author,
                                            classId: _id,
                                            className: classData.subject,
                                            level: index + 1,
                                            isTeacher: isTeacher
                                        }
                                    })
                                }}
                                    className="quote-card"
                                    key={item._id}
                                    style={{ cursor: "pointer" }}
                                >
                                    <p>Level: {index + 1}</p>
                                    {isCompleted && <span> ✔</span>}
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
                        {Array.isArray(joinedUsers) && joinedUsers.length > 0 ? (
                            <ul>
                                {joinedUsers.map((item, index) => {
                                    const prog = progress[item._id]
                                    const percent = prog
                                        ? Math.round((prog.myLevels / prog.totalLevels) * 100)
                                        : 0

                                    return (
                                        <li key={index}>
                                            <span>{item.userName}</span>
                                            <div className="progress-bar-container">
                                                <div
                                                    className="progress-bar-fill"
                                                    style={{ width: `${percent}%` }}
                                                />
                                            </div>
                                            <small>
                                                {prog ? `${prog.myLevels}/${prog.totalLevels} levels` : 'loading...'}
                                            </small>
                                        </li>
                                    )
                                })}
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
                            value={newQuote.text}
                            onChange={(e) =>
                                setNewQuote({ ...newQuote, text: e.target.value })
                            }
                        />
                        <input
                            placeholder="Author"
                            value={newQuote.author}
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
                    <p>class created by user: {createdBy}</p>
                    <p>You are a student in this class.</p>
                    <p>Click on a level to start the activity!</p>
                    <button className="delete-btn" onClick={() => leaveClass(_id)}>Leave class</button>
                </div>
            )}
        </>
    )
}
export default Class;