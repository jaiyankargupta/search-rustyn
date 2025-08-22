import React from 'react';
import { Star, GitBranch, Eye, Calendar, ExternalLink } from 'lucide-react';

const RepositoryCard = ({ repository }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
              {repository.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {repository.full_name}
            </p>
          </div>
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        
        {repository.description && (
          <p className="text-gray-700 text-sm line-clamp-3">
            {repository.description}
          </p>
        )}
      </div>

      {/* Owner Info */}
      <div className="px-6 py-3 bg-gray-50/50">
        <div className="flex items-center space-x-2">
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-700 font-medium">
            {repository.owner.login}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">
              {formatNumber(repository.stargazers_count)}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <GitBranch className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">
              {formatNumber(repository.forks_count)}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Eye className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">
              {formatNumber(repository.watchers_count)}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">
              {formatDate(repository.updated_at)}
            </span>
          </div>
        </div>

        {/* Language */}
        {repository.language && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700 font-medium">
                {repository.language}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {repository.size} KB
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50/30 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Created: {formatDate(repository.created_at)}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            repository.private ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {repository.private ? 'Private' : 'Public'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
