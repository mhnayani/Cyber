let currentPuzzleIndex = 0;
let inventory = [];
let totalKeys = 5;
let keysDropped = 0;
let puzzles = [
  { cipher: 'UFTU', answer: 'TEST', hint: 'Shift the letters by one.' },
  { cipher: 'JGNNQ', answer: 'HELLO', hint: 'Shift the letters back by 2.' },
  { cipher: 'NZP LZA', answer: 'KEY TWO', hint: 'Substitute letters.' },
  { cipher: 'MPHMXTX', answer: 'SECURE', hint: 'Shift each letter forward by 4.' },
  { cipher: 'LXFOPV EF RNHR', answer: 'ATTACK AT DAWN', hint: 'Try using a Caesar Cipher with a shift of 3.' }
];

// Event listener for the Start button
document.getElementById('start-game').addEventListener('click', function() {
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('menu-screen').classList.remove('hidden');
});

// Event listener for the Cryptography Puzzle button
document.getElementById('start-crypto').addEventListener('click', function() {
  document.getElementById('menu-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  loadNextPuzzle(); // Load the first puzzle
});

// Event listener for the Back to Menu button
document.getElementById('back-to-menu').addEventListener('click', function() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('menu-screen').classList.remove('hidden');
  resetGame(); // Reset the game when going back to the menu
});

// Event listeners for solving puzzles, showing hints, and learning ciphers
document.getElementById('check-cipher').addEventListener('click', checkCipher);
document.getElementById('show-hint').addEventListener('click', showHint);
document.getElementById('learn-ciphers').addEventListener('click', openCipherModal);
document.getElementById('close-modal').addEventListener('click', closeCipherModal);

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const keyId = event.dataTransfer.getData("text");
  const keyElement = document.getElementById(keyId);

  if (keyElement) {
    keysDropped++;
    keyElement.remove();

    if (keysDropped >= totalKeys) {
      unlockDoor();
    }
  }
}

function checkCipher() {
  const userInput = document.getElementById('cipher-input').value.toUpperCase();
  const puzzle = puzzles[currentPuzzleIndex];

  if (userInput === puzzle.answer) {
    document.getElementById('cipher-result').textContent = 'Correct! You solved the puzzle!';
    addToInventory(`yellowkey${currentPuzzleIndex + 1}`);
    currentPuzzleIndex++;

    if (currentPuzzleIndex < totalKeys) {
      loadNextPuzzle();
    } else {
      showInventoryAndDoor();
    }
  } else {
    document.getElementById('cipher-result').textContent = 'Incorrect, try again.';
  }
}

function loadNextPuzzle() {
  if (currentPuzzleIndex < totalKeys) {
    document.getElementById('cipher-result').textContent = '';
    document.getElementById('cipher-input').value = '';
    document.getElementById('puzzle-number').textContent = currentPuzzleIndex + 1;
    document.getElementById('cipher-challenge').textContent = `Cipher: ${puzzles[currentPuzzleIndex].cipher}`;
    document.getElementById('hint-text').classList.add('hidden');  // Hide hint when new puzzle loads
  }
}

function addToInventory(itemName) {
  inventory.push(itemName);
  const inventoryDiv = document.getElementById('inventory');
  const itemImg = document.createElement('img');
  itemImg.src = `images/${itemName}.jpeg`;
  itemImg.id = itemName;
  itemImg.className = 'inventory-item';
  itemImg.draggable = true;
  itemImg.ondragstart = drag;
  inventoryDiv.appendChild(itemImg);
}

function showInventoryAndDoor() {
  document.querySelector('.puzzle-section').classList.add('hidden');
  document.querySelector('.room-layout').classList.remove('hidden');
  document.getElementById('inventory-section').classList.remove('hidden');
}

function unlockDoor() {
  document.getElementById('locked-door').style.display = 'none';
  document.getElementById('unlocked-door').style.display = 'block';
  document.getElementById('inventory-section').classList.add('hidden');
  document.getElementById('final-score-section').style.display = 'block';
  clearInventory();
}

function clearInventory() {
  inventory = [];
  keysDropped = 0;
  document.getElementById('inventory').innerHTML = '';
}

document.getElementById('restart-game').addEventListener('click', restartGame);

function restartGame() {
  currentPuzzleIndex = 0;
  clearInventory();
  document.getElementById('locked-door').style.display = 'block';
  document.getElementById('unlocked-door').style.display = 'none';
  document.getElementById('room-1').style.display = 'block';
  document.getElementById('final-score-section').style.display = 'none';
  loadNextPuzzle();
}

// Show Hint for Current Puzzle
function showHint() {
  const hint = puzzles[currentPuzzleIndex].hint;
  document.getElementById('hint-text').textContent = `Hint: ${hint}`;
  document.getElementById('hint-text').classList.remove('hidden');
}

// Open the Modal to Explain Ciphers
function openCipherModal() {
  document.getElementById('cipher-modal').classList.remove('hidden');
  document.getElementById('cipher-modal').style.display = 'block';
}

// Close the Modal
function closeCipherModal() {
  document.getElementById('cipher-modal').style.display = 'none';
}

// Initial puzzle load
loadNextPuzzle();
