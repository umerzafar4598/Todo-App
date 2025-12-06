import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const doLogout = async () => {
        await logout();
        navigate('/login');
    }
    return (
        <nav className="navbar" data-aos="fade-down">
            <div className="brand">Todo App</div>
            <div className="auth-links">
                {user ? (
                    <>
                        <button className="btn-logout" onClick={doLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className="nav-links">Sign Up</Link>
                        <Link to="/login" className="nav-links">Login </Link>
                    </>
                )}
            </div>
        </nav>
    )
}