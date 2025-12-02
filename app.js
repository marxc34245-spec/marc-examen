// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHTXUL3A3MQAsvCjoZ6zwJzj6LCudNfKw",
    authDomain: "examen-f53a9.firebaseapp.com",
    projectId: "examen-f53a9",
    storageBucket: "examen-f53a9.firebasestorage.app",
    messagingSenderId: "189548436998",
    appId: "1:189548436998:web:ef64eee38ba6d7987eed87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Datos del examen con diferentes tipos de preguntas
// Datos del examen para practicar japonés - Verbos y Pronombres
const examData = {
    title: "日本語テスト - Verbos y Partículas",
    questions: [
        {
            id: 1,
            type: "multiple",
            text: "¿Cómo se dice 'yo' en japonés?",
            options: [
                "watashi",
                "anata", 
                "kare",
                "kanojo"
            ],
            correctAnswer: 0,
            explanation: "『watashi』 es 'yo' en japonés (formal/neutral)."
        },
        {
            id: 2,
            type: "truefalse",
            text: "『tabemasu』 es la forma educada de 'comer'.",
            correctAnswer: 0,
            explanation: "Verdadero. 『tabemasu』 es la forma educada, 『taberu』 es la forma diccionario."
        },
        {
            id: 3,
            type: "fillblank",
            text: "La forma diccionario de 'nomimasu' (beber) es: ________",
            correctAnswer: "nomu",
            explanation: "『nomimasu』 (forma educada) → 『nomu』 (forma diccionario)."
        },
        {
            id: 4,
            type: "multiple",
            text: "¿Qué partícula marca el tema de la oración?",
            options: [
                "wa",
                "ga", 
                "o",
                "ni"
            ],
            correctAnswer: 0,
            explanation: "『wa』 marca el tema. Ejemplo: Watashi wa gakusei desu."
        },
        {
            id: 5,
            type: "dragdrop",
            text: "Empareja los verbos: ________ (comer), ________ (dormir), ________ (hablar)",
            parts: [
                { text: "taberu" },
                { text: "neru" },
                { text: "hanasu" }
            ],
            options: ["taberu", "nomu", "neru", "hanasu", "asobu"],
            explanation: "Formas diccionario: taberu (comer), neru (dormir), hanasu (hablar)."
        },
        {
            id: 6,
            type: "multiple",
            text: "¿Qué significa 'kare wa ikimasu'?",
            options: [
                "Él va",
                "Él viene", 
                "Él ve",
                "Él hace"
            ],
            correctAnswer: 0,
            explanation: "『kare』 (él) + 『wa』 (tema) + 『ikimasu』 (va)."
        },
        {
            id: 7,
            type: "truefalse",
            text: "『desu』 es equivalente al verbo 'ser' en español.",
            correctAnswer: 0,
            explanation: "Verdadero. Se usa para describir características permanentes."
        },
        {
            id: 8,
            type: "fillblank",
            text: "La partícula que marca el objeto directo es: ________",
            correctAnswer: "o",
            explanation: "『o』 marca el objeto directo. Ejemplo: Hon o yomimasu."
        },
        {
            id: 9,
            type: "dragdrop",
            text: "Completa la oración: Watashi________tomodachi________eiga________mimasu.",
            parts: [
                { text: "wa" },
                { text: "to" },
                { text: "o" }
            ],
            options: ["wa", "ga", "to", "ni", "o"],
            explanation: "Watashi wa tomodachi to eiga o mimasu - Veo una película con mi amigo."
        },
        {
            id: 10,
            type: "multiple",
            text: "¿Cómo se dice 'nosotros' en japonés?",
            options: [
                "watashitachi",
                "karera", 
                "kanojotachi",
                "anatatachi"
            ],
            correctAnswer: 0,
            explanation: "『watashitachi』 significa 'nosotros'."
        },
        {
            id: 11,
            type: "truefalse",
            text: "『ka』 al final de una oración la convierte en pregunta.",
            correctAnswer: 0,
            explanation: "Verdadero. Ejemplo: Genki desu ka? (¿Estás bien?)"
        },
        {
            id: 12,
            type: "fillblank",
            text: "La partícula de posesión es: ________",
            correctAnswer: "no",
            explanation: "『no』 indica posesión. Ejemplo: Watashi no hon (mi libro)."
        },
        {
            id: 13,
            type: "dragdrop",
            text: "Empareja los verbos con sus significados: ________ (ver), ________ (escuchar), ________ (jugar)",
            parts: [
                { text: "miru" },
                { text: "kiku" },
                { text: "asobu" }
            ],
            options: ["miru", "kiku", "asobu", "iku", "kuru"],
            explanation: "Verbos: miru (ver), kiku (escuchar), asobu (jugar)."
        },
        {
            id: 14,
            type: "multiple",
            text: "¿Qué partícula se usa para indicar dirección?",
            options: [
                "ni",
                "de", 
                "wa",
                "o"
            ],
            correctAnswer: 0,
            explanation: "『ni』 indica dirección. Ejemplo: Nihon ni ikimasu (Voy a Japón)."
        },
        {
            id: 15,
            type: "truefalse",
            text: "『iru』 se usa solo para seres vivos.",
            correctAnswer: 0,
            explanation: "Verdadero. 『iru』 para seres vivos, 『aru』 para objetos."
        },
        {
            id: 16,
            type: "fillblank",
            text: "La forma educada de 'kuru' (venir) es: ________",
            correctAnswer: "kimasu",
            explanation: "『kuru』 (forma diccionario) → 『kimasu』 (forma educada)."
        },
        {
            id: 17,
            type: "dragdrop",
            text: "Completa con partículas: Kanojo________ongaku________kikimasu.",
            parts: [
                { text: "wa" },
                { text: "o" }
            ],
            options: ["wa", "ga", "o", "ni", "de"],
            explanation: "Kanojo wa ongaku o kikimasu - Ella escucha música."
        },
        {
            id: 18,
            type: "multiple",
            text: "¿Qué significa 'watashi mo'?",
            options: [
                "Yo también",
                "Yo", 
                "Tú también",
                "Nosotros también"
            ],
            correctAnswer: 0,
            explanation: "『mo』 significa 'también'. Watashi mo ikimasu (Yo también voy)."
        },
        {
            id: 19,
            type: "truefalse",
            text: "『to』 puede significar 'y' o 'con'.",
            correctAnswer: 0,
            explanation: "Verdadero. Ejemplo: Pan to mizu (pan y agua); Tomodachi to (con mi amigo)."
        },
        {
            id: 20,
            type: "fillblank",
            text: "La partícula que indica lugar donde ocurre la acción es: ________",
            correctAnswer: "de",
            explanation: "『de』 indica el lugar de la acción. Ejemplo: Gakkou de benkyou shimasu."
        },
        {
            id: 21,
            type: "dragdrop",
            text: "Empareja pronombres con partículas: ________ wa, ________ ga, ________ o",
            parts: [
                { text: "watashi" },
                { text: "kanojo" },
                { text: "hon" }
            ],
            options: ["watashi", "kanojo", "hon", "toshokan", "tomodachi"],
            explanation: "Ejemplos: watashi wa (yo tema), kanojo ga (ella sujeto), hon o (libro objeto)."
        },
        {
            id: 22,
            type: "multiple",
            text: "¿Cómo se dice 'ellos' en japonés?",
            options: [
                "karera",
                "kanojotachi", 
                "watashitachi",
                "anatatachi"
            ],
            correctAnswer: 0,
            explanation: "『karera』 es 'ellos' (masculino). 『kanojotachi』 es 'ellas'."
        },
        {
            id: 23,
            type: "truefalse",
            text: "『e』 es una partícula de dirección similar a 『ni』.",
            correctAnswer: 0,
            explanation: "Verdadero. Ambas indican dirección, pero 『e』 enfatiza el movimiento."
        },
        {
            id: 24,
            type: "fillblank",
            text: "La forma diccionario de 'ikimasu' (ir) es: ________",
            correctAnswer: "iku",
            explanation: "『ikimasu』 (forma educada) → 『iku』 (forma diccionario)."
        },
        {
            id: 25,
            type: "dragdrop",
            text: "Completa con verbos: Watashi wa ________, anata wa ________, kare wa ________",
            parts: [
                { text: "tabemasu" },
                { text: "nomimasu" },
                { text: "mimasu" }
            ],
            options: ["tabemasu", "nomimasu", "mimasu", "ikimasu", "kimasu"],
            explanation: "Yo como, tú bebes, él ve."
        },
        {
            id: 26,
            type: "multiple",
            text: "¿Qué partícula se usa para hacer una pregunta?",
            options: [
                "ka",
                "wa", 
                "ga",
                "o"
            ],
            correctAnswer: 0,
            explanation: "『ka』 al final de la oración forma una pregunta. Ejemplo: Ikimasu ka? (¿Va?)"
        }
    ]
};


