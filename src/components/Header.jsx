
export default function Header(props) {
    return <nav className="navbar">
        <div className="home">
            <a className="nav-links" href="/">{props.authorize ? "Dashboard" : "Home"}</a>
        </div>
        {props.authorize ?
        <ul>
            <a className="nav-links" href="#"><li>Logout</li></a>
        </ul>
        : <ul>
                <a className="nav-links" href="#"><li>Sign Up</li></a>
                <a className="nav-links" href="#"><li>Login</li></a>
            </ul>}

    </nav>
}