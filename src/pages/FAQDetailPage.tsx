import { useParams, Link } from 'react-router-dom';
import { faqs } from '../data/faqs';
import '../styles/FAQDetailPage.css';

const FAQDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const faq = faqs.find(faq => faq.id === Number(id));

  if (!faq) {
    return (
      <div className="faq-detail-page">
        <h2>FAQ Not Found</h2>
        <p>Sorry, the FAQ you're looking for doesn't exist.</p>
        <Link to="/" className="back-link">Back to FAQs</Link>
      </div>
    );
  }

  return (
    <div className="faq-detail-page">
      <Link to="/" className="back-link">Back to FAQs</Link>
      
      <div className="faq-detail">
        <h2>{faq.question}</h2>
        <p className="faq-answer">{faq.answer}</p>
      </div>
    </div>
  );
};

export default FAQDetailPage;