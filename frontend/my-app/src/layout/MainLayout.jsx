import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useUser } from "../context/userContext";
function MainLayout() {
    const {connected} = useUser();
    if(!connected){
        return <Navigate to={"/"} replace />
    }
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default MainLayout