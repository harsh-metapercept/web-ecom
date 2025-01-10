// Add to Cart functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  // Listen for clicks on each button
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const product = this.closest(".product");
      const productName = product.getAttribute("data-name");
      const productPrice = parseFloat(product.getAttribute("data-price"));

      // Get the current cart from localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the product is already in the cart
      const existingProduct = cart.find((item) => item.name === productName);

      if (existingProduct) {
        // If the product is already in the cart, increase the quantity
        existingProduct.quantity += 1;
      } else {
        // If the product is not in the cart, add it
        cart.push({ name: productName, price: productPrice, quantity: 1 });
      }

      // Update localStorage with the new cart
      localStorage.setItem("cart", JSON.stringify(cart));

      // Optionally, show a success message
      alert(`${productName} has been added to the cart!`);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector("#cart-items"); // Assume you have a div with this ID

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
        `;
    cartContainer.appendChild(cartItem);
  });
});
