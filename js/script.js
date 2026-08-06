// ================================
// HERO IMAGE SLIDER
// ================================

const heroSlides = document.querySelectorAll(".hero-slide");

if (heroSlides.length > 0) {

    let heroIndex = 0;

    heroSlides[0].classList.add("active");

    setInterval(() => {

        heroSlides[heroIndex].classList.remove("active");

        heroIndex++;

        if (heroIndex >= heroSlides.length) {
            heroIndex = 0;
        }

        heroSlides[heroIndex].classList.add("active");

    }, 3000);
}

// ===================================
// CART V2 - PART 1
// ===================================

let cart = JSON.parse(localStorage.getItem("freshlyCart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const cartPanel = document.getElementById("cartPanel");

function saveCart() {
    localStorage.setItem("freshlyCart", JSON.stringify(cart));
}

const cartOverlay = document.getElementById("cartOverlay");

function openCart() {

    cartPanel.classList.toggle("active");
    cartOverlay.classList.toggle("active");

}

function closeCart() {

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");

}

// ===================================
// CART V2 - PART 2
// ===================================

function addToCart(productName, price, size = "") {

    const itemKey = size ? productName + " (" + size + ")" : productName;

    const existingItem = cart.find(item => item.name === itemKey);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            name: itemKey,

            price: price,

            quantity: 1

        });

    }

    saveCart();
    updateCart();
}

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        cart.forEach(item => {

    total += item.price * item.quantity;

    cartItems.innerHTML += `
    <div class="cart-item">

        <h4>${item.name}</h4>

        <p>$${item.price}</p>

<div class="qty-box">

    <button onclick="decreaseQty('${item.name}')">➖</button>

    <span>${item.quantity}</span>

    <button onclick="increaseQty('${item.name}')">➕</button>

</div>

<button onclick="removeItem('${item.name}')"
        class="remove-btn">
    ❌ Remove
</button>

</div>
    `;

});

    cartTotal.innerText = total;
    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

    }

    saveCart();

}

updateCart();

function removeItem(productName){

    cart = cart.filter(item => item.name !== productName);

    saveCart();

    updateCart();

}

// ===================================
// WHATSAPP CHECKOUT
// ===================================

function checkoutWhatsApp() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let message = "Hello Freshly Homemade,%0A%0AI would like to order:%0A%0A";

    let total = 0;

    cart.forEach(item => {

        message += "- " + item.name + " x " + item.quantity + " = $" + (item.price * item.quantity) + "%0A";

        total += item.price * item.quantity;

    });

    message += "%0ATotal: $" + total;

    window.open(
        "https://wa.me/61490391090?text=" + message,
        "_blank"
    );
}

// ===================================
// QUANTITY CONTROLS
// ===================================

function increaseQty(productName){

    const item = cart.find(item => item.name === productName);

    if(item){

        item.quantity++;

        saveCart();

        updateCart();

    }

}

function decreaseQty(productName){

    const item = cart.find(item => item.name === productName);

    if(item){

        item.quantity--;

        if(item.quantity <= 0){

            cart = cart.filter(i => i.name !== productName);

        }

        saveCart();

        updateCart();

    }

}