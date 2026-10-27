# dcybersecurity.com

เว็บไซต์ **ดีCyber (dcybersecurity.com)** เป็น static site พร้อม Cloudflare Pages Function สำหรับฟอร์มติดต่อ (ไม่ต้อง build)

## โครงสร้าง
```
public/                 # ไฟล์เว็บ (Output directory)
  index.html  privacy.html  terms.html  404.html
  css/style.css  js/main.js  favicon.svg
  robots.txt  sitemap.xml  _headers
functions/api/contact.js  # POST /api/contact ส่งอีเมลผ่าน Resend
wrangler.toml  .dev.vars.example
```

## 1) อัปขึ้น GitHub
```bash
git init -b main
git add .
git commit -m "dcybersecurity.com: production-ready for Cloudflare Pages"
git remote add origin https://github.com/sakda-s/dcybersecurity.git
git push -u origin main
```

## 2) ตั้งค่าอีเมลรับฟอร์ม (Resend)
1. สมัคร https://resend.com แล้วสร้าง API key
2. ยืนยันโดเมน dcybersecurity.com ใน Resend (เพิ่ม DNS record ที่ Cloudflare) เพื่อส่งจาก `noreply@dcybersecurity.com`
   (ทดสอบก่อนได้ด้วย `onboarding@resend.dev` ซึ่งส่งถึงอีเมลเจ้าของบัญชี Resend เท่านั้น)

## 3) Deploy บน Cloudflare Pages
1. Workers & Pages → Create → Pages → Connect to Git → เลือก `sakda-s/dcybersecurity`
2. Framework preset: **None** · Build command: *(ว่าง)* · Build output directory: `public`
3. Settings → Variables and Secrets (Production) เพิ่ม
   - `RESEND_API_KEY` (Secret)
   - `CONTACT_TO` = อีเมลที่ต้องการรับแจ้ง
   - `CONTACT_FROM` = `dcybersecurity <noreply@dcybersecurity.com>`
4. Re-deploy หนึ่งครั้งหลังตั้งค่าตัวแปร
5. Custom domains → เพิ่ม `dcybersecurity.com` และ `www.dcybersecurity.com`

## ทดสอบในเครื่อง
```bash
cp .dev.vars.example .dev.vars   # แก้ค่าจริง
npx wrangler pages dev public
```

## ตรวจหลัง deploy
- ส่งฟอร์มจริง 1 ครั้งและดูว่าอีเมลเข้า
- เปิด DevTools Console ว่าไม่มี error จาก CSP (ใช้ฟอนต์ Google Fonts เท่านั้น)
- ส่ง `https://dcybersecurity.com/sitemap.xml` ใน Google Search Console

> หมายเหตุ: `privacy.html` และ `terms.html` เป็นร่างทั่วไป ควรให้ผู้เชี่ยวชาญด้านกฎหมายตรวจก่อนใช้จริง
