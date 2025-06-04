const loadingScreen = document.getElementById('loading-screen');
const loadingBar = document.getElementsByClassName('loading-bar')[0];
const main = document.getElementById('main');

document.addEventListener('DOMContentLoaded', () => {
  // Simulate loading progress
  main.style.display = 'none'; // Hide main content initially
  let progress = 0;
  const interval = setInterval(() => {
    if (progress < 100) {
      progress += 10;
      loadingBar.style.width = `${progress}%`;
    } else {
      clearInterval(interval);
      loadingScreen.style.opacity = '0';
      document.body.style.overflow = 'auto'; // Enable scrolling
      main.style.display = 'block'; // Show main content
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }
  }, 0.1); // Update every 500ms
});