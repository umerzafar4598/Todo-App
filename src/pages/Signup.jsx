import { Link } from "react-router-dom";

export default function Signup() {
    return <div className="form-container">
        <h2 className="form-heading">Get Started</h2>
        <div>
            <div className="form-card">
                <form className="signup-form" action="/signup" method="post">
                    <div>
                        <label htmlFor="username">Username</label><br />
                        <input type="text" id="username" required />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label><br />
                        <input type="email" id="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br />
                        <input type="password" id="password" required />
                    </div>
                    <div className="btn-wrapper">
                        <button><Link>Sign Up</Link></button>
                    </div>
                </form>
            </div>
            <p>Already have an Account? <Link to='/login'>Login</Link></p>
        </div>
    </div>
}