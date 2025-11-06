import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import "../css/ClasePage.css";
 
function ClassPage() {
    const navigate = useNavigate();
    const [subject, setSubject] = useState("");
    const [code, setCode] = useState("");
    const [studentClass, setStudentClass] = useState([]);
    const { user, myClasses, loadClasses } = useUser();
    const API_URL = "http://localhost:3000";

    if (!user || !user.email) return <p>Loading user...</p>;
    async function loadStudentClass(email) {
        try {
            const response = await axios.get(`${API_URL}/class/students/${email}`);
            setStudentClass(response.data);
        } catch (err) {
            console.error(err.message);
        }
    }
    async function addClass() {
        try {
            const classDetails = {
                teacherId: user.email,
                classId: `${user.userName}-${Date.now()}`,
                subject,
            };
            await axios.post(`${API_URL}/class`, classDetails);
            alert("Class added");
            loadClasses(user.email);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function joinToClss() {
        try {
            const student = {
                email: user.email,
                joinCode: code
            }
            await axios.put(`${API_URL}/class`, student);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        loadStudentClass(user.email);
    }, [studentClass]);

    return (
        <>
            <h1>My Classes</h1>
            <div className="class-sections">
                <div className="class-section">
                    <h3>Classes I Teach</h3>
                    {Array.isArray(myClasses) && myClasses.length > 0 ? (
                        myClasses.map((item) => <div className="class-box"
                            onClick={() => navigate(`/class/${item.classId}`)}
                        > <p>{item.subject}</p></div>)
                    ) : (
                        <p>No classes yet.</p>
                    )}
                </div>

                <div className="class-section">
                    <h3>Classes I Joined</h3>
                    {Array.isArray(studentClass) && studentClass.length > 0 ? (
                        studentClass.map((item) => <div className="class-box"
                            onClick={() => navigate(`/class/${item.classId}`)}
                        > <p>{item.subject}</p></div>)
                    ) : (
                        <p>No classes yet.</p>
                    )}
                </div>

            </div>

            <div className="form-sections">
                <div className="form-card">
                    <h3>New Class</h3>
                    <input
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <button onClick={addClass}>Add Class</button>
                </div>

                <div className="form-card">
                    <h3>Join To Class</h3>
                    <input
                        placeholder="join code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button onClick={joinToClss}>Join</button>
                </div>
            </div>

        </>
    );
}
export default ClassPage;