# Convo Project

This repository contains a full-stack application with a Node.js/Express backend and a React frontend. The project allows users to upload DOCX files, converts them to PDF, and provides a user-friendly interface to manage and view uploaded documents.

## Features

- **File Upload:** Upload DOCX files from the frontend.
- **File Conversion:** Backend automatically converts uploaded DOCX files to PDF format.
- **Document Management:** View and manage uploaded and converted files.
- **Modern UI:** Built with React and Tailwind CSS for a responsive, modern interface.

## Project Structure

```
Backend/
  converter.js         # Handles DOCX to PDF conversion
  index.js             # Entry point for backend
  server.js            # Express server setup
  package.json         # Backend dependencies
  files/               # Stores converted PDF files
  uploads/             # Stores uploaded DOCX files

Frontend/
  src/                 # React source code
    components/        # React components
    context/           # React context providers
    services/          # API service functions
  public/              # Static assets
  index.html           # Main HTML file
  package.json         # Frontend dependencies
  tailwind.config.js   # Tailwind CSS configuration
  vite.config.js       # Vite build configuration
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Backend Setup
1. Navigate to the `Backend` directory:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend Setup
1. Navigate to the `Frontend` directory:
   ```sh
   cd Frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```

### Usage
- Open your browser and navigate to the frontend URL (usually `http://localhost:8000` by default).
- Upload DOCX files and view/download the converted PDFs.


