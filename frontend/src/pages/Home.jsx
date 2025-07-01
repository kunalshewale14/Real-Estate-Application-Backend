import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-wrapper">
      <h1 className="home-title">Welcome to Real Estate Property App</h1>
      <p className="home-sub">
        Manage your listings and discover new properties.
      </p>

      <div className="home-cta">
        <Link to="/signup" className="btn">Signup</Link>
        <Link to="/login"  className="btn outline">Login</Link>
      </div>
    </div>
  );
}
