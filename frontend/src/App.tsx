import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ExpertList from './pages/ExpertList';
import ExpertProfile from './pages/ExpertProfile';
import Consultation from './pages/Consultation';
import './App.css';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/experts" element={<ExpertList />} />
              <Route path="/expert/:id" element={<ExpertProfile />} />
              <Route path="/consultation/:expertId" element={<Consultation />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
