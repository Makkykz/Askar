document.addEventListener('DOMContentLoaded', () => {
    const uploadTestFile = document.getElementById('uploadTestFile');
    const fileFeedback = document.getElementById('fileFeedback');

    const loadedQuizArea = document.getElementById('loadedQuizArea');
    const loadedQuizTitle = document.getElementById('loadedQuizTitle');
    const loadedQuizContainer = document.getElementById('loadedQuizContainer');
    const submitLoadedQuizBtn = document.getElementById('submitLoadedQuizBtn');
    const loadedQuizResults = document.getElementById('loadedQuizResults');

    let currentTestData = null; 

    function showFileFeedback(message, type = 'info') {
        fileFeedback.textContent = message;
        if (type === 'error') {
            fileFeedback.style.color = 'red';
            fileFeedback.style.backgroundColor = '#f8d7da';
            fileFeedback.style.borderColor = '#f5c6cb';
        } else if (type === 'success') {
            fileFeedback.style.color = 'green';
            fileFeedback.style.backgroundColor = '#d4edda';
            fileFeedback.style.borderColor = '#c3e6cb';
        } else { // info
            fileFeedback.style.color = 'black';
            fileFeedback.style.backgroundColor = '#e2e3e5';
            fileFeedback.style.borderColor = '#d6d8db';
        }
        fileFeedback.style.border = '1px solid';
        fileFeedback.style.display = 'block';
    }

    if (uploadTestFile) {
        uploadTestFile.addEventListener('change', (event) => {
            const file = event.target.files[0];
            loadedQuizArea.style.display = 'none'; // Скрываем область теста при выборе нового файла
            loadedQuizResults.style.display = 'none';
            currentTestData = null;

            if (file) {
                if (file.type === "application/json" || file.name.endsWith('.json')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        try {
                            const testData = JSON.parse(e.target.result);
                            // Простая валидация структуры JSON
                            if (testData && typeof testData.title === 'string' && Array.isArray(testData.questions) &&
                                testData.questions.every(q => 
                                    typeof q.question === 'string' && 
                                    typeof q.answers === 'object' && 
                                    Object.keys(q.answers).length > 0 &&
                                    typeof q.correctAnswer === 'string'
                                )) {
                                currentTestData = testData;
                                showFileFeedback(`Файл "${file.name}" успешно загружен. Тест "${testData.title}" готов.`, 'success');
                                displayLoadedQuiz(testData);
                            } else {
                                throw new Error("Неверный формат данных в JSON файле. Убедитесь, что файл содержит 'title' и массив 'questions' с правильной структурой.");
                            }
                        } catch (error) {
                            showFileFeedback(`Ошибка при чтении или обработке файла: ${error.message}`, 'error');
                            currentTestData = null;
                        }
                    };
                    reader.onerror = () => {
                        showFileFeedback('Не удалось прочитать файл.', 'error');
                        currentTestData = null;
                    };
                    reader.readAsText(file);
                } else {
                    showFileFeedback('Пожалуйста, выберите файл в формате .json.', 'error');
                    uploadTestFile.value = ''; 
                    currentTestData = null;
                }
            } else {
                 showFileFeedback('Файл не выбран.', 'info');
                 currentTestData = null;
            }
        });
    }

    function displayLoadedQuiz(testData) {
        loadedQuizArea.style.display = 'block';
        loadedQuizTitle.textContent = testData.title;
        
        const output = [];
        testData.questions.forEach((currentQuestion, questionNumber) => {
            const answersHtml = [];
            for (const letter in currentQuestion.answers) {
                answersHtml.push(
                    `<label style="display: block; margin-bottom: 8px; padding: 5px; border-radius:3px; background-color:#fff;">
                        <input type="radio" name="loaded_question_${questionNumber}" value="${letter}" style="margin-right:8px;">
                        <span style="font-weight:bold;">${letter.toUpperCase()}:</span> ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="question-block" style="margin-bottom: 20px; padding: 15px; border: 1px solid #cce5ff; border-radius: 5px; background-color: #e7f5ff;">
                    <div class="question-text" style="font-weight: bold; margin-bottom: 10px; color: #004085;">${questionNumber + 1}. ${currentQuestion.question}</div>
                    <div class="answers"> ${answersHtml.join('')} </div>
                </div>`
            );
        });
        loadedQuizContainer.innerHTML = output.join('');

        if (testData.questions.length > 0) {
            submitLoadedQuizBtn.style.display = 'inline-block';
        } else {
            submitLoadedQuizBtn.style.display = 'none';
            showFileFeedback('Загруженный тест не содержит вопросов.', 'error');
        }
        loadedQuizResults.style.display = 'none'; // Скрываем предыдущие результаты
        loadedQuizResults.innerHTML = '';
    }

    if (submitLoadedQuizBtn) {
        submitLoadedQuizBtn.addEventListener('click', () => {
            if (!currentTestData || !currentTestData.questions || currentTestData.questions.length === 0) {
                showFileFeedback('Нет данных для проверки теста или тест пуст. Пожалуйста, загрузите корректный файл.', 'error');
                return;
            }

            const answerContainers = loadedQuizContainer.querySelectorAll('.answers');
            let numCorrect = 0;
            let answeredQuestions = 0;

            currentTestData.questions.forEach((currentQuestion, questionNumber) => {
                const answerContainer = answerContainers[questionNumber];
                const selector = `input[name=loaded_question_${questionNumber}]:checked`;
                const userAnswerNode = answerContainer.querySelector(selector);
                
                if (userAnswerNode) { // Считаем только отвеченные вопросы
                    answeredQuestions++;
                    const userAnswerValue = userAnswerNode.value;
                    if (userAnswerValue === currentQuestion.correctAnswer) {
                        numCorrect++;
                    }
                }
            });
            
            if (answeredQuestions < currentTestData.questions.length) {
                 showFileFeedback('Пожалуйста, ответьте на все вопросы перед проверкой.', 'error');
                 loadedQuizResults.style.display = 'none';
                 return;
            }


            loadedQuizResults.innerHTML = `Результат: Вы ответили правильно на <strong>${numCorrect}</strong> из <strong>${currentTestData.questions.length}</strong> вопросов.`;
            const successRate = currentTestData.questions.length > 0 ? numCorrect / currentTestData.questions.length : 0;
            loadedQuizResults.style.color = (successRate >= 0.5) ? 'green' : 'red';
            loadedQuizResults.style.border = `1px solid ${(successRate >= 0.5) ? 'green' : 'red'}`;
            loadedQuizResults.style.backgroundColor = (successRate >= 0.5) ? '#d4edda' : '#f8d7da';
            loadedQuizResults.style.display = 'block';
        });
    }
});