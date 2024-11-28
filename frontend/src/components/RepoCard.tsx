import React from 'react';

interface RepoCardProps {
  repo: {
    id: string;
    name: string;
    description: string;
    owner: string;
    has_seen: boolean;
    latest_version: string;
    latest_release_date: string;
    release_html: string;
  };
  onClick: () => void; 
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, onClick }) => {
  return (
    <div
      className={`repo-card ${repo.has_seen ? 'seen' : ''}`}
      onClick={onClick}  
      style={{
        border: repo.has_seen ? '2px solid green' : '2px solid black',
      }}
    >
      <h2>{repo.name}</h2>
      <p>Latest Version: {repo.latest_version}</p>
      <p>Release Date: {new Date(parseInt(repo.latest_release_date)).toLocaleDateString()}</p>
    </div>
  );
};

export default RepoCard;
