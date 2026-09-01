const nav = document.querySelector(".nav");
const toggle = document.querySelector(".menu-toggle");
if (toggle) {
  toggle.addEventListener("click", () => nav.classList.toggle("menu-open"));
}
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("menu-open"));
});

const revealItems = document.querySelectorAll(".skill-card, .project-card, .timeline-item, .future-cards > div");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item, i) => {
  item.style.transitionDelay = `${(i % 5) * 70}ms`;
  observer.observe(item);
});

const style = document.createElement("style");
style.textContent = `
  .skill-card,.project-card,.timeline-item,.future-cards>div{opacity:0;transform:translateY(18px);transition:opacity .55s ease,transform .55s ease}
  .skill-card.visible,.project-card.visible,.timeline-item.visible,.future-cards>div.visible{opacity:1;transform:none}
`;
document.head.appendChild(style);

// Contact form: submit via fetch so the page doesn't reload, and show a status
// message in place. The actual sending/relaying to email is handled entirely
// by Formspree (see the form's "action" URL in index.html) — no server code here.
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  const statusEl = contactForm.querySelector(".form-status");
  const submitBtn = contactForm.querySelector(".form-submit");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    statusEl.textContent = "Sending…";
    statusEl.className = "form-status";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        statusEl.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
        statusEl.className = "form-status ok";
        contactForm.reset();
      } else {
        statusEl.textContent = "Something went wrong. Please email me directly instead.";
        statusEl.className = "form-status err";
      }
    } catch (err) {
      statusEl.textContent = "Network error. Please email me directly instead.";
      statusEl.className = "form-status err";
    } finally {
      submitBtn.disabled = false;
    }
  });
}
