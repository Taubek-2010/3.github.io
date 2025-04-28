document.addEventListener('DOMContentLoaded', function() {
    // Данные карточек
    const cardsData = [
        {
            question: "Теорема Пифагора",
            answer: "В прямоугольном треугольнике: \\(c^2 = a^2 + b^2\\)",
            image: "pythagoras"
        },
        {
            question: "Площадь круга",
            answer: "Вычисляется по формуле: \\(S = \\pi r^2\\)",
            image: "circle"
        },
        {
            question: "Квадратное уравнение",
            answer: "Решение: \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\)",
            image: "quadratic"
        },
        {
            question: "Объем шара",
            answer: "Формула: \\(V = \\frac{4}{3}\\pi r^3\\)",
            image: "sphere"
        },
        {
            question: "Производная",
            answer: "Скорость изменения функции в точке",
            image: "derivative"
        },
        {
            question: "Логарифм",
            answer: "\\(\\log_a b\\) - степень для получения \\(b\\) из \\(a\\)",
            image: "logarithm"
        },
        {
            question: "Интеграл",
            answer: "Площадь под кривой функции",
            image: "integral"
        },
        {
            question: "Бином Ньютона",
            answer: "\\((a + b)^n = \\sum_{k=0}^n C(n,k) a^{n-k}b^k\\)",
            image: "binomial"
        },
        {
            question: "Мнимая единица",
            answer: "\\(i\\) - число, где \\(i^2 = -1\\)",
            image: "imaginary"
        },
        {
            question: "Определитель матрицы 2×2",
            answer: "\\(\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc\\)",
            image: "matrix"
        }
    ];

    // Элементы DOM
    const flashcard = document.getElementById('flashcard');
    const cardTitle = document.querySelector('.card-title');
    const cardAnswer = document.querySelector('.card-answer');
    const cardCounter = document.querySelector('.card-counter');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const themeBtn = document.getElementById('theme-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text span');
    const cardImages = document.querySelectorAll('.card-image');
    
    // Состояние
    let currentCardIndex = 0;
    let shuffledCards = [...cardsData];
    let isDarkTheme = false;
    
    // Инициализация
    init();
    
    function init() {
        updateCard();
        setupEventListeners();
    }
    
    function setupEventListeners() {
        // Переворот карточки
        flashcard.addEventListener('click', flipCard);
        document.querySelectorAll('.flip-button').forEach(btn => {
            btn.addEventListener('click', flipCard);
        });
        
        // Навигация
        prevBtn.addEventListener('click', showPrevCard);
        nextBtn.addEventListener('click', showNextCard);
        shuffleBtn.addEventListener('click', shuffleCards);
        themeBtn.addEventListener('click', toggleTheme);
        
        // Клавиатурная навигация
        document.addEventListener('keydown', handleKeyDown);
    }
    
    function flipCard() {
        flashcard.classList.toggle('flipped');
        
        // Анимация "пружинки"
        flashcard.style.transform = flashcard.classList.contains('flipped') 
            ? 'rotateY(180deg) scale(1.03)' 
            : 'rotateY(0deg) scale(1.03)';
        
        setTimeout(() => {
            flashcard.style.transform = flashcard.classList.contains('flipped') 
                ? 'rotateY(180deg) scale(1)' 
                : 'rotateY(0deg) scale(1)';
        }, 300);
    }
    
    function showPrevCard() {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            animateCardChange('left');
        } else {
            animateShake(prevBtn);
        }
    }
    
    function showNextCard() {
        if (currentCardIndex < shuffledCards.length - 1) {
            currentCardIndex++;
            animateCardChange('right');
        } else {
            animateShake(nextBtn);
        }
    }
    
    function animateCardChange(direction) {
        // Анимация исчезновения
        flashcard.style.opacity = '0';
        flashcard.style.transform = direction === 'left' 
            ? 'translateX(-30px) rotateY(0deg)' 
            : 'translateX(30px) rotateY(0deg)';
        
        setTimeout(() => {
            updateCard();
            // Анимация появления
            flashcard.style.opacity = '1';
            flashcard.style.transform = 'translateX(0) rotateY(0deg)';
            
            // Сбрасываем переворот
            if (flashcard.classList.contains('flipped')) {
                flashcard.classList.remove('flipped');
            }
        }, 300);
    }
    
    function animateShake(element) {
        element.classList.add('animate__animated', 'animate__headShake');
        setTimeout(() => {
            element.classList.remove('animate__animated', 'animate__headShake');
        }, 1000);
    }
    
    function updateCard() {
        const card = shuffledCards[currentCardIndex];
        cardTitle.textContent = card.question;
        cardAnswer.innerHTML = card.answer;
        
        // Обновляем изображение
        updateCardImage(card.image);
        
        // Обновляем счетчик
        cardCounter.textContent = `${currentCardIndex + 1}/${shuffledCards.length}`;
        
        // Обновляем прогресс
        updateProgress();
        
        // Перерендериваем MathJax
        if (window.MathJax) {
            MathJax.typesetPromise();
        }
    }
    
    function updateCardImage(imageType) {
        const color = isDarkTheme ? '%23e2e8f0' : '%234255ff';
        const svgMap = {
            pythagoras: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M21 3H3v18h18V3zm-2 16H5V5h14v14z"/><path d="M15 8v8h-2v-6h-2v6H9V8h2v6h2V8h2z"/></svg>`,
            circle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><circle cx="12" cy="12" r="10"/></svg>`,
            quadratic: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M7 10h10v2H7zm0 4h7v2H7z"/></svg>`,
            sphere: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6" fill="none" stroke="${color}" stroke-width="2"/></svg>`,
            derivative: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M5 19h14v2H5zM19 3H5v2h14v2h-6v2h6v2h-6v2h6v2h-6v2h6v2H5v2h14v2H5v-2H3v-2h2v-2H3v-2h2v-2H3v-2h2v-2H3V9h2V7H3V5h2V3H3V1h2v2h14v2z"/></svg>`,
            logarithm: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><path d="M8 17h2v-5h1v-1h3v1h1v5h2v-6h-3v-1h-3v1H8z"/></svg>`,
            integral: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M11 3h2v18h-2z"/><path d="M5 3h2v6h2v2H7v6h10v-2h2v6h-2v-2H7v2H5z"/></svg>`,
            binomial: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><path d="M12 7h-2v2h2v2h-2v2h2v2h-2v2h2v-2h2v-2h-2v-2h2V9h-2V7z"/></svg>`,
            imaginary: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 10.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,
            matrix: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M3 3v18h18V3H3zm16 16H5V5h14v14z"/><path d="M7 7h4v4H7zm0 6h4v4H7zm6-6h4v4h-4zm0 6h4v4h-4z"/></svg>`
        };
        
        const svg = svgMap[imageType] || svgMap.pythagoras;
        cardImages.forEach(img => {
            img.style.backgroundImage = `url('data:image/svg+xml;utf8,${svg}')`;
        });
    }
    
    function shuffleCards() {
        // Анимация кнопки
        shuffleBtn.classList.add('animate__animated', 'animate__rotateIn');
        setTimeout(() => {
            shuffleBtn.classList.remove('animate__animated', 'animate__rotateIn');
        }, 1000);
        
        // Перемешиваем карточки
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
        
        currentCardIndex = 0;
        updateCard();
    }
    
    function updateProgress() {
        const progress = ((currentCardIndex + 1) / shuffledCards.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    }
    
    function toggleTheme() {
        isDarkTheme = !isDarkTheme;
        document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : '');
        
        // Анимация иконки
        const icon = themeBtn.querySelector('i');
        icon.classList.remove('fa-moon', 'fa-sun');
        icon.classList.add(isDarkTheme ? 'fa-sun' : 'fa-moon');
        icon.classList.add('animate__animated', 'animate__flip');
        
        setTimeout(() => {
            icon.classList.remove('animate__animated', 'animate__flip');
        }, 1000);
        
        // Обновляем изображение карточки
        updateCardImage(shuffledCards[currentCardIndex].image);
    }
    
    function handleKeyDown(e) {
        switch(e.key) {
            case 'ArrowLeft':
                showPrevCard();
                break;
            case 'ArrowRight':
                showNextCard();
                break;
            case ' ':
                flipCard();
                e.preventDefault();
                break;
            case 't':
            case 'T':
                toggleTheme();
                break;
        }
    }
});