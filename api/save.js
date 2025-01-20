export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password, content, file } = req.body;

  // Verify password
  if (password !== process.env.EDIT_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Use Vercel's filesystem API to write the file
    const fs = require('fs').promises;
    await fs.writeFile(`./${file}`, content);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving file:', error);
    res.status(500).json({ error: 'Failed to save changes' });
  }
} 