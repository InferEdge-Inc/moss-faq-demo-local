import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faqs } from '../data/faqs';
import { SearchResult } from '../utils/searchUtils';
import '../styles/FAQsPage.css';
import { MessageData } from '../utils/worker';
import searchWorker from '../utils/searchWorker';

const LIBRARY_NAME = 'MOSS';
const TAGLINE = 'Minimal On-Device Semantic Search';

const FAQsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      searchWorker.postMessage({ type: "search", query: searchTerm } as MessageData);
      searchWorker.onmessage = (event: MessageEvent<SearchResult[]>) => {
        const results = event.data;
        setSearchResults(results);
        setShowDropdown(results.length > 0);
      };
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  return (
    <div className="faqs-page">
      <header className="branding-header">
        <h1>Demo: AI Search on FAQs using {LIBRARY_NAME}</h1>
        <p className="tagline">{TAGLINE}</p>
        <p className="description">
          Experience lightning-fast AI-powered search - running entirely in your browser.
          MOSS brings minimal, on-device semantic search to your app with no server calls.
          Type a question below and see how smart local search can be.
        </p>
      </header>

      <div className="search-container">
        <h2>Search FAQs</h2>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search for FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="powered-by">
            <span>Powered by</span>
            <img src="/images/InferEdgeLogo_Dark_Mono_Icon.png" alt="InferEdge Logo" className="inferedge-logo" />
            <span>MOSS</span>
          </div>

          {showDropdown && (
            <div className="search-dropdown">
              {searchResults.map((result) => (
                <Link
                  to={`/faq/${result.faq.id}`}
                  key={result.faq.id}
                  className="search-result-item"
                  onClick={() => setShowDropdown(false)}
                >
                  <div className="search-result-question">{result.faq.question}</div>
                  <div className="search-result-score">Match score: {result.score.toFixed(1)}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="faqs-list">
        <h2>All FAQs</h2>
        <div className="faqs-grid">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-card">
              <h3>
                <Link to={`/faq/${faq.id}`}>{faq.question}</Link>
              </h3>
              <p>{faq.answer.substring(0, 150)}...</p>
              <Link to={`/faq/${faq.id}`} className="read-more">Read more →</Link>
            </div>
          ))}
        </div>
      </div>

      <footer className="branding-footer">
        <p>Powered by {LIBRARY_NAME} — Bringing fast, on-device semantic search to your apps.</p>
      </footer>
    </div>
  );
};

export default FAQsPage;
