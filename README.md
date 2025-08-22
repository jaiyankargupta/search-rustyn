# SearchRustyn - Next.js Version

A modern Next.js application for searching GitHub repositories by ideas, repository names, owners, and GitHub user profiles.

## Features

- 🔍 **Multiple Search Modes**: Search by ideas, repository names, owners, or GitHub usernames
- 📝 **README Generator**: Generate professional README files for your projects
- ⚔️ **User Battle**: Compare GitHub users and their contributions
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🚀 **Next.js 14**: Built with the latest Next.js features

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom glass effects
- **API**: Next.js API routes with external proxy support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jaiyankargupta/searchRustyn.git
cd searchRustyn
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables (optional):
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Full Development Mode (with Express server)

If you want to run both Next.js and the Express proxy server:
```bash
npm run dev:full
```

This will start:
- Next.js dev server on port 3000
- Express proxy server on port 3001

### Production Build

Build the application:
```bash
npm run build
```

Static files are automatically generated during the build process.

Start production server:
```bash
npm run start:prod
```

## Project Structure

```
searchRustyn/
├── pages/                 # Next.js pages and API routes
│   ├── api/              # API endpoints
│   │   ├── search-repos.js
│   │   ├── github-user.js
│   │   └── health.js
│   ├── _app.js           # App wrapper
│   ├── _document.js      # Document wrapper
│   └── index.js          # Home page
├── src/
│   ├── components/       # React components
│   └── index.css         # Global styles
├── server.js             # Express proxy server
├── next.config.js        # Next.js configuration
└── package.json
```

## API Routes

### `/api/search-repos`
Search for repositories by ideas, names, or owners.

**Query Parameters:**
- `query`: Search term (required)
- `mode`: Search mode (`idea`, `repo`, `owner`)
- `page`: Page number (default: 1)
- `per_page`: Results per page (default: 10)

### `/api/github-user`
Get GitHub user profile information.

**Query Parameters:**
- `username`: GitHub username (required)

### `/api/health`
Health check endpoint.

## Deployment

### GitHub Pages

1. Build for static export:
```bash
npm run build:export
```

2. Deploy:
```bash
npm run deploy
```

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Migration from React

This project was migrated from Create React App to Next.js. Key changes:

- Replaced `react-scripts` with `next`
- Converted `src/App.js` to `pages/index.js`
- Added Next.js API routes to replace Express server functionality
- Updated build and deployment scripts
- Added Next.js configuration files

The Express server (`server.js`) is still included for proxy functionality and can be used alongside Next.js if needed.
