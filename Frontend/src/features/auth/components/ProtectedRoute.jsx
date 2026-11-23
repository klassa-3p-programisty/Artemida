import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../hooks/useAuth";
import { PAGES } from "../../../app/routes/pages";

export default function ProtectedRoute(){

    const { data: user, isPending, isError } = useSession();

    if (isPending) {
        <p>loading....</p>
    }
    
    if (isError) {
        <p>whoops error</p>
    }

    if (!user) {
        return <Navigate to={PAGES.login} replace/>
    }
    return (
     <Outlet/>
    )
}