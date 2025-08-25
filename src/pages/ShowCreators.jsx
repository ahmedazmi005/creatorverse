import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/card';
import { getAllCreators, deleteCreator } from '../utils/database';
import './ShowCreators.css';

const ShowCreators = () => {
  const navigate = useNavigate();
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const data = await getAllCreators();
      setCreators(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching creators:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (creatorId) => {
    if (window.confirm('Are you sure you want to delete this creator?')) {
      try {
        await deleteCreator(creatorId);
        setCreators(creators.filter(creator => creator.id !== creatorId));
      } catch (error) {
        console.error('Error deleting creator:', error);
      }
    }
  };

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="show-creators">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading creators...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="show-creators">
      <header className="page-header">
        <h1>Content Creators</h1>
        <p>Discover amazing content creators and their work</p>
      </header>

      <div className="page-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search creators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <Link to="/add-creator" className="add-button">
          + Add New Creator
        </Link>
      </div>

      {filteredCreators.length === 0 ? (
        <div className="empty-state">
          <h3>No creators found</h3>
          <p>
            {searchTerm ? 
              'No creators match your search criteria.' : 
              'No creators have been added yet.'
            }
          </p>
          <Link to="/add-creator" className="add-button">
            Add the first creator
          </Link>
        </div>
      ) : (
        <div className="creators-grid">
          {filteredCreators.map(creator => (
            <Card
              key={creator.id}
              director={creator}
              onDelete={() => handleDelete(creator.id)}
              onEdit={() => navigate(`/edit-creator/${creator.id}`)}
              onView={() => navigate(`/creator/${creator.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCreators;