// Variables de estado
let currentQuestionIndex = 0;
let userAnswers = Array(examData.questions.length).fill(null);
let examSubmitted = false;

// Elementos del DOM
const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const progressBar = document.getElementById('progress');
const resultsContainer = document.getElementById('results-container');
const scoreElement = document.getElementById('score');
const incorrectQuestionsContainer = document.getElementById('incorrect-questions');

// Función para mostrar la pregunta actual
function displayQuestion() {
    const question = examData.questions[currentQuestionIndex];
    
    let questionHTML = `
        <div class="question-number">問題 ${currentQuestionIndex + 1} / ${examData.questions.length}</div>
        <div class="question-text">${question.text}</div>
    `;
    
    // Renderizar según el tipo de pregunta
    switch(question.type) {
        case "multiple":
            questionHTML += renderMultipleChoice(question);
            break;
        case "truefalse":
            questionHTML += renderTrueFalse(question);
            break;
        case "fillblank":
            questionHTML += renderFillBlank(question);
            break;
        case "dragdrop":
            questionHTML += renderDragDrop(question);
            break;
    }
    
    questionContainer.innerHTML = questionHTML;
    
    // Actualizar barra de progreso
    const progressPercentage = ((currentQuestionIndex + 1) / examData.questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    
    // Actualizar estado de los botones de navegación
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === examData.questions.length - 1;
    
    // Agregar event listeners según el tipo de pregunta
    addEventListeners(question);
}

// Renderizar pregunta de opción múltiple
function renderMultipleChoice(question) {
    return `
        <div class="options-container">
            ${question.options.map((option, index) => `
                <div class="option ${userAnswers[currentQuestionIndex] === index ? 'selected' : ''}" data-index="${index}">
                    ${option}
                </div>
            `).join('')}
        </div>
    `;
}

// Renderizar pregunta verdadero/falso en japonés
function renderTrueFalse(question) {
    const userAnswer = userAnswers[currentQuestionIndex];
    return `
        <div class="truefalse-container">
            <div class="truefalse-option true-option ${userAnswer === 0 ? 'selected' : ''}" data-value="0">
                真 (Verdadero)
            </div>
            <div class="truefalse-option false-option ${userAnswer === 1 ? 'selected' : ''}" data-value="1">
                偽 (Falso)
            </div>
        </div>
    `;
}

// Renderizar pregunta de autocompletar
function renderFillBlank(question) {
    const userAnswer = userAnswers[currentQuestionIndex] || '';
    return `
        <div class="fill-blank-container">
            <div class="fill-blank-text">${question.text.replace('________', '<input type="text" class="blank-input" value="' + userAnswer + '">')}</div>
        </div>
    `;
}

// Renderizar pregunta de arrastrar y soltar
function renderDragDrop(question) {
    const userAnswer = userAnswers[currentQuestionIndex] || Array(question.parts.length).fill(null);
    
    // Crear texto con zonas de drop
    let textWithDropZones = question.text;
    question.parts.forEach((part, index) => {
        const droppedItem = userAnswer[index] !== null ? 
            `<span class="dropped-item" data-index="${index}">${question.options[userAnswer[index]]}</span>` : 
            '';
        textWithDropZones = textWithDropZones.replace('________', 
            `<span class="drop-zone ${userAnswer[index] !== null ? 'filled' : ''}" data-index="${index}">${droppedItem}</span>`);
    });
    
    // Crear elementos arrastrables
    const availableItems = question.options.map((option, index) => {
        const isUsed = userAnswer.includes(index);
        return `<div class="drag-item ${isUsed ? 'used' : ''}" data-index="${index}" draggable="true">${option}</div>`;
    }).join('');
    
    return `
        <div class="drag-drop-container">
            <div class="drag-drop-text">${textWithDropZones}</div>
            <div class="drag-items-container">
                ${availableItems}
            </div>
        </div>
    `;
}

// Agregar event listeners según el tipo de pregunta
function addEventListeners(question) {
    switch(question.type) {
        case "multiple":
            addMultipleChoiceListeners();
            break;
        case "truefalse":
            addTrueFalseListeners();
            break;
        case "fillblank":
            addFillBlankListeners();
            break;
        case "dragdrop":
            addDragDropListeners(question);
            break;
    }
}

// Event listeners para opción múltiple
function addMultipleChoiceListeners() {
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            if (examSubmitted) return;
            
            // Deseleccionar todas las opciones
            document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            
            // Seleccionar la opción clickeada
            option.classList.add('selected');
            
            // Guardar la respuesta del usuario
            userAnswers[currentQuestionIndex] = parseInt(option.getAttribute('data-index'));
        });
    });
}

