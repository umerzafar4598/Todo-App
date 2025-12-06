import { useAuth } from "../context/AuthContext";
export default function Hero() {
    const { user } = useAuth();
    return (
        <section className="hero-section">
            <div>
                {user ? (
                    <h1 className="username">{user.name}</h1>
                ) : (
                    <h2 className="heading-title">Organize your tasks, track deadlines, and stay productive.</h2>
                )}
            </div>
        </section>
    )
}