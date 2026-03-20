import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, ShieldAlert, Navigation, Box } from 'lucide-react';
import axios from 'axios';
import ARViewer from '../components/ARViewer';
import './AnimalDetails.css';

const AnimalDetails = () => {
    const { id } = useParams();
    const [animal, setAnimal] = useState(null);
    const [zoos, setZoos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locatingUser, setLocatingUser] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('photo'); // 'photo' | '3d'

    useEffect(() => {
        fetchAnimalDetails();
    }, [id]);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const sortZoosByDistance = (zoosList) => {
        if (navigator.geolocation) {
            setLocatingUser(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    const sorted = [...zoosList].map(zoo => {
                        if (zoo.coordinates?.lat && zoo.coordinates?.lng) {
                            zoo.distance = calculateDistance(userLat, userLng, zoo.coordinates.lat, zoo.coordinates.lng);
                        }
                        return zoo;
                    }).sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
                    setZoos(sorted);
                    setLocatingUser(false);
                },
                () => setLocatingUser(false)
            );
        }
    };

    const fetchAnimalDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`http://localhost:5001/api/animals/${id}`);
            setAnimal(res.data);
            const zooRes = await axios.get(`http://localhost:5001/api/zoos/nearest?animalId=${id}`);
            const fetchedZoos = zooRes.data;
            setZoos(fetchedZoos);
            sortZoosByDistance(fetchedZoos);
        } catch (err) {
            console.error('Error fetching animal details:', err);
            setError('Could not fetch details. Please ensure the backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading-state">Loading virtual enclosure...</div>;
    if (error || !animal) {
        return (
            <div className="error-state" style={{ color: '#F46197', textAlign: 'center', padding: '40px' }}>
                <h3>Error Loading Profile</h3>
                <p>{error || 'Animal not found.'}</p>
                <Link to="/" className="btn-outline" style={{ marginTop: '20px', display: 'inline-block' }}>Back to Home</Link>
            </div>
        );
    }

    const has3DModel = !!animal.imageUrl; // Every animal with a photo gets the Three.js 3D viewer

    return (
        <div className="animal-details-container">
            <Link to="/" className="back-link">
                <ArrowLeft size={20} /> Back to Exploration
            </Link>

            <div className="profile-layout">
                {/* Left: Image / 3D Viewer Panel */}
                <div className="profile-image-container glass-panel">
                    {has3DModel && (
                        <div className="viewer-tabs">
                            <button
                                className={`viewer-tab ${activeTab === 'photo' ? 'active' : ''}`}
                                onClick={() => setActiveTab('photo')}
                            >
                                📷 Photo
                            </button>
                            <button
                                className={`viewer-tab ${activeTab === '3d' ? 'active' : ''}`}
                                onClick={() => setActiveTab('3d')}
                            >
                                <Box size={15} style={{ display: 'inline', marginRight: '4px' }} />
                                3D / AR View
                            </button>
                        </div>
                    )}

                    {activeTab === 'photo' || !has3DModel ? (
                        animal.imageUrl ? (
                            <img src={animal.imageUrl} alt={animal.name} className="profile-image" />
                        ) : (
                            <div className="profile-image-placeholder">No Image Available</div>
                        )
                    ) : (
                        <div style={{ padding: '12px' }}>
                            <ARViewer
                                animalName={animal.name}
                                posterUrl={animal.imageUrl}
                            />
                        </div>
                    )}
                </div>

                {/* Right: Info Panel */}
                <div className="profile-info-container glass-panel">
                    <div className="profile-header">
                        <h1 className="profile-title">{animal.name}</h1>
                        <h3 className="profile-species">{animal.species}</h3>
                    </div>

                    <div className="badges">
                        {animal.threatStatus && (
                            <span className={`badge ${animal.threatStatus === 'Endangered' || animal.threatStatus === 'Critically Endangered' ? 'badge-danger' : 'badge-warning'}`}>
                                <ShieldAlert size={16} /> {animal.threatStatus}
                            </span>
                        )}
                        {has3DModel && (
                            <span className="badge badge-ar">
                                <Box size={14} /> AR Ready
                            </span>
                        )}
                    </div>

                    <div className="profile-description">
                        <p>{animal.description || 'No description available.'}</p>
                    </div>

                    <div className="profile-stats">
                        {animal.habitat && (
                            <div className="stat-item">
                                <span className="stat-label">Habitat</span>
                                <span className="stat-value">{animal.habitat}</span>
                            </div>
                        )}
                        {animal.diet && (
                            <div className="stat-item">
                                <span className="stat-label">Diet</span>
                                <span className="stat-value">{animal.diet}</span>
                            </div>
                        )}
                    </div>

                    {has3DModel && (
                        <div className="ar-cta-hint">
                            <span>💡 Switch to <strong>3D / AR View</strong> to spawn this animal in your room!</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Zoo Locations */}
            <div className="zoo-locations-section glass-panel">
                <div className="section-header" style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <MapPin className="section-icon" />
                        <h2>Nearest Zoos Providing Enclosures</h2>
                    </div>
                    <button
                        onClick={() => sortZoosByDistance(zoos)}
                        className="btn-outline btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <Navigation size={16} /> {locatingUser ? 'Locating...' : 'Sort by My Location'}
                    </button>
                </div>

                {zoos.length > 0 ? (
                    <div className="zoo-grid">
                        {zoos.map(zoo => (
                            <div key={zoo._id} className="zoo-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h4>{zoo.name}</h4>
                                    {zoo.distance && (
                                        <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                                            {zoo.distance.toFixed(1)} km away
                                        </span>
                                    )}
                                </div>
                                <p className="zoo-location">{zoo.location}</p>
                                <p className="zoo-desc">{zoo.description || 'Visit this zoo to see this majestic animal.'}</p>
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(zoo.name + ', ' + zoo.location)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline btn-sm"
                                    style={{ textAlign: 'center', display: 'block' }}
                                >
                                    Get Directions
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-zoos">
                        <p>No zoos currently listed for this animal in our database.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimalDetails;
