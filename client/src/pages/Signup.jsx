import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

export default function Signup() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const handleData = (e) => {
        const { name, value } = e.target;
        setSignupData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(signupData);
            navigate('/');
        } catch (error) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    }
    return (
        <div className="signup-container" data-aos="fade-up">
            <h2 style={{ textAlign: "center" }}>Create Account</h2>
            <div className="reg-card">
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="reg-form-row">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={signupData.name}
                            onChange={handleData}
                            required />
                    </div>
                    <div className="reg-form-row">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signupData.email}
                            onChange={handleData}
                            required />
                    </div>
                    <div className="reg-form-row">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={signupData.password}
                            onChange={handleData}
                            required />
                        <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button className="btn-signup" type="submit">Sign Up</button>
                    </div>
                    {error && <div style={{ fontSize: "16px" }}>{error}</div>}
                </form>
            </div>
            <p style={{ textAlign: "center" }}>Already have an account ? <Link style={{ color: "#fd49bbff" }} className="links" to="/login">Login</Link> </p>
        </div>
    )
}