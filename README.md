# VOIDGATE – cyber-themed static site

Plain HTML/CSS/JS. No build step, no dependencies.

## Run locally

Open `index.html` in a browser, or run `npx serve .`

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

## Deploy on Cloudflare Pages (auto-deploy on every push)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick the repo and branch `main`.
3. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
4. **Save and Deploy.** You get `https://<project>.pages.dev`.
5. Custom domain: project → **Custom domains** → **Set up a domain**.

## Or deploy from the command line

```bash
npx wrangler login
npx wrangler pages deploy . --project-name voidgate
```

## Customise

- Brand, copy and email: edit `index.html` (search for `VOIDGATE` and `hello@example.com`).
- Colours: CSS variables at the top of `<style>`.
- Terminal commands: the `cmds` object in the `<script>`.
- Security headers: `_headers` (Cloudflare Pages applies it automatically). If you add external scripts or fonts, update the `Content-Security-Policy` line.
