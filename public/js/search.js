const products = [
  {
    id: 1,
    name: "Sprint Runner",
    price: 89.99,
    category: "running",
    image: "/api/placeholder/250/200",
  },
  {
    id: 2,
    name: "Casual Comfort",
    price: 59.99,
    category: "casual",
    image: "/api/placeholder/250/200",
  },
  {
    id: 3,
    name: "Elegant Loafer",
    price: 99.99,
    category: "dress",
    image: "/api/placeholder/250/200",
  },
  {
    id: 4,
    name: "Trail Blazer",
    price: 129.99,
    category: "running",
    image: "/api/placeholder/250/200",
  },
  {
    id: 5,
    name: "Soccer Pro",
    price: 79.99,
    category: "sports",
    image: "/api/placeholder/250/200",
  },
  {
    id: 6,
    name: "Business Classic",
    price: 109.99,
    category: "dress",
    image: "/api/placeholder/250/200",
  },
  {
    id: 7,
    name: "Street Style",
    price: 69.99,
    category: "casual",
    image: "/api/placeholder/250/200",
  },
  {
    id: 8,
    name: "Basketball Hero",
    price: 89.99,
    category: "sports",
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
                        <p class="product-category">${product.category}</p>
                        <a href="#" class="btn" onclick="addToCart(${
                          product.id
                        })">Add to Cart</a>
                    </div>
                </div>
            `;
}

function renderProducts() {
  const productGrid = document.getElementById("productGrid");
  const category = document.getElementById("category").value;
  const sort = document.getElementById("sort").value;
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  let filteredProducts = products;

  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );
  }

  // Apply category filter
  if (category !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  // Apply sorting
  switch (sort) {
    case "name":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
  }

  productGrid.innerHTML = filteredProducts.map(createProductCard).join("");
}

function searchProducts() {
  renderProducts();
}

function addToCart(productId) {
  // This function would typically handle adding the product to a shopping cart
  alert(`Added product ${productId} to cart!`);
}

// Add event listeners
document.getElementById("category").addEventListener("change", renderProducts);
document.getElementById("sort").addEventListener("change", renderProducts);
document
  .getElementById("searchInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchProducts();
    }
  });

// Initial render
renderProducts();
