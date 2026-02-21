document.addEventListener("astro:page-load", () => {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const links = menu ? menu.querySelectorAll("a") : [];
  let isOpen = false;

  const iconMenu = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
  const iconX = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>`;

  // Function to toggle menu state
  function toggleMenu() {
    if (!btn || !menu) return;

    isOpen = !isOpen;
    if (isOpen) {
      menu.classList.remove("hidden", "scale-95", "opacity-0");
      menu.classList.add("flex", "scale-100", "opacity-100");
      btn.innerHTML = iconX;
      btn.classList.add("bg-white/10");
    } else {
      menu.classList.add("hidden", "scale-95", "opacity-0");
      menu.classList.remove("flex", "scale-100", "opacity-100");
      btn.innerHTML = iconMenu;
      btn.classList.remove("bg-white/10");
    }
  }

  // Add new listener
  if (btn) {
    btn.onclick = (e) => {
      e.stopPropagation();
      toggleMenu();
    };
  }

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (isOpen && menu && !menu.contains(e.target) && !btn.contains(e.target)) {
      toggleMenu();
    }
  });

  // Close when clicking links
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (isOpen) toggleMenu();
    });
  });
});
