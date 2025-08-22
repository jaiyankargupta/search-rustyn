import React, { useState } from 'react';
import { Search, Github, FileText, Users } from 'lucide-react';
import SearchModeToggle from './components/SearchModeToggle';
import SearchBar from './components/SearchBar';
import RepositoryCard from './components/RepositoryCard';
import UserProfileCard from './components/UserProfileCard';
import ReadmeGenerator from './components/ReadmeGenerator';
import UserBattle from './components/UserBattle';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [searchMode, setSearchMode] = useState('idea');
  const [query, setQuery] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const [activeTab, setActiveTab] = useState('search');

  const searchModes = [
    { id: 'idea', label: 'Search by Ideas', icon: '💡' },
    { id: 'repo', label: 'Search by Repo Name', icon: '📁' },
    { id: 'owner', label: 'Search by Owner', icon: '👤' },
    { id: 'user', label: 'GitHub User Profile', icon: '👨‍💻' }
  ];

  const getApiUrl = (searchQuery, mode) => {
    if (mode === 'user') {
      return `http://localhost:3001/api/github-user?username=${searchQuery}`;
    }
    
    const baseUrl = 'http://localhost:3001/api/search-repos';
    const params = new URLSearchParams({
      query: searchQuery,
      page: 1,
      per_page: 15
    });

    if (mode === 'idea') {
      params.append('mode', 'idea');
    } else if (mode === 'repo') {
      params.append('mode', 'repo');
    } else if (mode === 'owner') {
      params.append('mode', 'find');
    }

    return `${baseUrl}?${params.toString()}`;
  };

  const searchRepositories = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setRepositories([]);
    setUserData(null);

    try {
      const response = await fetch(getApiUrl(searchQuery, searchMode), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (searchMode === 'user') {
        setUserData(data);
      } else {
        setRepositories(data.items || []);
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    searchRepositories(searchQuery);
  };

  const handleSearchModeChange = (mode) => {
    setSearchMode(mode);
    setRepositories([]);
    setUserData(null);
    setQuery('');
    setError(null);
  };

  const handleSearchBarFocus = () => {
    setShowAllRepos(true);
  };

  const handleSearchBarBlur = () => {
    // Delay hiding to allow clicking on results
    setTimeout(() => setShowAllRepos(false), 200);
  };

  const renderSearchResults = () => {
    if (loading) return <LoadingSpinner />;
    
    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      );
    }

    if (searchMode === 'user' && userData) {
      return <UserProfileCard userData={userData} />;
    }

    if (repositories.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
      );
    }

    if (query) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-300 mb-2">
            No results found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search query or search mode
          </p>
        </div>
      );
    }

    if (showAllRepos) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Github className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-300 mb-2">
            Start searching
          </h3>
          <p className="text-gray-400">
            Enter a query to discover repositories or users
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
      {/* Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Github className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">SearchRustyn</h1>
            </div>
            <div className="text-white/80 text-sm">
              Discover amazing repositories & users
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Feature Tabs */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg bg-white/10 p-1 backdrop-blur-sm border border-white/20">
              {[
                { id: 'search', label: 'Search', icon: Search },
                { id: 'readme', label: 'README Generator', icon: FileText },
                { id: 'battle', label: 'User Battle', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'search' && (
          <>
            {/* Search Mode Toggle - Only visible in Search tab */}
            <div className="mb-8">
              <SearchModeToggle
                modes={searchModes}
                activeMode={searchMode}
                onModeChange={handleSearchModeChange}
              />
            </div>

            {/* Search Bar - Only visible in Search tab */}
            <div className="mb-8">
              <SearchBar
                onSearch={handleSearch}
                onFocus={handleSearchBarFocus}
                onBlur={handleSearchBarBlur}
                placeholder={`Search ${searchMode === 'user' ? 'GitHub username' : searchMode === 'idea' ? 'repositories by ideas' : searchMode === 'repo' ? 'repositories by name' : 'repositories by owner'}...`}
                value={query}
                onChange={setQuery}
              />
            </div>

            {/* Search Results */}
            <div className="space-y-6">
              {renderSearchResults()}
            </div>
          </>
        )}

        {activeTab === 'readme' && (
          <div className="max-w-4xl mx-auto">
            <ReadmeGenerator />
          </div>
        )}

        {activeTab === 'battle' && (
          <div className="max-w-4xl mx-auto">
            <UserBattle />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
