export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { repo } = req.body;

  if (!repo) {
    return res.status(400).json({ error: 'Repository URL is required' });
  }

  try {
    const targetUrl = 'https://what-to-build.niladri.tech/api/generate-readme';
    
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repo }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('README generation API error:', error);
    res.status(500).json({ 
      error: 'Failed to generate README',
      message: error.message 
    });
  }
}
