import React, { useState } from 'react';
import { Users, Zap, Trophy, TrendingUp, Loader, User, Search } from 'lucide-react';

const UserBattle = () => {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [battleResult, setBattleResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // New state for profile search
  const [profileUsername, setProfileUsername] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);

  const searchProfile = async () => {
    if (!profileUsername.trim()) return;

    setProfileLoading(true);
    setProfileError(null);
    setProfileData(null);

    try {
      const response = await fetch(`http://localhost:3001/api/github-user?username=${profileUsername}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProfileData(data);
    } catch (err) {
      setProfileError(err.message || 'Failed to fetch profile. Please try again.');
      console.error('Profile fetch error:', err);
    } finally {
      setProfileLoading(false);
    }
  };

  const startBattle = async () => {
    if (!user1.trim() || !user2.trim()) return;

    setLoading(true);
    setError(null);
    setBattleResult(null);

    try {
      const response = await fetch('http://localhost:3001/api/generate-roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user1, user2 }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setBattleResult(data);
    } catch (err) {
      setError(err.message || 'Failed to generate battle. Please try again.');
      console.error('Battle generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWinner = () => {
    if (!battleResult) return null;
    
    const user1Score = battleResult.user1.stats.totalStars + battleResult.user1.stats.contributions;
    const user2Score = battleResult.user2.stats.totalStars + battleResult.user2.stats.contributions;
    
    return user1Score > user2Score ? battleResult.user1 : battleResult.user2;
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* GitHub Profile Section */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">GitHub Profile Lookup</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Search for a GitHub user to view their profile and statistics
          </p>
          
          {/* Profile Search Input */}
          <div className="flex space-x-3">
            <input
              type="text"
              value={profileUsername}
              onChange={(e) => setProfileUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={searchProfile}
              disabled={profileLoading || !profileUsername.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
            >
              {profileLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Profile Error Display */}
        {profileError && (
          <div className="px-6 py-4 bg-red-50 border-l-4 border-red-400">
            <p className="text-red-800">{profileError}</p>
          </div>
        )}

        {/* Profile Display */}
        {profileData && (
          <div className="p-6">
            <div className="flex items-start space-x-6">
              {/* Avatar and Basic Info */}
              <div className="flex-shrink-0">
                <img
                  src={profileData.user.avatar_url}
                  alt={profileData.user.login}
                  className="w-24 h-24 rounded-full border-4 border-blue-100"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {profileData.user.name || profileData.user.login}
                    </h3>
                    <p className="text-gray-600 text-lg">@{profileData.user.login}</p>
                  </div>
                  <a
                    href={profileData.user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <User className="w-6 h-6" />
                  </a>
                </div>
                
                {profileData.user.bio && (
                  <p className="text-gray-700 mb-4">{profileData.user.bio}</p>
                )}
                
                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{profileData.user.public_repos}</div>
                    <div className="text-sm text-gray-600">Repos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-yellow-600">{formatNumber(profileData.stats.totalStars)}</div>
                    <div className="text-sm text-gray-600">Stars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">{formatNumber(profileData.stats.totalForks)}</div>
                    <div className="text-sm text-gray-600">Forks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">{formatNumber(profileData.stats.contributions)}</div>
                    <div className="text-sm text-gray-600">Contributions</div>
                  </div>
                </div>
                
                {/* Top Languages */}
                {profileData.stats.languageStats && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Top Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(profileData.stats.languageStats)
                        .sort(([,a], [,b]) => b.percentage - a.percentage)
                        .slice(0, 5)
                        .map(([language, data]) => (
                          <span
                            key={language}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {language} ({data.percentage}%)
                          </span>
                        ))}
                    </div>
                  </div>
                )}
                
                {/* Member Info */}
                <div className="text-sm text-gray-500">
                  <span>Member since: {formatDate(profileData.user.created_at)}</span>
                  <span className="mx-2">•</span>
                  <span>Last updated: {formatDate(profileData.user.updated_at)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Battle Section */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">User Battle</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Compare two GitHub users and see who comes out on top! 🥊
          </p>
          
          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User 1
              </label>
              <input
                type="text"
                value={user1}
                onChange={(e) => setUser1(e.target.value)}
                placeholder="username1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User 2
              </label>
              <input
                type="text"
                value={user2}
                onChange={(e) => setUser2(e.target.value)}
                placeholder="username2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <button
            onClick={startBattle}
            disabled={loading || !user1.trim() || !user2.trim()}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Generating Battle...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Start Battle!</span>
              </>
            )}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="px-6 py-4 bg-red-50 border-l-4 border-red-400">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Battle Results */}
        {battleResult && (
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Battle Results</h3>
              {getWinner() && (
                <div className="flex items-center justify-center space-x-2 text-yellow-600">
                  <Trophy className="w-6 h-6" />
                  <span className="text-lg font-semibold">
                    Winner: {getWinner().user.login} 🏆
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User 1 */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={battleResult.user1.user.avatar_url}
                    alt={battleResult.user1.user.login}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {battleResult.user1.user.name || battleResult.user1.user.login}
                    </h4>
                    <p className="text-sm text-gray-600">@{battleResult.user1.user.login}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {formatNumber(battleResult.user1.stats.totalStars)}
                    </div>
                    <div className="text-gray-600">Stars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {formatNumber(battleResult.user1.stats.totalForks)}
                    </div>
                    <div className="text-gray-600">Forks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {formatNumber(battleResult.user1.stats.contributions)}
                    </div>
                    <div className="text-gray-600">Contributions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {battleResult.user1.user.public_repos}
                    </div>
                    <div className="text-gray-600">Repos</div>
                  </div>
                </div>
              </div>

              {/* User 2 */}
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={battleResult.user2.user.avatar_url}
                    alt={battleResult.user2.user.login}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {battleResult.user2.user.name || battleResult.user2.user.login}
                    </h4>
                    <p className="text-sm text-gray-600">@{battleResult.user2.user.login}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {formatNumber(battleResult.user2.stats.totalStars)}
                    </div>
                    <div className="text-gray-600">Stars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {formatNumber(battleResult.user2.stats.totalForks)}
                    </div>
                    <div className="text-gray-600">Forks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {formatNumber(battleResult.user2.stats.contributions)}
                    </div>
                    <div className="text-gray-600">Contributions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {battleResult.user2.user.public_repos}
                    </div>
                    <div className="text-gray-600">Repos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Repos Comparison */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Top Repositories Comparison
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-600 mb-2">{battleResult.user1.user.login}'s Top Repos</h5>
                  <div className="space-y-2">
                    {battleResult.user1.stats.topRepos?.slice(0, 3).map((repo) => (
                      <div key={repo.name} className="text-sm bg-blue-50 p-2 rounded">
                        <div className="font-medium">{repo.name}</div>
                        <div className="text-gray-600">{repo.stars} ⭐ {repo.language}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-green-600 mb-2">{battleResult.user2.user.login}'s Top Repos</h5>
                  <div className="space-y-2">
                    {battleResult.user2.stats.topRepos?.slice(0, 3).map((repo) => (
                      <div key={repo.name} className="text-sm bg-green-50 p-2 rounded">
                        <div className="font-medium">{repo.name}</div>
                        <div className="text-gray-600">{repo.stars} ⭐ {repo.language}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!battleResult && !loading && (
          <div className="px-6 py-4 bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-2">How to battle:</h4>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Enter two GitHub usernames</li>
              <li>Click "Start Battle!" to compare their stats</li>
              <li>See who has more stars, forks, and contributions</li>
              <li>Compare their top repositories</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBattle;
