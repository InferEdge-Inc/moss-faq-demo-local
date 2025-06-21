import { faqs } from "../data/faqs";
import { initializeSearchIndex } from "../utils/searchUtils";
import { searchFAQs } from "../utils/searchUtils";

export type MessageData = { type: "initialize" } | { type: "search"; query: string };
self.onmessage = async (event: MessageEvent<MessageData>) => {
    if (event.data.type === "initialize") {
        console.log("Initializing search index...");
        await initializeSearchIndex(faqs);
    } else if (event.data.type === "search") {
        const query = event.data.query;
        console.log("Received query:", query);
        const results = await searchFAQs(faqs, query);
        postMessage(results);
    }
}

export { };