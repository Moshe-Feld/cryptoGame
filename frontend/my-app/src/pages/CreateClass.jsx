import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
function CreateClass() {
    const [myClasses, setMyClasses] = useState([])
    const [subject, setSubject] = useState("")
    const { user } = useUser()
    const navigate = useNavigate()
    const API_URL = "http://localhost:3000";

    async function loadClasses(userId) {
        try {
            const response = await axios.get(`${API_URL}/class/by-creater/${userId}`);
            setMyClasses(response.data);
         } catch (err) {
            if(err.response?.status === 404){
                alert(err.response?.data.message)
            }
            else{
                alert("Network error");
            }
        }
    }

    async function addClass() {
        try {
            const classDetails = {
                userId: user._id,
                subject,
            };
            setSubject("")
            await axios.post(`${API_URL}/class`, classDetails);
            alert("Class added");
            await loadClasses(user._id)
        } catch (err) {
            alert("Network error");
        }
    }

    useEffect(() => {
        loadClasses(user._id);
    }, []);

    return (
        <div className="class-page-container">
            <div className="class-sections">
                <h1>My Classes</h1>
                <div className="class-section">
                    <h3>Classes I Created</h3>
                    {Array.isArray(myClasses) && myClasses.length > 0 ? (
                        myClasses.map((item) => <div className="class-box" id={item._id}
                            onClick={() => navigate(`/class/${item._id}`)}
                        > <p>{item.subject}</p></div>)
                    ) : (
                        <p>No classes yet.</p>
                    )}
                </div>
            </div>
            <div className="form-card">
                <h3>New Class</h3>
                <input
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <button onClick={addClass}>Add Class</button>
            </div>
        </div>
    )
}

export default CreateClass;