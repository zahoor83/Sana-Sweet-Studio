// ================================
// SHOPPING CART
// ================================

const cartIcon = document.querySelector(".cart-icon");
const cartPanel = document.querySelector(".cart-panel");

cartIcon.addEventListener("click", () => {
    cartPanel.classList.toggle("active");
});
const heroSlides = document.querySelectorAll(".hero-slide");

let heroIndex = 0;

setInterval(() => {

    heroSlides[heroIndex].classList.remove("active");

    heroIndex++;

    if (heroIndex >= heroSlides.length) {
        heroIndex = 0;
    }

    heroSlides[heroIndex].classList.add("active");

}, 3000);