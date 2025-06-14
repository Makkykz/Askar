// translator.js
document.addEventListener('DOMContentLoaded', () => {
    const langButtonsContainer = document.getElementById('lang-buttons');

    const translations = {
        "ru": {
            // Общие для всех страниц
            "site_title_header": "Создание базы тестовых вопросов по базам данных на компьютере и разработка программы для тестирования",
            "nav_main": "Главная",
            "nav_about": "О проекте",
            "nav_questions_db": "База вопросов",
            "nav_program": "Программа тестирования",
            "nav_results": "Результаты",
            "nav_create_test": "Создать тест ",
            "nav_take_custom_test": "Пройти загруженный тест",
            "footer_copyright": "© 2024. Сайт проекта.",

            // index.html
            "index_main_title": "Создание базы тестовых вопросов по базам данных на компьютере и разработка программы для тестирования",
            "index_intro_p1": "Этот сайт посвящен проекту на вышеуказанную тему.",
            "index_short_desc_title": "Краткое описание проекта:",
            "index_short_desc_p1": "Целью данной работы является разработка комплексного решения для автоматизации процесса проверки знаний по дисциплине \"Базы данных\". Проект включает в себя создание обширной базы тестовых вопросов различной сложности и тематики, а также разработку интуитивно понятной программы для проведения компьютерного тестирования.",
            "index_short_desc_p2": "На страницах этого сайта вы найдете подробное описание актуальности темы, поставленных задач, структуры базы вопросов, функционала разработанной программы и полученных результатов. Также доступна демонстрационная функция создания простого теста.",
            "index_img_alt_project_illustration": "Иллюстрация к проекту",

            // about.html
            "about_main_title": "О проекте",
            "about_relevance_title": "Актуальность",
            "about_relevance_p1": "В современном образовательном процессе и при оценке квалификации специалистов в области информационных технологий, особое внимание уделяется проверке знаний по фундаментальным дисциплинам, таким как \"Базы данных\". Традиционные методы контроля знаний не всегда позволяют объективно и оперативно оценить уровень подготовки. Разработка автоматизированных систем тестирования позволяет решить эту проблему, обеспечивая эффективность, объективность и возможность многократного использования тестовых материалов. Данный проект направлен на создание именно такого инструмента.",
            "about_goals_title": "Цели и задачи",
            "about_main_goal_strong": "Основная цель проекта:",
            "about_main_goal_text": "Разработка программного комплекса, включающего базу тестовых вопросов по теме \"Базы данных\" и приложение для проведения компьютерного тестирования знаний.",
            "about_tasks_strong": "Основные задачи для достижения цели:",
            "about_task_1": "Проанализировать существующие решения для тестирования и методики оценки знаний по базам данных.",
            "about_task_2": "Спроектировать структуру базы данных для хранения тестовых вопросов, ответов, тематик и уровней сложности.",
            "about_task_3": "Сформировать и наполнить базу данных тестовыми вопросами различных типов.",
            "about_task_4": "Разработать программное приложение с удобным пользовательским интерфейсом.",
            "about_task_5": "Реализовать функционал выбора тестов, прохождения процесса тестирования и отображения итоговых результатов.",
            "about_task_6": "Провести тестирование разработанного программного комплекса.",
            "about_focus_areas_title": "Ключевые аспекты проекта",
            "about_focus_usage_strong": "Область применения:",
            "about_focus_usage_text": "Автоматизация процесса проверки знаний по теме \"Базы данных\" в учебных заведениях или для самоконтроля.",
            "about_focus_dev_strong": "Основные направления разработки:",
            "about_focus_dev_text": "Создание структурированной базы тестовых материалов и разработка программного инструмента для эффективного тестирования.",

            // questions_db.html
            "qdb_main_title": "База тестовых вопросов",
            "qdb_structure_title": "Структура базы данных",
            "qdb_structure_p1": "Для хранения тестовых материалов была спроектирована и создана реляционная база данных. Основные таблицы базы данных включают:",
            "qdb_table_questions": "<strong>Questions (Сұрақтар):</strong> сұрақ мәтінін, сұрақ түрін, күрделілік деңгейін, тақырыпқа сілтемені қамтиды.",
            "qdb_table_answers": "<strong>Answers (Жауаптар):</strong> әр сұраққа жауап нұсқаларын және дұрыс жауап белгісін қамтиды.",
            "qdb_table_topics": "<strong>Topics (Тақырыптар):</strong> сұрақтар тиесілі тақырыптар/бөлімдер анықтамалығы.",
            "qdb_er_diagram_strong": "Схема базы данных (ER-диаграмма):",
            "qdb_er_diagram_alt": "ER-диаграмма базы данных",
            "qdb_types_title": "Типы вопросов",
            "qdb_types_p1": "База данных и программа тестирования поддерживают следующие типы вопросов:",
            "qdb_type_single": "Одиночный выбор.",
            "qdb_type_multiple": "Множественный выбор.",
            "qdb_type_text_input": "Ввод текстового ответа.",
            "qdb_examples_title": "Примеры вопросов",
            "qdb_example1_q": "<strong>Вопрос (Одиночный выбор):</strong> Какая SQL команда используется для выбора данных из таблицы?",
            "qdb_example1_a1": "A) UPDATE",
            "qdb_example1_a2": "B) INSERT",
            "qdb_example1_a3": "C) SELECT <em>(Правильный ответ)</em>",
            "qdb_example1_a4": "D) DELETE",
            "qdb_example2_q": "<strong>Вопрос (Множественный выбор):</strong> Какие из перечисленных являются типами данных в SQL?",
            "qdb_example2_a1": "A) INTEGER <em>(Правильный ответ)</em>",
            "qdb_example2_a2": "B) LOOP",
            "qdb_example2_a3": "C) VARCHAR <em>(Правильный ответ)</em>",
            "qdb_example2_a4": "D) IF-THEN-ELSE",
            "qdb_db_tech_title": "Используемая СУБД",
            "qdb_db_tech_p1": "Для создания и управления базой тестовых вопросов была использована система управления базами данных <strong>SQLite</strong>.",

            // program.html
            "program_main_title": "Программа для тестирования",
            "program_func_title": "Основные возможности программы",
            "program_func_p1": "Разработанная программа предназначена для проведения компьютерного тестирования на основе созданной базы вопросов. Основные функции программы включают:",
            "program_func_li1": "Аутентификация пользователя.",
            "program_func_li2": "Выбор теста.",
            "program_func_li3": "Прохождение теста.",
            "program_func_li4": "Отображение результатов.",
            "program_interface_title": "Интерфейс программы",
            "program_interface_p1": "Ниже представлены скриншоты основных окон программы.",
            "program_scr1_alt": "Главное окно программы",
            "program_scr1_caption": "Рис. 1 - Пример: Главное окно программы.",
            "program_scr2_alt": "Окно прохождения теста",
            "program_scr2_caption": "Рис. 2 - Пример: Окно прохождения теста.",
            "program_scr3_alt": "Окно результатов тестирования",
            "program_scr3_caption": "Рис. 3 - Пример: Окно результатов.",
            "program_devtech_title": "Технологии разработки программы",
            "program_devtech_p1": "Программа для тестирования была разработана с использованием:",
            "program_devtech_lang_strong": "Язык программирования:",
            "program_devtech_lang_text": "Python 3.", // Пример
            "program_devtech_gui_strong": "Графический интерфейс (GUI):",
            "program_devtech_gui_text": "Tkinter.", // Пример
            "program_devtech_db_strong": "Взаимодействие с базой данных:",
            "program_devtech_db_text": "модуль sqlite3 для Python.", // Пример
            "program_demo_test_title": "Демонстрационный мини-тест",
            "program_demo_test_p1": "Это простой пример теста, реализованный на JavaScript, чтобы показать принцип работы. Реальная программа тестирования является отдельным приложением.",

            // results.html
            "results_main_title": "Результаты проекта",
            "results_achieved_title": "Достигнутые результаты",
            "results_achieved_p1": "В ходе выполнения проекта были успешно решены все поставленные задачи и достигнуты следующие ключевые результаты:",
            "results_achieved_li1": "Разработана структура базы данных.",
            "results_achieved_li2": "Сформирована начальная база тестовых вопросов.",
            "results_achieved_li3": "Разработано десктопное приложение для проведения компьютерного тестирования.",
            "results_achieved_li4": "Реализован основной функционал программы.",
            "results_practical_title": "Практическая значимость",
            "results_practical_p1": "Разработанный программный комплекс имеет следующую практическую значимость:",
            "results_practical_li1_strong": "Для образовательных учреждений:",
            "results_practical_li1_text": "Может использоваться для контроля знаний.",
            "results_practical_li2_strong": "Для студентов:",
            "results_practical_li2_text": "Предоставляет инструмент для самопроверки.",
            "results_future_title": "Возможные направления для дальнейшего развития",
            "results_future_p1": "Проект имеет потенциал для дальнейшего развития:",
            "results_future_li1": "Расширение базы тестовых вопросов.",
            "results_future_li2": "Реализация поддержки новых типов вопросов.",
            "results_future_li3": "Разработка веб-версии приложения.",

            // create_test.html
            "create_main_title": "Создание нового теста (демонстрационная версия)",
            "create_warning_p1_strong": "Внимание:",
            "create_warning_p1_text": "Тесты, созданные здесь, сохраняются только локально в вашем браузере. Для передачи теста другому человеку, используйте кнопку \"Скачать тест (файл)\".",
            "create_label_test_title": "Название теста:",
            "create_input_test_title_placeholder": "Введите название вашего теста",
            "create_btn_add_question": "Добавить вопрос",
            "create_btn_save_test": "Сохранить тест (в браузере)",
            "create_btn_export_test": "Скачать тест (файл)",
            "create_btn_preview_test": "Предпросмотр созданного теста",
            "create_preview_area_title_strong": "Предпросмотр теста:",
            
            // take_custom_test.html
            "take_main_title": "Пройти загруженный тест",
            "take_intro_p1": "Загрузите файл с тестом (в формате .json), созданный на странице \"Создать тест \".",
            "take_label_upload_file_strong": "Выберите файл теста (.json):",
        },
        "kk": { // ВНИМАНИЕ: Это машинный перевод. Рекомендуется проверка и коррекция.
            // Общие для всех страниц
            "site_title_header": "Компьютерде дерекқорлар бойынша тест сұрақтарының базасын құру және тестілеу бағдарламасын әзірлеу",
            "nav_main": "Басты бет",
            "nav_about": "Жоба туралы",
            "nav_questions_db": "Сұрақтар базасы",
            "nav_program": "Тестілеу бағдарламасы",
            "nav_results": "Нәтижелер",
            "nav_create_test": "Тест құру ",
            "nav_take_custom_test": "Жүктелген тесттен өту",
            "footer_copyright": "© 2024. Жоба сайты.",

            // index.html
            "index_main_title": "Компьютерде дерекқорлар бойынша тест сұрақтарының базасын құру және тестілеу бағдарламасын әзірлеу",
            "index_intro_p1": "Бұл сайт жоғарыда аталған тақырыптағы жобаға арналған.",
            "index_short_desc_title": "Жобаның қысқаша сипаттамасы:",
            "index_short_desc_p1": "Бұл жұмыстың мақсаты \"Дерекқорлар\" пәні бойынша білімді тексеру процесін автоматтандыруға арналған кешенді шешімді әзірлеу болып табылады. Жоба әртүрлі күрделіліктегі және тақырыптағы тест сұрақтарының кең базасын құруды, сондай-ақ компьютерлік тестілеуді өткізуге арналған интуитивті түсінікті бағдарламаны әзірлеуді қамтиды.",
            "index_short_desc_p2": "Бұл сайттың беттерінде сіз тақырыптың өзектілігі, қойылған міндеттер, сұрақтар базасының құрылымы, әзірленген бағдарламаның функционалдығы және алынған нәтижелер туралы толық сипаттама таба аласыз. Сондай-ақ қарапайым тест құрудың демонстрациялық функциясы қолжетімді.",
            "index_img_alt_project_illustration": "Жоба иллюстрациясы",
            
            // about.html
            "about_main_title": "Жоба туралы",
            "about_relevance_title": "Өзектілігі",
            "about_relevance_p1": "Қазіргі білім беру процесінде және ақпараттық технологиялар саласындағы мамандардың біліктілігін бағалау кезінде \"Дерекқорлар\" сияқты іргелі пәндер бойынша білімді тексеруге ерекше назар аударылады. Дәстүрлі білімді бақылау әдістері дайындық деңгейін объективті және жедел бағалауға әрдайым мүмкіндік бермейді. Автоматтандырылған тестілеу жүйелерін әзірлеу бұл мәселені шешуге мүмкіндік береді, тиімділікті, объективтілікті және тест материалдарын бірнеше рет пайдалану мүмкіндігін қамтамасыз етеді. Бұл жоба дәл осындай құралды құруға бағытталған.",
            "about_goals_title": "Мақсаттар мен міндеттер",
            "about_main_goal_strong": "Жобаның негізгі мақсаты:",
            "about_main_goal_text": "\"Дерекқорлар\" тақырыбы бойынша тест сұрақтарының базасын және білімді компьютерлік тестілеуден өткізуге арналған қосымшаны қамтитын бағдарламалық кешенді әзірлеу.",
            "about_tasks_strong": "Мақсатқа жету үшін негізгі міндеттер:",
            "about_task_1": "Дерекқорлар бойынша тестілеудің қолданыстағы шешімдері мен білімді бағалау әдістемелерін талдау.",
            "about_task_2": "Тест сұрақтарын, жауаптарын, тақырыптарын және күрделілік деңгейлерін сақтауға арналған дерекқор құрылымын жобалау.",
            "about_task_3": "Әртүрлі типтегі тест сұрақтарымен дерекқорды қалыптастыру және толтыру.",
            "about_task_4": "Ыңғайлы пайдаланушы интерфейсі бар бағдарламалық қосымшаны әзірлеу.",
            "about_task_5": "Тесттерді таңдау, тестілеу процесінен өту және қорытынды нәтижелерді көрсету функционалдығын жүзеге асыру.",
            "about_task_6": "Әзірленген бағдарламалық кешенді тестілеуден өткізу.",
            "about_focus_areas_title": "Жобаның негізгі аспектілері",
            "about_focus_usage_strong": "Қолдану саласы:",
            "about_focus_usage_text": "Оқу орындарында немесе өзін-өзі бақылау үшін \"Дерекқорлар\" тақырыбы бойынша білімді тексеру процесін автоматтандыру.",
            "about_focus_dev_strong": "Әзірлеудің негізгі бағыттары:",
            "about_focus_dev_text": "Құрылымдалған тест материалдарының базасын құру және тиімді тестілеуге арналған бағдарламалық құралды әзірлеу.",

            // questions_db.html
            "qdb_main_title": "Сұрақтар базасы",
            "qdb_structure_title": "Дерекқор құрылымы",
            "qdb_structure_p1": "Тест материалдарын сақтау үшін реляциялық дерекқор жобаланып, құрылды. Дерекқордың негізгі кестелеріне мыналар жатады:",
            "qdb_table_questions": "<strong>Сұрақтар (Questions):</strong> сұрақтың мәтінін, сұрақтың түрін, күрделілік деңгейін, тақырыпқа сілтемені қамтиды.",
            "qdb_table_answers": "<strong>Жауаптар (Answers):</strong> әр сұраққа жауап нұсқаларын және дұрыс жауап белгісін қамтиды.",
            "qdb_table_topics": "<strong>Тақырыптар (Topics):</strong> сұрақтар жататын тақырыптар/бөлімдердің анықтамалығы.",
            "qdb_er_diagram_strong": "Дерекқор схемасы (ER-диаграмма):",
            "qdb_er_diagram_alt": "Дерекқордың ER-диаграммасы",
            "qdb_types_title": "Сұрақ түрлері",
            "qdb_types_p1": "Дерекқор және тестілеу бағдарламасы келесі сұрақ түрлерін қолдайды:",
            "qdb_type_single": "Бір таңдау.",
            "qdb_type_multiple": "Көп таңдау.",
            "qdb_type_text_input": "Мәтіндік жауапты енгізу.",
            "qdb_examples_title": "Сұрақ мысалдары",
            "qdb_example1_q": "<strong>Сұрақ (Бір таңдау):</strong> Кестеден деректерді таңдау үшін қандай SQL командасы қолданылады?",
            "qdb_example1_a1": "A) UPDATE",
            "qdb_example1_a2": "B) INSERT",
            "qdb_example1_a3": "C) SELECT <em>(Дұрыс жауап)</em>",
            "qdb_example1_a4": "D) DELETE",
            "qdb_example2_q": "<strong>Сұрақ (Көп таңдау):</strong> Төмендегілердің қайсысы SQL-дегі деректер түрлері болып табылады?",
            "qdb_example2_a1": "A) INTEGER <em>(Дұрыс жауап)</em>",
            "qdb_example2_a2": "B) LOOP",
            "qdb_example2_a3": "C) VARCHAR <em>(Дұрыс жауап)</em>",
            "qdb_example2_a4": "D) IF-THEN-ELSE",
            "qdb_db_tech_title": "Қолданылатын ДҚБЖ",
            "qdb_db_tech_p1": "Тест сұрақтарының базасын құру және басқару үшін <strong>SQLite</strong> дерекқорды басқару жүйесі қолданылды.",

            // program.html
            "program_main_title": "Тестілеу бағдарламасы",
            "program_func_title": "Бағдарламаның негізгі мүмкіндіктері",
            "program_func_p1": "Әзірленген бағдарлама құрылған сұрақтар базасы негізінде компьютерлік тестілеуді өткізуге арналған. Бағдарламаның негізгі функцияларына мыналар жатады:",
            "program_func_li1": "Пайдаланушыны аутентификациялау.",
            "program_func_li2": "Тестті таңдау.",
            "program_func_li3": "Тесттен өту.",
            "program_func_li4": "Нәтижелерді көрсету.",
            "program_interface_title": "Бағдарлама интерфейсі",
            "program_interface_p1": "Төменде бағдарламаның негізгі терезелерінің скриншоттары келтірілген.",
            "program_scr1_alt": "Бағдарламаның негізгі терезесі",
            "program_scr1_caption": "Сурет 1 - Мысал: Бағдарламаның негізгі терезесі.",
            "program_scr2_alt": "Тесттен өту терезесі",
            "program_scr2_caption": "Сурет 2 - Мысал: Тесттен өту терезесі.",
            "program_scr3_alt": "Тестілеу нәтижелерінің терезесі",
            "program_scr3_caption": "Сурет 3 - Мысал: Нәтижелер терезесі.",
            "program_devtech_title": "Бағдарламаны әзірлеу технологиялары",
            "program_devtech_p1": "Тестілеу бағдарламасы келесілерді пайдалана отырып әзірленді:",
            "program_devtech_lang_strong": "Бағдарламалау тілі:",
            "program_devtech_lang_text": "Python 3.", // Мысал
            "program_devtech_gui_strong": "Графикалық пайдаланушы интерфейсі (GUI):",
            "program_devtech_gui_text": "Tkinter.", // Мысал
            "program_devtech_db_strong": "Дерекқормен өзара әрекеттесу:",
            "program_devtech_db_text": "Python үшін sqlite3 модулі.", // Мысал
            "program_demo_test_title": "Демонстрациялық мини-тест",
            "program_demo_test_p1": "Бұл JavaScript көмегімен жасалған тесттің қарапайым мысалы, оның жұмыс істеу принципін көрсету үшін. Нақты тестілеу бағдарламасы жеке қосымша болып табылады.",

            // results.html
            "results_main_title": "Жоба нәтижелері",
            "results_achieved_title": "Қол жеткізілген нәтижелер",
            "results_achieved_p1": "Жобаны орындау барысында барлық қойылған міндеттер сәтті шешіліп, келесі негізгі нәтижелерге қол жеткізілді:",
            "results_achieved_li1": "Дерекқор құрылымы әзірленді.",
            "results_achieved_li2": "Тест сұрақтарының бастапқы базасы қалыптастырылды.",
            "results_achieved_li3": "Компьютерлік тестілеуді өткізуге арналған десктоптық қосымша әзірленді.",
            "results_achieved_li4": "Бағдарламаның негізгі функционалдығы жүзеге асырылды.",
            "results_practical_title": "Практикалық маңыздылығы",
            "results_practical_p1": "Әзірленген бағдарламалық кешеннің келесі практикалық маңыздылығы бар:",
            "results_practical_li1_strong": "Білім беру мекемелері үшін:",
            "results_practical_li1_text": "Білімді бақылау үшін пайдаланылуы мүмкін.",
            "results_practical_li2_strong": "Студенттер үшін:",
            "results_practical_li2_text": "Өзін-өзі тексеруге арналған құралды ұсынады.",
            "results_future_title": "Болашақта дамытудың ықтимал бағыттары",
            "results_future_p1": "Жобаның одан әрі даму әлеуеті бар:",
            "results_future_li1": "Тест сұрақтарының базасын кеңейту.",
            "results_future_li2": "Жаңа сұрақ түрлерін қолдауды жүзеге асыру.",
            "results_future_li3": "Қосымшаның веб-нұсқасын әзірлеу.",
            
            // create_test.html
            "create_main_title": "Жаңа тест құру ",
            "create_warning_p1_strong": "Назар аударыңыз:",
            "create_warning_p1_text": "Мұнда жасалған тесттер тек сіздің браузеріңізде жергілікті түрде сақталады. Тестті басқа адамға беру үшін \"Тестті жүктеп алу (файл)\" түймесін пайдаланыңыз.",
            "create_label_test_title": "Тест атауы:",
            "create_input_test_title_placeholder": "Тестіңіздің атауын енгізіңіз",
            "create_btn_add_question": "Сұрақ қосу",
            "create_btn_save_test": "Тестті сақтау (браузерде)",
            "create_btn_export_test": "Тестті жүктеп алу (файл)",
            "create_btn_preview_test": "Құрылған тестті алдын ала қарау",
            "create_preview_area_title_strong": "Тестті алдын ала қарау:",

            // take_custom_test.html
            "take_main_title": "Жүктелген тесттен өту",
            "take_intro_p1": "\"Тест құру \" бетінде жасалған тест файлы (.json форматында) жүктеп алыңыз.",
            "take_label_upload_file_strong": "Тест файлын (.json) таңдаңыз:",
        }
    };

    function createLangButtons() {
        if (!langButtonsContainer) return;

        const ruButton = document.createElement('button');
        ruButton.id = 'lang-ru-btn';
        ruButton.textContent = 'РУС';
        ruButton.classList.add('lang-btn');
        ruButton.addEventListener('click', () => setLanguage('ru'));

        const kkButton = document.createElement('button');
        kkButton.id = 'lang-kk-btn';
        kkButton.textContent = 'ҚАЗ';
        kkButton.classList.add('lang-btn');
        kkButton.addEventListener('click', () => setLanguage('kk'));
        
        const separator = document.createElement('span');
        separator.textContent = ' / ';
        separator.style.color = '#fff'; 
        separator.style.margin = '0 5px';

        langButtonsContainer.appendChild(ruButton);
        langButtonsContainer.appendChild(separator);
        langButtonsContainer.appendChild(kkButton);
    }

    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' && element.placeholder) {
                    element.placeholder = translations[lang][key];
                } else if (element.tagName === 'IMG' && element.alt) {
                    element.alt = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        if (document.getElementById('lang-ru-btn')) {
            document.getElementById('lang-ru-btn').classList.toggle('active', lang === 'ru');
            document.getElementById('lang-kk-btn').classList.toggle('active', lang === 'kk');
        }
    }

    createLangButtons();

    const savedLang = localStorage.getItem('language') || 'ru';
    setLanguage(savedLang);
});