# Deploying PauseHalt to GitHub Pages

Everything in this folder goes into your repository exactly as it is. Do not rename anything except where noted.

```
index.html          the app (was pausehalt.html)
terms.html          Terms and Conditions, at pausehalt.com/terms
privacy.html        Privacy Policy, at pausehalt.com/privacy
manifest.json       makes the app installable
service-worker.js   makes the app work offline
CNAME               tells GitHub which domain this is
.nojekyll           stops GitHub processing the files unnecessarily
icons/              app icons
```

---

## Step 0 — Fill in the placeholders FIRST

**Do this before you upload anything.** Open `index.html`, `terms.html` and `privacy.html` and search for `[`. Replace every bracketed placeholder:

| Placeholder | What to put |
|---|---|
| `[YOUR BUSINESS OR PERSONAL NAME]` | The name you trade under |
| `[YOUR ADDRESS]` | City is enough; a full street address is not required |
| `[DATE]` | The date you publish, e.g. 26 August 2026 |
| `[YEAR]` | 2026 |
| `[CURRENCY]` | BWP, USD, whichever you charge in |
| `[NUMBER]` (refunds) | Your refund window in days |
| `[NUMBER]` (retention) | How long you keep records — 5 years for tax is a common default |
| `[PAYMENT PROCESSOR]` | Paystack, Stripe, PayPal, Gumroad, Payhip… |
| `[EMAIL PROVIDER]` | MailerLite, ConvertKit, Brevo… |
| `[HOSTING PLATFORM]` | Put "GitHub Pages" for the app; name your sales-page host separately |
| `[ANALYTICS TOOL]` | Fill in, or delete that line if you use none |

Also set up **hello@pausehalt.com** (Namecheap includes email forwarding free), or change the address everywhere it appears.

## Step 1 — Create the repository

1. Sign in to GitHub → **New repository**
2. Name it `pausehalt` — **Public** (Pages needs public on the free plan)
3. Do not add a README; this folder has everything
4. **Create repository**

## Step 2 — Upload the files

On the empty repo page, click **uploading an existing file**, then drag in everything from this folder — including the `icons` folder. Commit.

Check afterwards that `.nojekyll` and `CNAME` made it. Some systems hide dotfiles; if `.nojekyll` is missing, use **Add file → Create new file**, name it `.nojekyll`, leave it empty, commit.

## Step 3 — Turn on Pages

**Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder: `/ (root)` → **Save**.

Wait 1–2 minutes, then visit `https://YOUR-USERNAME.github.io/pausehalt/`. Test the whole flow here before touching DNS.

## Step 4 — Add the custom domain in GitHub, before DNS

Still in **Settings → Pages**, under **Custom domain** type `pausehalt.com` and **Save**.

> Do this step *before* Step 5. GitHub advises adding the domain on their side first — configuring DNS while the domain is unclaimed on GitHub can let someone else host a site on it.

## Step 5 — Point Namecheap at GitHub

Namecheap → **Domain List** → **Manage** next to pausehalt.com → **Advanced DNS**.

**Delete the two default records first** — the `CNAME` record pointing to `parkingpage.cash...` and the `URL Redirect Record`. They will fight with what you add.

Then add these five records:

| Type | Host | Value | TTL |
|---|---|---|---|
| A Record | `@` | `185.199.108.153` | Automatic |
| A Record | `@` | `185.199.109.153` | Automatic |
| A Record | `@` | `185.199.110.153` | Automatic |
| A Record | `@` | `185.199.111.153` | Automatic |
| CNAME Record | `www` | `YOUR-USERNAME.github.io.` | Automatic |

Replace `YOUR-USERNAME` with your GitHub username. Keep the trailing dot on the CNAME value.

Optionally add AAAA records on `@` for IPv6: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

## Step 6 — Wait, then turn on HTTPS

DNS usually settles in 30 minutes, occasionally up to 24 hours. Go back to **Settings → Pages**; once GitHub reports the domain as verified, tick **Enforce HTTPS**.

If the tickbox is greyed out, the certificate hasn't been issued yet. Wait an hour and check again. If it's still stuck, remove the custom domain, save, re-add it, and save — that forces GitHub to reissue.

**HTTPS is not optional here.** Service workers only run on secure origins, so without it the app won't install or work offline.

## Step 7 — Test on a real phone

- Open `https://pausehalt.com` on your phone
- Complete a full Calm Now flow and save an entry
- Check **My Week** shows it
- Turn on airplane mode, close the browser, reopen the site — it should still load
- **Add to Home Screen** — you should see the PauseHalt icon, and it should open full screen with no browser bar
- Tap Terms and Privacy in the footer, and confirm `pausehalt.com/terms` loads directly

---

## Updating the app later

Edit the file on GitHub (pencil icon) or upload a replacement, and commit. Pages redeploys in about a minute.

**When you change `index.html`, also bump the cache version in `service-worker.js`:**

```js
const CACHE_NAME = 'pausehalt-v1';   // change to v2, v3, ...
```

Without that, people who already installed the app may keep seeing the old version.

## If something breaks

| Problem | Likely cause |
|---|---|
| 404 at pausehalt.com | DNS hasn't propagated, or `CNAME` file missing |
| Site loads but no styling | A file didn't upload; check the repo file list |
| Icon doesn't appear on install | `icons/` folder wasn't uploaded, or HTTPS isn't on |
| Won't work offline | HTTPS not enforced, or `service-worker.js` missing |
| Old version keeps showing | Cache version not bumped |
