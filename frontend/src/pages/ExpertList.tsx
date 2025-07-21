import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { expertsState } from '../state/atoms';
import { experts } from '../services/api';
import './ExpertList.css';

const ExpertList = () => {
  const navigate = useNavigate();
  const [expertList, setExpertList] = useRecoilState(expertsState);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const data = await experts.getAll();
        setExpertList(data);
      } catch (err: any) {
        setError('Failed to load experts');
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, [setExpertList]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Available Experts</h1>

      <div className="expert-grid">
        {expertList.map((expert) => (
          <div className="expert-card" key={expert.id}>
            <div className="expert-header">
              <div className="expert-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <h2 className="expert-name">{expert.user.name}</h2>
                <p className="expert-expertise">{expert.expertise}</p>
              </div>
            </div>

            <div className="expert-stats">
              <div className="rating">
                <span className="star">★</span>
                <span>{expert.rating}</span>
                <span className="consultation-count">
                  ({expert.consultationCount} consultations)
                </span>
              </div>
            </div>

            <p className="expert-description">{expert.description}</p>

            <div className="expert-experience">
              {expert.experienceYears} years experience
            </div>

            <button 
              className="consult-button"
              onClick={() => navigate(`/expert/${expert.id}`)}
            >
              View Profile & Consult
            </button>
          </div>
        ))}
      </div>

      {expertList.length === 0 && (
        <p className="no-experts">No experts available at the moment.</p>
      )}
    </div>
  );
};

export default ExpertList; 