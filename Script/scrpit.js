//lazy loading for better performance
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll(".lazy");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.classList.add("loaded"); // Apply fade-in effect
        observer.unobserve(img); // Stop observing once loaded
      }
    });
  });

  lazyImages.forEach((img) => observer.observe(img));
});
