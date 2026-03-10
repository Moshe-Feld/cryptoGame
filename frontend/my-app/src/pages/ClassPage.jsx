import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import "../css/ClasePage.css";
import { use } from "react";

function ClassPage() {
    const navigate = useNavigate();
    const [subject, setSubject] = useState("");
    const [code, setCode] = useState("");
    const [myClasses, setMyClasses] = useState([])
    const [studentClass, setStudentClass] = useState([]);
    const { user } = useUser();
    const API_URL = "http://localhost:3000";

    if (!user || !user.userName) return navigate("/");

     async function loadClasses(userName) {
        try {
            const response = await axios.get(`${API_URL}/class/by-creater/${userName}`);
            setMyClasses(response.data);
        } catch (err) {
            console.error(err.message);
        }
    }
    async function loadStudentClass(userName) {
        try {
            const response = await axios.get(`${API_URL}/userClass/join-class/${userName}`);
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

    // async function joinToClass() {
    //     try {
    //         const student = {
    //             userName: user.userName,
    //             joinCode: code
    //         }
    //         await axios.put(`${API_URL}/class/join/`, student);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }

    async function joinToClass(req, res) {
        try{
            const userToJoin = {
                userId: user.userName,
            }
            const response = await axios.post(`${API_URL}/userClass/${code}`, {userToJoin})
            set
        }catch(err){
            console.error(err.message)
        }
    }

    useEffect(() => {
        loadClasses(user.userName);
    }, [myClasses]);

    useEffect(()=>{
        loadStudentClass(user.userName)
    },[studentClass])

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
                    <button onClick={joinToClass}>Join</button>
                </div>
            </div>

        </>
    );
}
export default ClassPage;