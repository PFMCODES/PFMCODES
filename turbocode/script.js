const changingText = document.getElementById('changingText');
const changingTextWrapper = document.getElementById('changingTextWrapper');
const texts = ["Dynamic", "Efficient", "Better", "Best", "Fast"];
const colors = ["#0051ff", "#ff6347", "#0bdf00", "#1e90ff", "#0051ff"];  // Array of background colors for changingTextWrapper
let currentIndex = 0;

function changeText() {
    // Clear any existing content and prepare for new text
    changingText.innerHTML = '';

    // Add the new word with typing animation
    const text = texts[currentIndex];
    
    // First, trigger the typing animation
    text.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.animationDelay = `${index * 0.1}s`; // Add slight delay to each letter for staggered effect
        changingText.appendChild(span);
    });

    // Change the background color of the changingTextWrapper with a smooth transition
    changingTextWrapper.style.transition = "background-color 0.5s ease"; // Smooth transition for background color
    changingTextWrapper.style.backgroundColor = colors[currentIndex];

    // After the typing animation is done, adjust the wrapper width
    setTimeout(() => {
        // Reset width to auto to allow measurement
        changingTextWrapper.style.width = 'auto'; 
        const contentWidth = changingTextWrapper.scrollWidth;  // Get the width of the content
        
        // Apply a smooth width transition
        changingTextWrapper.style.transition = 'width 0.5s ease';
        changingTextWrapper.style.width = `${contentWidth}px`;  // Update the width based on content

        // Move to the next word
        currentIndex = (currentIndex + 1) % texts.length;
    }, text.length * 100 + 300); // Wait until the last letter has finished typing, plus a little buffer
}

// Change the word every 3 seconds (3000 milliseconds)
setInterval(changeText, 3000);

// Initialize the first text change
changeText();