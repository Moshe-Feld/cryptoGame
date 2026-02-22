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

    if (!user || !user.userName) return <p>Loading...</p>;
    async function loadStudentClass(userName) {
        try {
            const response = await axios.get(`${API_URL}/class/joinedUsers/${userName}`);
            setStudentClass(response.data);
        } catch (err) {
            console.error(err.message);
        }
    }
    async function addClass() {
        try {
            const classDetails = {
                userId: user.userName,
                subject,
            };
            await axios.post(`${API_URL}/class`, classDetails);
            alert("Class added");
        } catch (err) {
            console.error(err.message);
        }
    }

    async function joinToClss() {
        try {
            const student = {
                userName: user.userName,
                joinCode: code
            }
            await axios.put(`${API_URL}/class/join/`, student);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        loadStudentClass(user.userName);
        loadClasses(user.userName);
    }, [studentClass, myClasses]);

    useEffect(() => {
        const sections = document.querySelectorAll('.class-section, .form-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    },[])

    return (
        <>
            <h1>My Classes</h1>
            <div className="class-sections">
                <div className="class-section">
                    <h3>Classes I Created</h3>
                    {Array.isArray(myClasses) && myClasses.length > 0 ? (
                        myClasses.map((item) => <div className="class-box"
                            onClick={() => navigate(`/class/${item._id}`)}
                        > <p>{item.subject}</p></div>)
                    ) : (
                        <p>No classes yet.</p>
                    )}
                </div>

                <div className="class-section">
                    <h3>Classes I Joined</h3>
                    {Array.isArray(studentClass) && studentClass.length > 0 ? (
                        studentClass.map((item) => <div className="class-box"
                            onClick={() => navigate(`/class/${item._id}`)}
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