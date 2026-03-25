import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import "../css/Profile.css";

function Profile() {
    const API_URL = 'http://localhost:3000';
    const { user } = useUser();
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [details, setDetails] = useState({
        userName: user?.userName || "",
        email: user?.email || "",
        password: user.password
    });

    async function updateProfile() {
        try {
            if (!details.email) {
                alert("Email is required");
                return;
            }

            await axios.put(`${API_URL}/users/update-profile/${user.userName}`, details);
            alert("Profile updated successfully!");
            setShowModal(false);
            setDetails({ ...details, password: "" });
        } catch (err) {
            console.error(err.message);
            alert("Error updating profile");
        }
    }

    if (!user) return <p>Loading...</p>;

    return (
        <>
            <div className="profile-container">
                <h1>Profile</h1>

                <div className="profile-info">
                    <div className="info-row">
                        <span className="info-label">Username:</span>
                        <span className="info-value">{user.userName}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{user.email}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Level:</span>
                        <span className="info-value">{user.level}</span>
                    </div>
                    <div className="mystery-section">
                        <div className="mystery-title">Mystery Levels</div>

                        <div className="mystery-grid">
                            <div className="mystery-card people">
                                <span>🧑‍🤝‍🧑</span>
                                <p>People</p>
                                <strong>{user.peopleLevel}</strong>
                            </div>

                            <div className="mystery-card movies">
                                <span>🎬</span>
                                <p>Movies</p>
                                <strong>{user.filmLevel}</strong>
                            </div>

                            <div className="mystery-card tv">
                                <span>📺</span>
                                <p>TV</p>
                                <strong>{user.tvLevel}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                {user.password === "0000" && (
                    <div className="warning-box">
                        <p>⚠️ Your password was reset to default (0000)</p>
                        <p>Please change it for security!</p>
                    </div>
                )}

                <button
                    className="update-btn"
                    onClick={() => setShowModal(true)}
                >
                    Update Details
                </button>
            </div>

            {showModal && (
                <>
                    <div
                        className="modal-overlay"
                        onClick={() => setShowModal(false)}
                    />
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Update Profile</h2>
                        </div>

                        <div className="modal-body">
                            <div className="input-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder="Enter new user name"
                                    value={details.userName}
                                    onChange={(e) => setDetails({ ...details, userName: e.target.value })} />
                            </div>

                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter new email"
                                    value={details.email}
                                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                                />
                            </div>

                            <div className="input-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    placeholder="Leave empty to keep current"
                                    onChange={(e) => setDetails({ ...details, password: e.target.value })}
                                />
                                <small>Only fill if you want to change password</small>
                            </div>
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
                                onClick={()=>{
                                    updateProfile()
                                    alert("log in agan with your new details")
                                    navigate('/')
                                }}
                                
                                
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Profile;