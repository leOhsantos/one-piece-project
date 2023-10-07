const nav = document.querySelector(".nav");
const signInBtn = document.getElementById("signInBtn");

window.addEventListener("scroll", () => nav.classList.toggle("active", scrollY > 0));
signInBtn.addEventListener("click", () => window.location.href = "auth.html#signIn");