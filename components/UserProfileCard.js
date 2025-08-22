import React from 'react';
import { User, MapPin, Twitter, Globe, Code } from 'lucide-react';

const UserProfileCard = ({ userData }) => {
  const { user, stats } = userData;
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  const getTopLanguages = () => {
    if (!stats.languageStats) return [];
    return Object.entries(stats.languageStats)
      .sort(([,a], [,b]) => b.percentage - a.percentage)
      .slice(0, 5);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20 overflow-hidden">
      {/* Header with Avatar and Basic Info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start space-x-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-20 h-20 rounded-full border-4 border-blue-100"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {user.name || user.login}
            </h2>
            <p className="text-gray-600 mb-2">@{user.login}</p>
            {user.bio && (
              <p className="text-gray-700 text-sm mb-3">{user.bio}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {user.location && (
                <div className="flex items-center space-x-1 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.twitter_username && (
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Twitter className="w-4 h-4" />
                  <span>@{user.twitter_username}</span>
                </a>
              )}
              {user.blog && (
                <a
                  href={user.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-green-600 hover:text-green-800 text-sm"
                >
                  <Globe className="w-4 h-4" />
                  <span>Blog</span>
                </a>
              )}
            </div>
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <User className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 py-4 bg-gray-50/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{user.public_repos}</div>
            <div className="text-sm text-gray-600">Repositories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{formatNumber(stats.totalStars)}</div>
            <div className="text-sm text-gray-600">Total Stars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{formatNumber(stats.totalForks)}</div>
            <div className="text-sm text-gray-600">Total Forks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{formatNumber(stats.contributions)}</div>
            <div className="text-sm text-gray-600">Contributions</div>
          </div>
        </div>
      </div>

      {/* Top Languages */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Code className="w-5 h-5 mr-2" />
          Top Languages
        </h3>
        <div className="space-y-2">
          {getTopLanguages().map(([language, data]) => (
            <div key={language} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{language}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${data.percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">{data.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Repositories */}
      {stats.topRepos && stats.topRepos.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Top Repositories</h3>
          <div className="space-y-3">
            {stats.topRepos.map((repo) => (
              <div key={repo.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{repo.name}</h4>
                  {repo.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{repo.description}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{repo.language}</span>
                    <span>{repo.stars} stars</span>
                    <span>{repo.commitCount} commits</span>
                  </div>
                </div>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50/30 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Member since: {formatDate(user.created_at)}</span>
          <span>Last updated: {formatDate(user.updated_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
