import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container container">
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon-wrap">
                        <Leaf className="logo-leaf" size={22} />
                    </div>
                    <span className="logo-text">WildIndia</span>
                </Link>
                <div className="navbar-links">
                    <Link to="/" className="nav-link">
                        Explore
                    </Link>
                    <span className="nav-divider">|</span>
                    <span className="nav-tagline">India's Wildlife Sanctuary</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
