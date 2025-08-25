import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCreatorById, deleteCreator } from '../utils/database';
import './ViewCreator.css';

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCreator();
  }, [id]);

  const fetchCreator = async () => {
    try {
      const data = await getCreatorById(id);
      if (data) {
        setCreator(data);
      } else {
        setError('Creator not found');
      }
      setLoading(false);
    } catch (err) {
      setError('Error loading creator');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${creator.name}?`)) {
      try {
        await deleteCreator(creator.id);
        navigate('/');
      } catch (err) {
        console.error('Error deleting creator:', err);
        setError('Failed to delete creator');
      }
    }
  };

  const handleVisit = () => {
    if (creator.url) {
      window.open(creator.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="view-creator">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading creator...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-creator">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <Link to="/" className="back-button">
            ← Back to All Creators
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="view-creator">
      <div className="creator-header">
        <Link to="/" className="back-link">
          ← Back to All Creators
        </Link>
        <div className="header-actions">
          <Link to={`/edit-creator/${creator.id}`} className="edit-button">
            Edit Creator
          </Link>
          <button onClick={handleDelete} className="delete-button">
            Delete Creator
          </button>
        </div>
      </div>

      <div className="creator-content">
        <div className="creator-profile">
          <div className="profile-image-container">
            {creator.imageURL && (
              <img 
                src={creator.imageURL} 
                alt={`${creator.name} profile`}
                className="profile-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>
          <div className="profile-info">
            <h1 className="creator-name">{creator.name}</h1>
            <p className="creator-description">{creator.description}</p>
            
            {creator.url && (
              <button onClick={handleVisit} className="visit-button">
                Visit {creator.name}'s Page
              </button>
            )}
          </div>
        </div>

        {creator.stats && (
          <div className="creator-stats">
            <h3>Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{creator.stats.followers}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{creator.stats.videos}</span>
                <span className="stat-label">Videos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{creator.stats.views}</span>
                <span className="stat-label">Total Views</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCreator;
