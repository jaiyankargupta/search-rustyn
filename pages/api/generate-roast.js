export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user1, user2 } = req.body;

  if (!user1 || !user2) {
    return res.status(400).json({ error: "Both user1 and user2 are required" });
  }

  try {
    const [user1Response, user2Response] = await Promise.all([
      fetch(
        `https://what-to-build.niladri.tech/api/github-user?username=${user1}`
      ),
      fetch(
        `https://what-to-build.niladri.tech/api/github-user?username=${user2}`
      ),
    ]);

    // Log status and raw body for debugging
    const user1Text = await user1Response.text();
    const user2Text = await user2Response.text();
    console.log("user1Response status:", user1Response.status);
    console.log("user1Response body:", user1Text);
    console.log("user2Response status:", user2Response.status);
    console.log("user2Response body:", user2Text);

    if (user1Response.status !== 200 || user2Response.status !== 200) {
      throw new Error(
        `Failed to fetch user data: ${user1Response.status} or ${user2Response.status}`
      );
    }

    const user1Data = JSON.parse(user1Text);
    const user2Data = JSON.parse(user2Text);

    console.log(user1Data);
    console.log(user2Data);

    if (!user1Data.stats || !user2Data.stats) {
      return res.status(400).json({
        error: "User data incomplete",
        message:
          "One or both users do not have 'stats' property. Please check the usernames or API response.",
      });
    }

    const targetUrl = "https://what-to-build.niladri.tech/api/generate-roast";

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user1: user1Data,
        user2: user2Data,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json({
      roast: data.roast,
      battleStats: data.battleStats,
      topLanguages: data.topLanguages,
      user1: user1Data,
      user2: user2Data,
    });
  } catch (error) {
    console.error("Roast generation API error:", error);
    res.status(500).json({
      error: "Failed to generate roast",
      message: error.message,
    });
  }
}
