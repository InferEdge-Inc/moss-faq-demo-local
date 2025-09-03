# FAQ Search Demo - MOSS Integration

A React TypeScript application demonstrating semantic search capabilities using the **MOSS** (Minimal On-Device Semantic Search) library. This demo showcases how to build an intelligent FAQ search system with real-time semantic matching.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MOSS API key (for semantic search functionality)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd moss-faq-demo-local
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_TEST_API_KEY=your_moss_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```text
src/
├── components/          # Reusable React components
├── data/               # FAQ data and TypeScript interfaces
│   ├── faqs.json       # FAQ dataset
│   └── faqs.ts         # FAQ type definitions
├── pages/              # Page components
│   ├── FAQsPage.tsx    # Main FAQ search page
│   └── FAQDetailPage.tsx # Individual FAQ detail view
├── styles/             # CSS stylesheets
├── utils/              # Utility functions and workers
│   ├── searchUtils.ts  # MOSS search integration
│   ├── searchWorker.ts # Web Worker for search
│   └── worker.ts       # Worker type definitions
└── App.tsx             # Main application component
```

## 🚀 Features

- **Semantic Search**: Intelligent FAQ search powered by MOSS library
- **Real-time Results**: Instant search suggestions as you type
- **React Router Integration**: Navigate between FAQ list and detailed views
- **Web Worker Support**: Non-blocking search processing in background threads
- **Responsive Design**: Mobile-friendly interface
- **TypeScript**: Fully typed for better development experience

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Search**: @inferedge/moss (Semantic Search Library)
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Styling**: CSS3
- **Linting**: ESLint

## 🔍 How It Works

1. **Initialization**: The app initializes a MOSS search index with FAQ data on startup
2. **Search Processing**: User queries are processed by a Web Worker using MOSS semantic search
3. **Real-time Results**: Search results are displayed instantly with relevance scores
4. **Navigation**: Users can click on results to view detailed FAQ pages

## 🎯 Key Components

### Search Integration (`src/utils/searchUtils.ts`)

- Initializes MOSS client with API key
- Creates and manages search index
- Processes search queries and returns ranked results

### Web Worker (`src/utils/searchWorker.ts`)

- Handles search processing in background thread
- Prevents UI blocking during search operations
- Manages communication between main thread and search logic

### FAQ Pages

- **FAQsPage**: Main search interface with dropdown results
- **FAQDetailPage**: Detailed view for individual FAQs

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks

## 🔑 Environment Variables

| Variable            | Description                      | Required |
| ------------------- | -------------------------------- | -------- |
| `VITE_TEST_API_KEY` | MOSS API key for semantic search | Yes      |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions about MOSS integration or this demo:

- Check the [MOSS documentation](https://docs.inferedge.com)
- Open an issue in this repository
- Contact the InferEdge team

---

Built with ❤️ by InferEdge Team
