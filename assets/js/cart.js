document.addEventListener('DOMContentLoaded', function () {
    // Get the cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('#cart-items');
    const cartSummaryContainer = document.querySelector('#cart-summary');

    // Function to render the cart items
    function renderCart() {
        cartContainer.innerHTML = ''; // Clear the existing content
        let cartTotal = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('col-md-12', 'mb-4', 'cart-item');
            cartItem.innerHTML = `
                <div class="row">
                    <div class="col-md-3">
                        <img src="./assets/images/product.jpg" class="img-fluid" alt="${item.name}">
                    </div>
                    <div class="col-md-5">
                        <h4>${item.name}</h4>
                        <p>Price: $${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(cartItem);

            // Calculate the total for the cart
            cartTotal += item.price * item.quantity;
        });

        // Render the cart summary
        cartSummaryContainer.innerHTML = `
            <div class="col-md-4 offset-md-8">
                <div class="border p-4">
                    <h4>Cart Summary</h4>
                    <hr>
                    <p>Subtotal: <span class="float-end">$${cartTotal.toFixed(2)}</span></p>
                    <button class="btn btn-primary w-100 mt-3">Proceed to Checkout</button>
                </div>
            </div>
        `;

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                removeItem(index);
            });
        });
    }

    // Function to remove an item from the cart
    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // Initially render the cart
    renderCart();
});
