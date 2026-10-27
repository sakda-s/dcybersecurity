(function () {
  "use strict";

  // Mobile menu
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  });

  // Count-up numbers + reveal on scroll
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      var n = e.target.querySelector("[data-n]");
      if (n && !n.done) { n.done = 1; count(n); }
      io.unobserve(e.target);
    });
  }, { threshold: .2 }) : null;
  document.querySelectorAll(".card,.sol,.promo,.flow li,.prod a,.post,.stat,details,.band").forEach(function (el) {
    el.classList.add("rv"); if (io) io.observe(el); else { el.classList.add("in"); var n = el.querySelector("[data-n]"); if (n) n.textContent = n.dataset.n + (n.dataset.s || ""); }
  });
  function count(el) {
    var target = +el.dataset.n, s = el.dataset.s || "", t0 = performance.now();
    (function step(t) {
      var p = Math.min((t - t0) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + s;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  // FAQ: keep one open at a time
  var ds = document.querySelectorAll("details");
  ds.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) ds.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  // Contact form -> Cloudflare Pages Function at /api/contact
  var form = document.getElementById("form");
  var okMsg = document.getElementById("ok"), errMsg = document.getElementById("err"), btn = document.getElementById("send");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    okMsg.hidden = true; errMsg.hidden = true;
    var valid = true;
    ["name", "email"].forEach(function (k) {
      var f = form.elements[k];
      var bad = !f.value.trim() || (k === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle("bad", bad);
      if (bad) valid = false;
    });
    if (!valid) return;
    var data = {};
    Array.prototype.forEach.call(form.elements, function (f) { if (f.name) data[f.name] = f.value; });
    btn.disabled = true;
    fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); okMsg.hidden = false; form.reset(); })
      .catch(function () { errMsg.hidden = false; })
      .then(function () { btn.disabled = false; });
  });
})();
