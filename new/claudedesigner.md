# CLAUDE.md — Designer Portfolio Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- This is a **designer's portfolio** — the site itself must feel like a piece of design work. If it looks generic, start over.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server (Optional)
- User can double-click the HTML file to open in browser – no server required.
- If user requests live reload, use `npx serve .` or `python -m http.server 8000`.
- Default to no server unless user asks.

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/Abdul/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/Abdul/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing.
- If a logo, color palette, or style guide exists — use it exactly. Do not invent brand colors when real ones are provided.

---

## Animation & Transition Philosophy

This is the most important section. Read it carefully before writing a single line of animation code.

### The Golden Rule
**Transitions exist to guide attention and communicate meaning — not to show off.**
Every animation must have a reason. If you can't explain why something animates, remove it.

### Where Transitions BELONG (use these)

- **Page load / Hero entrance:** Staggered fade-up on the hero text and CTA. One clean entrance sequence. This sets the tone for the whole site.
- **Scroll reveals:** Elements fade or slide in as they enter the viewport. Use `IntersectionObserver`. Subtle — 20–30px upward translate + opacity 0→1. Not dramatic.
- **Project card hover:** Scale up slightly (`scale(1.02–1.03)`), lift with a soft shadow increase. The image inside can scale a touch more (`scale(1.05)`). Smooth, satisfying.
- **Navigation:** Underline or indicator slides to the active link. Menu open/close has a clean ease.
- **Button hover:** Subtle background shift or slight scale. Give tactile feedback.
- **Cursor (optional):** A custom cursor that reacts to hoverable elements — enlarges or changes shape. Only if it fits the aesthetic.
- **Image loading:** Fade in images as they load to avoid jarring pops.
- **Section transitions (scroll-linked):** Parallax on hero background only. Keep it mild (0.3–0.5 speed ratio). Do not parallax everything.

### Where Transitions DO NOT BELONG (never use these)

- Do NOT animate every element on the page. Constant motion is exhausting.
- Do NOT use `transition-all` — ever. Target specific properties only.
- Do NOT loop animations on static content (spinning logos, pulsing text, floating elements). These feel cheap.
- Do NOT animate layout-affecting properties like `width`, `height`, `margin`, `padding` — causes reflow jank. Use `transform` and `opacity` only.
- Do NOT use bounce or elastic easings on professional portfolio elements. Use `cubic-bezier` or `ease-out`.
- Do NOT make scroll reveals dramatic (large distances, slow timing). Keep them quick: 300–500ms, 20–30px max movement.
- Do NOT add hover animations to non-interactive elements.

### Timing Guidelines
- Micro-interactions (button hover, link hover): `150–200ms`
- Card hovers: `250–300ms`
- Scroll reveals: `400–500ms`, `ease-out`
- Page load sequence: stagger children by `80–120ms` each
- Never go over `600ms` unless it's a deliberate cinematic hero moment

### Easing
- Default: `cubic-bezier(0.16, 1, 0.3, 1)` — fast start, smooth land
- Hover states: `ease-out`
- Never use `linear` for UI animations
- Never use default `ease` or `ease-in-out` for reveals — too symmetrical, feels cheap

---

## Designer Portfolio — Required Sections (in order)

Build a **single page** website with these sections:

1. **Hero Section**
   - Designer's name (large, typographic statement)
   - One-line role: e.g. "UI/UX Designer & Visual Storyteller"
   - Short bio or tagline (1–2 sentences max)
   - CTA: "View My Work" (scrolls to projects) + "Get In Touch" (scrolls to contact)
   - **Animation:** Staggered entrance — name first, role second, bio third, CTAs last. Each 100ms apart. Fade up from 30px below.

2. **Selected Work / Projects Section**
   - Grid of project cards (2 columns desktop, 1 column mobile)
   - Each card: project image, project name, category tag, short description
   - Check `brand_assets/` or `projects/` folder for real project images — use them if available
   - **Animation:** Cards reveal on scroll via IntersectionObserver. Stagger each card 80ms apart.
   - **Hover:** Card lifts with shadow, image scales to 1.04, smooth 280ms ease-out

3. **About Section**
   - Photo or illustrated portrait (left) + bio text (right) on desktop, stacked on mobile
   - 2–3 short paragraphs about the designer
   - Skills/tools listed cleanly (not a progress bar — those are meaningless)
   - **Animation:** Photo and text fade in from opposite sides on scroll

4. **Services or Expertise Section** (optional — include if user provides content)
   - 3–4 cards describing what the designer offers
   - Icon + title + short description per card
   - **Animation:** Scroll reveal, staggered

5. **Contact Section**
   - Clean contact form: Name, Email, Message, Submit
   - Email address displayed
   - Social links (Behance, Dribbble, LinkedIn, Instagram — placeholder URLs)
   - **Animation:** Form fades in on scroll. Submit button has satisfying hover state.

6. **Footer**
   - Name + role
   - Social icons
   - Copyright: "© 2026 [Designer Name]. All rights reserved."

---

## Visual Design Guardrails

- **Typography:** Use ONE distinctive display font for headings (from Google Fonts — e.g. Playfair Display, DM Serif Display, Syne, Cormorant, Cabinet Grotesk). Pair with a clean readable body font. No Inter, no Roboto.
- **Color:** Commit to a real palette. Dark mode or light mode — pick one and execute it fully. Use CSS variables for all colors.
- **Spacing:** Generous whitespace. Let the work breathe. Sections need room.
- **Layout:** Asymmetry is allowed and encouraged. Not everything needs to be centered.
- **Shadows:** Soft, layered — `box-shadow: 0 8px 32px rgba(0,0,0,0.08)`. Nothing dramatic or neon.
- **Images:** Clean, no gradient overlays unless it's part of a deliberate design choice.
- **Cards:** `border-radius: 12px`. Consistent across all cards.
- **Max width:** 1280px, centered, `mx-auto`
- **Mobile padding:** 16px sides. Desktop: 48–64px sides.

---

## Hard Rules

- Do NOT add sections not listed above unless the user asks
- Do NOT use `transition-all` — ever
- Do NOT loop or auto-play animations on static content
- Do NOT use purple gradients on white — it's the most overused AI aesthetic
- Do NOT use default Tailwind blue/indigo as the primary color
- Do NOT make the site look like a template — it should feel custom and intentional
- Do at least 2 screenshot comparison rounds before considering it done
- The site must feel like it was made by a designer, not generated by an AI
