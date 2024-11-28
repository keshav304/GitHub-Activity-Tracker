import React from 'react';

interface RepoDetailProps {
  content: string; 
}

const RepoDetails: React.FC<RepoDetailProps> = ({ content }) => {
  return (
    <div className="repo-detail-content">
      <h2>Release Notes</h2>
      <div
        className="release-notes"
        dangerouslySetInnerHTML={{ __html: content }}  
      />
    </div>
  );
};

export default RepoDetails;
