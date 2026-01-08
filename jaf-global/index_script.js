document.getElementById("learnMoreBtn").addEventListener("click", function () {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for contacting JAF Global. We will be in touch.");
  this.reset();
});
// Smooth scroll (homepage)
const learnBtn = document.getElementById("learnMoreBtn");
if (learnBtn) {
  learnBtn.addEventListener("click", () => {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  });
}

// Contact form
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for contacting JAF Global.");
    this.reset();
  });
}

// Scroll animations don't laugh at me, ibi nibyo nshoore gukora ngo ibintu bibe byiza
const animatedItems = document.querySelectorAll(".fade-up, .slide-in");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

animatedItems.forEach(item => observer.observe(item));
