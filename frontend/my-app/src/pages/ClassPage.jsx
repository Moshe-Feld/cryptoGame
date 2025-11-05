import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import ClassItem from "../components/ClassItem";
function ClassPage() {
    const navigate = useNavigate();
    const [subject, setSubject] = useState("");
    const { user, myClasses, loadClasses } = useUser();
    const API_URL = "http://localhost:3000";

    if (!user || !user.email) return <p>Loading user...</p>;

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

    return (
        <>
        <h1>My Classes</h1>
        <div className="class-page">
            {Array.isArray(myClasses) && myClasses.length > 0 ? (
                myClasses.map((item) => <div className="class-box"
                onClick={()=>navigate(`/class/${item.classId}`)}
                > <p>{item.subject}</p></div> )
            ) : (
                <p>No classes yet.</p>
            )}

            <div className="login-container">
                <h3>New Class</h3>
                <input
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <button onClick={addClass}>Add Class</button>
            </div>
        </div>
        </>
    );
}
export default ClassPage;