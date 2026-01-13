
  let lastScrollY = window.scrollY;
  const topbar = document.querySelector(".topbar");

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // scrolling DOWN
      topbar.classList.add("topbar--hidden");
    } else {
      // scrolling UP
      topbar.classList.remove("topbar--hidden");
    }

    lastScrollY = currentScrollY;
  });

