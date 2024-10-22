document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalAmount = document.getElementById('total-amount');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            totalAmount.textContent = '₹0';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-item');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div>
                    <h3>${product.title}</h3>
                    <p>Price: ₹${product.price}</p>
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(productElement);
            total += product.price;
        });

        totalAmount.textContent = `₹${total}`;
    }

    function updateCartCount() {
        cartCount.textContent = `(${cart.length})`;
    }

    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        }
    });

    renderCart();
    updateCartCount();
});