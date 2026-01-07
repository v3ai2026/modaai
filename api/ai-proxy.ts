import type { VercelRequest, VercelResponse } from '@vercel/node';

// Serverless proxy to keep provider API keys on the server side.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body = req.body && Object.keys(req.body).length > 0 ? req.body : await readJson(req);
  const provider = (body?.provider || 'GEMINI').toUpperCase();
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const userInput = typeof body?.userInput === 'string' ? body.userInput : '';
  const apiKey = provider === 'OPENAI' ? process.env.OPENAI_API_KEY : (process.env.GEMINI_API_KEY || process.env.API_KEY);

  if (!apiKey) {
    return res.status(500).json({ error: 'API_KEY_MISSING' });
  }

  try {
    if (provider === 'OPENAI') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are Moda OS assistant.' },
            ...messages,
            { role: 'user', content: userInput }
          ]
        })
      });

      if (!response.ok) throw new Error(`OpenAI error: ${response.status}`);
      const json = await response.json();
      const text = json.choices?.[0]?.message?.content || '';
      return res.status(200).json({ text });
    }

    // Default: Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          ...messages.map((m: any) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: userInput }] }
        ],
        systemInstruction: 'You are Moda OS assistant.'
      })
    });

    if (!response.ok) throw new Error(`Gemini error: ${response.status}`);
    const json = await response.json();
    const text = json.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('') || '';
    return res.status(200).json({ text });
  } catch (err: any) {
    console.error('AI proxy error:', err);
    return res.status(500).json({ error: err.message || 'INTERNAL_ERROR' });
  }
}

async function readJson(req: VercelRequest) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch (e) {
    return {};
  }
}
