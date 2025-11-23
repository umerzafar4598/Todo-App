
export default function Header(){
    return <nav className="navbar">
        <div className="home">
           <a className="nav-links" href="#">Home</a>
        </div>
        <ul>
            <a className="nav-links" href="#"><li>Sign Up</li></a>
            <a className="nav-links" href="#"><li>Login</li></a>
        </ul>
    </nav>
}