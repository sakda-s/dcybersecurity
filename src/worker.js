// Cloudflare Worker (Workers Static Assets)
// - ไฟล์ในโฟลเดอร์ public/ ถูกเสิร์ฟเป็นเว็บอัตโนมัติ
// - POST /api/contact ส่งอีเมลผ่าน Resend
// ตัวแปรที่ต้องตั้งใน Dashboard (Settings > Variables and Secrets):
//   RESEND_API_KEY (Secret), CONTACT_TO, CONTACT_FROM เช่น "dcybersecurity <noreply@dcybersecurity.com>"

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

const clean = (v, max) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

async function handleContact(request, env) {
  if (request.method !== "POST") return json({ ok: false }, 405);

  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false }, 403);

  let d;
  try { d = await request.json(); } catch { return json({ ok: false }, 400); }

  if (d.website) return json({ ok: true }); // honeypot: บอทกรอกช่องนี้

  const name = clean(d.name, 100), email = clean(d.email, 200);
  const company = clean(d.company, 150), topic = clean(d.topic, 100);
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) return json({ ok: false, error: "invalid" }, 400);

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) return json({ ok: false, error: "not_configured" }, 500);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `[dcybersecurity.com] ติดต่อใหม่จาก ${name}`,
      text: `ชื่อ: ${name}\nอีเมล: ${email}\nบริษัท: ${company || "-"}\nสิ่งที่สนใจ: ${topic || "-"}`,
    }),
  });
  return res.ok ? json({ ok: true }) : json({ ok: false, error: "send_failed" }, 502);
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/contact") return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
};
