// src/utils/searchWorkerSingleton.ts
// Singleton for the search worker

const searchWorker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });

export default searchWorker;
