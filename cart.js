document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll(".add-to-cart");

    // Add to cart buttons
    cartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productCard = this.closest(".card");
            const name = productCard.querySelector("h3").textContent;
            const priceText = productCard.querySelector(".price").textContent.replace("$", "");
            const price = parseFloat(priceText);
            const image = productCard.querySelector("img").src;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingProduct = cart.find(item => item.name === name);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} has been added to your cart!`);
        });
    });

    // Cart page rendering
    if (document.getElementById("cart-items")) {
        loadCart();
    }

    // Clear Cart Button
    const clearBtn = document.getElementById("clear-cart");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear your cart?")) {
                localStorage.removeItem("cart");
                loadCart();
                alert("Your cart has been cleared.");
            }
        });
    }

    // Checkout Button
    const checkoutBtn = document.getElementById("checkout");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            window.location.href = "checkout.html";
        });
    }

    // 🔹 Mobile Menu Toggle (works for all pages)
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "";
        return;
    }

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-details">
                <h4>${item.name}</h4>
                <p>Unit Price: $${item.price.toFixed(2)}</p>
                <p><strong>Item Total: $${itemTotal.toFixed(2)}</strong></p>
            </div>
            <div class="cart-actions">
                <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function updateQty(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
