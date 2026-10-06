# IQTag.online — Domain For Sale Landing Page 🧠⚡

Aapke **IQTag.online** domain ke liye ek premium, fully-interactive "domain for sale" landing page. Single `index.html` file hai — koi framework nahi, koi build step nahi. Bas upload karo aur live.

## ✨ Isme kya-kya hai

| Feature | Kya karta hai |
|---|---|
| 🌌 Animated background | Mouse ko follow karne wala particle-constellation effect |
| 🏷️ Floating tags | `#smart`, `#brainy`, `#quiz` tags jo hero ke around float karte hain |
| ⌨️ Typewriter | Hero mein rotating taglines |
| 🧲 3D tilt | Domain name mouse ke saath gently tilt hota hai |
| ⚡ **IQ Spark quiz** | **AI-powered** — OpenRouter se har baar 5 naye questions (fresh set), points, speed bonus, 🔥 streak bonus, critical-timer pulse, AI verdict, confetti aur Share Score. AI na chale to 18-question classic pool auto-fallback |
| 📊 Animated counters & scroll reveals | Sections smoothly fade-in hote hain |
| ✉️ Offer form | Email (mailto) + WhatsApp dono se offer bhej sakte hain |
| 💰 Buy Now price | Optional fixed price badge |
| 🧠 **SVG logo** | Original IQTag mark — nav, hero, footer aur favicon sab mein (pixel-dissolve "tag scan" concept) |
| 🖼️ Brand in Action | App icon, browser tab aur phone-screen mockups — buyers brand ko apni aankhon se dekhte hain |
| 💬 Floating WhatsApp button | Corner mein hamesha visible chat button (CONFIG.whatsapp daalte hi activate) |
| 🔍 SEO schema | JSON-LD structured data (WebSite + Product/Offer + FAQPage) — Google rich results ke liye |
| 📱 Fully responsive | Mobile, tablet, desktop sab pe perfect |

## 🔧 Publish se PEHLE: apna contact daalo (zaroori!)

`index.html` kholo aur sabse neeche `<script>` mein `CONFIG` dhundo:

```js
const CONFIG = {
  email: "youremail@example.com",   // 👈 apna email daalo
  whatsapp: "",                     // 👈 e.g. "919876543210" (91 = India code, khali = WhatsApp button hidden)
  buyNowPrice: "",                  // 👈 fixed price ho to e.g. "$1,999", warna khali chhodo
  aiKey: "sk-or-v1-…",              // 👈 OpenRouter key (AI quiz ke liye) — already set hai
  aiModels: [...],                  // 👈 free models ki chain, order me try hote hain
  aiQuestions: 5,                   // 👈 kitne AI questions har round me
};
```

- **email** — isi par offers aayenge (form mailto: link kholta hai).
- **whatsapp** — daala to "Send via WhatsApp" button dikhega.
- **buyNowPrice** — daala to hero ke neeche "Buy It Now" pill dikhega.
- **aiKey** — AI quiz isi key se chalta hai. ⚠️ **Zaroori**: ye key browser code me publicly visible hoti hai, isliye [openrouter.ai/keys](https://openrouter.ai/keys) par is key ke liye **credit limit** laga do. Filhaal free models (`:free`) use ho rahe hain — 50 requests/day limit, koi paisa nahi katega. AI busy ho to quiz khud 18-question classic pool par chalta rehta hai, kabhi break nahi hota.

## 🚀 Live kaise kare (3 options)

### Option A — Netlify Drop (sabse aasan, 2 minute)
1. [app.netlify.com/drop](https://app.netlify.com/drop) kholo (free account banao)
2. Poora folder (ya sirf `index.html`) drag & drop kar do
3. Site settings → **Domain management** → **Add custom domain** → `iqtag.online` daalo
4. Jahan se domain buy kiya (GoDaddy/Namecheap/Hostinger), wahan DNS mein Netlify ke bataye records add karo — usually 2 records: `A` → `75.2.60.5` aur CNAME. Netlify exact values dikhata hai.

### Option B — Vercel
1. [vercel.com](https://vercel.com) → New Project → folder upload/import karo
2. Deploy hone ke baad Project → Domains → `iqtag.online` add karo → registrar mein DNS records set karo

### Option C — GitHub Pages (free)
1. GitHub par naya repo banao, `index.html` push karo
2. Repo → Settings → Pages → Branch: `main` select karo
3. Custom domain mein `iqtag.online` daalo + registrar mein CNAME record (`www` ya apex per GitHub ke instructions)

> DNS change 10 minute – 24 ghante mein propagate hota hai. SSL/HTTPS host khud de deta hai (Netlify/Vercel/GitHub sab free SSL dete hain).

## 🧪 Local test karna ho to

```bash
cd iqtag.online        # ya jahan folder hai
python3 -m http.server 8000
```
Fir browser mein kholo: http://localhost:8000

## 🎨 Aur customize karna ho to

- **Quiz ke sawaal badalna ho** → `<script>` mein `STATIC_POOL` array edit karo (ye fallback pool hai — AI questions har baar khud banate hain).
- **Timer badalna ho** → `TIME_PER_Q = 15` ko change karo.
- **Rang badalna ho** → CSS mein `:root` ke variables (`--c1`, `--c2`, `--c3`) aur logo gradient (`iqtag-grad`).
- **Logo** → `<body>` ke shuru mein `<g id="iqtag-mark">` hai — tiles aur pixels wahan edit karo; favicon alag se `<link rel="icon">` mein hai (dono mein same changes rakho).
- **Text/copy** → HTML sections seedhe edit kar sakte ho, sab semantic hai.

## 💡 Sales tip

Page par price khali hai — ye "open to offers" strategy best hai. Buyer jitna interested, utni offer aati hai. Agar fixed price chahiye to `CONFIG.buyNowPrice` mein daal do. Offers ko **Escrow.com** se close karo — buyer ko trust milta hai aur fraud ka risk zero hota hai.
