// ตั้งค่า: ใส่ URL ปลายทางรับฟอร์ม (เช่น Formspree / Cloudflare Pages Function) ถ้าเว้นว่างจะเปิดอีเมลแทน
const FORM_ENDPOINT = "";
const FALLBACK_EMAIL = "contact@dcybersecurity.com"; // TODO: เปลี่ยนเป็นอีเมลจริง

const btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
btn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", false); } });

document.querySelectorAll("[data-topic]").forEach(a => a.addEventListener("click", () => {
  const s = document.querySelector("[name=topic]");
  [...s.options].forEach(o => { if (o.text === a.dataset.topic) s.value = o.text; });
}));

const form = document.getElementById("lead"), status = document.getElementById("status");
form.addEventListener("submit", async e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("[required]").forEach(f => {
    const bad = f.type === "checkbox" ? !f.checked : !f.checkValidity();
    f.setAttribute("aria-invalid", bad); if (bad) ok = false;
  });
  if (!ok) { status.textContent = "กรุณากรอกข้อมูลที่จำเป็นและกดยินยอมก่อนส่ง"; return; }
  const data = Object.fromEntries(new FormData(form));
  if (!FORM_ENDPOINT) {
    const body = Object.entries(data).map(([k, v]) => k + ": " + v).join("\n");
    location.href = "mailto:" + FALLBACK_EMAIL + "?subject=" + encodeURIComponent("ขอรับคำปรึกษา: " + data.topic) + "&body=" + encodeURIComponent(body);
    return;
  }
  try {
    const r = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
    if (!r.ok) throw 0;
    form.reset(); status.textContent = "ส่งข้อมูลแล้ว ทีมงานจะติดต่อกลับภายใน 1–2 วันทำการ";
  } catch { status.textContent = "ส่งไม่สำเร็จ กรุณาลองอีกครั้งหรืออีเมลถึง " + FALLBACK_EMAIL; }
});
