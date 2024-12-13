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

let jeopardyScore = 0;
let jeopardyQuestions = [
  // Row 1
  { question: "What does HTTP stand for?", answer: "HyperText Transfer Protocol", score: 100 },
  { question: "What does DNS stand for?", answer: "Domain Name System", score: 200 },
  { question: "What does SSL stand for?", answer: "Secure Sockets Layer", score: 300 },
  { question: "What is the main purpose of a firewall?", answer: "To block unauthorized access", score: 400 },
  // Row 2
  { question: "What does IP stand for?", answer: "Internet Protocol", score: 100 },
  { question: "What is phishing?", answer: "A cyberattack to steal personal information", score: 200 },
  { question: "What is the strongest password?", answer: "A mix of letters, numbers, and symbols", score: 300 },
  { question: "What is two-factor authentication?", answer: "A method requiring two forms of verification", score: 400 },
  // Row 3
  { question: "What does VPN stand for?", answer: "Virtual Private Network", score: 100 },
  { question: "What is ransomware?", answer: "A type of malware demanding payment", score: 200 },
  { question: "What is encryption?", answer: "Encoding data to protect it from unauthorized access", score: 300 },
  { question: "What is a botnet?", answer: "A network of infected devices used in cyberattacks", score: 400 },
  // Row 4
  { question: "What does IoT stand for?", answer: "Internet of Things", score: 100 },
  { question: "What is social engineering?", answer: "Manipulating people to gain confidential information", score: 200 },
  { question: "What is malware?", answer: "Software designed to harm or exploit devices", score: 300 },
  { question: "What does PKI stand for?", answer: "Public Key Infrastructure", score: 400 }
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

let phishingChallenges = [
  { 
    challenge: "You receive an email saying you've won a prize. It asks for your credit card information. What should you do?", 
    answer: 'Ignore and delete the email', 
    btn1: 'Provide your information to claim the prize', 
    btn2: 'Ignore and delete the email', 
    btn3: 'Forward to a friend to check' 
  },
  { 
    challenge: 'An email claims to be from your bank, asking you to verify your account by clicking a link. What should you do?', 
    answer: 'Contact your bank directly', 
    btn1: 'Click the link to verify your account', 
    btn2: 'Contact your bank directly', 
    btn3: 'Reply asking for more information' 
  },
  { 
    challenge: 'A message from an unknown sender asks you to install an update for better security. What should you do?', 
    answer: 'Do not install it, and delete the message', 
    btn1: 'Install the update for security', 
    btn2: 'Do not install it, and delete the message', 
    btn3: 'Forward the message to IT' 
  },
  { 
    challenge: 'You receive a friend request on social media from someone you don’t know. What’s the best action?', 
    answer: 'Ignore the request', 
    btn1: 'Accept the request', 
    btn2: 'Ignore the request', 
    btn3: 'Send a message to get to know them' 
  },
  { 
    challenge: 'You see an ad offering a “too good to be true” deal. It asks for personal information to redeem. What should you do?', 
    answer: 'Ignore and do not provide information', 
    btn1: 'Enter your details to claim the offer', 
    btn2: 'Ignore and do not provide information', 
    btn3: 'Share the ad with friends' 
  }
];

let passwordPuzzles = [
  { 
    challenge: 'Which of the following passwords is considered most secure?', 
    answer: 'P@ssw0rd2023!', 
    btn1: 'pass123', 
    btn2: 'password123', 
    btn3: 'P@ssw0rd2023!',
    btn4: 'abc123' 
  },
  { 
    challenge: 'Which of these is the best practice for creating a secure password?', 
    answer: 'Combine random words with special characters', 
    btn1: "Use your birthdate and pet's name", 
    btn2: 'Combine random words with special characters', 
    btn3: 'Use the word "password" with a number at the end',
    btn4: 'Use your favorite color and the year' 
  },
  { 
    challenge: 'Which password is the strongest due to character variety?', 
    answer: 'P@ssw0rd!23', 
    btn1: 'qwerty123', 
    btn2: 'MyPassword123', 
    btn3: 'P@ssw0rd!23',
    btn4: '1234567890' 
  },
  { 
    challenge: 'Which of these passwords should you avoid using because it is commonly guessed?', 
    answer: '123456', 
    btn1: '!LoveCoding123', 
    btn2: 'Pa$$w0rd123!', 
    btn3: 'Sunshine2022',
    btn4: '123456' 
  },
  { 
    challenge: 'Which of these examples is the best passphrase for both security and memorability?', 
    answer: 'Cats$Love!Sun2023', 
    btn1: 'RedBlueYellowGreen', 
    btn2: 'Cats$Love!Sun2023', 
    btn3: 'ABC123!',
    btn4: 'name@123' 
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

// Event listener for the Password Strength Meter button
document.getElementById('start-password').addEventListener('click', function() {
  document.getElementById('menu-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  document.getElementById('main-section').classList.remove('hidden');
  let elements = document.querySelectorAll('.puzzle-section');
  elements.forEach(element => element.classList.add('hidden'));
  document.getElementById('room-4').classList.remove('hidden');
  loadNextPasswordQuestion(); // Load the first puzzle
});

// Event listener for the Phishing Game button
document.getElementById('start-phishing').addEventListener('click', function() {
  document.getElementById('menu-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  document.getElementById('main-section').classList.remove('hidden');
  let elements = document.querySelectorAll('.puzzle-section');
  elements.forEach(element => element.classList.add('hidden'));
  document.getElementById('room-3').classList.remove('hidden');
  loadNextPhishing(); // Load the first phishing challenge
});

// Event listener for the Back to Menu button
document.getElementById('back-to-menu').addEventListener('click', function() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('menu-screen').classList.remove('hidden');
  resetGame(); // Reset the game when going back to the menu
});

// Event listener for the Jeopardy Game button
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('start-jeopardy').addEventListener('click', function () {
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('main-section').classList.remove('hidden');

    // Hide unnecessary instructions
    document.getElementById('instruction-text').classList.add('hidden');
    document.querySelector('.instruction').classList.add('hidden');

    let elements = document.querySelectorAll('.puzzle-section');
    elements.forEach(element => element.classList.add('hidden'));
    document.getElementById('room-5').classList.remove('hidden'); // Show Jeopardy section
    loadJeopardyBoard();
  });
});

function loadJeopardyBoard() {
  const board = document.getElementById('jeopardy-board');
  board.innerHTML = ""; // Clear the board before adding buttons

  jeopardyQuestions.forEach((q, index) => {
    const cell = document.createElement('button');
    cell.textContent = `${q.score}`; // Initially show the score value
    cell.classList.add('jeopardy-cell');
    cell.setAttribute('data-index', index);

    // Add click event to show the question in the clicked cell
    cell.onclick = function () {
      console.log(`Button ${index + 1} clicked`);
      showJeopardyQuestion(cell, index);
    };

    board.appendChild(cell);
  });
}

function showJeopardyQuestion(cell, index) {
  const question = jeopardyQuestions[index];
  console.log(`Displaying question ${index + 1}: ${question.question}`);

  // Replace button text with the question
  cell.textContent = question.question;

  // Disable the button to prevent re-clicking
  cell.disabled = true;

  // Show an answer input and submit button below the board
  const answerContainer = document.getElementById('jeopardy-answer-container');
  answerContainer.innerHTML = `
    <p>Answer for: ${question.question}</p>
    <input type="text" id="jeopardy-answer" placeholder="Your answer" style="width: 80%; padding: 10px;">
    <button id="submit-jeopardy-answer" class="btn" style="margin-top: 10px;">Submit</button>
  `;

  // Add click handler for the submit button
  document.getElementById('submit-jeopardy-answer').onclick = function () {
    console.log(`Submitting answer for question ${index + 1}`);
    checkJeopardyAnswer(index, cell);
  };
}

// function checkJeopardyAnswer(index, cell) {
//   const userAnswer = document.getElementById('jeopardy-answer').value.trim();
//   const question = jeopardyQuestions[index];

//   if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
//     alert('Correct!');
//     cell.textContent = '✓'; // Mark the cell as answered
//     // Update the score display
//     updateScoreDisplay(question.score);
//   } else {
//     alert(`Incorrect! The correct answer is: ${question.answer}`);
//     cell.textContent = '✗'; // Mark the cell as incorrect
//   }

//   console.log(`Updated score: ${jeopardyScore}`);
//   console.log(`Question score: ${question.score}`);

//   // Clear the answer container
//   document.getElementById('jeopardy-answer-container').innerHTML = '';
// }

// Function to calculate similarity using Levenshtein Distance
function calculateSimilarity(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1;
      }
    }
  }
  return dp[a.length][b.length];
}

