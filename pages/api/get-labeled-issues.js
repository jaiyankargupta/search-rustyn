export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { repo, labels, state = 'open', page = 1, perPage = 50 } = req.query;

  if (!repo) {
    return res.status(400).json({ error: 'Repository parameter is required' });
  }

  if (!labels) {
    return res.status(400).json({ error: 'Labels parameter is required' });
  }

  try {
    const targetUrl = 'https://what-to-build.niladri.tech/api/get-labeled-issues';
    const params = new URLSearchParams({
      repo,
      labels,
      state,
      page,
      perPage
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
    console.error('Get labeled issues API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch labeled issues',
      message: error.message 
    });
  }
}
