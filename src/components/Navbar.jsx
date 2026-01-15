import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
    return (
        <div className="navbar">
            <h1>Stock Market Tracker</h1>
            <ul className="navbar-links">
                <li><Link to="/" className="navbar-link">Home</Link></li>
                <li><Link to="/about" className="navbar-link">About</Link></li>
                <li><Link to="/contact" className="navbar-link">Contact</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;