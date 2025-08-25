import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCreatorById, updateCreator } from '../utils/database';
import './EditCreator.css';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    imageURL: ''
  });

  useEffect(() => {
    fetchCreator();
  }, [id]);

  const fetchCreator = async () => {
    try {
      const data = await getCreatorById(id);
      if (data) {
        // Set form data directly from database
        setFormData({
          name: data.name || '',
          description: data.description || '',
          url: data.url || '',
          imageURL: data.imageURL || ''
        });
      } else {
        setError('Creator not found');
      }
      setLoading(false);
    } catch (err) {
      setError('Error loading creator');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Description is required');
      }

      // Update creator in database
      const dbData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        url: formData.url.trim() || null,
        imageURL: formData.imageURL.trim() || null
      };
      
      await updateCreator(id, dbData);
      
      navigate(`/creator/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-creator">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading creator...</p>
        </div>
      </div>
    );
  }

  if (error && !formData.name) {
    return (
      <div className="edit-creator">
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
    <div className="edit-creator">
      <div className="page-header">
        <Link to={`/creator/${id}`} className="back-link">
          ← Back to {formData.name}
        </Link>
        <h1>Edit Creator</h1>
      </div>

      <form onSubmit={handleSubmit} className="creator-form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter creator's name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Tell us about this creator..."
              rows="4"
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">Website/Channel URL</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageURL">Profile Image URL</label>
            <input
              type="url"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="form-input"
            />
            {formData.imageURL && (
              <div className="image-preview">
                <img 
                  src={formData.imageURL} 
                  alt="Preview" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <Link to={`/creator/${id}`} className="cancel-button">
            Cancel
          </Link>
          <button 
            type="submit" 
            className="save-button"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
