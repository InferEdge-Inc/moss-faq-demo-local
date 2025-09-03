import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FAQsPage from './pages/FAQsPage'
import FAQDetailPage from './pages/FAQDetailPage'
import './App.css'
import { MessageData } from './utils/worker'
import searchWorker from './utils/searchWorker';

function App() {
  useEffect(() => {
    if (window.Worker) {
      searchWorker.postMessage({ type: "initialize" } as MessageData);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/" element={<FAQsPage />} />
            <Route path="/faq/:id" element={<FAQDetailPage />} />
          </Routes>
        </main>
        <footer>
          <p>© 2025 FAQ Search App</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
