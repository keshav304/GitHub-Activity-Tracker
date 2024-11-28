import React from 'react';

interface RepoCardProps {
  id: string;
  name: string;
  onClick: (id: string, releaseHtml: string) => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ id, name, onClick }) => {
  return (
    <div className="repo-card" onClick={() => onClick(id, `https://example.com/repo/${id}/release.html`)}>
      <h3>{name}</h3>
    </div>
  );
};

interface RepoCardListProps {
  repos: { id: string; name: string }[];
  onRepoClick: (id: string, releaseHtml: string) => void;
}

const RepoCardList: React.FC<RepoCardListProps> = ({ repos, onRepoClick }) => {
  return (
    <div className="repo-card-list">
      {repos.map((repo) => (
        <RepoCard key={repo.id} id={repo.id} name={repo.name} onClick={onRepoClick} />
      ))}
    </div>
  );
};

export default RepoCardList;
