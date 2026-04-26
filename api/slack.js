module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    // Fix HTML entities in text before sending to Slack
    const body = JSON.parse(JSON.stringify(req.body, (key, val) => {
      if (typeof val === 'string') {
        return val
          .replace(/&#x1F4CC;/g, '\u{1F4CC}')
          .replace(/&#x1F447;/g, '\u{1F447}')
          .replace(/&#x23F0;/g, '\u{23F0}')
          .replace(/&#x1F3AF;/g, '\u{1F3AF}')
          .replace(/&#x1F389;/g, '\u{1F389}');
      }
      return val;
    }));

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
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
