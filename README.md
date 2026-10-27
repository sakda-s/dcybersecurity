# dcybersecurity.com

เว็บไซต์ **ดีCyber (dcybersecurity.com)** รันบน Cloudflare Workers (Static Assets) ไม่ต้อง build

## โครงสร้าง
```
public/            # ไฟล์เว็บ (index, privacy, terms, 404, css, js, _headers, robots, sitemap)
src/worker.js      # POST /api/contact ส่งอีเมลผ่าน Resend
wrangler.toml
.dev.vars.example
```

## 1) อัปขึ้น GitHub
```bash
git add .
git commit -m "Switch to Workers static assets"
git push
```

## 2) ตั้งค่าอีเมลรับฟอร์ม (Resend)
1. สมัคร https://resend.com แล้วสร้าง API key
2. ยืนยันโดเมน dcybersecurity.com ใน Resend (เพิ่ม DNS record ที่ Cloudflare)
   ทดสอบก่อนได้ด้วย `onboarding@resend.dev` ซึ่งส่งถึงอีเมลเจ้าของบัญชี Resend เท่านั้น

## 3) Deploy บน Cloudflare (Workers Builds)
- Build command: *(ว่าง)*
- Deploy command: `npx wrangler deploy`
- Settings → Variables and Secrets เพิ่ม
  - `RESEND_API_KEY` (Secret)
  - `CONTACT_TO` = อีเมลที่ต้องการรับแจ้ง
  - `CONTACT_FROM` = `dcybersecurity <noreply@dcybersecurity.com>`
- Settings → Domains & Routes → เพิ่ม `dcybersecurity.com` และ `www.dcybersecurity.com`

## ทดสอบในเครื่อง
```bash
cp .dev.vars.example .dev.vars   # แก้ค่าจริง
npx wrangler dev
```

> หมายเหตุ: `privacy.html` และ `terms.html` เป็นร่างทั่วไป ควรให้ผู้เชี่ยวชาญด้านกฎหมายตรวจก่อนใช้จริง
