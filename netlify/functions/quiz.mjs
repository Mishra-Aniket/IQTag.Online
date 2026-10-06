/*
  IQTag.online — OpenRouter proxy (Netlify Function)

  The AI key never reaches the browser. It lives only in the Netlify
  dashboard environment variable (OPENROUTER_KEY).

  Setup:
    1. Netlify → Site configuration → Environment variables → OPENROUTER_KEY
    2. Deploy. The client calls this function at /.netlify/functions/quiz.

  Abuse protection: per-IP rate limit (RATE_LIMIT/hour) + max_tokens cap.
*/

const UPSTREAM = "https://openrouter.ai/api/v1/chat/completions";

const DEFAULT_MODELS = [
  "inclusionai/ling-3.0-flash-sante:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "apodex/apodex-1.1-mini:free",
];

const PER_MODEL_TIMEOUT = 15000; // ms — per model
const RATE_LIMIT = 30;           // requests per hour per IP

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const hits = new Map(); // ip -> { count, reset }
function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + 3600000 });
    return false;
  }
  rec.count += 1;
  return rec.count > RATE_LIMIT;
}

const json = (status, obj) => ({
  statusCode: status,
  headers: { ...CORS, "Content-Type": "application/json" },
  body: JSON.stringify(obj),
});

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS };
  if (event.httpMethod !== "POST") return json(405, { error: "POST only" });

  const ip =
    event.headers["x-nf-client-connection-ip"] ||
    event.headers["client-ip"] ||
    "anon";
  if (rateLimited(ip)) return json(429, { error: "Slow down — try again later." });

  const key = process.env.OPENROUTER_KEY;
  if (!key) return json(500, { error: "OPENROUTER_KEY env var not set in Netlify" });

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON" });
  }
  if (!Array.isArray(body.messages) || !body.messages.length) {
    return json(400, { error: "messages required" });
  }

  const maxTokens = Math.min(Number(body.max_tokens) || 1200, 3000);
  const models =
    Array.isArray(body.models) && body.models.length
      ? body.models.slice(0, 3)
      : DEFAULT_MODELS;

  for (const model of models) {
    try {
      const res = await fetch(UPSTREAM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + key,
          "HTTP-Referer": "https://iqtag.online",
          "X-Title": "IQTag.online IQ Spark",
        },
        body: JSON.stringify({
          model,
          messages: body.messages,
          temperature: 1.15,
          max_tokens: maxTokens,
        }),
        signal: AbortSignal.timeout(PER_MODEL_TIMEOUT),
      });
      if (!res.ok) continue;
      const data = await res.json();
      const content =
        data && data.choices && data.choices[0] && data.choices[0].message
          ? data.choices[0].message.content
          : "";
      if (content) return json(200, { content });
    } catch (e) {
      /* next model */
    }
  }
  return json(502, { error: "All models failed right now" });
};
