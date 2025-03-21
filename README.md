# File List Application

A simple file list application that allows users to browse, sort, filter, preview, and share files from various parts of the ERP system.

## Features

- Browse, sort, and filter files
- Download and preview files
- View file details
- Share files with other users
- Pin/unpin files
- Favorite/unfavorite files
- Add/remove flags to files

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install additional type definitions:
```bash
npm install --save-dev @types/axios
```

3. Start the development server:
```bash
npm start
```

## Environment Variables

The application requires the following environment variables:

- `REACT_APP_API_BASE_URL`: The base URL for the API (default: http://deskvantage.com:8082)

## Development

The application is built with:
- React
- TypeScript
- Material-UI
- Axios for API calls

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── services/      # API services
  ├── types/         # TypeScript type definitions
  ├── utils/         # Utility functions
  └── App.tsx        # Main application component
``` 