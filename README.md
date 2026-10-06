# IQTag.online — Domain For Sale Landing Page 🧠⚡

A premium, fully interactive "domain for sale" landing page built for **IQTag.online**. Everything lives in a single `index.html` — no frameworks, no build step. Upload it and you're live.

---

## ✨ Features

| Feature | What it does |
|---|---|
| 🌌 Animated background | Particle-constellation effect that follows the mouse |
| 🏷️ Floating tags | `#smart`, `#brainy`, `#quiz` tags drifting around the hero |
| ⌨️ Typewriter | Rotating taglines in the hero |
| 🧲 3D tilt | The domain name tilts gently with the mouse |
| 🪄 **Logo swap animation** | The logo snaps into dust, arcs between the hero and the header as you scroll, and rebuilds itself at its destination |
| ⚡ **IQ Spark quiz** | **AI-powered** — 5 fresh questions per round via OpenRouter, points, speed bonus, 🔥 streak bonus, critical-timer pulse, AI verdict, confetti and Share Score. If the AI is unavailable, an 18-question classic pool takes over automatically |
| 📊 Counters & scroll reveals | Stat counters and sections fade in smoothly |
| ✉️ Offer form | Send an offer via Email (mailto) or WhatsApp |
| 💰 Buy Now price | Optional fixed-price badge |
| 🧠 **SVG logo** | Original IQTag mark used in the nav, hero, footer and favicon (pixel-dissolve "tag scan" concept) |
| 🖼️ Brand in Action | App icon, browser tab and phone-screen mockups — buyers see the brand in context |
| 💬 Floating WhatsApp button | Always-visible chat button in the corner (activates once `CONFIG.whatsapp` is set) |
| 🔍 SEO schema | JSON-LD structured data (WebSite + Product/Offer + FAQPage) for Google rich results |
| 📱 Fully responsive | Looks right on mobile, tablet and desktop |

---

## 🔧 Before publishing: add your contact details (required!)

Open `index.html` and find the `CONFIG` block near the bottom of the `<script>`:

```js
const CONFIG = {
  email: "youremail@example.com",   // 👈 your email address (where offers will arrive)
  whatsapp: "",                     // 👈 e.g. "919876543210" (country code + number; empty = WhatsApp button hidden)
  buyNowPrice: "",                  // 👈 fixed price, e.g. "$1,999" (empty = no buy-now badge)
  aiProxy: "/.netlify/functions/quiz", // 👈 secure AI mode — the key lives in a Netlify env var (see below)
  aiKey: "",                        // 👈 LOCAL TESTING ONLY — leave empty in production
  aiModels: [...],                  // 👈 chain of free models (the server tries them in order)
  aiQuestions: 5,                   // 👈 how many AI questions to generate per round
};
```

- **email** — offers arrive here (the form opens a `mailto:` link).
- **whatsapp** — setting it activates both the floating WhatsApp button and the form's WhatsApp button.
- **buyNowPrice** — setting it shows a "Buy It Now" pill under the hero.

---

## 🔐 AI key security (important)

**The OpenRouter key is never in the code** — by design. On a static site, anyone can steal a key from view-source.

**GitHub Secrets do NOT solve this** — they only work inside GitHub Actions (CI/CD scripts). A static website cannot read them. Build-time injection doesn't help either: the key would still end up visible in the final HTML.

**The right way — the Netlify Function proxy (already included):**
- `netlify/functions/quiz.mjs` forwards the browser's request to OpenRouter
- The key lives in **Netlify's Environment Variables** — never in the repo, never in the code
- Includes a per-IP rate limit (30 requests/hour) to prevent abuse
- If the AI is down or out of quota, the quiz automatically falls back to the 18-question classic pool — it never breaks

**Setup (2 minutes):**
1. Push the repo to GitHub (no key to worry about — it isn't in the code)
2. Netlify → **Add new site → Import an existing project** → select your GitHub repo (Netlify reads `netlify.toml` automatically)
3. Netlify → **Site configuration → Environment variables → Add a variable**:
   - Key: `OPENROUTER_KEY`
   - Value: `sk-or-v1-...` (your OpenRouter key)
4. Deploy → the AI quiz is live! 🎉

> Note: "Netlify Drop" (drag & drop) does not support functions — use the Git-based deploy (step 2). The free models (`:free`) currently allow 50 requests/day at no cost; when the quota runs out, the quiz falls back to the classic pool.

> Need the AI while testing locally? Temporarily put a key in `CONFIG.aiKey` (calls OpenRouter directly alongside the Python server) — remove it before committing.

---

## 🚀 Going live (3 options)

> 💡 **Want the AI quiz? Use Option B (GitHub + Netlify)** — Netlify Drop only deploys static files, so the AI function won't deploy. The quiz still works on the classic pool, but without AI-generated questions.

### Option A — Netlify Drop (easiest, 2 minutes)
1. Open [app.netlify.com/drop](https://app.netlify.com/drop) (create a free account)
2. Drag & drop the whole folder (or just `index.html`)
3. Site settings → **Domain management** → **Add custom domain** → enter `iqtag.online`
4. At your registrar (GoDaddy/Namecheap/Hostinger), add the DNS records Netlify shows — usually an `A` record → `75.2.60.5` plus a CNAME. Netlify displays the exact values.

### Option B — Vercel
1. [vercel.com](https://vercel.com) → New Project → upload/import the folder
2. After deploy: Project → Domains → add `iqtag.online` → set the DNS records at your registrar

### Option C — GitHub Pages (free)
1. Create a new GitHub repo and push `index.html`
2. Repo → Settings → Pages → Branch: `main`
3. Add `iqtag.online` as the custom domain + a CNAME record at your registrar (follow GitHub's instructions for `www` or apex)

> DNS changes propagate within 10 minutes – 24 hours. SSL/HTTPS is handled by the host (Netlify, Vercel and GitHub all provide it free).

---

## 🧪 Local testing

```bash
cd iqtag.online        # or wherever the folder is
python3 -m http.server 8000
```
Then open http://localhost:8000

---

## 🎨 Customization

- **Quiz questions** → edit the `STATIC_POOL` array inside the `<script>` (this is the fallback pool — AI questions are generated fresh each round).
- **Timer** → change `TIME_PER_Q = 15`.
- **Colors** → edit the `:root` CSS variables (`--c1`, `--c2`, `--c3`) and the logo gradient (`iqtag-grad`).
- **Logo** → the `<g id="iqtag-mark">` definition at the top of `<body>` holds the tiles and pixels; the favicon lives separately in `<link rel="icon">` (keep both in sync).
- **Text/copy** → edit the HTML sections directly; everything is semantic.

### Ready-made brand assets
- `iqtag-logo-fixed.svg` — master logo artwork (1024×1024, dark rounded-square app-icon background)
- `iqtag-logo-fixed.png` — rendered from the SVG above
- `iqtag-logo.png` — 1024×1024 logo with a transparent background
- `iqtag-logo-whatsapp.png` — 1024×1024 logo on a dark rounded square, sized for a WhatsApp profile picture

---

## 💡 Sales tip

The price is intentionally left open — "open to offers" consistently attracts better bids from interested buyers. If you prefer a fixed price, set `CONFIG.buyNowPrice`. Close offers through **Escrow.com** — it gives buyers confidence and removes fraud risk.
