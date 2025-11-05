import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useEffect, useState } from "react";
import axios from "axios";

function Class() {
    const { classId } = useParams();
    const API_URL = "http://localhost:3000";
    const [myQoutes, setMyQoutes] = useState([]);
    const [student, setStudent] = useState("");
    const [newQoute, setNewQoute] = useState({ classId: classId });
    const navigate = useNavigate();

    async function loadQoutes(classId) {
        try {
            const response = await axios.get(`${API_URL}/qoutes/${classId}`);
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

    async function addStudent(email) {
        try {
            console.log(`chack: localhost:3000/users/email/${email}`)
            const response = await axios.get(`${API_URL}/users/email/${email}`);
            await axios.put(`${API_URL}/class/${classId}`, {email: response.data.email});
            alert("user added")
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        loadQoutes(classId);
    }, [myQoutes])
    return (
        <>
            {Array.isArray(myQoutes) && myQoutes.length > 0 ? (
                myQoutes.map((item) => <p onClick={() => navigate(`/qoute/${item._id}`)}>{item.author}</p>)
            ) : (
                <p>No Qoutes yet.</p>
            )}
            <div className="login-container">
                <p>hi plaese enter a Quote</p>
                <input placeholder="Quote" onChange={(e) => setNewQoute({ ...newQoute, qoute: e.target.value })} />
                <input placeholder="Author" onChange={(e) => setNewQoute({ ...newQoute, author: e.target.value })} />
                <button onClick={() => postQoute(newQoute)}>Add</button>
            </div>

            <div className="login-container">
                <h3>Add Student</h3>
                <input
                    placeholder="enter the email of the Student"
                    value={student}
                    onChange={(e) => setStudent(e.target.value)}
                />
                <button onClick={() => { addStudent(student) }}>Add</button>
            </div>
        </>
    )
}
export default Class;