// Enhanced answer check
function isAnswerCorrect(userAnswer, correctAnswer) {
  userAnswer = userAnswer.trim().toLowerCase();
  correctAnswer = correctAnswer.trim().toLowerCase();

  // Allow exact match
  if (userAnswer === correctAnswer) {
    return true;
  }

  // Allow fuzzy match with a similarity threshold
  const similarityThreshold = 10; // Adjust based on leniency
  const similarity = calculateSimilarity(userAnswer, correctAnswer);

  return similarity <= similarityThreshold;
}

// Updated function to check Jeopardy answer
function checkJeopardyAnswer(index, cell) {
  const userAnswer = document.getElementById('jeopardy-answer').value.trim();
  const question = jeopardyQuestions[index];

  if (isAnswerCorrect(userAnswer, question.answer)) {
    alert('Correct!');
    cell.textContent = '✓'; // Mark the cell as answered
    // Update the score display
    updateScoreDisplay(question.score);
  } else {
    alert(`Incorrect! The correct answer is: ${question.answer}`);
    cell.textContent = '✗'; // Mark the cell as incorrect
  }

  console.log(`Updated score: ${jeopardyScore}`);
  console.log(`Question score: ${question.score}`);

  // Clear the answer container
  document.getElementById('jeopardy-answer-container').innerHTML = '';
}

