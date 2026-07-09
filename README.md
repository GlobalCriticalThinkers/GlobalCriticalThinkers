# Global Critical Thinkers — website

A single-page, scroll-driven cinematic story site for Global Critical Thinkers (GCT), built for GitHub Pages. No build step, no dependencies beyond two Google Fonts.

---

## 1. Deploying to GitHub Pages

1. Push this folder's contents to the root of your repository (or to a `/docs` folder, your choice, just update the Pages source setting to match).
2. In your repo: **Settings → Pages → Source**, choose the branch and folder you pushed to.
3. GitHub will give you a live URL, usually `https://<username>.github.io/<repo-name>/`. It can take a minute or two to go live after the first push.
4. Every time you push a change to that branch, the live site updates automatically. No rebuild step needed, it's plain HTML/CSS/JS.

---

## 2. Replacing the placeholder images

The eight scenes use these image files, all in `/images`:

| File | Used in | Shot needed |
|---|---|---|
| `logo.png` | Header, footer | Square logo, transparent background |
| `hero.jpg` | Scene 1, Arrival | Full team, wide shot |
| `gambar1.jpg` | Scene 2, Mission (also reused in Scene 7, Achievement) | Full team receiving the case |
| `gambar2.jpg` | Scene 3, Discussion | Full team collaborating |
| `gambar3.jpg` | Scene 4, Analysis | Analyst role foregrounded |
| `gambar4.jpg` | Scene 4, Analysis | Financial Analyst role foregrounded |
| `gambar5.jpg` | Scene 5, Presentation | Presenter (Team Leader) foregrounded |
| `gambar6.jpg` | Scene 6, Defense | Full team fielding questions |

To swap an image: just replace the file with the same filename and same rough aspect ratio, no HTML editing needed. If you want to use a different filename, update the matching `src="images/..."` in `index.html` and update the `alt` text to describe the new image accurately (this matters for accessibility and SEO, don't leave it blank).

Recommended: export images as `.jpg` at roughly 1920px wide, compressed for web (under ~300KB each) to keep load times fast. `.webp` works too if you'd rather use it, just update the file extension in the `src` attributes.

---

## 3. Updating copy, pricing, and registration details without touching the layout

All placeholder content lives in `index.html` and is wrapped in double brackets so it's easy to find with a search:

| Placeholder | Where | What to put there |
|---|---|---|
| `[[PRIZE_PLACEHOLDER]]` | Scene 7, Achievement | The prize/outcome line, e.g. "Winners take home Rp 15,000,000 and a fast-track interview with our partner firms." |
| `[[PRICE_PLACEHOLDER]]` | Scene 8, Registration | Ticket price, e.g. "Rp 350,000 / team" |
| `[[EARLY_BIRD_DEADLINE_PLACEHOLDER]]` | Scene 8, Registration | Early bird cutoff, e.g. "Before 1 August — Rp 275,000" |
| `[[REGISTRATION_DEADLINE_PLACEHOLDER]]` | Scene 8, Registration | Final registration cutoff date |
| `[[SEATS_REMAINING_PLACEHOLDER]]` | Scene 8, Registration | Urgency line, e.g. "12 of 40 teams remaining" |
| `[[CTA_LABEL_PLACEHOLDER]]` | Scene 8, Registration button | Button text, e.g. "Register your team" |
| `[[REGISTRATION_LINK_PLACEHOLDER]]` | Scene 8, Registration button `href` | The actual signup URL (Google Form, WhatsApp link, etc.) |
| `[[CONTACT_LINK_PLACEHOLDER]]` | Footer | Contact link, e.g. `mailto:hello@globalcriticalthinkers.com` |
| `[[INSTAGRAM_LINK_PLACEHOLDER]]` | Footer | Instagram profile URL |

**To edit:** open `index.html`, use your editor's find function (Ctrl/Cmd+F) to search for `[[`, and replace each placeholder with real content. Because every placeholder is already styled as if it were final copy (same font size, weight, and spacing as everything around it), swapping the text will never shift the layout or break the design. You do not need to touch `style.css` for any of this.

---

## 4. File structure

```
/
├── index.html          All page content and structure (semantic HTML5)
├── css/
│   └── style.css        All styling, organized into numbered sections with comments
├── js/
│   └── script.js         Scroll progress, header state, scene reveal animation, footer year
├── images/               All photography and the logo (see table above)
└── README.md             This file
```

---

## 5. Design notes

- **Colors:** Navy (`#0B1220`, `#070B14`) and gold (`#C9A24B`, `#E8CB86`), matching the GCT brand identity used across the pitch deck.
- **Typefaces:** Fraunces (headlines, editorial serif) and Montserrat (body text and UI, matches the existing GCT PowerPoint deck).
- **Motion:** Nearly everything animates with pure CSS (hover states, the floating scroll cue, the scene reveal transition, the CTA button lift). JavaScript is only used for the three things CSS cannot do on its own: filling the scroll progress thread, toggling the header's background on scroll, and triggering the reveal animation via IntersectionObserver when a scene enters the viewport.
- **Reduced motion:** If a visitor has "reduce motion" set at the OS level, all animation is disabled and content displays immediately at full opacity, no flicker, no reliance on JS timing.
- **Accessibility:** Semantic landmarks (`header`, `main`, `footer`), one `h1` on the page with `h2` per scene, all images have descriptive alt text, visible focus rings on every interactive element, a skip-to-content link for keyboard users.

---

## 6. Performance

- Images are the heaviest asset on this site. Compress them before uploading (see section 2). The hero image loads eagerly (`loading="eager"`) since it's above the fold; every other scene image is lazy-loaded (`loading="lazy"`).
- Fonts are loaded via `<link rel="preconnect">` to Google Fonts to minimize connection latency, and use `display=swap` so text renders immediately in a fallback font while the custom fonts load.
- No JavaScript frameworks, no build step, no external dependencies beyond the two font families. Total JS is under 3KB unminified.
