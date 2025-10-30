import { useState } from 'react';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (pageKey) => {
    if (!pageKey || pageKey === currentPage) return;
    setCurrentPage(pageKey);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-scale-wrapper">
      {currentPage === 'about' ? (
        <AboutUs onNavigate={handleNavigate} />
      ) : (
        <Home onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;
