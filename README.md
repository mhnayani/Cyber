This project is designed to connect theory and practice by providing a gamified platform for learning about cybersecurity. 
By presenting a range of engaging challenges, we assist university students in developing crucial digital safety skills while enjoying an immersive and entertaining experience

ANSWERS:

Cryptography game:
let puzzles = [
 { cipher: 'UFTU', answer: 'TEST', hint: 'Shift the letters by one.' },
 { cipher: 'JGNNQ', answer: 'HELLO', hint: 'Shift the letters back by 2.' },
 { cipher: 'NZP LZA', answer: 'KEY TWO', hint: 'Substitute letters.' },
 { cipher: 'MPHMXTX', answer: 'SECURE', hint: 'Shift each letter forward by 4.' },
 { cipher: 'LXFOPV EF RNHR', answer: 'ATTACK AT DAWN', hint: 'Try using a Caesar Cipher with a shift of 3.' }
];

Jeopardy:
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
