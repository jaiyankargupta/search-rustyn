import React, { useState } from 'react';
import { Search, Github, FileText, Users } from 'lucide-react';
import SearchModeToggle from '../components/SearchModeToggle';
import SearchBar from '../components/SearchBar';
import RepositoryCard from '../components/RepositoryCard';
import UserProfileCard from '../components/UserProfileCard';
import ReadmeGenerator from '../components/ReadmeGenerator';
import UserBattle from '../components/UserBattle';
import LoadingSpinner from '../components/LoadingSpinner';
import Head from 'next/head';

export default function Home() {
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
      return `/api/github-user?username=${searchQuery}`;
    }
    
    const params = new URLSearchParams({
      query: searchQuery,
      page: 1,
      per_page: 10
    });

    if (mode === 'idea') {
      params.append('mode', 'idea');
    } else if (mode === 'repo') {
      params.append('mode', 'repo');
    } else if (mode === 'owner') {
      params.append('mode', 'find');
    }

    return `/api/search-repos?${params.toString()}`;
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
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-lg">
          <p className="text-red-800 font-medium">{error}</p>
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
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <Search className="w-20 h-20 mx-auto opacity-50" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-3">
            No results found
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Try adjusting your search query or search mode
          </p>
        </div>
      );
    }

    if (showAllRepos) {
      return (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <Github className="w-20 h-20 mx-auto opacity-50" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-3">
            Start searching
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Enter a query to discover repositories or users
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Head>
        <title>SearchRustyn - Repository Search</title>
        <meta name="description" content="Search repositories by name, owner, or ideas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        
        {/* Header */}
        <header className="relative z-10 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Github className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    SearchRustyn
                  </h1>
                  <p className="text-purple-200 text-sm font-medium">Repository Discovery Platform</p>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center space-x-6 text-purple-200">
                  <a
                    href="https://github.com/jaiyankargupta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm font-medium hover:underline"
                  >
                    <Github className="w-5 h-5" />
                    <span>jaiyankargupta</span>
                  </a>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Feature Tabs */}
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="inline-flex rounded-2xl bg-white/10 p-2 backdrop-blur-sm border border-white/20 shadow-xl">
                {[
                  { id: 'search', label: 'Search', icon: Search },
                  { id: 'readme', label: 'README Generator', icon: FileText },
                  { id: 'battle', label: 'User Battle', icon: Users }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-3 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-2xl transform scale-105'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
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
              <div className="mb-12">
                <SearchModeToggle
                  modes={searchModes}
                  activeMode={searchMode}
                  onModeChange={handleSearchModeChange}
                />
              </div>

              {/* Search Bar - Only visible in Search tab */}
              <div className="mb-12">
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
              <div className="space-y-8">
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
    </>
  );
}
