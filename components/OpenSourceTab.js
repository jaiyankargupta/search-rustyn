import React, { useState, useEffect } from 'react';
import { Search, Github, ExternalLink, Calendar, Users, Code, Filter } from 'lucide-react';

const OpenSourceTab = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('good first issue');
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const availableFilters = [
    'good first issue',
    'major issue'
  ];

  const popularLanguages = [
    'python', 'javascript', 'typescript', 'java', 'c++', 'c#', 'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'dart', 'scala'
  ];

  const fetchTrendingRepos = async (resetPage = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const currentPage = resetPage ? 1 : page;
      
      const response = await fetch(
        `/api/search-trending-repos?filter=${encodeURIComponent(selectedFilter)}&language=${encodeURIComponent(selectedLanguage)}&page=${currentPage}&per_page=15`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (resetPage) {
        setRepos(data.items || []);
        setPage(1);
      } else {
        setRepos(prev => [...prev, ...(data.items || [])]);
      }
      
      setHasMore(data.has_more || false);
    } catch (err) {
      setError(err.message || 'Failed to fetch trending repos');
      console.error('Error fetching trending repos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingRepos(true);
  }, [selectedFilter, selectedLanguage]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      fetchTrendingRepos();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Github className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
            Open Source Opportunities
          </h2>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Discover trending repositories with good first issues and major issues. 
          Find the perfect open source projects to contribute to! 🚀
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-6">
        <div className="space-y-6">
          {/* Filter Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <span className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-purple-600" />
                <span>Issue Filter</span>
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availableFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {filter === 'good first issue' ? '🚀 Good First Issue' : '🔥 Major Issue'}
                </button>
              ))}
            </div>
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <span className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-blue-600" />
                <span>Programming Language</span>
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {popularLanguages.map((language) => (
                <button
                  key={language}
                  onClick={() => handleLanguageChange(language)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedLanguage === language
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <div className="text-center">
            <button
              onClick={() => fetchTrendingRepos(true)}
              disabled={loading}
              className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg"
            >
              <Search className="w-5 h-5" />
              <span>Discover Trending Repositories</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Repositories Display */}
      <div className="space-y-4">
        {repos.map((repo) => (
          <div key={repo.id} className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-white/30 p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 group">
                      <span className="text-green-600 font-mono bg-green-50 px-2 py-1 rounded-lg">📦</span>
                      <span className="group-hover:text-green-600 transition-colors">{repo.full_name}</span>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </a>
                  </h3>
                </div>
                
                {/* Description */}
                {repo.description && (
                  <p className="text-gray-700 mb-3 line-clamp-2">{repo.description}</p>
                )}

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {repo.topics.slice(0, 5).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Repository Stats */}
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">⭐</span>
                    <span>{repo.stargazers_count?.toLocaleString() || 0} stars</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-500">🔄</span>
                    <span>{repo.forks_count?.toLocaleString() || 0} forks</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-green-500">🐛</span>
                    <span>{repo.open_issues_count?.toLocaleString() || 0} issues</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-purple-500">💻</span>
                    <span>{repo.language || 'Unknown'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Repository Footer */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Created: {formatDate(repo.created_at)}</span>
                <span>Last updated: {formatDate(repo.updated_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && repos.length > 0 && (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>🚀 Load More Repositories</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && repos.length === 0 && !error && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Github className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No repositories found</h3>
          <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
            Try adjusting your filter criteria or language preferences
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-md mx-auto">
            <p className="text-blue-700 text-sm">
              💡 <strong>Tip:</strong> Click the "Discover Trending Repositories" button to find amazing open source projects!
            </p>
          </div>
        </div>
      )}

      {/* Tips Section */}
      {!loading && repos.length > 0 && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-green-800 mb-2">💡 Getting Started Tips</h4>
            <p className="text-green-600">Ready to contribute? Here's how to get started!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-green-700">
            <div className="bg-white/60 rounded-xl p-6 border border-green-100">
              <h5 className="font-bold text-lg mb-4 text-green-800 flex items-center">
                <span className="mr-2">🚀</span>
                For Beginners
              </h5>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Start with "good first issue" labels</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Read the issue description carefully</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Ask questions in the issue comments</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/60 rounded-xl p-6 border border-green-100">
              <h5 className="font-bold text-lg mb-4 text-green-800 flex items-center">
                <span className="mr-2">⚡</span>
                Before Contributing
              </h5>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Check the project's contributing guide</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Fork the repository first</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Create a feature branch</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenSourceTab;
