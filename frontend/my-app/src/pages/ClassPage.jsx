import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/userContext";
function ClassPage() {
  const [subject, setSubject] = useState("");
  const { user, myClasses } = useUser();
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
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="class-page">
      <h1>My Classes</h1>
      {Array.isArray(myClasses) && myClasses.length > 0 ? (
        myClasses.map((item) => <div key={item.classId}>{item.subject}</div>)
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
  );
}
export default ClassPage;