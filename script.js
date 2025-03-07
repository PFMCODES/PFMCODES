document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  // Simulate loading time or wait for real content to load
  setTimeout(() => {
    loadingScreen.classList.add("hidden"); // Add hidden class for fade-out effect
    setTimeout(() => {
      loadingScreen.style.display = "none"; // Ensure the element is completely hidden
      mainContent.style.display = "block"; // Show the main content
    },500); // Match this with the CSS transition duration (0.5s)
  }, 2000); // Adjust time as needed (e.g., 2000ms = 2 seconds)
});
