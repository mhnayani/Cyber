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

let cyberPuzzles = [
  { 
    challenge: 'Someone leaves a rude comment on your social media post. What should you do?', 
    answer: 'Report it to the platform', 
    btn1: 'Ignore the comment', 
    btn2: 'Respond rudely', 
    btn3: 'Report it to the platform' 
  },
  { 
    challenge: 'Your friend is being targeted by a bully in a group chat. What should you do?', 
    answer: 'Support your friend and encourage them to speak up', 
    btn1: 'Support your friend and encourage them to speak up', 
    btn2: 'Join in and make fun', 
    btn3: 'Stay silent to avoid confrontation' 
  },
  { 
    challenge: 'You receive a suspicious message from someone claiming to be your teacher, asking for personal information. What do you do?', 
    answer: 'Block the sender and report the message', 
    btn1: 'Respond with the information', 
    btn2: 'Block the sender and report the message', 
    btn3: 'Share the message with friends to figure out what it is' 
  },
  { 
    challenge: 'You see a post online where someone is spreading false rumors about one of your classmates. What should you do?', 
    answer: 'Report the post to the platform', 
    btn1: 'Report the post to the platform', 
    btn2: 'Share the post with others to see their opinion', 
    btn3: 'Leave a comment to defend your classmate' 
  },
  { 
    challenge: 'You receive anonymous messages that are making you feel uncomfortable. What is the best course of action?', 
    answer: 'Report the messages to the platform and inform an adult', 
    btn1: 'Ignore the messages and delete them', 
    btn2: 'Report the messages to the platform and inform an adult', 
    btn3: 'Respond to the anonymous messages and ask them to stop' 
  },
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
  document.getElementById('main-section').classList.remove('hidden');
  let elements = document.querySelectorAll('.puzzle-section');
  elements.forEach(element => element.classList.add('hidden'));
  document.getElementById('room-1').classList.remove('hidden');
  loadNextPuzzle(); // Load the first puzzle
});

// Event listener for the Cyberbullying button
document.getElementById('start-cyber').addEventListener('click', function() {
  document.getElementById('menu-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  document.getElementById('main-section').classList.remove('hidden');
  let elements = document.querySelectorAll('.puzzle-section');
  elements.forEach(element => element.classList.add('hidden'));
  document.getElementById('room-2').classList.remove('hidden');
  loadNextCyber(); // Load the first puzzle
});

// Event listener for the Back to Menu button
document.getElementById('back-to-menu').addEventListener('click', function() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('menu-screen').classList.remove('hidden');
  // resetGame(); // Reset the game when going back to the menu
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

function checkCyber(id) {
  const userInput = document.getElementById(id).textContent.trim();
  const puzzle = cyberPuzzles[currentPuzzleIndex];

  if (userInput === puzzle.answer) {
    document.getElementById('feedback1').innerHTML = '';
    addToInventory(`yellowkey${currentPuzzleIndex + 1}`);
    currentPuzzleIndex++;

    if (currentPuzzleIndex < totalKeys) {
      loadNextCyber();
    } else {
      document.getElementById('room-2').classList.add('hidden');
      showInventoryAndDoor();
    }
  } else {
    document.getElementById('feedback1').innerHTML = 'Incorrect, try again.';
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

function loadNextCyber() {
  if (currentPuzzleIndex < totalKeys) {
    document.getElementById('puzzle-question').innerHTML = cyberPuzzles[currentPuzzleIndex].challenge;
    document.getElementById('btn-1').innerHTML = cyberPuzzles[currentPuzzleIndex].btn1;
    document.getElementById('btn-2').innerHTML = cyberPuzzles[currentPuzzleIndex].btn2;
    document.getElementById('btn-3').innerHTML = cyberPuzzles[currentPuzzleIndex].btn3;
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
  document.querySelector('.room-layout').classList.remove('hidden');
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
  document.getElementById('puzzle-question').innerHTML = '';
  // document.querySelector('.room-layout').classList.add('hidden');
}

document.getElementById('restart-game').addEventListener('click', restartGame);

function restartGame() {
  currentPuzzleIndex = 0;
  clearInventory();
  document.querySelector('.room-layout').classList.add('hidden');
  document.getElementById('locked-door').style.display = 'block';
  document.getElementById('unlocked-door').style.display = 'none';
  // document.getElementById('room-1').style.display = 'block';
  document.getElementById('final-score-section').style.display = 'none';
  document.getElementById('menu-screen').classList.remove('hidden');
  document.getElementById('main-section').classList.add('hidden');
  document.getElementById('game-screen').classList.add('hidden');
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
