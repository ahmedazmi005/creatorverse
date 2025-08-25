import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createCreator } from '../utils/database';
import './AddCreator.css';

const AddCreator = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    imageURL: '',
  });

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

      // Create new creator in database
      const dbData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        url: formData.url.trim() || null,
        imageURL: formData.imageURL.trim() || null
      };
      
      const newCreator = await createCreator(dbData);
      
      // Navigate to the newly created creator's page
      navigate(`/creator/${newCreator.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      url: '',
      imageURL: ''
    });
    setError(null);
  };

  return (
    <div className="add-creator">
      <div className="page-header">
        <Link to="/" className="back-link">
          ← Back to All Creators
        </Link>
        <h1>Add New Creator</h1>
        <p>Share your favorite content creator with the community</p>
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
              placeholder="Tell us about this creator and what makes them special..."
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
            <small className="form-help">
              Link to their main website, YouTube channel, or portfolio
            </small>
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
            <small className="form-help">
              Optional: Add a profile picture to make the card more engaging
            </small>
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
          <button 
            type="button" 
            onClick={handleReset}
            className="reset-button"
            disabled={saving}
          >
            Reset Form
          </button>
          <Link to="/" className="cancel-button">
            Cancel
          </Link>
          <button 
            type="submit" 
            className="save-button"
            disabled={saving}
          >
            {saving ? 'Creating...' : 'Create Creator'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCreator;
