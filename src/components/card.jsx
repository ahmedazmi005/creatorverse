import React from 'react';
import './Card.css';

const Card = ({ director, onEdit, onDelete, onView }) => {
  const { name, description, url, imageURL } = director;

  const handleVisit = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const handleView = () => {
    if (onView) {
      onView();
    }
  };

  return (
    <div className="director-card" onClick={handleView}>
      <div className="card-header">
        {imageURL && (
          <img 
            src={imageURL} 
            alt={`${name} profile`} 
            className="director-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        <h3 className="director-name">{name}</h3>
      </div>
      
      <div className="card-body">
        <p className="director-description">{description}</p>
      </div>
      
      <div className="card-footer">
        {url && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleVisit();
            }}
            className="visit-button"
            title={`Visit ${name}'s page`}
          >
            Learn More
          </button>
        )}
        <div className="card-actions">
          <button 
            className="edit-button" 
            title="Edit creator"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
          >
            ✏️
          </button>
          <button 
            className="delete-button" 
            title="Delete creator"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;