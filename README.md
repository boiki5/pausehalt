# PauseHalt

The web app behind *Is Your Family Hurting You?* — a five-step tool for pausing, naming an emotion, grounding, and choosing a response instead of reacting.

Live at **pausehalt.com**. Hosted on GitHub Pages from this repository.

---

## What this is

A single-page app with no build step, no framework, and no dependencies. Plain HTML, CSS and JavaScript in one file. It installs to a phone home screen and works with no signal.

No accounts, no server, no analytics. Everything a user types is saved in their own browser via `localStorage` and never transmitted anywhere — there is no database to transmit it to.

## Files

| File | What it does |
|---|---|
| `index.html` | The entire app — markup, styles, logic, and the full legal text |
| `terms.html` | Terms and Conditions, served at `/terms` |
| `privacy.html` | Privacy Policy, served at `/privacy` |
| `manifest.json` | Name, colours and icons for home-screen install |
| `service-worker.js` | Caches the app so it opens offline |
| `CNAME` | Tells GitHub Pages the site answers on pausehalt.com |
| `.nojekyll` | Stops GitHub processing files through Jekyll |
| `icons/` | App icons: 192, 512, apple-touch, favicon |
| `DEPLOY.md` | First-time setup: repo, Pages, DNS |

## Screens

Home → Calm Now (Stop, Breathe, Name It, Ground, Decide) → Quick Log → My Week. Plus Boundary Scripts, Support, Terms, Privacy, and a one-time Welcome screen carrying the safety disclaimer.

---

## Making changes

Edit the file on GitHub (pencil icon) or upload a replacement, then commit. Pages redeploys in about a minute.

**Every time you change `index.html`, bump the cache version:**

```js
// service-worker.js
const CACHE_NAME = 'pausehalt-v1';   // -> 'pausehalt-v2'
```

Skip this and anyone who already installed the app keeps seeing the old version. It is the single easiest thing to forget.

### Common edits

**Colours** — the `:root` block at the top of the `<style>` section in `index.html`:

```css
--cream: #FBF6EE;   /* background */
--clay:  #B4674A;   /* main buttons */
--sage:  #7C8B68;   /* secondary buttons */
```

If you lighten `--clay`, check that white button text is still readable against it.

**Boundary scripts** — the `SCRIPTS` array near the top of the `<script>` section:

```js
{ line:"That doesn't work for me right now.", use:"Last-minute demands" },
```

**Breathing pattern** — four seconds in, four hold, six out, three rounds:

```js
const BREATH_ROUNDS = 3;
const INHALE = 4000, HOLD = 4000, EXHALE = 6000;
```

**Screen wording** — plain HTML inside each `<section>`. Search for the words and type over them.

**Legal text** — lives in two places: inside `index.html` (the in-app screens) and in `terms.html` / `privacy.html` (the web pages). **Change both.** A conflict between your in-app terms and your published terms is worse than either version alone.

**Removing the welcome screen** — delete the `<section id="welcome">` block and change the last line of the script from `showFirstScreen();` to `show('home');`. Not recommended: it's where the user acknowledges the safety disclaimer.

---

## Before going live

Search `index.html`, `terms.html` and `privacy.html` for `[` — bracketed placeholders remain in the legal text. Business name, address, date, currency, refund window, payment processor, email provider, retention periods. See `DEPLOY.md` for the full list.

## Notes

- **Everything here is publicly served.** The repository is private, but the deployed files are not. Never commit the eBook PDF, bonus files, credentials, or customer data.
- **HTTPS is required.** Service workers only run on secure origins, so without "Enforce HTTPS" turned on in Pages settings, offline mode and install will not work.
- **Tested in** Chrome, Safari and Firefox, on phone and desktop widths.
- **Known limits:** iOS private browsing blocks `localStorage`, so entries won't save — the app says so rather than failing silently. Clearing browser data erases saved entries. There is no cloud backup, by design.
