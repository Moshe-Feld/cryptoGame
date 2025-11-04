import { useParams } from "react-router-dom";
import { useUser } from "../context/userContext";

function Class() {
    const {classId} = useParams();
    return (
        <>
            <p>hi {classId}</p>
        </>
    )
}
export default Class;