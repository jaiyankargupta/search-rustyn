import React, { useState } from 'react';
import { FileText, Download, Copy, Check, Loader } from 'lucide-react';

const ReadmeGenerator = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [readmeContent, setReadmeContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateReadme = async () => {
    if (!repoUrl.trim()) return;

    setLoading(true);
    setError(null);
    setReadmeContent('');

    try {
      const response = await fetch(`/api/generate-readme`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repo: repoUrl }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setReadmeContent(data.markdown || '');
    } catch (err) {
      setError(err.message || 'Failed to generate README. Please try again.');
      console.error('README generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(readmeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const downloadReadme = () => {
    const blob = new Blob([readmeContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">README Generator</h2>
        </div>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
          Generate professional README files for your GitHub repositories using AI
        </p>
        
        {/* Input Form */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repository"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
          <button
            onClick={generateReadme}
            disabled={loading || !repoUrl.trim()}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm sm:text-base font-medium"
          >
            {loading ? (
              <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            ) : (
              'Generate'
            )}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="px-4 sm:px-6 py-4 bg-red-50 border-l-4 border-red-400">
          <p className="text-red-800 text-sm sm:text-base">{error}</p>
        </div>
      )}

      {/* README Content */}
      {readmeContent && (
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Generated README</h3>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <button
                onClick={downloadReadme}
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 max-h-64 sm:max-h-96 overflow-y-auto">
            <pre className="text-xs sm:text-sm text-gray-800 whitespace-pre-wrap font-mono">
              {readmeContent}
            </pre>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!readmeContent && !loading && (
        <div className="px-4 sm:px-6 py-4 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">How to use:</h4>
          <ol className="text-xs sm:text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Enter the full GitHub repository URL (e.g., https://github.com/username/repo)</li>
            <li>Click "Generate" to create a professional README</li>
            <li>Copy the content or download as a markdown file</li>
            <li>Paste into your repository's README.md file</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default ReadmeGenerator;
