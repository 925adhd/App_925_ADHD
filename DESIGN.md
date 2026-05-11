# DESIGN.md

This is the design law for the 925-ADHD site. Read it before changing layout, typography, color, components, copy, or section structure. If a change conflicts with these rules, the rules win unless Kara explicitly overrides them.

The site exists for ADHD users trying to make side money without getting wrecked by decision fatigue, screen-out scams, or AI marketing fluff. Every page should read like a friend who actually tried this stuff and is telling you the honest truth. Default Claude/V0/Lovable instincts will pull toward generic SaaS dashboard energy — override them on purpose.

---

## 1. Overall Design Direction

**Tagline for the design: "ADHD-skimmable. Honest. Anti-marketing."**

If the site feels:
- Like a SaaS dashboard with 4-up KPI cards → wrong
- Like a "$10K/month side hustle bro" landing page → wrong
- Like a marketing funnel ("limited time", "join 10,000+ earners") → wrong
- Like a friend's notes app where they kept track of what actually paid → bullseye
- Like a quiet reference guide that's been spot-checked by someone who hates getting scammed → also bullseye

**Operating mood:** dark mode by default, mint accent (`#4daa98` / `var(--brand)`), specific numbers over vague claims, honest tradeoffs in every panel, no faked dopamine.

---

## 2. Anti-AI Tells (Hard Bans)

These are non-negotiable. If a section starts to drift toward any of these, redo it.

### Copy tells
- **Em dashes as default punctuation.** Use periods, commas, or parentheses. The whole `gigData.ts` rewrite cleared 1,253 em dashes — don't reintroduce them.
- **"X, not Y" antithesis.** Bans: "X, not Y," "more X than Y," "X over Y," "we do X, we don't do Y." One per page max. Zero is better.
- **Rhetorical tricolons.** Three short clauses for cadence ("Tasks are short. Pay is real. Cashout is fast.") = AI tell. Enumeration of three real things (e.g. "PayPal, Venmo, or gift cards") is fine — that's a list.
- **Anaphora.** Three sentences in a row starting with the same word. Especially "We" or "Your brain".
- **Buzzwords (closed list, do not break):** *cutting-edge, premium, professional-grade, world-class, robust, comprehensive, holistic, seamless, frictionless, scalable, end-to-end, turnkey, mission-critical, leverage, empower, transform, elevate, unleash, optimize, streamline, deliver (verb), solutions, ecosystem, journey, experience (marketing noun).*
- **Motivational fluff.** "Celebrate each one (even a mental high-five)", "Notice the psychological shift into 'work mode'", "for instant dopamine", "you've got this!", "the perfect side hustle." If a line sounds like a YouTube thumbnail, cut it.
- **Vanity metrics.** "10,000+ users tried this," "1M+ happy hustlers." If it's not load-bearing for a decision, kill it.

### Layout tells
- **No 4-up KPI strip** ("Total Earnings / Hacks Tried / Streaks / Badges"). One real metric with context is fine. Four totals is the textbook AI dashboard giveaway.
- **No identical-feeling sections stacked.** Every section needs a different rhythm — different background, different alignment, different list density. If two adjacent panels both feel heavy, redesign one.
- **No drop-shadow elevation on cards.** 1px border on a tinted background, no shadows.
- **No multi-stop gradients on backgrounds, buttons, or text.** Solid fills only. We already killed `linear-gradient(135deg, …)` on the quick-tip box for this reason.
- **No identical card grids 12 deep.** If the list is that long, it's a list page (browse), not a stack of feature cards.

### Component tells
- **No marketing pill badges with tinted backgrounds for status.** "Staff pick" used to be a pink pill — now it's just bold mint uppercase text. Same for any future status label.
- **No emoji as decoration.** See §6 for the full rule.
- **No "🎉 Try this for a week!" gamified-button traps.** See §11.
- **No drop-down accordions on detail pages.** See §7.

