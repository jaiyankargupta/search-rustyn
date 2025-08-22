export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user1, user2 } = req.body;

  if (!user1 || !user2) {
    return res.status(400).json({ error: 'Both user1 and user2 are required' });
  }

  try {
    // First, fetch the complete user data for both users
    const [user1Response, user2Response] = await Promise.all([
      fetch(`https://what-to-build.niladri.tech/api/github-user?username=${user1}`),
      fetch(`https://what-to-build.niladri.tech/api/github-user?username=${user2}`)
    ]);

    if (!user1Response.ok || !user2Response.ok) {
      throw new Error(`Failed to fetch user data: ${user1Response.status} or ${user2Response.status}`);
    }

    const [user1Data, user2Data] = await Promise.all([
      user1Response.json(),
      user2Response.json()
    ]);

    // Now call the roast generation API with complete user objects
    const targetUrl = 'https://what-to-build.niladri.tech/api/generate-roast';
    
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        user1: user1Data, 
        user2: user2Data 
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Roast generation API error:', error);
    res.status(500).json({ 
      error: 'Failed to generate roast',
      message: error.message 
    });
  }
}
