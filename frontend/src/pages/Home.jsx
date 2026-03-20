import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import axios from 'axios';
import './Home.css';

const THREAT_COLORS = {
    'Critically Endangered': '#ff4d6a',
    'Endangered': '#ff8c42',
    'Vulnerable': '#f0c060',
    'Least Concern': '#39ff7a',
};

const Home = () => {
    const [animals, setAnimals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [heroVisible, setHeroVisible] = useState(false);

    useEffect(() => {
        // Trigger hero entrance animation
        setTimeout(() => setHeroVisible(true), 100);
        fetchAnimals();
    }, []);

    const fetchAnimals = async (query = '') => {
        setLoading(true);
        setError('');
        try {
            const url = query
                ? `http://localhost:5001/api/animals?keyword=${query}`
                : 'http://localhost:5001/api/animals';
            const res = await axios.get(url);
            setAnimals(res.data);
        } catch (err) {
            setError('Could not reach the backend. Please start the backend server on port 5001.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchAnimals(searchQuery);
    };

    return (
        <div className="home-container">

            {/* ===== HERO ===== */}
            <section className={`hero-section ${heroVisible ? 'hero--visible' : ''}`}>
                {/* Animated forest layers */}
                <div className="forest-layer forest-layer--back"></div>
                <div className="forest-layer forest-layer--mid"></div>
                <div className="forest-mist"></div>
                <div className="forest-vines"></div>

                {/* Flying leaves */}
                <div className="falling-leaves">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className={`leaf leaf--${i + 1}`} />
                    ))}
                </div>

                <div className="hero-content">
                    <div className="hero-eyebrow">🌿 India's Living Forest</div>
                    <h1 className="hero-title">
                        Step Into<br />
                        <span className="hero-title-accent">The Wild</span>
                    </h1>
                    <p className="hero-subtitle">
                        Encounter India's most magnificent creatures in their natural habitat.
                        Discover, explore, and find where to see them in the wild.
                    </p>

                    {/* Search bar */}
                    <form className="search-bar" onSubmit={handleSearch}>
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search a species — Tiger, Elephant, Leopard..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="btn-primary search-btn">Hunt</button>
                    </form>
                </div>

                {/* Scroll indicator */}
                <div className="scroll-indicator">
                    <span>Scroll to explore</span>
                    <ChevronDown size={18} className="scroll-chevron" />
                </div>
            </section>

            {/* ===== EXPLORE SECTION ===== */}
            <section className="explore-section container">
                <div className="section-head">
                    <div className="section-leaf-line"></div>
                    <h2 className="section-title">Indian Wildlife</h2>
                    <div className="section-leaf-line"></div>
                </div>
                <p className="section-sub">
                    {animals.length > 0
                        ? `${animals.length} species found in India's forests, mountains & rivers`
                        : 'Loading wilderness...'}
                </p>

                {loading ? (
                    <div className="loading-state">Tracking wildlife...</div>
                ) : error ? (
                    <div className="error-state glass-panel" style={{ padding: '40px', maxWidth: '600px', margin: '40px auto' }}>
                        <h3 style={{ color: '#ff4d6a', marginBottom: '12px' }}>Connection Failed</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{error}</p>
                    </div>
                ) : (
                    <div className="animal-grid">
                        {animals.length > 0 ? animals.map((animal, idx) => (
                            <div
                                key={animal._id}
                                className="animal-card"
                                style={{ animationDelay: `${idx * 0.07}s` }}
                            >
                                <div className="card-image-wrap">
                                    {animal.imageUrl
                                        ? <img src={animal.imageUrl} alt={animal.name} className="card-image" />
                                        : <div className="card-image-placeholder">🦁</div>
                                    }
                                    <div className="card-image-overlay"></div>
                                    {animal.threatStatus && (
                                        <div
                                            className="card-threat-badge"
                                            style={{ '--badge-color': THREAT_COLORS[animal.threatStatus] || '#f0c060' }}
                                        >
                                            {animal.threatStatus}
                                        </div>
                                    )}
                                </div>

                                <div className="card-body">
                                    <h3 className="card-name">{animal.name}</h3>
                                    <p className="card-species">{animal.species}</p>
                                    {animal.habitat && (
                                        <p className="card-habitat">
                                            <MapPin size={12} /> {animal.habitat.split(',')[0]}
                                        </p>
                                    )}
                                    <Link to={`/animal/${animal._id}`} className="card-enter-btn">
                                        <span>Enter Enclosure</span>
                                        <span className="card-arrow">→</span>
                                    </Link>
                                </div>
                            </div>
                        )) : (
                            <div className="empty-state glass-panel">
                                <p>🔍 No animals found for that search.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* ===== FOOTER TOUCH ===== */}
            <footer className="footer-strip">
                <span>🌿 WildIndia Virtual Zoo &nbsp;·&nbsp; Protecting India's Natural Heritage</span>
            </footer>

        </div>
    );
};

export default Home;
