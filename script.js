const spinButton = document.getElementById('spinButton');
const slots = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];
const resultDisplay = document.getElementById('result');

// Define the symbols and their corresponding image paths
const symbols = [
    { name: 'cherry', img: 'images/cherry.png' },
    { name: 'lemon', img: 'images/lemon.png' },
    { name: 'orange', img: 'images/orange.png' }
];

// Function to check if the user has already played
function checkIfPlayed() {
    return fetch('/check-ip')
        .then(response => response.json())
        .then(data => data.played);
}

spinButton.addEventListener('click', () => {
    checkIfPlayed().then(hasPlayed => {
        if (hasPlayed) {
            resultDisplay.textContent = "You've already played!";
            spinButton.disabled = true; // Disable button if they've already played
        } else {
            resultDisplay.textContent = ""; // Clear previous result
            startRolling(); // Start the animation

            const rolls = 5; // Number of times each slot will roll
            const duration = 100; // Duration for each roll in milliseconds
            let totalTime = rolls * duration;

            let results = [];

            slots.forEach((slot, index) => {
                let currentRoll = 0;

                const rollInterval = setInterval(() => {
                    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                    slot.innerHTML = `<img src="${randomSymbol.img}" alt="${randomSymbol.name}" />`;
                    currentRoll++;

                    if (currentRoll === rolls) {
                        clearInterval(rollInterval);
                        // After rolling, select a final symbol
                        const finalSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                        results[index] = finalSymbol.name;
                        slot.innerHTML = `<img src="${finalSymbol.img}" alt="${finalSymbol.name}" />`;
                    }
                }, duration);
            });

            setTimeout(() => {
                stopRolling(); // Stop the animation
                checkResult(results); // Check if the player won
            }, totalTime + 500); // Wait for the rolling to finish + some buffer time
        }
    });
});

function startRolling() {
    slots.forEach(slot => {
        slot.classList.add('roll-animation'); // Add rolling animation with temporary image
    });
}

function stopRolling() {
    slots.forEach(slot => {
        slot.classList.remove('roll-animation'); // Remove rolling animation and show final image
    });
}

function checkResult(results) {
    if (results[0] === results[1] && results[1] === results[2]) {
        resultDisplay.textContent = "🎉 You Win! 🎉";
    } else {
        resultDisplay.textContent = "Try Again!";
    }
}
