document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-quiz-btn');
    const resultsContainer = document.getElementById('quiz-results');

    // --- ОБЯЗАТЕЛЬНО ЗАМЕНИ ЭТИ ВОПРОСЫ НА СВОИ ПРИМЕРЫ ПО ТЕМЕ БАЗ ДАННЫХ ---
    const myQuestions = [
        {
            question: "Какая SQL команда используется для выбора данных из таблицы?",
            answers: {
                a: "UPDATE",
                b: "INSERT",
                c: "SELECT"
            },
            correctAnswer: "c"
        },
        {
            question: "Какой оператор используется для добавления новых строк в таблицу?",
            answers: {
                a: "ADD ROW",
                b: "INSERT INTO",
                c: "NEW RECORD"
            },
            correctAnswer: "b"
        },
        {
            question: "Для чего используется команда `WHERE` в SQL запросе?",
            answers: {
                a: "Для сортировки результатов",
                b: "Для фильтрации записей",
                c: "Для группировки записей"
            },
            correctAnswer: "b"
        },
        // --- Добавь еще 1-2 своих вопроса, чтобы было не менее 3-х ---
        // {
        //     question: "Твой вопрос по базам данных?",
        //     answers: {
        //         a: "Вариант А",
        //         b: "Вариант Б (правильный)",
        //         c: "Вариант В"
        //     },
        //     correctAnswer: "b"
        // }
    ];
    // --- КОНЕЦ ОБЛАСТИ ДЛЯ ЗАМЕНЫ ВОПРОСОВ ---


    function buildQuiz() {
        if (!quizContainer) return; // Если контейнера нет, ничего не делаем

        const output = [];
        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label style="display: block; margin-bottom: 5px;">
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter.toUpperCase()} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="question-block" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
                    <div class="question-text" style="font-weight: bold; margin-bottom: 10px;">${questionNumber + 1}. ${currentQuestion.question}</div>
                    <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        });
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        if (!quizContainer || !resultsContainer) return; // Если элементов нет, ничего не делаем

        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            if (answerContainer) { // Проверяем, что answerContainer существует
                const selector = `input[name=question${questionNumber}]:checked`;
                const userAnswerNode = answerContainer.querySelector(selector);
                const userAnswer = userAnswerNode ? userAnswerNode.value : undefined;

                if (userAnswer === currentQuestion.correctAnswer) {
                    numCorrect++;
                }
            }
        });
        resultsContainer.innerHTML = `Вы ответили правильно на ${numCorrect} из ${myQuestions.length} вопросов.`;
    }

    // Инициализация
    buildQuiz(); 

    if (submitButton) {
        submitButton.addEventListener('click', showResults);
    } else {
        // Это сообщение для отладки, если кнопка не найдена
        // console.error("Кнопка 'submit-quiz-btn' не найдена на странице.");
    }
    
    // Это сообщение для отладки, если контейнеры не найдены
    // if (!quizContainer) console.error("Контейнер 'quiz-container' не найден.");
    // if (!resultsContainer) console.error("Контейнер 'quiz-results' не найден.");
});