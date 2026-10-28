# ดีCyber – dcybersecurity.com
เว็บไซต์ Static (HTML/CSS/JS) ไม่ต้อง build

## Deploy
1. `git init && git add . && git commit -m "Initial site"`
2. `git branch -M main && git remote add origin https://github.com/sakda-s/dcybersecurity.git && git push -u origin main`
3. Cloudflare Pages → Connect to Git → เลือก repo → Framework: None, Build command: เว้นว่าง, Output directory: `/`
4. Custom domains → เพิ่ม `dcybersecurity.com`

## ต้องแก้เป็นข้อมูลจริงก่อนเปิดใช้งาน
- `script.js`: `FORM_ENDPOINT` และ `FALLBACK_EMAIL`
- `index.html`: ที่อยู่/เบอร์โทร/นโยบายความเป็นส่วนตัวใน Footer, ลิงก์บทความ (`#`), โลโก้พันธมิตร/กรณีศึกษา (ค้นหา `TODO`)
- ห้ามอ้างใบรับรอง ISO หรือตัวเลขผลงานหากไม่มีหลักฐานยืนยัน
