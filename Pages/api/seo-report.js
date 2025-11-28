import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const apiKey = process.env.PAGESPEED_API_KEY;
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch PageSpeed data" });
  }
}
