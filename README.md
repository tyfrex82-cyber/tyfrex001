# Tyfrex — Payroll Software for DPD & Yodel Operators

## Apps
- `dpd-desktop.html` — DPD Desktop v135
- `yodel-desktop.html` — Yodel Desktop v71  
- `dpd.html` — DPD Mobile
- `yodel.html` — Yodel Mobile

## Master Key
`TYFREX-MASTER-ZDIBY-LAALK` — works in all apps, never expires

## Issuing a New Operator Key
1. `python generate_key.py`
2. Paste output into `LICENSES` in `netlify/functions/validate.js`
3. `git add . && git commit -m "Add licence: [operator name]" && git push`
4. Netlify deploys in ~30 seconds
5. Email key to operator

## Netlify Setup
- Publish directory: `.`
- Functions directory: `netlify/functions`
- Connect repo at: netlify.com → Sites → your site → Build & deploy → Link to GitHub
