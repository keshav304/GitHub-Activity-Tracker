import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_REPOS } from '../services/repoService';
import RepoCard from '../components/RepoCard';
import RepoDetails from '../components/RepoDetails'; 
import { addRepo, markRepoSeen } from '../services/repoService';
import Slider from 'react-slick';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import '../styles.css';
const DashboardPage: React.FC = () => {
  const { data, loading, error } = useQuery(GET_USER_REPOS);
  const [repoName, setRepoName] = useState('');
  const [repoOwner, setRepoOwner] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<any>(null);  

  const handleAddRepo = async () => {
    if (repoName && repoOwner) {
      try {
        const response = await addRepo(repoName, repoOwner);
        setSuccessMessage('Repo added successfully!');
        setRepoName(''); 
        setRepoOwner('');
      } catch (error) {
        setErrorMessage('Error adding repo. Please try again.');
        console.error(error);
      }
    } else {
      setErrorMessage('Repository name and owner are required.');
    }
  };

  const handleRepoClick = async (repo: any) => {
    setSelectedRepo(repo); 
    await markRepoSeen(repo.id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading repositories</div>;
  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button 
        className="slick-arrow slick-prev custom-arrow prev-arrow" 
        onClick={onClick}
      >
        <IoChevronBackOutline />
      </button>
    );
  };
  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button 
        className="slick-arrow slick-next custom-arrow next-arrow" 
        onClick={onClick}
      >
        <IoChevronForwardOutline />
      </button>
    );
  };
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.1,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    touchThreshold: 10,
    centerMode: false,
    variableWidth: false
  };
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Repo input form */}
      <div className="add-repo-form">
        <input
          type="text"
          placeholder="Repository Name"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Repository Owner"
          value={repoOwner}
          onChange={(e) => setRepoOwner(e.target.value)}
        />
        <button onClick={handleAddRepo}>Add Repo</button>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <section className='content'>
      <div className="repo-cards">
      {data.myRepos ? (
            <>
              <div className="desktop-view">
                {data.myRepos.map((repo: any) => (
                  <RepoCard
                    key={repo.id}
                    repo={repo}
                    onClick={() => handleRepoClick(repo)}
                  />
                ))}
              </div>
              
              <div className="mobile-view">
                <Slider {...sliderSettings}>
                  {data.myRepos.map((repo: any) => (
                    <div key={repo.id}>
                      <RepoCard
                        repo={repo}
                        onClick={() => handleRepoClick(repo)}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </>
          ) : (
            <>No Repos Added Yet</>
          )}
        </div>

      {selectedRepo && selectedRepo.release_html && (
        <div className="repo-detail">
          <RepoDetails content={selectedRepo.release_html} /> 
        </div>
      )}
      </section>
      </div>

  );
};

export default DashboardPage;
