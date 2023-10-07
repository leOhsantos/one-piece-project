const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => nav.classList.toggle("active", scrollY > 0));