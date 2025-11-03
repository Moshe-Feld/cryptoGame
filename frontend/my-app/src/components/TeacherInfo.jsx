import { useNavigate } from "react-router-dom";
function TeacherInfo(){
    const navigate = useNavigate();
    return(
        <>
        <h1 onClick={()=> navigate('/classes')}>My Classes</h1>
        </>
    )
}
export default TeacherInfo;