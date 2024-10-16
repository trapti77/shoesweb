const products = [
  {
    id: 1,
    name: "Running Shoes",
    price: 89.99,
    image: "/api/placeholder/250/200",
  },
  {
    id: 2,
    name: "Casual Sneakers",
    price: 59.99,
    image: "/api/placeholder/250/200",
  },
  {
    id: 3,
    name: "Dress Shoes",
    price: 99.99,
    image: "/api/placeholder/250/200",
  },
  { id: 4, name: "Sandals", price: 29.99, image: "/api/placeholder/250/200" },
  {
    id: 5,
    name: "Hiking Boots",
    price: 129.99,
    image: "/api/placeholder/250/200",
  },
  {
    id: 6,
    name: "Sport Cleats",
    price: 79.99,
    image: "/api/placeholder/250/200",
  },
];

function createProductCard(product) {
  return `
                <div class="product-card">
                    <img src="${product.image}" alt="${
    product.name
  }" class="product-image">
                    <div class="product-info">
                        <h2 class="product-title">${product.name}</h2>
                        <p class="product-price">$${product.price.toFixed(
                          2
                        )}</p>
                        <a href="#" class="btn" onclick="addToCart(${
                          product.id
                        })">Add to Cart</a>
                    </div>
                </div>
            `;
}

function renderProducts() {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = products.map(createProductCard).join("");
}

function addToCart(productId) {
  // This function would typically handle adding the product to a shopping cart
  alert(`Added product ${productId} to cart!`);
}

// Render products when the page loads
window.onload = renderProducts;
