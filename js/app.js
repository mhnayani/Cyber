// Welcome screen to menu screen transition
document.getElementById('start-game').addEventListener('click', function() {
  switchScreen('welcome-screen', 'menu-screen');
});

// Menu screen to game screen (Cryptography Puzzle)
document.getElementById('start-crypto').addEventListener('click', function() {
  switchScreen('menu-screen', 'game-screen'); // Move to Cryptography Puzzle (main game)
});

// Go back to the menu screen from the game screen
document.getElementById('back-to-menu').addEventListener('click', function() {
  switchScreen('game-screen', 'menu-screen');
});

// Utility function to switch screens
function switchScreen(hideScreenId, showScreenId) {
  document.getElementById(hideScreenId).classList.add('hidden');
  document.getElementById(showScreenId).classList.remove('hidden');
  document.getElementById(showScreenId).classList.add('active-screen');
}

// Other game logic (unchanged)

function unlockDoor() {
  document.getElementById('locked-door').style.display = 'none';
  document.getElementById('unlocked-door').style.display = 'block';

  document.getElementById('inventory-section').style.display = 'none';  
  document.querySelector('.puzzle-section').style.display = 'none'; 
  document.querySelector('.instruction').style.display = 'none'; 

  document.getElementById('final-score-section').style.display = 'block';
}

// Drag and drop inventory management (for keys)
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

// Check cipher input
function checkCipher() {
  const userInput = document.getElementById('cipher-input').value.toUpperCase();
  const puzzle = puzzles[currentPuzzleIndex];

  if (userInput === puzzle.answer) {
    document.getElementById('cipher-result').textContent = 'Correct! You solved the puzzle!';
    addToInventory(`key${currentPuzzleIndex + 1}`);
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

// Add key to inventory
function addToInventory(itemName) {
  inventory.push(itemName);
  const inventoryDiv = document.getElementById('inventory');
  const itemImg = document.createElement('img');
  itemImg.src = `images/${itemName}.png`;  // Assuming keys are named "key1.png", "key2.png", etc.
  itemImg.id = itemName;
  itemImg.className = 'inventory-item';
  itemImg.draggable = true;
  itemImg.ondragstart = drag;
  inventoryDiv.appendChild(itemImg);
}

// Load the next puzzle
function loadNextPuzzle() {
  if (currentPuzzleIndex < totalKeys) {
    document.getElementById('cipher-result').textContent = '';
    document.getElementById('cipher-input').value = '';
    document.getElementById('puzzle-number').textContent = currentPuzzleIndex + 1;
    document.getElementById('cipher-challenge').textContent = `Cipher: ${puzzles[currentPuzzleIndex].cipher}`;
    document.getElementById('hint-text').classList.add('hidden');
  }
}

// Show hint for current puzzle
function showHint() {
  const hint = puzzles[currentPuzzleIndex].hint;
  document.getElementById('hint-text').textContent = `Hint: ${hint}`;
  document.getElementById('hint-text').classList.remove('hidden');
}

// Modal for cipher explanation
document.getElementById('learn-ciphers').addEventListener('click', openCipherModal);
document.getElementById('close-modal').addEventListener('click', closeCipherModal);

function openCipherModal() {
  document.getElementById('cipher-modal').style.display = 'block';
}

function closeCipherModal() {
  document.getElementById('cipher-modal').style.display = 'none';
}

// Initial puzzle load
loadNextPuzzle();
