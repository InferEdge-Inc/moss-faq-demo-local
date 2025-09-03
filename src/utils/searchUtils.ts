import { FAQ } from '../data/faqs';
import { MossClient, SearchResult as MossSearchResult } from "@inferedge/moss";

export interface SearchResult {
    faq: FAQ;
    score: number;
}

// Create a global search client and index
const mossClient = new MossClient(import.meta.env.VITE_TEST_API_KEY);
const faqIndexId: string = "faq-index";

// Track initialization state to prevent duplicate calls
let isInitializing = false;
let isInitialized = false;

/**
 * Initializes the FAQ search index with the provided FAQs
 * @param faqs Array of FAQ items to add to the index
 */
export const initializeSearchIndex = async (faqs: FAQ[]): Promise<void> => {
    // Check if already initialized or currently initializing
    if (isInitialized || isInitializing) {
        console.log(new Date().toLocaleTimeString());
        return;
    }

    // Check if index already exists in the client
    if (mossClient.hasIndex(faqIndexId)) {
        console.log(new Date().toLocaleTimeString());
        console.log("Search index already exists in client");
        isInitialized = true;
        return;
    }

    try {
        isInitializing = true;
        console.log(new Date().toLocaleTimeString());
        console.log("Starting search index initialization...");

        const didCreate = await mossClient.createIndex(faqIndexId, "moss-mediumlm");

        if (!didCreate) {
            console.error("Failed to create FAQ index");
            isInitializing = false;
            return;
        }

        await mossClient.addItems(faqIndexId, faqs.map(faq => ({
            id: faq.id,
            text: `${faq.question} ${faq.answer}`,
        })));

        isInitialized = true;
        console.log(new Date().toLocaleTimeString());
        console.log("Search index initialized with " + faqs.length + " FAQs");
    } catch (error) {
        console.error("Error during index initialization:", error);
        throw error;
    } finally {
        isInitializing = false;
    }
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
    if (!isInitialized && !mossClient.hasIndex(faqIndexId)) {
        console.log("Index not initialized, initializing now...");
        await initializeSearchIndex(faqs);
    }

    // Make sure faqIndex is definitely initialized
    if (!isInitialized && !mossClient.hasIndex(faqIndexId)) {
        console.error("Failed to initialize FAQ index");
        return [];
    }

    try {
        // Use the existing index to perform the search
        console.log("Searching for term:", termLower);
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
    } catch (error) {
        console.error("Error during search:", error);
        return [];
    }
};