### Motion tells
- **No bouncy spring animations.** Default ease only.
- **No animated counters or progress bars** for fake-progress data.
- **No staggered word-by-word text reveal.**

---

## 3. Color and Brand

The brand is dark mode with a mint accent. Don't fight it.

| Token | Use |
|---|---|
| `var(--brand)` / `#4daa98` | Primary accent. Section labels, links, CTAs, hover states. |
| `#56bfaa` | Hover state for `--brand`. |
| `#a78bfa` (purple) | "Best for you if…" panel and persona-filter accents only. Don't use as a second brand color. |
| `#f472b6` (pink) | Staff-pick label only. |
| `rgba(255,255,255,0.92)` body / `rgba(255,255,255,0.78)` headings | Dark mode text. |
| `var(--card)` / `rgba(86,195,174,0.06)` | Card and panel backgrounds. |
| `var(--border)` | Hairline 1px borders on cards. |

Banned: blue, indigo, neon green, hot pink, candy colors. Any Tailwind default `text-red-500` / `bg-blue-600` slipping into a component = bug, replace with brand tokens.

---

## 4. Typography

- **Body text:** never below 15px on mobile, 16px on desktop.
- **Snap labels / section anchors:** mint, uppercase, weight 800, letter-spacing 0.6px. (`.snap-label` is the canonical pattern.)
- **Section titles (h2):** weight 700, no tracking adjustments.
- **Body line-height:** 1.5–1.65. Tight enough to skim, loose enough to read.

When a label feels like it's "blending in," the fix is usually **color and weight**, not adding emoji. (See the snap-label bump from muted gray to mint accent in `GigDetail.css`.)

---

## 5. Section Rhythm

DESIGN.md §5 echo: every section gets a job, and adjacent sections shouldn't feel the same.

### Detail page rhythm (`/gig-detail`)

1. **Hero** — logo + name + rate + one-line desc + CTA. Heavy.
2. **Quick Breakdown** — 2 mint-accented snap blocks side-by-side on desktop. Medium.
3. **Filter row** (paired on desktop):
   - **Best for you if…** — purple-tinted panel with persona bullets. Medium.
   - **Why It's ADHD-Friendly** — mint left-stripe checkmark list, no card bg. Light.
4. **Payout Info** — key/value table. Medium, structured.
5. **Pros / Cons** — side-by-side cards. Medium, paired.
6. **Final Take** — prose verdict in `.section-alt`. Light.
7. **CTA** — sticky bottom (mobile) or in hero (desktop).

If you add a section, ask: "Does it have a different visual feel from the one above it?" If no, redesign or merge.

### List page rhythm (`/earn`, `/adhd-hacks`)

- One repeating card pattern is fine here — that's what a list page IS.
- Stagger by **category groupings** or **filter chips**, not by visually-different cards.
- Staff picks / favorites use **text emphasis** (bold mint), not panel backgrounds (no pink pill).

---

## 6. Emoji Rules

ADHD users like *some* personality. The rule is "no decoration that duplicates the label."

| Use case | Verdict |
|---|---|
| ❤️ / 🤍 favorite toggle | ✅ Functional UI |
| Section header icons (🧠 ADHD-Friendly, 💸 Payout, 🔥 Final Take, 👍/⚠️ Pros/Cons) | ✅ Status/category indicator, label still carries meaning |
| Hero category tags (😴 Passive, 🎁 Gift Cards, 🚗 Delivery, 🏃 Fitness, ⚡ Microgig) | ✅ Brand personality on category labels |
| 👉 leading every "Best for you if" row | ❌ Decoration. Killed. |
| ⏱️ next to "5 min setup" | ❌ Duplicates the label ("setup" already implies time). Killed. |
| 🔁 next to "Daily habit" | ❌ Duplicates the label. Killed. |
| 💰 next to "The pay" snap label | ❌ Textbook violation. Killed (along with the whole "The pay" block — see §7). |
| 🧪 leading a progress bar | ❌ Decoration. Killed. |
| Random rotating icons on bullets (⏱️🕹️🎯👀🔄) | ❌ Means nothing. Killed. |
| 💡 leading a tip box | ❌ "ADHD rule:" label already conveys it. Killed. |

