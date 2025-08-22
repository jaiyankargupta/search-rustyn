# SearchRustyn - Repository Search Application

A modern, responsive React application for searching GitHub repositories, viewing user profiles, generating READMEs, and comparing users with an attractive UI and multiple search modes.

## Features

- 🎨 **Beautiful UI**: Modern gradient design with glass-morphism effects
- 🔍 **Multiple Search Modes**: 
  - Search by Ideas
  - Search by Repository Name  
  - Search by Owner Name
  - GitHub User Profile Search
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Real-time Search**: Instant search results with loading states
- 🎯 **Smart Endpoints**: Uses the what-to-build API for repository discovery
- 👨‍💻 **User Profiles**: Detailed GitHub user statistics and information
- 📝 **README Generator**: AI-powered README generation for repositories
- 🥊 **User Battles**: Compare two GitHub users side by side

## Search Modes

### 1. Search by Ideas
- Endpoint: `https://what-to-build.niladri.tech/api/search-repos?query={query}&page=1&mode=idea&per_page=10`
- Perfect for finding repositories based on project ideas and concepts

### 2. Search by Repository Name
- Endpoint: `https://what-to-build.niladri.tech/api/search-repos?query={query}&page=1&mode=repo&per_page=10`
- Search for repositories by their exact or partial names

### 3. Search by Owner Name
- Endpoint: `https://what-to-build.niladri.tech/api/search-repos?query={query}&page=1&per_page=10&mode=find`
- Discover repositories owned by specific users or organizations

### 4. GitHub User Profile
- Endpoint: `https://what-to-build.niladri.tech/api/github-user?username={username}`
- Get detailed user information, statistics, and top repositories

## Additional Features

### README Generator
- **Endpoint**: `https://what-to-build.niladri.tech/api/generate-readme`
- **Method**: POST
- **Body**: `{"repo": "https://github.com/username/repository"}`
- Generate professional README files using AI

### User Battle
- **Endpoint**: `https://what-to-build.niladri.tech/api/generate-roast`
- **Method**: POST
- **Body**: `{"user1": "username1", "user2": "username2"}`
- Compare two GitHub users and see who comes out on top

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd searchRustyn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development environment**
   ```bash
   npm run dev
   ```

   This will start both:
   - **Proxy Server**: Running on `http://localhost:3001` (handles CORS)
   - **React App**: Running on `http://localhost:3000`

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Alternative: Run Servers Separately

If you prefer to run the servers separately:

1. **Start the proxy server** (in one terminal):
   ```bash
   npm run server
   ```

2. **Start the React app** (in another terminal):
   ```bash
   npm start
   ```

## CORS Solution

This application includes a **proxy server** to handle CORS issues. The proxy server:

- Runs on port 3001
- Forwards API requests to `https://what-to-build.niladri.tech`
- Handles CORS headers automatically
- Provides detailed logging for debugging

## Build for Production

```bash
npm run build
```

## Technologies Used

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Express.js** - Proxy server for CORS handling
- **Glass-morphism** - Modern UI design trend
- **Responsive Design** - Mobile-first approach

## Project Structure

```
searchRustyn/
├── server.js                    # Express proxy server
├── src/
│   ├── components/
│   │   ├── SearchModeToggle.js    # Search mode buttons
│   │   ├── SearchBar.js           # Search input component
│   │   ├── RepositoryCard.js      # Repository display card
│   │   ├── UserProfileCard.js     # GitHub user profile display
│   │   ├── ReadmeGenerator.js     # README generation component
│   │   ├── UserBattle.js          # User comparison component
│   │   └── LoadingSpinner.js      # Loading animation
│   ├── App.js                     # Main application component
│   ├── index.js                   # Application entry point
│   └── index.css                  # Global styles and Tailwind imports
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## API Integration

The application integrates with the [what-to-build API](https://what-to-build.niladri.tech/) through a local proxy server to avoid CORS issues. The API provides:

- Repository metadata and search
- User profile information and statistics
- README generation using AI
- User comparison and battle features

## Usage Examples

### Search for Repositories
1. Select a search mode (Ideas, Repo Name, Owner, or User Profile)
2. Enter your search query
3. View results in beautiful cards

### Generate README
1. Go to the "README Generator" tab
2. Enter a GitHub repository URL
3. Click "Generate" to create a professional README
4. Copy or download the generated content

### User Battle
1. Go to the "User Battle" tab
2. Enter two GitHub usernames
3. Click "Start Battle!" to compare their stats
4. See who has more stars, forks, and contributions

## Troubleshooting

### CORS Issues
If you encounter CORS errors:
1. Make sure the proxy server is running on port 3001
2. Check that the React app is using `http://localhost:3001/api/*` endpoints
3. Verify both servers are running simultaneously

### Port Conflicts
If port 3000 or 3001 is already in use:
1. Kill existing processes: `pkill -f "react-scripts start"` or `pkill -f "node server.js"`
2. Or change ports in the respective configuration files

## Customization

### Colors
Modify the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
  }
}
```

### Search Results
Adjust the number of results per page by modifying the `per_page` parameter in the API calls.

### Styling
Customize the glass-morphism effects and animations in `src/index.css`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue in the repository.

---

Built with ❤️ using React, Express, and Tailwind CSS
