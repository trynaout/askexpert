import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to AskExpert.in</h1>
          <h2>Get personalized advice from experts in their field</h2>
          <button 
            className="cta-button"
            onClick={() => navigate('/experts')}
          >
            Find an Expert
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Expert Knowledge</h3>
              <p>Connect with professionals who have years of experience in their fields</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>AI-Powered Responses</h3>
              <p>Get instant answers based on the expert's knowledge and approach</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Choose Your Expert</h3>
              <p>Select from a diverse range of experts who match your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join our platform today and get access to expert advice tailored to your needs.</p>
          <button 
            className="cta-button"
            onClick={() => navigate('/signup')}
          >
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home; 