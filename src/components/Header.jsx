import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <nav className="navbar">
      <div className="home">
        <Link className="nav-links" to="/">
          {props.authorize ? "Dashboard" : "Home"}
        </Link>
      </div>

      {props.authorize ? (
        <ul>
          <Link className="nav-links" to="#">
            <li>Logout</li>
          </Link>
        </ul>
      ) : (
        <ul>
          <Link className="nav-links" to="/signup">
            <li>Sign Up</li>
          </Link>

          <Link className="nav-links" to="/login">
            <li>Login</li>
          </Link>
        </ul>
      )}
    </nav>
  );
}
