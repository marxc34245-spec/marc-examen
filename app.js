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
    title: "Tesuto - Nihongo no joshi to doushi",
    questions: [
        {
            id: 1,
            type: "multiple",
            text: "¿Qué partícula japonesa se usa para marcar el tema de la oración?",
            options: [
                "wa",
                "ga", 
                "o",
                "ni"
            ],
            correctAnswer: 0,
            explanation: "『wa』 se usa para marcar el tema. Ejemplo: Watashi wa gakusei desu - En cuanto a mí, soy estudiante."
        },
        {
            id: 2,
            type: "multiple",
            text: "¿Cómo se dice 'Yo como pan' en japonés (usando romaji)?",
            options: [
                "Watashi wa pan o tabemasu",
                "Watashi ga pan o tabemasu", 
                "Watashi wa pan ni tabemasu",
                "Watashi no pan o tabemasu"
            ],
            correctAnswer: 0,
            explanation: "『wa』 para el tema (yo), 『o』 para el objeto directo (pan), y 『tabemasu』 para comer."
        },
        {
            id: 3,
            type: "truefalse",
            text: "La partícula 『ga』 marca el sujeto gramatical de la oración.",
            correctAnswer: 0,
            explanation: "Verdadero. 『ga』 marca al que realiza la acción. Ejemplo: Neko ga imasu - Hay un gato."
        },
        {
            id: 4,
            type: "fillblank",
            text: "Completa la oración: Watashi wa tomodachi________eiga o mimasu. (con/to)",
            correctAnswer: "to",
            explanation: "『to』 significa 'con'. Tomodachi to eiga o mimasu - Veo una película con mi amigo."
        },
        {
            id: 5,
            type: "dragdrop",
            text: "Empareja las partículas con sus funciones: ________ (tema), ________ (objeto directo), ________ (lugar de acción)",
            parts: [
                { text: "wa" },
                { text: "o" },
                { text: "de" }
            ],
            options: ["wa", "ga", "o", "ni", "de"],
            explanation: "Funciones: wa (tema), o (objeto directo), de (lugar donde ocurre la acción)"
        },
        {
            id: 6,
            type: "multiple",
            text: "¿Qué partícula se usa para indicar posesión?",
            options: [
                "no",
                "ni", 
                "e",
                "to"
            ],
            correctAnswer: 0,
            explanation: "『no』 indica posesión. Ejemplo: Watashi no hon - Mi libro."
        },
        {
            id: 7,
            type: "truefalse",
            text: "『ka』 al final de una oración afirmativa la convierte en pregunta.",
            correctAnswer: 0,
            explanation: "Verdadero. Ejemplo: Genki desu ka - ¿Estás bien?"
        },
        {
            id: 8,
            type: "fillblank",
            text: "Completa: Kanojo________mizu o nomimasu. (ella/ga)",
            correctAnswer: "ga",
            explanation: "『ga』 marca el sujeto. Kanojo ga mizu o nomimasu - Ella bebe agua."
        },
        {
            id: 9,
            type: "dragdrop",
            text: "Empareja las partículas: ________ (dirección), ________ (tiempo), ________ (medio/método)",
            parts: [
                { text: "ni" },
                { text: "ni" },
                { text: "de" }
            ],
            options: ["wa", "ni", "de", "e", "no"],
            explanation: "Partículas: ni (dirección/tiempo), ni (tiempo), de (medio/método)"
        },
        {
            id: 10,
            type: "multiple",
            text: "¿Cómo se dice 'Ellos van a Japón' en japonés (romaji)?",
            options: [
                "Karera wa Nihon ni ikimasu",
                "Karera ga Nihon o ikimasu", 
                "Karera wa Nihon o ikimasu",
                "Karera no Nihon ni ikimasu"
            ],
            correctAnswer: 0,
            explanation: "『wa』 para el tema, 『ni』 para dirección, 『ikimasu』 para ir."
        },
        {
            id: 11,
            type: "truefalse",
            text: "La partícula 『mo』 significa 'también' y reemplaza a 『wa』, 『ga』, o 『o』.",
            correctAnswer: 0,
            explanation: "Verdadero. Ejemplo: Watashi mo ikimasu - Yo también voy."
        },
        {
            id: 12,
            type: "fillblank",
            text: "Completa: Watashitachi________toshokan________benkyou shimasu. (en/de)",
            correctAnswer: "de",
            explanation: "『de』 indica el lugar donde ocurre la acción. Toshokan de benkyou shimasu - Estudiamos en la biblioteca."
        },
        {
            id: 13,
            type: "dragdrop",
            text: "Completa la oración: Watashi________tomodachi________Tokyo________ikimasu.",
            parts: [
                { text: "wa" },
                { text: "to" },
                { text: "e" }
            ],
            options: ["wa", "ga", "to", "ni", "e"],
            explanation: "Oración completa: Watashi wa tomodachi to Tokyo e ikimasu - Voy a Tokio con mi amigo."
        },
        {
            id: 14,
            type: "multiple",
            text: "¿Qué partícula se usa para marcar el objeto directo?",
            options: [
                "o",
                "ga", 
                "ni",
                "de"
            ],
            correctAnswer: 0,
            explanation: "『o』 marca el objeto directo. Ejemplo: Hon o yomimasu - Leo un libro."
        },
        {
            id: 15,
            type: "truefalse",
            text: "『e』 y 『ni』 son intercambiables cuando indican dirección.",
            correctAnswer: 0,
            explanation: "Verdadero. Ambas pueden indicar dirección, pero 『e』 enfatiza más el movimiento hacia un lugar."
        },
        {
            id: 16,
            type: "fillblank",
            text: "Completa: Anata________namae wa nan desu ka. (posesión/no)",
            correctAnswer: "no",
            explanation: "『no』 indica posesión. Anata no namae - Tu nombre."
        },
        {
            id: 17,
            type: "multiple",
            text: "¿Cómo se dice 'Yo también bebo agua' en japonés (romaji)?",
            options: [
                "Watashi mo mizu o nomimasu",
                "Watashi wa mizu mo nomimasu", 
                "Watashi mo mizu ga nomimasu",
                "Watashi wa mizu o nomimasu mo"
            ],
            correctAnswer: 0,
            explanation: "『mo』 significa 'también' y reemplaza a 『wa』. Watashi mo mizu o nomimasu."
        },
        {
            id: 18,
            type: "dragdrop",
            text: "Empareja las partículas con sus usos: ________ (posesión), ________ (lista/con), ________ (pregunta)",
            parts: [
                { text: "no" },
                { text: "to" },
                { text: "ka" }
            ],
            options: ["wa", "ga", "no", "to", "ka"],
            explanation: "Usos: no (posesión), to (lista/con), ka (pregunta)"
        },
        {
            id: 19,
            type: "fillblank",
            text: "Completa: Kare________sanji________kimasu. (a/ni)",
            correctAnswer: "wa",
            explanation: "Oración completa: Kare wa sanji ni kimasu - Él viene a las 3."
        },
        {
            id: 20,
            type: "multiple",
            text: "¿Qué partícula falta en esta pregunta: Genki desu_____?",
            options: [
                "ka",
                "wa", 
                "ga",
                "o"
            ],
            correctAnswer: 0,
            explanation: "『ka』 al final convierte la oración en pregunta. Genki desu ka - ¿Estás bien?"
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





