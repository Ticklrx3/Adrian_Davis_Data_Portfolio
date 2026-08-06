document.addEventListener("DOMContentLoaded", () => {

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const observed = document.querySelectorAll(".project-card, .timeline article, .skills-grid article");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  observed.forEach((item) => observer.observe(item));
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const thumbs = Array.from(carousel.querySelectorAll("[data-carousel-thumb]"));
  const image = carousel.querySelector("[data-carousel-image]");
  const link = carousel.querySelector("[data-carousel-link]");
  const title = carousel.querySelector("[data-carousel-title]");
  const description = carousel.querySelector("[data-carousel-description]");
  const counter = carousel.querySelector("[data-carousel-counter]");
  const previous = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  let current = 0;

  const showSlide = (index) => {
    current = (index + thumbs.length) % thumbs.length;
    const item = thumbs[current];
    const src = item.dataset.src;
    image.src = src;
    image.alt = item.dataset.title;
    link.href = src;
    title.textContent = item.dataset.title;
    description.textContent = item.dataset.description;
    counter.textContent = `${current + 1} of ${thumbs.length}`;
    thumbs.forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("is-active", thumbIndex === current);
      thumb.setAttribute("aria-current", thumbIndex === current ? "true" : "false");
    });
    item.scrollIntoView({behavior: "smooth", block: "nearest", inline: "center"});
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => showSlide(index));
  });
  previous.addEventListener("click", () => showSlide(current - 1));
  next.addEventListener("click", () => showSlide(current + 1));

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showSlide(current - 1);
    if (event.key === "ArrowRight") showSlide(current + 1);
  });
});

});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".excel-gallery-visual").forEach((gallery) => {
    const tabs = Array.from(gallery.querySelectorAll("[data-gallery-tab]"));
    const panels = Array.from(gallery.querySelectorAll("[data-gallery-panel]"));
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.galleryTab;
        tabs.forEach((item) => {
          const active = item === tab;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", active ? "true" : "false");
        });
        panels.forEach((panel) => {
          const active = panel.dataset.galleryPanel === target;
          panel.hidden = !active;
          panel.classList.toggle("is-active", active);
        });
      });
    });
  });
});