// Event listeners para verdadero/falso
function addTrueFalseListeners() {
    document.querySelectorAll('.truefalse-option').forEach(option => {
        option.addEventListener('click', () => {
            if (examSubmitted) return;
            
            // Deseleccionar todas las opciones
            document.querySelectorAll('.truefalse-option').forEach(opt => opt.classList.remove('selected'));
            
            // Seleccionar la opción clickeada
            option.classList.add('selected');
            
            // Guardar la respuesta del usuario
            userAnswers[currentQuestionIndex] = parseInt(option.getAttribute('data-value'));
        });
    });
}

// Event listeners para autocompletar
function addFillBlankListeners() {
    const input = document.querySelector('.blank-input');
    if (input) {
        input.addEventListener('input', () => {
            if (examSubmitted) return;
            userAnswers[currentQuestionIndex] = input.value;
        });
    }
}

// Event listeners para arrastrar y soltar - CORREGIDO
function addDragDropListeners(question) {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    // Configurar elementos arrastrables
    dragItems.forEach(item => {
        item.addEventListener('dragstart', (e) => dragStart(e, question));
        item.addEventListener('dragend', dragEnd);
    });
    
    // Configurar zonas de destino
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', dragOver);
        zone.addEventListener('dragenter', dragEnter);
        zone.addEventListener('dragleave', dragLeave);
        zone.addEventListener('drop', (e) => drop(e, question));
    });
}

