import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../state/atoms';
import { auth } from '../services/api';
import './SignUp.css';

interface QAPair {
  question: string;
  answer: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [isExpert, setIsExpert] = useState(false);
  const [error, setError] = useState('');
  const [qaList, setQaList] = useState<QAPair[]>([{ question: '', answer: '' }]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    expertise: '',
    description: '',
    experienceYears: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQAChange = (index: number, field: 'question' | 'answer', value: string) => {
    const newQaList = [...qaList];
    newQaList[index][field] = value;
    setQaList(newQaList);
  };

  const addQAPair = () => {
    setQaList([...qaList, { question: '', answer: '' }]);
  };

  const removeQAPair = (index: number) => {
    if (qaList.length > 1) {
      setQaList(qaList.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: isExpert ? 'expert' : 'user',
      };

      if (isExpert) {
        payload.expertise = formData.expertise;
        payload.description = formData.description;
        payload.experienceYears = parseInt(formData.experienceYears) || 0;
        payload.commonQuestions = qaList.filter(qa => qa.question && qa.answer);
      }

      const response = await auth.signup(payload);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      navigate('/experts');
    } catch (err) {
      console.error("Signup failed:", err);
      setError('Failed to create account. The email might already be in use.');
    }
  };

  return (
    <div className="form-container signup-form">
      <h2 className="form-title">Sign Up</h2>
      <div className="role-toggle">
        <button
          type="button"
          className={`role-button ${!isExpert ? 'active' : ''}`}
          onClick={() => setIsExpert(false)}
        >
          Help Seeker
        </button>
        <button
          type="button"
          className={`role-button ${isExpert ? 'active' : ''}`}
          onClick={() => setIsExpert(true)}
        >
          Expert
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {isExpert && (
          <>
            <div className="form-group">
              <label htmlFor="expertise" className="form-label">Area of Expertise</label>
              <input
                type="text"
                id="expertise"
                name="expertise"
                className="form-input"
                value={formData.expertise}
                onChange={handleChange}
                required={isExpert}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Professional Description</label>
              <textarea
                id="description"
                name="description"
                className="form-input"
                value={formData.description}
                onChange={handleChange}
                required={isExpert}
                rows={4}
              />
            </div>

            <div className="form-group">
              <label htmlFor="experienceYears" className="form-label">Years of Experience</label>
              <input
                type="number"
                id="experienceYears"
                name="experienceYears"
                className="form-input"
                value={formData.experienceYears}
                onChange={handleChange}
                required={isExpert}
                min="0"
              />
            </div>

            <div className="qa-section">
              <h3>Common Questions & Answers</h3>
              {qaList.map((qa, index) => (
                <div key={index} className="qa-pair">
                  <div className="form-group">
                    <label className="form-label">Question {index + 1}</label>
                    <input
                      type="text"
                      className="form-input"
                      value={qa.question}
                      onChange={(e) => handleQAChange(index, 'question', e.target.value)}
                      required={isExpert}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Answer {index + 1}</label>
                    <textarea
                      className="form-input"
                      value={qa.answer}
                      onChange={(e) => handleQAChange(index, 'answer', e.target.value)}
                      required={isExpert}
                      rows={3}
                    />
                  </div>
                  {qaList.length > 1 && (
                    <button
                      type="button"
                      className="remove-qa-button"
                      onClick={() => removeQAPair(index)}
                    >
                      Remove Q&A
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-qa-button"
                onClick={addQAPair}
              >
                Add Another Q&A
              </button>
            </div>
          </>
        )}

        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="form-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp; 