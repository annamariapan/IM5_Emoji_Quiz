// Fragen für das Quiz
const questions = [
    {
        //Alle Fragen, die im Quit vorkommen sollen, werden hier eingetragen
      question: "Welches Emoji wird oft verwendet, um Freundschaft oder Zusammenhalt auszudrücken?",
      answers: ["🤝", "👬", "✋"],
      correct: "🤝"
    },

    {
        question: "🗽🍎🏙️ Welche Stadt wird durch diese Emojis repräsentiert?",
        answers: ["Budapest", "New York", "London"],
        correct: "New York"
      },


      {
        question: "Was bedeutet dieses Emoji?😱",
        answers: ["Freude und Stolz", "Angst und Unsicherheit", "Überraschung und Schock"],
        correct: "Überraschung und Schock"
      },

      {
        question: "Welches Emoji wird oft verwendet, um Stille oder Geheimhaltung auszudrücken?",
        answers: ["🤐", "😶", "🙊"],
        correct: "🤐"
      },

      {
        question: "🐇🎩🌸 Welcher klassische Roman wird durch diese Emojis repräsentiert?",
        answers: ["Räuber Hotzenplotz", "Die kleine Hexe", "Alice im Wunderland"],
        correct: "Alice im Wunderland"
      },

      {
        question: "Was bedeutet dieses Emoji?🙌",
        answers: ["Man winkt jemandem zu", "Man jubelt begeistert", "Man betet zu seinem Gott"],
        correct: "Man jubelt begeistert"
      },

      {
        question: "Welches Emoji wird in der Regel verwendet, um Überlegenheit oder Triumph auszudrücken?",
        answers: ["😏", "😠", "😒"],
        correct: "😏"
      },

      {
        question: "🚶🌃🎵 Welcher Songtitel wird durch diese Emojis dargestellt?",
        answers: ["In The Air Tonight", "Walking in the Moonlight", "Last Friday Night "],
        correct: "Walking in the Moonlight"
      },


      {
        question: "Was bedeutet dieses Emoji?🙅",
        answers: ["Man macht einen coolen Tanzschritt", "Man lehnt etwas klar ab", "Man hält links und rechts jemandem die Hand hin"],
        correct: "Man lehnt etwas klar ab"
      },


    // ... (weitere Fragen können hier hinzugefügt werden)
  ];
  
// Aktueller Status des Quizzes
let currentQuestionIndex = 0;
let correctAnswers = 0;
let timer;

// Initialisiert das Quiz, abhängig davon, ob die Startseite oder die Quizseite geladen wird
function initializeQuiz() {
    if (document.getElementById('start-btn')) {
        document.getElementById('start-btn').addEventListener('click', () => {
            window.location.href = 'quiz.html';
        });
    } else if (document.getElementById('question-container')) {
        startGame();
    }
}

// Startet das Quiz, indem es den Timer startet und die erste Frage anzeigt
function startGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    startTimer(60);
    showQuestion();

    // Event-Listener für den 'Nächste Frage'-Button
    document.getElementById('next-btn').addEventListener('click', nextQuestion);

    // Event-Listener für den 'Quiz beenden'-Button
    document.getElementById('submit-btn').addEventListener('click', submitQuiz);
}

// Zeigt die aktuelle Frage und ihre Antwortmöglichkeiten an
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = currentQuestion.question || '';
    document.getElementById('question-number').textContent = `Frage ${currentQuestionIndex + 1} von ${questions.length}`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('btn');
        if (answer === currentQuestion.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        document.getElementById('answer-buttons').appendChild(button);
    });
    // Deaktivieren des 'Nächste Frage'-Buttons zu Beginn jeder Frage
    document.getElementById('next-btn').classList.add('hide');
}

// Setzt den Zustand für die nächste Frage zurück
function resetState() {
    clearStatusClass(document.body);
    while (document.getElementById('answer-buttons').firstChild) {
        document.getElementById('answer-buttons').removeChild(document.getElementById('answer-buttons').firstChild);
    }
}

// Wird aufgerufen, wenn eine Antwort ausgewählt wird
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(document.getElementById('answer-buttons').children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    
    // Überprüfe die Antwort und aktualisiere die Anzahl der korrekten Antworten
    if (correct) correctAnswers++;
    
    // Entscheide, welchen Button man als nächstes anzeigen soll
    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById('next-btn').classList.add('hide');
        document.getElementById('submit-btn').classList.remove('hide');
    } else {
        document.getElementById('next-btn').classList.remove('hide');
    }
}


// Setzt den Status der ausgewählten Antwort (richtig oder falsch)
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Entfernt den Status der vorherigen Antwort
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


// Geht zur nächsten Frage über
function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}


// Beendet das Quiz und zeigt das Ergebnis an
function submitQuiz() {
    clearInterval(timer);
    document.getElementById('question-container').classList.add('hide');
    document.getElementById('results-container').classList.remove('hide');
    document.getElementById('correct-answers').textContent = `Du hast ${correctAnswers} von ${questions.length} Fragen richtig beantwortet!`;

}


// Startet und aktualisiert den Timer für das Quiz
function startTimer(duration) {
    let timeRemaining = duration;
    document.getElementById('timer').textContent = formatTime(timeRemaining);
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer').textContent = formatTime(timeRemaining);
        if (timeRemaining <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

// Formatiert die verbleibende Zeit für den Timer
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Fügt einen Event-Listener hinzu, der das Quiz initialisiert, sobald das DOM geladen ist
document.addEventListener('DOMContentLoaded', initializeQuiz);
