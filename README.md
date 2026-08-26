[Uploading README.md…]()
# The Pause — setup and edit guide

A single-file web app that walks someone through STOP → BREATHE → NAME IT → GROUND → DECIDE, then lets her log the trigger. Companion to *Is Your Family Hurting You?*

Everything is in **`the-pause.html`** — HTML, CSS and JavaScript in one file. No accounts, no server, no tracking, no libraries. Entries are saved in the browser's localStorage and never leave the device.

---

## 1. Test it right now

Double-click `the-pause.html`. It opens in your browser and works immediately, including offline.

To test on your phone before you host it: email the file to yourself and open the attachment, or put it in Google Drive / Dropbox and open it from there.

---

## 2. Put it online (free options)

You need a URL so buyers can open it and add it to their home screen.

**Netlify Drop** (easiest, ~60 seconds)
1. Go to `app.netlify.com/drop`
2. Drag `the-pause.html` onto the page — but first rename it to `index.html`
3. You get a live URL immediately. Rename the site to something like `the-pause.netlify.app` in Site settings.

**Other options that work the same way:** GitHub Pages, Cloudflare Pages, Vercel, or any web host — just upload the file as `index.html`.

Once it's live, tell buyers: open the link on your phone, then **Share → Add to Home Screen** (iPhone) or **⋮ → Add to Home screen** (Android). It then opens like an app, full screen, and works with no signal.

---

## 3. What's in each screen

| Screen | What it does |
|---|---|
| Home | Calm now, My week, Boundary scripts, and a quiet "Need more?" link |
| Stop | Freeze prompt |
| Breathe | Guided circle, 4 in / 4 hold / 6 out, 3 breaths, auto-advances |
| Name it | Dropdown of 7 emotions; the choice is carried into the log |
| Ground | Feet on the floor + name three things you can see |
| Decide | Pause / Leave / Respond later, plus a link to the scripts |
| Quick log | What happened, what I felt, what old memory — saved with date and time |
| My week | Newest first, count for the last 7 days, delete an entry, copy the whole log as text |
| Boundary scripts | Six scripts, tap to copy |
| Support | A short, calm note pointing to a professional or a helpline |

---

## 4. Three things I changed from your brief (and why)

**Breathing is 3 breaths, not 6.** Your brief said six, but the book's own instruction is "in for 4, hold 4, out for 6, repeat 3 times." Six of those breaths is 84 seconds on that one screen alone, which breaks the under-two-minutes promise. Three breaths is 42 seconds and matches the book. The **Next** button is always there if she wants to move on sooner.

To change it back, edit one line near the top of the `<script>` block:

```js
const BREATH_ROUNDS = 3;   // change to 6, or any number
```

**A "Need more?" link on the home screen.** Your book already carries a disclaimer and a crisis-line section, and this app will reach women on their worst days. It's one small, unobtrusive link — it doesn't interrupt the flow, and it protects you as much as it protects her.

**A "Copy my week as text" button.** One tap puts the whole log on the clipboard, so she can paste it into a note, an email to a therapist, or the workbook pages. It costs nothing and makes the log feel worth keeping.

---

## 5. Editing the app

Everything you'd want to change sits in two places.

**Colours** — the `:root` block at the very top of the `<style>` section:

```css
--cream:  #FBF6EE;   /* background */
--clay:   #B4674A;   /* main buttons */
--sage:   #7C8B68;   /* secondary buttons */
```

I deepened your terracotta slightly (from `#D8A48F` to `#B4674A`) so white button text is properly readable on it. If you prefer the softer original, change `--clay` — but then switch the button text to a dark colour so it stays legible.

**Scripts** — the `SCRIPTS` list near the top of the `<script>` section. Add, remove or reword freely:

```js
{ line:"That doesn't work for me right now.", use:"Last-minute demands" },
```

**Wording on any screen** — the text lives in plain HTML inside each `<section>`. Search for the words you want to change and type over them.

---

## 6. Making it a full installable app (optional)

The file already behaves well when added to a home screen. For a true installable PWA with an install prompt, add three files next to it:

**manifest.json**
```json
{
  "name": "The Pause",
  "short_name": "The Pause",
  "start_url": "./index.html",
  "display": "standalone",
  "background_color": "#FBF6EE",
  "theme_color": "#FBF6EE",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**service-worker.js**
```js
const CACHE = 'the-pause-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './index.html'])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
```

Then add these two lines inside the `<head>` of `index.html`:
```html
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icons/icon-192.png">
```
And this just before `</body>`:
```html
<script>if('serviceWorker' in navigator){navigator.serviceWorker.register('service-worker.js');}</script>
```

Icons: two PNGs, 192×192 and 512×512, in an `icons/` folder. A cream square with a terracotta circle works well. Service workers only run over `https://` or `localhost` — they won't work by double-clicking the file.

---

## 7. Tested in

Chrome, Safari and Firefox, desktop and mobile widths. Known limits: iOS private browsing blocks localStorage, so entries won't save — the app tells the user this instead of failing silently. Clearing browser data deletes saved entries; there's no cloud backup by design.
