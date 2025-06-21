import faqsData from '../../assets/faqs.json';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

// Process the imported JSON data
// Only use the first 20 FAQs from the JSON file
export const faqs: FAQ[] = faqsData.faqs
  // .slice(0, 20) // Take only the first 20 FAQs