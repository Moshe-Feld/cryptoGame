import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import "../css/ClassPage.css"

function ClassPage() {
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [classIds, setClassIds] = useState([])
    const [studentClass, setStudentClass] = useState([]);
    const { user } = useUser();
    const API_URL = "http://localhost:3000";

    if (!user || !user.userName) return navigate("/");


    async function loadStudentClass(userId) {
        try {
            const response = await axios.get(`${API_URL}/userClass/join-class/${userId}`);
            setClassIds(response.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function getClassData(classIds) {
        try {
            const requests = classIds.map((item) =>
                axios.get(`${API_URL}/class/${item.classId}`)
            )
            const responses = await Promise.all(requests)
            const classes = responses.map(res => res.data)
            setStudentClass(classes)
        } catch (err) {
            console.error(err.message)
        }
    }
    
    async function joinToClass() {
        try {
            console.log("user בזמן שליחה:", user);
            const response = await axios.post(`${API_URL}/userClass/${code}`, {userId: user._id})
            await loadStudentClass(user._id)
            await getClassData(classIds)
        } catch (err) {
            console.error(err.message)
        } 
    }

    useEffect(() => {
        loadStudentClass(user._id)

    }, [])

    useEffect(()=>{
        getClassData(classIds)
    },[classIds])

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
    }, [])

    return (
        <div className="class-page-container">
            <h1>My Classes</h1>
            <div className="class-sections">

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
                    <h3>Join To Class</h3>
                    <input
                        placeholder="join code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button onClick={() => joinToClass()}>Join</button>
                </div>
            </div>
            <button onClick={() => navigate("/create-class")}>Create your classes</button>
        </div>
    );
}
export default ClassPage;