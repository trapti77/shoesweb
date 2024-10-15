document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Simple animation for products
  const products = document.querySelectorAll(".product");
  products.forEach((product, index) => {
    setTimeout(() => {
      product.style.opacity = "0";
      product.style.transform = "translateY(20px)";
      product.style.transition = "opacity 0.5s, transform 0.5s";

      setTimeout(() => {
        product.style.opacity = "1";
        product.style.transform = "translateY(0)";
      }, 100);
    }, index * 200);
  });
});
