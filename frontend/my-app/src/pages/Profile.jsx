import { useUser } from "../context/userContext";

function Profile() {
    const {user} = useUser();
    return (
        <>
            <p>hi {user.userName}</p>
        </>
    )
}
export default Profile;