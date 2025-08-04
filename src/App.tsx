import { useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import OpsPage from "./pages/OpsPage";
import MarketingPage from "./pages/MarketingPage";
import TechPage from "./pages/TechPage";
import "./App.css";

type Page = 'ops' | 'marketing' | 'tech';
type SubPage = string;

function App() {
  const { signOut } = useAuthenticator();
  const [currentPage, setCurrentPage] = useState<Page>('ops');
  const [currentSubPage, setCurrentSubPage] = useState<SubPage>('');

  const renderPage = () => {
    switch (currentPage) {
      case 'ops':
        return <OpsPage currentSubPage={currentSubPage} onSubPageChange={setCurrentSubPage} />;
      case 'marketing':
        return <MarketingPage currentSubPage={currentSubPage} onSubPageChange={setCurrentSubPage} />;
      case 'tech':
        return <TechPage currentSubPage={currentSubPage} onSubPageChange={setCurrentSubPage} />;
      default:
        return <OpsPage currentSubPage={currentSubPage} onSubPageChange={setCurrentSubPage} />;
    }
  };

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    setCurrentSubPage(''); // Reset subpage when changing main page
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>NockAI</h1>
        </div>
        <div className="nav-menu">
          <button 
            className={`nav-item ${currentPage === 'ops' ? 'active' : ''}`}
            onClick={() => handlePageChange('ops')}
          >
            Operations
          </button>
          <button 
            className={`nav-item ${currentPage === 'marketing' ? 'active' : ''}`}
            onClick={() => handlePageChange('marketing')}
          >
            Marketing
          </button>
          <button 
            className={`nav-item ${currentPage === 'tech' ? 'active' : ''}`}
            onClick={() => handlePageChange('tech')}
          >
            Tech
          </button>
        </div>
        <div className="nav-actions">
          <button className="sign-out-btn" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </nav>
      
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
