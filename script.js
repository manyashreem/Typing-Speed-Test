const texts = [
    "The quick brown fox jumps over the lazy dog.",
    "JavaScript is a powerful programming language for web development.",
    "Practice makes perfect. Keep typing to improve your speed.",
    "Coffee is the best friend of programmers worldwide.",
    "Learning new skills every day makes you a better developer."
];

let state = {
    isRunning: false,
    duration: 60,
    timeLeft: 60,
    typed: '',
    prompt: '',
    interval: null
};

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function startSection() {
    showSection('startSection');
}

function startTest() {
    state.duration = parseInt(document.getElementById('duration').value);
    state.timeLeft = state.duration;
    state.typed = '';
    state.isRunning = true;
    state.prompt = texts[Math.floor(Math.random() * texts.length)];

    document.getElementById('promptText').textContent = state.prompt;
    document.getElementById('typingInput').value = '';
    document.getElementById('typingInput').focus();

    showSection('testSection');

    clearInterval(state.interval);
    state.interval = setInterval(() => {
        state.timeLeft--;
        updateDisplay();
        if (state.timeLeft <= 0) endTest();
    }, 1000);

    document.getElementById('typingInput').addEventListener('input', updateStats);
}

function updateDisplay() {
    const mins = Math.floor(state.timeLeft / 60);
    const secs = state.timeLeft % 60;
    document.getElementById('timer').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateStats() {
    state.typed = document.getElementById('typingInput').value;

    const words = state.typed.trim().split(/\s+/).filter(w => w).length;
    const minutes = (state.duration - state.timeLeft) / 60 || 0.016;
    const wpm = Math.round(words / minutes) || 0;

    let correct = 0;
    for (let i = 0; i < state.typed.length; i++) {
        if (state.typed[i] === state.prompt[i]) correct++;
    }
    const accuracy = state.typed.length > 0 ? Math.round((correct / state.typed.length) * 100) : 100;

    document.getElementById('wpm').textContent = wpm;
    document.getElementById('accuracy').textContent = accuracy + '%';
}

function resetTest() {
    clearInterval(state.interval);
    state.isRunning = false;
    startTest();
}

function endTest() {
    clearInterval(state.interval);
    state.isRunning = false;
    document.getElementById('typingInput').removeEventListener('input', updateStats);

    const words = state.typed.trim().split(/\s+/).filter(w => w).length;
    const minutes = state.duration / 60;
    const wpm = Math.round(words / minutes);

    let correct = 0;
    for (let i = 0; i < state.typed.length; i++) {
        if (state.typed[i] === state.prompt[i]) correct++;
    }
    const accuracy = state.typed.length > 0 ? Math.round((correct / state.typed.length) * 100) : 100;

    document.getElementById('resultWPM').textContent = wpm;
    document.getElementById('resultAccuracy').textContent = accuracy + '%';
    document.getElementById('resultTime').textContent = state.duration + 's';
    document.getElementById('resultChars').textContent = state.typed.length;

    showSection('resultsSection');
}

startSection();