function updateScoreDisplay(score) {
  jeopardyScore += score
  const scoreElement = document.getElementById('jeopardy-score');
  scoreElement.textContent = `Score: ${jeopardyScore}`;
}

// Reset all game progress
function resetGame() {
  // Reset game variables
  currentPuzzleIndex = 0;
  keysDropped = 0;
  inventory = [];

  // Clear inventory UI
  document.getElementById('inventory').innerHTML = '';

  // Reset door and puzzle screens
  document.getElementById('locked-door').style.display = 'block';
  document.getElementById('unlocked-door').style.display = 'none';
  document.querySelector('.room-layout').classList.add('hidden');
  document.getElementById('final-score-section').style.display = 'none';

  // Clear puzzle input and feedback for cryptography
  document.getElementById('cipher-input').value = '';
  document.getElementById('cipher-result').textContent = '';

  // clear jeopardy game score
  jeopardyScore = 0;

  // Update the score display
  updateScoreDisplay(jeopardyScore);

  // Clear the Jeopardy board
  const board = document.getElementById('jeopardy-board');
  board.innerHTML = ""; // Remove all buttons

  // Clear the answer container
  const answerContainer = document.getElementById('jeopardy-answer-container');
  answerContainer.innerHTML = "";

  console.log("Jeopardy game has been reset.");

  // Clear password input and feedback
  document.getElementById('password-input').value = '';
  document.getElementById('password-feedback').textContent = '';
  document.querySelectorAll('#password-feedback li').forEach(li => li.classList.remove('met'));
  document.getElementById('confirm-password').disabled = true;

  // Reset cyberbullying feedback
  document.getElementById('feedback1').textContent = '';

  // Reset phishing feedback
  document.getElementById('phishing-feedback').textContent = '';

  // Reset password meter feedback
  document.getElementById('password-meter-feedback').textContent = '';

  // Hide all game sections
  let elements = document.querySelectorAll('.puzzle-section');
  elements.forEach(element => element.classList.add('hidden'));

  // Reload the first puzzle in each game type if needed
  loadNextPuzzle();
  loadNextCyber();
  loadNextPhishing();
  loadNextPasswordQuestion();
}

// Event listeners for solving puzzles, showing hints, and learning ciphers
document.getElementById('check-cipher').addEventListener('click', checkCipher);
document.getElementById('show-hint').addEventListener('click', showHint);
document.getElementById('learn-ciphers').addEventListener('click', openCipherModal);
document.getElementById('close-modal').addEventListener('click', closeCipherModal);

function loadNextPhishing() {
  if (currentPuzzleIndex < phishingChallenges.length) {
    document.getElementById('phishing-question').textContent = phishingChallenges[currentPuzzleIndex].challenge;
    document.getElementById('phishing-btn-1').textContent = phishingChallenges[currentPuzzleIndex].btn1;
    document.getElementById('phishing-btn-2').textContent = phishingChallenges[currentPuzzleIndex].btn2;
    document.getElementById('phishing-btn-3').textContent = phishingChallenges[currentPuzzleIndex].btn3;
  }
}

function checkPhishing(id) {
  const userInput = document.getElementById(id).textContent.trim();
  const challenge = phishingChallenges[currentPuzzleIndex];

  if (userInput === challenge.answer) {
    document.getElementById('phishing-feedback').textContent = 'Correct!';
    addToInventory(`yellowkey${currentPuzzleIndex + 1}`);
    currentPuzzleIndex++;

    if (currentPuzzleIndex < totalKeys) {
      loadNextPhishing();
    } else {
      document.getElementById('room-3').classList.add('hidden');
      showInventoryAndDoor();
    }
  } else {
    document.getElementById('phishing-feedback').textContent = 'Incorrect, try again.';
  }
}

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

function checkPassword(id) {
  const userInput = document.getElementById(id).textContent.trim();
  const puzzle = passwordPuzzles[currentPuzzleIndex];

  if (userInput === puzzle.answer) {
    document.getElementById('password-meter-feedback').innerHTML = '';
    addToInventory(`yellowkey${currentPuzzleIndex + 1}`);
    currentPuzzleIndex++;

    if (currentPuzzleIndex < totalKeys) {
      loadNextPasswordQuestion();
    } else {
      document.getElementById('room-4').classList.add('hidden');
      showInventoryAndDoor();
    }
  } else {
    document.getElementById('password-meter-feedback').innerHTML = 'Incorrect, try again.';
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

function loadNextPasswordQuestion() {
  if (currentPuzzleIndex < totalKeys) {
    document.getElementById('password-question').innerHTML = passwordPuzzles[currentPuzzleIndex].challenge;
    document.getElementById('password-btn-1').innerHTML = passwordPuzzles[currentPuzzleIndex].btn1;
    document.getElementById('password-btn-2').innerHTML = passwordPuzzles[currentPuzzleIndex].btn2;
    document.getElementById('password-btn-3').innerHTML = passwordPuzzles[currentPuzzleIndex].btn3;
    document.getElementById('password-btn-4').innerHTML = passwordPuzzles[currentPuzzleIndex].btn4;
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
  document.getElementById('password-question').innerHTML = '';
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