When in doubt: would removing the emoji change what the user understands? If no, cut it.

---

## 7. Content Hiding

**The rule isn't "no dropdowns ever." It's "no hidden content on detail pages."**

| Page type | Rule | Why |
|---|---|---|
| **Detail page** (`/gig-detail`) | Show everything. No "Show more ↓", no `CollapsibleList`, no `.slice(0, 4)` caps. | User is committed to learning about ONE thing. |
| **Browse page** (`/adhd-hacks`, `/earn`) | Collapse detail behind a click. | User is scanning to pick ONE thing. Showing 12 × 5 steps = wall of text. |

If a list of bullets feels long on a detail page, **shorten the data** (cap at 3) — don't hide them behind an expand toggle.

The kill list from the GigDetail refactor:
- "First / Next / Then / Finally" step labels in section headers — gone.
- `CollapsibleList` with "Show 3 more ↓" — replaced with full inline render.
- "Ideal For" tags duplicated at bottom of page after "Best for you if…" already covered it — gone.
- "The pay" snap block — gone (hero rate + Payout table already cover it).
- "What Makes It Stand Out" — merged into Pros.
- "Things to Know" — merged into Cons.
- Bottom CTA subtitle "Takes 2 minutes · No commitment" — gone (lied about most gigs).
- Hardcoded summary strip pills under hero ("⏱ 2-min setup · 🧠 Easy tasks") — gone (lied about most gigs).

If something looks like duplicate content on the page, it probably is. Cut it.

---

## 8. ADHD-Skim Mandate

Every page's content should be skimmable in seconds so an ADHD user can decide *"is this for me?"* without reading prose.

- **Lead with the answer.** Not "There are many ways to earn money online and one of those is..." — open with "Get paid to scan grocery receipts."
- **Bullet over paragraph.** Wherever possible.
- **Numbers and time estimates upfront.** "$3–$5/survey. 4–7 min each." A user shouldn't read a paragraph to find the pay.
- **"Best for / Skip if" framing.** This is the most useful structure for ADHD readers. Bullets must be concrete: *"Best for: people who like quick wins under 5 min"* — not *"Best for: anyone looking for flexible income opportunities."*
- **Honest tradeoffs.** Surface red flags (cashout delays, account freezes, brutal DQ rates, gas eating earnings). Don't market the headline rate when the real net is half.
- **Cap repeating bullets at 3.** `idealFor.slice(0, 3)`, `whyAdhd.slice(0, 3)`. Long lists get scrolled past.

---

## 9. Component Rules

### Cards
- 1px `var(--border)` border, no drop shadow ever.
- Background: `var(--card)` on the dark page, transparent on tinted panels.
- Border radius: `var(--radius-md)` for cards, `var(--radius-card)` for larger panels.
- Hover: border darkens/brightens, **no transform/translate**, no scale. (Active state: minor `scale(0.985)` for tap feedback is OK.)

### Buttons / CTAs
- **Primary CTA**: solid mint fill, white text, `var(--radius-md)`, weight 600, no gradient.
- **Secondary CTA**: text link with mint color + arrow + thin underline border. No background fill.
- **Two CTAs adjacent**: one MUST be visually demoted (text-link, no panel). If both feel equal weight, redesign one.

### Inline lists vs cards
- **Cards** when each item is a self-contained chunk with multiple lines of info.
- **Mint left-border stripe + transparent bg** when items are 1-line bullets. Looks like a real list, not 5 dark pillows.

