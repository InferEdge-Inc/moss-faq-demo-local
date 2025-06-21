import { FAQ } from '../data/faqs';
import { MossClient, SearchResult as MossSearchResult } from "@inferedge/moss";

export interface SearchResult {
    faq: FAQ;
    score: number;
}

// Create a global search client and index
const mossClient = new MossClient(import.meta.env.VITE_TEST_API_KEY);
const faqIndexId: string = "faq-index";

/**
 * Initializes the FAQ search index with the provided FAQs
 * @param faqs Array of FAQ items to add to the index
 */
export const initializeSearchIndex = async (faqs: FAQ[]): Promise<void> => {
    if (mossClient.hasIndex(faqIndexId)) {
        console.log(new Date().toLocaleTimeString());
        console.log("Search index already initialized")
        return;
    }
    const didCreate = await mossClient.createIndex(faqIndexId, "moss-mediumlm");

    if (!didCreate) {
        console.error("Failed to create FAQ index");
        return;
    }

    await mossClient.addItems(faqIndexId, faqs.map(faq => ({
        id: faq.id,
        text: `${faq.question} ${faq.answer}`,
    })));
    console.log(new Date().toLocaleTimeString());
    console.log("Search index initialized with " + faqs.length + " FAQs");
};

/**
 * Simple text search function that scores FAQs based on match relevance
 * @param faqs Array of FAQ items to search through
 * @param term Search term to find in FAQs
 * @returns Array of search results with scores
 */
export const searchFAQs = async (faqs: FAQ[], term: string): Promise<SearchResult[]> => {
    if (!term || !term.trim()) return [];

    const termLower = term.toLowerCase();
    
    // Initialize the index if it hasn't been initialized yet
    if (!mossClient.hasIndex(faqIndexId)) {
        await initializeSearchIndex(faqs);
    }
    
    // Make sure faqIndex is definitely initialized
    if (!mossClient.hasIndex(faqIndexId)) {
        console.error("Failed to initialize FAQ index");
        return [];
    }
    
    // Use the existing index to perform the search
    console.log("Searching for term:", termLower);
    console.log("Indexing FAQs for search...");
    const searchResults: MossSearchResult = await mossClient.query(faqIndexId, termLower);
    console.log("Search results:", searchResults);
    
    // Filter out any matches where the FAQ is not found
    return searchResults.matches
        .filter(result => {
            const id = result.id as number;
            // Make sure the ID is valid and exists in the faqs array
            return id !== undefined && id >= 0 && id < faqs.length && faqs[id] !== undefined;
        })
        .map(result => {
            return { faq: faqs[result.id as number - 1], score: result.score };
        });
};