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
const examData = {
    title: "日本語初級テスト - Examen Básico de Japonés",
    questions: [
        {
            id: 1,
            type: "multiple",
            text: "¿Cómo se dice 'Yo como' en japonés?",
            options: [
                "Watashi wa tabemasu (私は食べます)",
                "Watashi wa nomimasu (私は飲みます)", 
                "Watashi wa hanashimasu (私は話します)",
                "Watashi wa asobimasu (私は遊びます)"
            ],
            correctAnswer: 0,
            explanation: "'Watashi wa tabemasu' significa 'Yo como'. 'Tabemasu' es la forma educada del verbo 'comer'."
        },
        {
            id: 2,
            type: "multiple",
            text: "¿Qué significa 'Kanojo wa hanashimasu (彼女は話します)'?",
            options: [
                "Ella habla",
                "Ella come", 
                "Ella duerme",
                "Ella juega"
            ],
            correctAnswer: 0,
            explanation: "'Kanojo' significa 'ella' y 'hanashimasu' significa 'habla'. La partícula 'wa' marca el tema de la oración."
        },
        {
            id: 3,
            type: "truefalse",
            text: "'Watashitachi wa asobimasu (私たちは遊びます)' significa 'Nosotros jugamos'.",
            correctAnswer: 0,
            explanation: "¡Correcto! 'Watashitachi' es 'nosotros', 'asobimasu' es 'jugamos'."
        },
        {
            id: 4,
            type: "fillblank",
            text: "La forma en diccionario del verbo 'beber' en japonés es ________.",
            correctAnswer: "nomu",
            explanation: "'Nomu' (飲む) es la forma básica o de diccionario. 'Nomimasu' es la forma educada."
        },
        {
            id: 5,
            type: "dragdrop",
            text: "Arrastra los verbos a sus significados correctos: ________ significa 'dormir', ________ significa 'ver/mirar', ________ significa 'escuchar'.",
            parts: [
                { text: "nemasu", correctPosition: 0 },
                { text: "mimasu", correctPosition: 1 },
                { text: "kikimasu", correctPosition: 2 }
            ],
            options: ["nemasu", "mimasu", "kikimasu", "ikimasu", "kimasu"],
            explanation: "Verbos básicos: nemasu(寝ます - dormir), mimasu(見ます - ver), kikimasu(聞きます - escuchar)"
        },
        {
            id: 6,
            type: "multiple",
            text: "¿Qué verbo se usa para seres vivos en 'estar/en un lugar'?",
            options: [
                "iru (いる)",
                "aru (ある)", 
                "suru (する)",
                "kuru (来る)"
            ],
            correctAnswer: 0,
            explanation: "'Iru' se usa para seres vivos, 'aru' para objetos y cosas. Ejemplo: 'Watashi wa niwa ni imasu' (Estoy en el jardín)."
        },
        {
            id: 7,
            type: "truefalse",
            text: "En japonés, 'desu (です)' solo se usa para describir objetos.",
            correctAnswer: 1,
            explanation: "'Desu' es una cópula que se usa tanto para objetos como para personas. Es similar al verbo 'ser' en español pero con usos diferentes."
        },
        {
            id: 8,
            type: "fillblank",
            text: "La partícula que indica el objeto directo en japonés es ________.",
            correctAnswer: "o",
            explanation: "La partícula 'o' (を) marca el objeto directo. Ejemplo: 'Hon o yomimasu' (Leo un libro)."
        },
        {
            id: 9,
            type: "dragdrop",
            text: "Arrastra los pronombres a sus traducciones correctas: ________ significa 'Yo', ________ significa 'Tú/Usted', ________ significa 'Él'.",
            parts: [
                { text: "watashi", correctPosition: 0 },
                { text: "anata", correctPosition: 1 },
                { text: "kare", correctPosition: 2 }
            ],
            options: ["watashi", "anata", "kare", "kanojo", "watashitachi"],
            explanation: "Pronombres básicos: watashi(私 - yo), anata(あなた - tú/usted), kare(彼 - él)"
        },
        {
            id: 10,
            type: "multiple",
            text: "¿Cómo se dice 'agua' en japonés?",
            options: [
                "Mizu (水)",
                "Kōhī (コーヒー)", 
                "Ocha (お茶)",
                "Gyuunyuu (牛乳)"
            ],
            correctAnswer: 0,
            explanation: "'Mizu' significa 'agua'. 'Ocha' es 'té verde', 'kōhī' es 'café', 'gyuunyuu' es 'leche'."
        },
        {
            id: 11,
            type: "fillblank",
            text: "El verbo 'hacer' en japonés es ________.",
            correctAnswer: "suru",
            explanation: "'Suru' (する) significa 'hacer'. Es un verbo muy versátil que se combina con muchas palabras para formar verbos compuestos."
        },
        {
            id: 12,
            type: "multiple",
            text: "¿Qué partícula indica la dirección hacia donde se va?",
            options: [
                "ni (に)",
                "wa (は)", 
                "ga (が)",
                "o (を)"
            ],
            correctAnswer: 0,
            explanation: "La partícula 'ni' indica dirección o destino. Ejemplo: 'Nihon ni ikimasu' (Voy a Japón)."
        },
        {
            id: 13,
            type: "truefalse",
            text: "'Ohayou gozaimasu' se puede usar solo por la mañana.",
            correctAnswer: 0,
            explanation: "Correcto. 'Ohayou gozaimasu' (おはようございます) es el saludo formal de 'buenos días' y se usa solo por la mañana."
        },
        {
            id: 14,
            type: "dragdrop",
            text: "Arrastra los números a sus equivalentes correctos: ________ es 'uno', ________ es 'dos', ________ es 'tres'.",
            parts: [
                { text: "ichi", correctPosition: 0 },
                { text: "ni", correctPosition: 1 },
                { text: "san", correctPosition: 2 }
            ],
            options: ["ichi", "ni", "san", "shi", "go"],
            explanation: "Números básicos: ichi(1), ni(2), san(3), shi/yon(4), go(5)"
        },
        {
            id: 15,
            type: "multiple",
            text: "¿Cómo se dice 'Me llamo Juan' en japonés?",
            options: [
                "Watashi wa Juan desu",
                "Watashi wa Juan imasu", 
                "Watashi wa Juan arimasu",
                "Watashi wa Juan shimasu"
            ],
            correctAnswer: 0,
            explanation: "Para presentarse se usa 'Watashi wa [nombre] desu'. 'Desu' es la cópula que equivale a 'ser' en este contexto."
        },
        {
            id: 16,
            type: "fillblank",
            text: "La partícula que marca el sujeto en una oración es ________.",
            correctAnswer: "ga",
            explanation: "La partícula 'ga' (が) marca el sujeto gramatical de la oración. A veces se usa 'wa' para el tema, lo que puede crear confusión para aprendices."
        },
        {
            id: 17,
            type: "multiple",
            text: "¿Qué significa 'Itadakimasu'?",
            options: [
                "Se dice antes de comer",
                "Se dice al llegar a casa", 
                "Se dice al irse",
                "Se dice al despertarse"
            ],
            correctAnswer: 0,
            explanation: "'Itadakimasu' (いただきます) es una expresión que se dice antes de comer, mostrando gratitud por la comida."
        },
        {
            id: 18,
            type: "truefalse",
            text: "En japonés, los adjetivos se conjugan como verbos.",
            correctAnswer: 0,
            explanation: "Correcto. Los adjetivos en japonés se conjugan para indicar tiempo y forma negativa/afirmativa, similar a los verbos."
        },
        {
            id: 19,
            type: "dragdrop",
            text: "Arrastra los saludos a sus momentos correctos: ________ para la mañana, ________ para la tarde, ________ para la noche.",
            parts: [
                { text: "Ohayou gozaimasu", correctPosition: 0 },
                { text: "Konnichiwa", correctPosition: 1 },
                { text: "Konbanwa", correctPosition: 2 }
            ],
            options: ["Ohayou gozaimasu", "Konnichiwa", "Konbanwa", "Sayounara", "Oyasumi nasai"],
            explanation: "Saludos por tiempo: Ohayou gozaimasu(buenos días), Konnichiwa(buenas tardes), Konbanwa(buenas noches al encontrarse)"
        },
        {
            id: 20,
            type: "multiple",
            text: "¿Cómo se dice 'Gracias' en japonés de forma formal?",
            options: [
                "Arigatou gozaimasu",
                "Arigatou", 
                "Doumo",
                "Sumimasen"
            ],
            correctAnswer: 0,
            explanation: "'Arigatou gozaimasu' (ありがとうございます) es la forma formal de 'gracias'. 'Arigatou' es informal, 'doumo' es muy casual."
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
                isCorrect = question.parts.every((part, partIndex) => {
                    return userAnswer && userAnswer[partIndex] === part.correctPosition;
                });
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
                    userAnswerText = userAnswer ? question.parts.map((part, partIndex) => 
                        question.options[userAnswer[partIndex]]).join(", ") : "No respondida";
                    correctAnswerText = question.parts.map(part => 
                        question.options[part.correctPosition]).join(", ");
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
            timestamp: serverTimestamp()
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