### Affiliate / monetization
- Demote visually. Quieter than the primary product action.
- Place AFTER the user has experienced the product (e.g. Brain.fm CTA appears below the playable track, not above it).
- Honest framing. "1 month free" or "free trial" — no "exclusive deal" or "limited time."
- Use a thin top divider to separate from the rest of the content, not a tinted panel that competes with the primary action.

### Heart / favorite
- Inline with the title (`display: inline-flex`), not floating in empty whitespace via `flex: 1`.
- Native size, no special tinted background.

---

## 10. Desktop vs Mobile

Mobile is the deciding factor — most users are on phones. But desktop has different needs.

### Card framing
- **Mobile**: skip card framing when content already fills the viewport. The Focus Music player has `background: transparent; border: none` below 768px because a dark-card-on-dark-page rectangle adds nothing useful.
- **Desktop**: card framing earns its keep by constraining content width (`max-width: 750px`) and creating a discrete panel on a wide page.

### Side-by-side panels
- Pair panels that do **complementary jobs** (filter + reasons, pros + cons) on desktop.
- Stack on mobile.
- Equal heights: `align-items: stretch` + `height: 100%` on children.
- Generous gap (40px between, not 20px) — DESIGN.md §5: they shouldn't feel like they're touching.

### Hero on desktop
- Logo + info + right-aligned CTA in a grid. Empty right half is the bug we already fixed.
- Heart icon inline with the title, never floating right with `flex: 1`.

### CTAs across breakpoints
- **Mobile**: top hero CTA hidden, sticky bottom bar always visible.
- **Desktop**: hero CTA prominent, no sticky bar needed.
- Mid-page CTAs (e.g. "Sign up →" inside Best for you if): show on mobile, hide on desktop (`@media (min-width: 900px) { display: none; }`) because the hero CTA is already visible up top.

---

## 11. Gamification

Add gamification ONLY when it measures something real.

| Real measure | Fake measure |
|---|---|
| Actual steps walked (phone tracks) | "Hacks tried" (just a button click, never verified) |
| Streak of consecutive days posted | "Progress bar" filled by clicking |
| Lessons completed in Duolingo | "Achievements unlocked" for opening the app |

The ADHD Hacks "X / 12 hacks tried" progress bar was killed because:
1. It contradicted the page's own advice ("Pick ONE hack, don't try everything") by incentivizing filling the bar.
2. Clicking a button isn't trying anything in real life. It was a fake-dopamine loop.
3. ADHD brains are *specifically* vulnerable to fake-progress traps.

If a future feature wants gamification, the bar to clear is: **what real thing is being tracked, and how do we know?** If the answer is "the user told us by clicking a button," it's vanity tracking. Cut it.

The acceptable alternative: a single "Currently trying" pin that enforces the page's own rule (e.g. one active hack at a time). That's a personal commitment tool, not a progress bar.

---

## 12. Copywriting

The voice on this site is a friend who tried these gigs and is telling you the honest truth. No corporate, no influencer, no coach.

### Reading level: 12-year-old
| Don't | Do |
|---|---|
| utilize | use |
| comprehensive | full |
| optimal | best |
| facilitate | help |
| in order to | to |

### Sentence length
Average under 15 words. If you can't say it out loud in one breath, split it.

### Headlines
- Stateable as fact. "Real pay after gas is $8 to $15/hr." Not "Unlock the future of food delivery."
- One concrete noun. *Pay*, not *opportunity*. *Cashout*, not *experience*.

### CTAs
- Verb first, specific outcome second.
- ✅ "Sign up →" / "Try this now →" / "Get 1 month free →"
- ❌ "Submit" / "Continue" / "Click here" / "Start your journey"

### Honest tradeoff phrasing
Surface the catch. Examples from `gigData.ts`:
- *"DoorDash markets $25/hr but the Gridwise 2025 median is $11.63/hr gross."*
- *"Wag takes 40% of every walk (Rover takes 20%)."*
- *"Real hourly is $1 to $3/hr for English beginners."*

