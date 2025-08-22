export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { filter, language, page = 1, per_page = 15 } = req.query;

  if (!filter) {
    return res.status(400).json({ error: 'Filter parameter is required' });
  }

  if (!language) {
    return res.status(400).json({ error: 'Language parameter is required' });
  }

  try {
    const targetUrl = 'https://what-to-build.niladri.tech/api/search-trending-repos';
    const params = new URLSearchParams({
      filter,
      language,
      page,
      per_page
    });

    const response = await fetch(`${targetUrl}?${params.toString()}`, {
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
    res.status(200).json(data);
  } catch (error) {
    console.error('Search trending repos API error:', error);
    res.status(500).json({
      error: 'Failed to fetch trending repositories',
      message: error.message
    });
  }
}
