/**
 * NAME: Lena Wu
 * DATE: June 10, 2023
 * Javascript implementation for the product details page
 * Fetches the product details and handles adding products to the cart
 */

document.addEventListener("DOMContentLoaded", function() {
  fetchProductDetails();
  updateCartCount();
});

/**
 * Fetch product details from the API and render them on the page
 * Takes the product ID from the URL and gets the corresponding product details
 */
async function fetchProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    return;
  }
  
  try {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const product = await response.json();
    renderProductDetails(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

/**
 * Renders the product details on the page
 *
 * @param {Object} product - object containing details of the product
 */
function renderProductDetails(product) {
  const productDetails = document.getElementById("product-details");
  const productHTML = `
    <div class="product">
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Category: ${product.category}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    </div>
  `;
  productDetails.innerHTML = productHTML;
  const addToCartButton = document.querySelector(".add-to-cart");
  addToCartButton.addEventListener("click", addToCart);
}

/**
 * Handles the user adding products to the cart
 *
 * @param {Event} event - event object associated with the button 'Add to Cart' 
 */
function addToCart(event) {
  const productId = event.target.dataset.id;
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cartItems.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartCount();
}

/**
 * Updates the displayed cart item count in the UI
 */
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.querySelector(".cart-count");
  cartCount.textContent = cartItems.reduce((count, item) => count + item.quantity, 0);
}
