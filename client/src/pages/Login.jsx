import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const [loginFields, setLoginFields] = useState({
        email: "",
        password: ""
    });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleData = (e) => {
        const { name, value } = e.target;
        setLoginFields(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(loginFields);
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    }
    return (
        <div className="login-container" data-aos="fade-up">
            <h2 style={{ textAlign: "center", letterSpacing: "1.3px" }}>Welcome back!</h2>
            <div className="login-card">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-form-row">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleData}
                            value={loginFields.email}
                            required />
                    </div>
                    <div className="login-form-row">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            onChange={handleData}
                            value={loginFields.password}
                            required />
                        <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button className="btn-login" type="submit">Login</button>
                    </div>
                    {error && <div className="muted">{error}</div>}
                </form>
            </div>
            <p style={{ textAlign: "center" }}>Dont't have an account ? <Link style={{ color: "#fd49bbff" }} className="links" to="/signup">Create one</Link> </p>
        </div>
    )
}