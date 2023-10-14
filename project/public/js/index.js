const nav = document.querySelector(".nav");

AOS.init();

window.addEventListener("scroll", () => nav.classList.toggle("active", scrollY > 0));