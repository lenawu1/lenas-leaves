/**
 * NAME: Lena Wu
 * DATE: June 10, 2023
 * Javascript implementation for the plant store website
 * Handles adding products to the cart and rendering the products
 * on the website
 */

/**
 * Fetch data from a URL
 *
 * @param {string} url 
 */
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
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

/**
 * Renders all the products on the main page
 *
 * @param {string} filterValue - The category being used to filter the products. 
 * Defaults to all the products
 */
function renderProducts(filterValue = "all") {
  const productList = document.querySelector(".products");
  productList.innerHTML = "";

  fetchData("http://localhost:3000/api/products")
    .then(products => {
      const filteredProducts = (filterValue === "all") ? products : products.filter(product => product.category === filterValue);

      filteredProducts.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product");
        productItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
          <p>${product.price}</p>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productItem);
      });

      const addToCartButtons = document.querySelectorAll(".add-to-cart");
      addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
      });
    })
    .catch(error => {
      console.error("Error fetching product data:", error);
    });
}

/**
 * Initializes the page by rendering products and updating the cart count
 */
function init() {
  renderProducts();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", init);

// Event listener for the product filter dropdown
const filterElement = document.getElementById("filter");
filterElement.addEventListener("change", function() {
  const selectedType = filterElement.value;
  renderProducts(selectedType);
});