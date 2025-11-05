import axios from "axios";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
function ClassItem({item}){
    const navigate = useNavigate();
    const {loadClasses, user} = useUser();
    const API_URL = "http://localhost:3000";
   
    async function deleteClass(itemId) {
        try{
            const confi = confirm('are you sure you want to delete this class?');
            if(!confi) return;
            await axios.delete(`${API_URL}/class/${itemId}`);
            loadClasses(user.email);
        }catch(err){
            console.error(err.message);
        }
    }
return(
    <div className="class-box">
        <p onClick={()=>{navigate(`/class/${item.classId}`)}}>{item.subject}</p>
        <button onClick={()=>deleteClass(item.classId)}>Delete</button>
    </div>
)
}
export default ClassItem;