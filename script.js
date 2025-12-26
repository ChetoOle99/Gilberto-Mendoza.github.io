(function () {
  // =========================
  // Footer year
  // =========================
  document.querySelectorAll("#year").forEach(el => {
    el.textContent = String(new Date().getFullYear());
  });

  // =========================
  // Mobile nav toggle
  // =========================
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // =========================
  // Force section to top
  // =========================
  const header = document.querySelector(".topbar");

  function scrollSectionToTop(id) {
    const section = document.getElementById(id);
    if (!section) return;

    const headerHeight = header ? header.offsetHeight : 0;
    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  }

  // Intercept same-page hash links ONLY
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").substring(1);
      if (!id) return;

      e.preventDefault();
      scrollSectionToTop(id);

      navMenu?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Handle direct URL load with hash
  window.addEventListener("load", () => {
    const id = location.hash.replace("#", "");
    if (id) {
      setTimeout(() => scrollSectionToTop(id), 50);
    }
  });
  
})();