function dragStart(e, question) {
    if (examSubmitted) return;
    
    // Verificar que el target sea un elemento válido
    const target = e.target.closest('.drag-item');
    if (!target) return;
    
    e.dataTransfer.setData('text/plain', target.getAttribute('data-index'));
    setTimeout(() => {
        target.classList.add('dragging');
    }, 0);
}

function dragEnd(e) {
    const target = e.target.closest('.drag-item');
    if (target) {
        target.classList.remove('dragging');
    }
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    const target = e.target.closest('.drop-zone');
    if (target) {
        target.classList.add('hover');
    }
}

function dragLeave(e) {
    const target = e.target.closest('.drop-zone');
    if (target) {
        target.classList.remove('hover');
    }
}

function drop(e, question) {
    e.preventDefault();
    const zone = e.target.closest('.drop-zone');
    if (!zone) return;
    
    zone.classList.remove('hover');
    
    const itemIndex = e.dataTransfer.getData('text/plain');
    const zoneIndex = parseInt(zone.getAttribute('data-index'));
    
    // Actualizar respuesta del usuario
    if (!userAnswers[currentQuestionIndex]) {
        userAnswers[currentQuestionIndex] = Array(question.parts.length).fill(null);
    }
    userAnswers[currentQuestionIndex][zoneIndex] = parseInt(itemIndex);
    
    // Actualizar la vista
    displayQuestion();
}

// Navegación entre preguntas
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
});

// Enviar examen
submitBtn.addEventListener('click', async () => {
    // Verificar que todas las preguntas estén respondidas
    const unanswered = userAnswers.some((answer, index) => {
        const question = examData.questions[index];
        
        if (answer === null) return true;
        
        // Para drag & drop, verificar que todas las partes estén completas
        if (question.type === "dragdrop") {
            return answer.some(part => part === null);
        }
        
        return false;
    });
    
    if (unanswered) {
        alert('すべての質問に答えてから試験を送信してください。'); // Por favor, responde todas las preguntas
        return;
    }
    
    // Calcular resultados
    const results = calculateResults();
    
    // Mostrar resultados
    displayResults(results);
    
    // Enviar a Firebase
    const saveSuccess = await saveResultsToFirestore(results);
    
    if (saveSuccess) {
        examSubmitted = true;
        submitBtn.disabled = true;
        submitBtn.textContent = '試験送信済み';
    }
});

