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

document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll(".lazy");
  const lazyVideos = document.querySelectorAll(".lazy-video");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.tagName === "IMG") {
          entry.target.src = entry.target.dataset.src;
        } else if (entry.target.tagName === "VIDEO") {
          entry.target.src = entry.target.dataset.src;
        }
        entry.target.classList.add("loaded");
        observer.unobserve(entry.target);
      }
    });
  });

  lazyImages.forEach((img) => observer.observe(img));
  lazyVideos.forEach((video) => observer.observe(video));
});

// Function to open the image in fullscreen mode
function openFullscreen(image) {
  if (image.requestFullscreen) {
    image.requestFullscreen();
  } else if (image.mozRequestFullScreen) {
    // Firefox
    image.mozRequestFullScreen();
  } else if (image.webkitRequestFullscreen) {
    // Chrome, Safari, Opera
    image.webkitRequestFullscreen();
  } else if (image.msRequestFullscreen) {
    // IE/Edge
    image.msRequestFullscreen();
  }
}

function openFullscreen(imageSrc) {
  // Check if fullscreen is already open, and if so, return to avoid duplication
  let existingFullscreen = document.querySelector(".fullscreen-overlay");
  if (existingFullscreen) {
    existingFullscreen.remove(); // Remove any existing fullscreen div before opening a new one
  }

  // Create an image element for fullscreen display
  const img = document.createElement("img");
  img.src = imageSrc; // Set the source of the image
  img.style.maxWidth = "100%"; // Ensure it covers the screen
  img.style.maxHeight = "100%";
  img.style.objectFit = "contain"; // Maintain aspect ratio

  // Create a fullscreen div to wrap the image
  const fullscreenDiv = document.createElement("div");
  fullscreenDiv.classList.add("fullscreen-overlay"); // Add a class for easy removal
  fullscreenDiv.style.position = "fixed";
  fullscreenDiv.style.top = "0";
  fullscreenDiv.style.left = "0";
  fullscreenDiv.style.width = "100vw";
  fullscreenDiv.style.height = "100vh";
  fullscreenDiv.style.background = "rgba(0, 0, 0, 0.9)"; // Dark background
  fullscreenDiv.style.display = "flex";
  fullscreenDiv.style.justifyContent = "center";
  fullscreenDiv.style.alignItems = "center";
  fullscreenDiv.style.zIndex = "9999"; // Ensure it's on top

  // Add the close button
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "&times;"; // Unicode for a close button (×)
  closeButton.style.position = "absolute";
  closeButton.style.top = "20px";
  closeButton.style.right = "20px";
  closeButton.style.background = "rgba(255, 255, 255, 0.5)";
  closeButton.style.color = "#fff";
  closeButton.style.fontSize = "30px";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "50%";
  closeButton.style.padding = "15px";
  closeButton.style.cursor = "pointer";
  closeButton.style.transition = "background-color 0.3s";

  closeButton.onmouseover = () => {
    closeButton.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  };
  closeButton.onmouseout = () => {
    closeButton.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  };

  closeButton.onclick = () => {
    fullscreenDiv.remove(); // Close the fullscreen when clicked
  };

  // Append image and button to fullscreen div
  fullscreenDiv.appendChild(img);
  fullscreenDiv.appendChild(closeButton);

  // Append the fullscreen div to the body
  document.body.appendChild(fullscreenDiv);
}

// Trigger the function on image click
document.querySelectorAll(".gallery img").forEach((image) => {
  image.addEventListener("click", (e) => {
    openFullscreen(e.target.src); // Pass the clicked image's source
  });
});
