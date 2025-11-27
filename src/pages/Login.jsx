import { Link } from "react-router-dom"
export default function Login() {
    return <div className="form-container">
        <h2 className="form-heading">Welcome Back!</h2>
        <div>
            <div className="form-card">
                <form className="login-form" action="/login" method="post">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" required />
                    </div>
                    <div className="btn-wrapper">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
            <p>Don't have an account ? <Link to='/signup'>Sign Up</Link></p>
        </div>
    </div>
}