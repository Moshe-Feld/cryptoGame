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
    const [myQoutes, setMyQoutes] = useState([]);
    const [newQuote, setNewQuote] = useState({classId: _id });
    const { user } = useUser();

    const navigate = useNavigate();

    async function getClass(id) {
        try {
            const response = await axios.get(`${API_URL}/class/${id}`);
            setclassData(response.data);
            setMyStudents(response.data.students);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function loadQoutes(id) {
        try {
            const response = await axios.get(`${API_URL}/qoutes/by-class/${id}`);
            setMyQoutes(response.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function postQoute(body) {
        try {
            await axios.post(`${API_URL}/qoutes`, body);
            alert("qoute added");
        } catch (err) {
            console.error(err.message);
        }
    }

    async function deleteClass(id) {
        try{
            confirm('are you sure you want to delete ?')
            const res = await axios.delete(`${API_URL}/class/${id}`)
            navigate('/class');
        }catch(err){
            console.error(err.message);
        }
    }

    useEffect(() => {
        getClass(_id);
        loadQoutes(_id);
    }, [myQoutes])

    if (!classData || !user) return <p>Loading...</p>;

    const isTeacher = classData?.teacherId === user.userName;
    const isStudent = classData?.students?.includes(user.userName);
    return (
        <>
            <div className="class-content">
                <div className="qoutes-section">
                    <h3>Qoutes</h3>
                    {Array.isArray(myQoutes) && myQoutes.length > 0 ? (
                        myQoutes.map((item, index) => {
                            const isCompleted = user?.levelCompleted?.includes(item._id);

                            return (
                                <div
                                    className="qoute-card"
                                    key={item._id}
                                    onClick={() => navigate(`/qoute/${item._id}`)}
                                >
                                    Level: {index + 1}
                                    {isCompleted && <span> ✔</span>}
                                </div>
                            );
                        })

                    ) : (
                        <p>No Qoutes yet.</p>
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
                                setNewQuote({ ...newQuote, qoute: e.target.value })
                            }
                        />
                        <input
                            placeholder="Author"
                            onChange={(e) =>
                                setNewQuote({ ...newQuote, author: e.target.value })
                            }
                        />
                        <button onClick={() => postQoute(newQuote)}>Add</button>
                    </div>

                    <div className="form-section">
                        <h3>Invite Students</h3>
                        <p>Send them this join code:</p>
                        <h2 className="code-box">{classData.joinCode}</h2>
                        <p>(Students can join by entering this code in their dashboard)</p>
                    </div>
                </>
            )}
            {isTeacher && (
                <>
                <button onClick={()=> deleteClass(_id)}>Delete</button>
                </>
            )}
            {isStudent && !isTeacher && (
                <div className="student-view">
                    <p>You are a student in this class.</p>
                    <p>Click on a level to start the activity!</p>
                </div>
            )}
        </>
    )
}
export default Class;