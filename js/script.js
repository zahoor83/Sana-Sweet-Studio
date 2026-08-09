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
const cartOverlay = document.getElementById("cartOverlay");

function saveCart() {

    localStorage.setItem("freshlyCart", JSON.stringify(cart));

}

function openCart() {

    if (cartPanel) {
        cartPanel.classList.toggle("active");
    }

    if (cartOverlay) {
        cartOverlay.classList.toggle("active");
    }

}

function closeCart() {

    if (cartPanel) {
        cartPanel.classList.remove("active");
    }

    if (cartOverlay) {
        cartOverlay.classList.remove("active");
    }

}


// ===================================
// CART V2 - PART 2
// ===================================

function addToCart(productName, price, size = "") {

    const itemKey =
        size ? productName + " (" + size + ")" : productName;

    const existingItem =
        cart.find(item => item.name === itemKey);

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

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    } else {

        cart.forEach(item => {

            total += item.price * item.quantity;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <h4>${item.name}</h4>

                    <p>$${item.price}</p>

                    <div class="qty-box">

                        <button onclick="decreaseQty('${item.name}')">
                            ➖
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="increaseQty('${item.name}')">
                            ➕
                        </button>

                    </div>

                    <button
                        onclick="removeItem('${item.name}')"
                        class="remove-btn">

                        ❌ Remove

                    </button>

                </div>
            `;

        });

    }

    if (cartTotal) {
        cartTotal.innerText = total;
    }

    if (cartCount) {
        cartCount.innerText =
            cart.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
    }

    saveCart();

}


function removeItem(productName) {

    cart =
        cart.filter(item => item.name !== productName);

    saveCart();

    updateCart();

}


updateCart();


// ===================================
// WHATSAPP CHECKOUT
// ===================================

function checkoutWhatsApp() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    let message =
        "Hello Freshly Homemade,%0A%0A" +
        "I would like to order:%0A%0A";

    let total = 0;

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        message +=
            "- " +
            item.name +
            " x " +
            item.quantity +
            " = $" +
            itemTotal +
            "%0A";

        total += itemTotal;

    });

    message +=
        "%0ATotal: $" +
        total;

    window.open(
        "https://wa.me/61490391090?text=" + message,
        "_blank"
    );

}


// ===================================
// QUANTITY CONTROLS
// ===================================

function increaseQty(productName) {

    const item =
        cart.find(item => item.name === productName);

    if (item) {

        item.quantity++;

        saveCart();

        updateCart();

    }

}


function decreaseQty(productName) {

    const item =
        cart.find(item => item.name === productName);

    if (item) {

        item.quantity--;

        if (item.quantity <= 0) {

            cart =
                cart.filter(
                    i => i.name !== productName
                );

        }

        saveCart();

        updateCart();

    }

}


// =====================================================
// PHASE 3 — PRODUCT SEARCH & CATEGORY FILTERS
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const search =
        document.getElementById("productSearch");

    const category =
        document.getElementById("productCategory");

    const clearFilters =
        document.getElementById("clearProductFilters");

    const status =
        document.getElementById("productFilterStatus");


    function getProductCategory(card) {

        const text =
            card.textContent.toLowerCase();

        /*
         * We classify the existing products from their
         * current names/content, so no changes to the
         * product HTML are required.
         */

        if (
            text.includes("party tray")
        ) {

            return "party";

        }

        if (
            text.includes("cake") ||
            text.includes("lemon") ||
            text.includes("nutted tea")
        ) {

            return "cakes";

        }

        return "desserts";

    }


    function filterProducts() {

        const term =
            search
                ? search.value.trim().toLowerCase()
                : "";

        const selectedCategory =
            category
                ? category.value
                : "all";


        const cards =
            document.querySelectorAll(
                "#products .product-card"
            );


        let visible = 0;


        cards.forEach(function (card) {

            const text =
                card.textContent.toLowerCase();

            const cardCategory =
                getProductCategory(card);


            const matchesSearch =
                !term ||
                text.includes(term);


            const matchesCategory =
                selectedCategory === "all" ||
                cardCategory === selectedCategory;


            const show =
                matchesSearch &&
                matchesCategory;


            card.style.display =
                show ? "" : "none";


            if (show) {

                visible++;

            }

        });


        if (status) {

            status.textContent =
                visible +
                " product" +
                (visible === 1 ? "" : "s") +
                " found";

        }

    }


    if (search) {

        search.addEventListener(
            "input",
            filterProducts
        );

    }


    if (category) {

        category.addEventListener(
            "change",
            filterProducts
        );

    }


    if (clearFilters) {

        clearFilters.addEventListener(
            "click",
            function () {

                if (search) {

                    search.value = "";

                }

                if (category) {

                    category.value = "all";

                }

                filterProducts();

            }
        );

    }


    filterProducts();


    // =================================================
    // CUSTOM CAKE REQUEST FORM
    // =================================================

    const customCakeForm =
        document.getElementById(
            "customCakeForm"
        );


    if (customCakeForm) {

        customCakeForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const formData =
                    new FormData(
                        customCakeForm
                    );


                const name =
                    formData.get("name") || "";


                const email =
                    formData.get("email") || "";


                const phone =
                    formData.get("phone") || "";


                const eventDate =
                    formData.get("event_date") || "";


                const cakeType =
                    formData.get("cake_type") || "";


                const message =
                    formData.get("message") || "";


                const whatsappMessage =
                    "Hello Freshly Homemade,%0A%0A" +

                    "I would like to request a custom cake.%0A%0A" +

                    "Name: " +
                    encodeURIComponent(name) +

                    "%0AEmail: " +
                    encodeURIComponent(email) +

                    "%0APhone / WhatsApp: " +
                    encodeURIComponent(phone) +

                    "%0AEvent Date: " +
                    encodeURIComponent(eventDate) +

                    "%0ACake Type: " +
                    encodeURIComponent(cakeType) +

                    "%0A%0ACake Details:%0A" +
                    encodeURIComponent(message);


                window.open(
                    "https://wa.me/61490391090?text=" +
                    whatsappMessage,
                    "_blank"
                );

            }
        );

    }


    // =================================================
    // CONTACT FORM
    // =================================================

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const formData =
                    new FormData(
                        contactForm
                    );


                const name =
                    formData.get("name") || "";


                const email =
                    formData.get("email") || "";


                const message =
                    formData.get("message") || "";


                /*
                 * No email address was supplied for the business.
                 * Therefore the Contact Form sends the message
                 * directly to the existing business WhatsApp.
                 */

                const whatsappMessage =
                    "Hello Freshly Homemade,%0A%0A" +

                    "New Contact Message:%0A%0A" +

                    "Name: " +
                    encodeURIComponent(name) +

                    "%0AEmail: " +
                    encodeURIComponent(email) +

                    "%0A%0AMessage:%0A" +
                    encodeURIComponent(message);


                window.open(
                    "https://wa.me/61490391090?text=" +
                    whatsappMessage,
                    "_blank"
                );

            }
        );

    }

});