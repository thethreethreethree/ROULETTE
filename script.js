const spinButton = document.getElementById('spinButton');
const slots = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];
const resultDisplay = document.getElementById('result');

// Define the symbols and their corresponding image paths
const symbols = [
    { name: 'cherry', img: 'images/cherry.png' },
    { name: 'lemon', img: 'images/lemon.png' },
    { name: 'orange', img: 'images/orange.png' }
];

spinButton.addEventListener('click', () => {
    const results = [];
    
    for (let i = 0; i < slots.length; i++) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        slots[i].innerHTML = `<img src="${randomSymbol.img}" alt="${randomSymbol.name}" />`;
        results.push(randomSymbol.name);
    }
    
    checkResult(results);
});

function checkResult(results) {
    if (results[0] === results[1] && results[1] === results[2]) {
        resultDisplay.textContent = "🎉 You Win! 🎉";
    } else {
        resultDisplay.textContent = "Try Again!";
    }
}
