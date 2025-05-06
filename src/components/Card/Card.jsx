import React, { useState } from 'react';
import { timeAgoInYears } from '../../utils';

export default function Card({ item }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { mission_name, launch_success, launch_date_local, links, details } =
    item;
  const {
    article_link: articleLink,
    video_link: videoLink,
    mission_patch_small: imageUrl,
  } = links;

  // Styling
  function getStatusTagColor(status) {
    return status ? '#28a745' : '#dc3545';
  }

  const cardStyles = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    maxWidth: '500px',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  };

  const titleStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginRight: '8px',
  };

  const statusTagStyles = {
    backgroundColor: getStatusTagColor(launch_success),
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'normal',
  };

  const bodyContainerStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '16px',
  };

  const imageStyles = {
    width: '70px',
    height: '80px',
    objectFit: 'cover',
    marginRight: '16px',
    flexShrink: 0,
  };

  const textContentStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const metadataStyles = {
    fontSize: '12px',
    color: '#555',
    marginBottom: '8px',
  };

  const linkStyles = {
    color: '#007bff',
    textDecoration: 'none',
  };

  const descriptionStyles = {
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.5',
  };

  const footerStyles = {
    textAlign: 'left',
    marginTop: 'auto',
  };

  const hideButtonStyles = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  const separatorStyles = {
    padding: '0 5px',
  };

  return (
    <div style={cardStyles}>
      <div style={headerStyles}>
        <span style={titleStyles}>{mission_name}</span>
        <span style={statusTagStyles}>
          {launch_success ? 'Success' : 'Failed'}
        </span>
      </div>
      {isCollapsed && (
        <div style={bodyContainerStyles}>
          {imageUrl && (
            <img src={imageUrl} alt="Mission patch" style={imageStyles} />
          )}
          <div style={textContentStyles}>
            <div style={metadataStyles}>
              {timeAgoInYears(launch_date_local)}
              <span style={separatorStyles}>|</span>
              <a href={articleLink} style={linkStyles}>
                Article
              </a>
              <span style={separatorStyles}>|</span>
              <a href={videoLink} style={linkStyles}>
                Video
              </a>
            </div>
            <p style={descriptionStyles}>
              {details ? details : 'No details provided.'}
            </p>
          </div>
        </div>
      )}
      <div style={footerStyles}>
        <button
          style={hideButtonStyles}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? 'Hide' : 'View'}
        </button>
      </div>
    </div>
  );
}