If you can't write the honest line, you don't know the gig well enough yet.

---

## 13. Data Field Conventions

For any list of items (gigs, hacks, gigs in a category), the data should support:

- **`description`** — one-line summary (card hero subtitle). Match exactly what shows on the parent list page (`gigs.ts` `desc` field).
- **`tldr`** — markdown prose with `**Label:** text` snap-block markers. Use labels `What it is` and `Why it's better` or `The catch`. **Do NOT use `The pay`** — it's parsed out and skipped by the snap parser, because the hero rate + Payout Info table already cover it.
- **`idealFor`** — array of 3–5 concrete personas. Component caps display at 3.
- **`whyAdhd`** — array of 3–5 mechanical reasons (specific to the brain). Component caps display at 3.
- **`payout`** — object (not array) rendered as a key/value `<dl>` table. Keys are short labels ("Pay method", "Minimum cashout"), values are facts.
- **`pros`** — array of 5 short bullets, used for the side-by-side pros card.
- **`cons`** — array of 5 short bullets, used for the side-by-side cons card.
- **`finalTake`** — 2–3 sentence prose verdict.

Fields that should NOT exist (we deleted them all):
- ~~`intro`~~ — component never rendered it.
- ~~`taskTypes`~~ — merged into pros / removed.
- ~~`standOut`~~ — merged into pros.
- ~~`importantNotes`~~ — merged into cons.
- ~~`payoutInfo`~~ array form — replaced by `payout` object.

If you're tempted to add a new field, ask first whether it duplicates content already in `tldr`, `pros`, `cons`, `payout`, or `finalTake`.

---

## 14. Final Design Checklist

Before any page or section ships, walk through this:

### Copy
- [ ] Zero em dashes (run `node -e "console.log((require('fs').readFileSync('PATH','utf8').match(/—/g)||[]).length)"`).
- [ ] No "X, not Y" antithesis on the page (max one).
- [ ] No rhetorical tricolons.
- [ ] No banned buzzwords (grep against §2 list).
- [ ] Reading level: a 12-year-old could read it aloud and follow it.
- [ ] Headlines lead with the answer, not the setup.
- [ ] Honest tradeoffs are surfaced, not hidden.

### Structure
- [ ] On a detail page, nothing is hidden behind an accordion.
- [ ] On a list page, accordion is OK if the page is a browser (e.g. ADHD Hacks).
- [ ] Adjacent sections feel visually different (background, density, alignment).
- [ ] Bullets capped at 3 where it makes sense (`idealFor`, `whyAdhd`).
- [ ] No duplicate content between sections.

### Visual
- [ ] No multi-stop gradients.
- [ ] No drop shadows on cards.
- [ ] No pink/blue/indigo (only brand mint + accent purple/pink for specific roles).
- [ ] No emoji that duplicates an adjacent label.
- [ ] Side-by-side panels are equal height with 40px gap on desktop.
- [ ] CTAs: primary is filled, secondary is text-link. Never two filled buttons stacked.

### Mobile
- [ ] Card framing skipped when content already fills the viewport.
- [ ] Tap targets ≥ 44px.
- [ ] Sticky CTA visible without hunting.
- [ ] Mid-page CTAs hide on desktop where the hero CTA already exists.

### Gamification
- [ ] Any "progress" tracking measures something real, not button-clicks.

### The override question
- [ ] Could the page work without any animations, hover effects, or interactivity, printed on paper? If yes, the design has earned its weight. If no, motion is doing work that layout and hierarchy should be doing.

---

## How to use this doc

When making any design change:
1. Read §2 (anti-AI tells) and §8 (ADHD skim mandate) first.
2. Make the change.
3. Walk through §14 before shipping.
4. If a change conflicts with this doc, either revise the change or propose a doc update with justification. Don't silently break the rules.

The discipline in this file is what separates 925-ADHD from every other AI-generated side-hustle site. Hold the line.
