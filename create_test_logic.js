document.addEventListener('DOMContentLoaded', () => {
    const testTitleInput = document.getElementById('testTitle');
    const questionsContainer = document.getElementById('questionsContainer');
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    const saveTestBtn = document.getElementById('saveTestBtn');
    const exportTestBtn = document.getElementById('exportTestBtn'); // Добавили кнопку экспорта
    const previewTestBtn = document.getElementById('previewTestBtn');
    const feedbackMessage = document.getElementById('feedbackMessage');

    const testPreviewArea = document.getElementById('testPreviewArea');
    const previewTestTitle = document.getElementById('previewTestTitle');
    const previewQuizContainer = document.getElementById('previewQuizContainer');
    const submitPreviewBtn = document.getElementById('submitPreviewBtn');
    const previewQuizResults = document.getElementById('previewQuizResults');

    let questionFormCounter = 0;

    function createQuestionFormBlock() {
        questionFormCounter++;
        const questionIdSuffix = `new_${questionFormCounter}`;

        const block = document.createElement('div');
        block.className = 'question-input-block';
        block.id = `question_block_${questionIdSuffix}`;
        block.style.border = '1px solid #e0e0e0';
        block.style.padding = '15px';
        block.style.marginBottom = '20px';
        block.style.backgroundColor = '#fdfdfd';
        block.style.borderRadius = '5px';

        block.innerHTML = `
            <h4 style="margin-top:0; margin-bottom:10px; color:#333;">Вопрос ${questionFormCounter}</h4>
            <label for="text_${questionIdSuffix}" style="display:block; margin-bottom:3px;">Текст вопроса:</label>
            <textarea id="text_${questionIdSuffix}" name="text_${questionIdSuffix}" rows="2" placeholder="Введите текст вопроса здесь..." style="width: 98%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;"></textarea>
            <div class="options-container">
                <p style="margin-bottom:5px; font-weight:500;">Варианты ответов (минимум 2, отметьте правильный):</p>
                ${[0, 1, 2, 3].map(i => `
                    <div class="option-entry" style="display:flex; align-items:center; margin-bottom:8px;">
                        <input type="radio" name="correct_option_${questionIdSuffix}" value="${i}" id="correct_${questionIdSuffix}_${i}" style="margin-right:8px;">
                        <input type="text" name="option_text_${questionIdSuffix}" placeholder="Текст ответа ${i + 1}" style="flex-grow:1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                    </div>
                `).join('')}
            </div>
            <button type="button" class="removeQuestionBtn" style="margin-top:10px; background-color: #dc3545; color:white; border:none; padding: 8px 12px; border-radius:4px; cursor:pointer;">Удалить этот вопрос</button>
        `;
        block.querySelector('.removeQuestionBtn').addEventListener('click', () => {
            block.remove();
        });
        return block;
    }

    if (addQuestionBtn) {
        addQuestionBtn.addEventListener('click', () => {
            questionsContainer.appendChild(createQuestionFormBlock());
            feedbackMessage.textContent = '';
            feedbackMessage.style.display = 'none';
        });
    }
    
    function collectAndValidateTestData() {
        const testTitle = testTitleInput.value.trim();
        if (!testTitle) {
            showFeedback('Ошибка: Пожалуйста, введите название теста.', 'red');
            return null;
        }

        const questionInputBlocks = questionsContainer.querySelectorAll('.question-input-block');
        if (questionInputBlocks.length === 0) {
            showFeedback('Ошибка: Добавьте хотя бы один вопрос в тест.', 'red');
            return null;
        }

        const questionsData = [];
        let allQuestionsValid = true;

        questionInputBlocks.forEach((block, index) => {
            if (!allQuestionsValid) return; // Если уже была ошибка, не продолжаем
            
            const questionTextarea = block.querySelector('textarea[id^="text_"]');
            const questionText = questionTextarea.value.trim();
            if (!questionText) {
                showFeedback(`Ошибка: Введите текст для Вопроса ${index + 1}.`, 'red');
                allQuestionsValid = false;
                return;
            }

            const optionTextInputs = block.querySelectorAll('input[name^="option_text_"]');
            const correctRadioInput = block.querySelector('input[name^="correct_option_"]:checked');
            
            const answers = {};
            const answerLetters = ['a', 'b', 'c', 'd'];
            let filledOptionsCount = 0;

            optionTextInputs.forEach((optInput) => {
                const optText = optInput.value.trim();
                if (optText) {
                    answers[answerLetters[filledOptionsCount]] = optText;
                    filledOptionsCount++;
                }
            });

            if (filledOptionsCount < 2) {
                showFeedback(`Ошибка: Вопрос ${index + 1} должен иметь как минимум 2 заполненных варианта ответа.`, 'red');
                allQuestionsValid = false;
                return;
            }

            if (!correctRadioInput) {
                showFeedback(`Ошибка: Отметьте правильный вариант ответа для Вопроса ${index + 1}.`, 'red');
                allQuestionsValid = false;
                return;
            }
            
            const correctOptionIndex = parseInt(correctRadioInput.value);
            const correctOptionText = optionTextInputs[correctOptionIndex].value.trim();
            if (!correctOptionText) {
                showFeedback(`Ошибка: Правильный вариант ответа для Вопроса ${index + 1} не должен быть пустым.`, 'red');
                allQuestionsValid = false;
                return;
            }

            let correctAnswerKey = null;
            let tempKeyIndex = 0;
            for (const key in answers) {
                if (answers[key] === correctOptionText && tempKeyIndex === correctOptionIndex) {
                    correctAnswerKey = key;
                    break;
                }
                tempKeyIndex++;
            }
             if (!correctAnswerKey && answers[answerLetters[correctOptionIndex]] === correctOptionText) {
                 correctAnswerKey = answerLetters[correctOptionIndex];
             }


            if (!correctAnswerKey) {
                showFeedback(`Ошибка: Не удалось определить правильный ответ для Вопроса ${index + 1}. Убедитесь, что он заполнен и выбран.`, 'red');
                allQuestionsValid = false;
                return;
            }

            questionsData.push({
                question: questionText,
                answers: answers, 
                correctAnswer: correctAnswerKey 
            });
        });

        if (!allQuestionsValid) return null;

        return {
            title: testTitle,
            questions: questionsData
        };
    }

    function showFeedback(message, color) {
        feedbackMessage.textContent = message;
        feedbackMessage.style.color = color;
        feedbackMessage.style.backgroundColor = (color === 'red') ? '#f8d7da' : (color === 'green' ? '#d4edda' : '#d1ecf1'); // Added blue for info
        feedbackMessage.style.borderColor = (color === 'red') ? '#f5c6cb' : (color === 'green' ? '#c3e6cb' : '#bee5eb');
        feedbackMessage.style.border = '1px solid';
        feedbackMessage.style.display = 'block';
    }

    if (saveTestBtn) {
        saveTestBtn.addEventListener('click', () => {
            const testData = collectAndValidateTestData();
            if (testData) {
                try {
                    localStorage.setItem('userCreatedTestV2', JSON.stringify(testData));
                    showFeedback(`Тест "${testData.title}" успешно сохранен в вашем браузере!`, 'green');
                } catch (e) {
                    showFeedback('Ошибка сохранения теста.', 'red');
                    console.error("Error saving to localStorage:", e);
                }
            }
        });
    }

    if (exportTestBtn) { // Обработчик для новой кнопки
        exportTestBtn.addEventListener('click', () => {
            const testData = collectAndValidateTestData();
            if (testData) {
                try {
                    const jsonData = JSON.stringify(testData, null, 2);
                    const blob = new Blob([jsonData], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    const fileName = (testData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'custom_test') + '.json';
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    showFeedback(`Тест "${testData.title}" подготовлен к скачиванию как ${fileName}.`, 'green');
                } catch (e) {
                    showFeedback('Ошибка при экспорте теста.', 'red');
                    console.error("Error exporting test:", e);
                }
            } else {
                if (!testTitleInput.value.trim() || questionsContainer.querySelectorAll('.question-input-block').length === 0) {
                     showFeedback('Сначала создайте и заполните тест для экспорта.', 'red');
                }
            }
        });
    }

    if (previewTestBtn) {
        previewTestBtn.addEventListener('click', () => {
            previewQuizResults.innerHTML = '';
            previewQuizResults.style.display = 'none';
            const testData = collectAndValidateTestData();
            if (testData && testData.questions.length > 0) {
                showFeedback('Тест готов к предпросмотру ниже.', 'blue');
                testPreviewArea.style.display = 'block';
                previewTestTitle.textContent = testData.title;
                buildAndDisplayPreviewQuiz(testData.questions);
            } else if (testData && testData.questions.length === 0) {
                showFeedback('Добавьте вопросы в тест для предпросмотра.', 'red');
                testPreviewArea.style.display = 'none';
            } else {
                testPreviewArea.style.display = 'none';
            }
        });
    }
    
    function buildAndDisplayPreviewQuiz(questions) {
        const output = [];
        questions.forEach((currentQuestion, questionNumber) => {
            const answersHtml = [];
            for (const letter in currentQuestion.answers) {
                answersHtml.push(
                    `<label style="display: block; margin-bottom: 8px; padding: 5px; border-radius:3px; background-color:#fff;">
                        <input type="radio" name="preview_question_${questionNumber}" value="${letter}" style="margin-right:8px;">
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
        previewQuizContainer.innerHTML = output.join('');

        if (questions.length > 0) {
            submitPreviewBtn.style.display = 'inline-block';
            submitPreviewBtn.onclick = () => showPreviewTestResults(questions); 
        } else {
            submitPreviewBtn.style.display = 'none';
        }
    }
    
    function showPreviewTestResults(questionsArray) {
        const answerContainers = previewQuizContainer.querySelectorAll('.answers');
        let numCorrect = 0;

        questionsArray.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=preview_question_${questionNumber}]:checked`;
            const userAnswerNode = answerContainer.querySelector(selector);
            const userAnswerValue = userAnswerNode ? userAnswerNode.value : undefined;

            if (userAnswerValue === currentQuestion.correctAnswer) {
                numCorrect++;
            }
        });
        previewQuizResults.innerHTML = `Результат предпросмотра: Вы ответили правильно на <strong>${numCorrect}</strong> из <strong>${questionsArray.length}</strong> вопросов.`;
        const successRate = questionsArray.length > 0 ? numCorrect / questionsArray.length : 0;
        previewQuizResults.style.color = (successRate >= 0.5) ? 'green' : 'red';
        previewQuizResults.style.border = `1px solid ${(successRate >= 0.5) ? 'green' : 'red'}`;
        previewQuizResults.style.backgroundColor = (successRate >= 0.5) ? '#d4edda' : '#f8d7da';
        previewQuizResults.style.display = 'block';
    }

    if (questionsContainer && typeof createQuestionFormBlock === 'function') {
        questionsContainer.appendChild(createQuestionFormBlock());
    }
});