document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  const spotlight = document.getElementById("spotlight");
  if (spotlight) {
    spotlight.style.setProperty("--x", `${x}px`);
    spotlight.style.setProperty("--y", `${y}px`);
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add both classes to support different CSS implementations across pages
      entry.target.classList.add("visible");
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".reveal-wrapper")
    .forEach((el) => observer.observe(el));
});
