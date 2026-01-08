import 'dotenv/config';
import OpenAI from 'openai';

async function main() {
  const key = process.env.AI_GATEWAY_API_KEY || process.env.OPENAI_API_KEY;
  if (!key) {
    console.error('Missing API key. Set AI_GATEWAY_API_KEY or OPENAI_API_KEY in .env');
    process.exit(1);
  }

  const client = new OpenAI({ apiKey: key });

  // Use the Responses API (non-streaming) for compatibility across SDK versions.
  const res = await client.responses.create({
    model: 'gpt-4.1',
    input: 'Invent a new holiday and describe its traditions.',
  });

  // Collect text from response outputs
  let out = '';
  if (Array.isArray(res.output)) {
    for (const item of res.output) {
      if (item.content) {
        for (const c of item.content) {
          if (c.type === 'output_text' && typeof c.text === 'string') out += c.text;
        }
      }
    }
  } else if (res.output?.[0]?.content?.[0]?.text) {
    out = res.output[0].content[0].text;
  }

  console.log(out.trim());
  // Print some usage/metadata if available
  try {
    // new SDK may include token usage under `usage` or `meta`
    // we print whatever we find for debugging
    if ((res as any).usage) console.log('Token usage:', (res as any).usage);
    if ((res as any).finish_reason) console.log('Finish reason:', (res as any).finish_reason);
  } catch (e) {
    // ignore
  }
}

main().catch(console.error);