// Calcular resultados
function calculateResults() {
    let correctAnswers = 0;
    const incorrectQuestions = [];
    
    examData.questions.forEach((question, index) => {
        let isCorrect = false;
        const userAnswer = userAnswers[index];
        
        switch(question.type) {
            case "multiple":
            case "truefalse":
                isCorrect = userAnswer === question.correctAnswer;
                break;
            case "fillblank":
                isCorrect = userAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
                break;
            case "dragdrop":
                // NUEVA LÓGICA: Comparar textos directamente
                if (userAnswer && Array.isArray(userAnswer)) {
                    isCorrect = question.parts.every((part, partIndex) => {
                        const userSelectedIndex = userAnswer[partIndex];
                        const userSelectedText = question.options[userSelectedIndex];
                        return userSelectedText === part.text;
                    });
                }
                break;
        }
        
        if (isCorrect) {
            correctAnswers++;
        } else {
            let userAnswerText = "";
            let correctAnswerText = "";
            
            switch(question.type) {
                case "multiple":
                    userAnswerText = question.options[userAnswer] || "No respondida";
                    correctAnswerText = question.options[question.correctAnswer];
                    break;
                case "truefalse":
                    userAnswerText = userAnswer === 0 ? "真 (Verdadero)" : userAnswer === 1 ? "偽 (Falso)" : "No respondida";
                    correctAnswerText = question.correctAnswer === 0 ? "真 (Verdadero)" : "偽 (Falso)";
                    break;
                case "fillblank":
                    userAnswerText = userAnswer || "No respondida";
                    correctAnswerText = question.correctAnswer;
                    break;
                case "dragdrop":
                    // CORREGIDO: Usar la misma lógica que en calculateResults
                    userAnswerText = userAnswer ? userAnswer.map(index => 
                        question.options[index]).join(", ") : "No respondida";
                    correctAnswerText = question.parts.map(part => part.text).join(", ");
                    break;
            }
            
            incorrectQuestions.push({
                question: question.text,
                userAnswer: userAnswerText,
                correctAnswer: correctAnswerText,
                explanation: question.explanation
            });
        }
    });
    
    const score = (correctAnswers / examData.questions.length) * 100;
    
    return {
        score: score.toFixed(2),
        correctAnswers,
        totalQuestions: examData.questions.length,
        incorrectQuestions
    };
}

// Mostrar resultados
function displayResults(results) {
    scoreElement.textContent = `得点: ${results.score}% (${results.correctAnswers} / ${results.totalQuestions} 正解)`;
    
    if (results.incorrectQuestions.length > 0) {
        incorrectQuestionsContainer.innerHTML = `
            <h3>間違えた問題:</h3>
            ${results.incorrectQuestions.map(question => `
                <div class="incorrect-question">
                    <p><strong>問題:</strong> ${question.question}</p>
                    <p><span class="user-answer">あなたの答え:</span> ${question.userAnswer}</p>
                    <p><span class="correct-answer">正解:</span> ${question.correctAnswer}</p>
                    <p><span class="explanation">説明:</span> ${question.explanation}</p>
                </div>
            `).join('')}
        `;
    } else {
        incorrectQuestionsContainer.innerHTML = '<p>おめでとうございます！すべての問題に正解しました。</p>';
    }
    
    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Guardar resultados en Firebase - CORREGIDO
async function saveResultsToFirestore(results) {
    try {
        // Mostrar indicador de carga
        questionContainer.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>データベースに結果を送信中...</p>
            </div>
        `;
        
        // Preparar datos para Firebase (evitar arrays anidados)
        const firestoreData = {
            examTitle: examData.title,
            score: results.score,
            correctAnswers: results.correctAnswers,
            totalQuestions: examData.questions.length,
            timestamp: serverTimestamp(),
            userAnswers: userAnswers, // Ahora es más simple
            incorrectQuestions: results.incorrectQuestions
        };
        
        // Convertir userAnswers a formato compatible con Firestore
        const formattedUserAnswers = userAnswers.map((answer, index) => {
            const question = examData.questions[index];
            
            if (question.type === "dragdrop" && Array.isArray(answer)) {
                // Para dragdrop, convertir array a objeto
                const dragDropAnswer = {};
                answer.forEach((item, posIndex) => {
                    dragDropAnswer[`pos_${posIndex}`] = item;
                });
                return {
                    type: "dragdrop",
                    value: dragDropAnswer
                };
            } else {
                return {
                    type: question.type,
                    value: answer
                };
            }
        });
        
        firestoreData.userAnswers = formattedUserAnswers;
        firestoreData.incorrectQuestions = results.incorrectQuestions;
        
        const docRef = await addDoc(collection(db, "examResults"), firestoreData);
        
        console.log("Resultados guardados con ID: ", docRef.id);
        
        // Ocultar indicador de carga
        displayQuestion();
        return true;
    } catch (e) {
        console.error("Error al guardar los resultados: ", e);
        
        let errorMessage = "結果の保存中にエラーが発生しました。 ";
        
        if (e.code === 'permission-denied') {
            errorMessage += "権限エラー。Firestoreのルールを確認してください。";
        } else if (e.message.includes('Nested arrays')) {
            errorMessage += "データ形式に問題があります。";
        } else {
            errorMessage += "もう一度お試しください。";
        }
        
        alert(errorMessage);
        
        // Ocultar indicador de carga
        displayQuestion();
        return false;
    }
}

// Inicializar la aplicación
displayQuestion();







