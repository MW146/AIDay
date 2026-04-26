module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    // Parse body if it's a string
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer xoxb-271187169264-10789973723190-G9stJ10NVL9wbzJ3kFz5Md3R',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channel: 'C0B015M3B9A',
        ...body
      })
    });
    const data = await response.json();
    console.log('Slack response:', JSON.stringify(data));
    res.status(200).json(data);
  } catch(e) {
    console.error('Slack error:', e.message);
    res.status(500).json({ error: e.message });
  }
}
