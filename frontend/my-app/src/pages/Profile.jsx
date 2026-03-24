import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/userContext";
import "../css/Profile.css";

function Profile() {
    const API_URL = 'http://localhost:3000';
    const { user } = useUser();
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
                    <div className="info-row">
                        <span className="info-label">Mystery Levels:</span>
                        <span className="info-value">{user.filmLevel}</span>
                        <span className="info-value">{user.peopleLevel}</span>
                        <span className="info-value">{user.tvLevel}</span>
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
                                onClick={updateProfile}
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