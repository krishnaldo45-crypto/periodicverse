import { ELEMENTS } from '../data/elements';

export function initQuiz(container: HTMLElement) {
    container.innerHTML = `
        <h2 class="section-title">Test Your Knowledge</h2>
        <div class="max-w-2xl mx-auto glass-panel p-8" id="quiz-card">
            <div id="quiz-intro" class="text-center">
                <p class="text-lg text-slate-600 mb-8">Take a dynamic quiz generated from real element data. Ready to challenge yourself?</p>
                <button id="btn-start-quiz" class="btn-primary px-8 py-3 text-lg">Start Quiz</button>
            </div>
            <div id="quiz-content" class="hidden">
                <div class="flex justify-between items-center mb-6 text-sm font-semibold text-slate-500">
                    <span id="quiz-progress">Question 1/5</span>
                    <span id="quiz-score">Score: 0</span>
                </div>
                <h3 id="quiz-question" class="text-2xl font-bold mb-6 text-slate-800"></h3>
                <div id="quiz-options" class="flex flex-col gap-3 mb-6"></div>
                <div id="quiz-explanation" class="hidden p-4 rounded-xl bg-blue-50 text-blue-800 text-sm font-medium mb-6"></div>
                <button id="btn-next-question" class="btn-primary w-full py-3 hidden">Next Question</button>
            </div>
            <div id="quiz-result" class="hidden text-center">
                <div class="text-6xl mb-4">🏆</div>
                <h3 class="text-3xl font-bold mb-2">Quiz Complete!</h3>
                <p id="quiz-final-score" class="text-xl text-slate-600 mb-8"></p>
                <button id="btn-restart-quiz" class="btn-secondary px-8 py-3">Play Again</button>
            </div>
        </div>
    `;

    document.getElementById('btn-start-quiz')?.addEventListener('click', startQuiz);
    document.getElementById('btn-next-question')?.addEventListener('click', nextQuestion);
    document.getElementById('btn-restart-quiz')?.addEventListener('click', startQuiz);
}

let currentQuestion = 0;
let score = 0;
let totalQuestions = 5;
let questions: any[] = [];

function generateQuestions() {
    questions = [];
    const usedIndices = new Set();
    
    for(let i=0; i<totalQuestions; i++) {
        let r;
        do { r = Math.floor(Math.random() * 118); } while(usedIndices.has(r));
        usedIndices.add(r);
        const el = ELEMENTS[r];
        
        const type = Math.floor(Math.random() * 3);
        let qText = "";
        let correct = "";
        let options: string[] = [];
        let exp = "";
        
        if(type === 0) {
            qText = `What is the chemical symbol for ${el.name}?`;
            correct = el.symbol;
            exp = `${el.name}'s symbol is ${el.symbol}. It has an atomic number of ${el.atomicNumber}.`;
            options.push(correct);
            while(options.length < 4) {
                const fake = ELEMENTS[Math.floor(Math.random() * 118)].symbol;
                if(!options.includes(fake)) options.push(fake);
            }
        } else if (type === 1) {
            qText = `Which element has the symbol ${el.symbol}?`;
            correct = el.name;
            exp = `${el.symbol} stands for ${el.name}, a ${el.categoryLabel.toLowerCase()}.`;
            options.push(correct);
            while(options.length < 4) {
                const fake = ELEMENTS[Math.floor(Math.random() * 118)].name;
                if(!options.includes(fake)) options.push(fake);
            }
        } else {
            qText = `What is the atomic number of ${el.name}?`;
            correct = el.atomicNumber.toString();
            exp = `${el.name} has ${el.atomicNumber} protons.`;
            options.push(correct);
            while(options.length < 4) {
                const fake = (el.atomicNumber + Math.floor(Math.random() * 10) - 5).toString();
                if(!options.includes(fake) && Number(fake) > 0 && Number(fake) <= 118) options.push(fake);
            }
        }
        
        // Shuffle
        options = options.sort(() => Math.random() - 0.5);
        
        questions.push({ q: qText, options, correct, exp });
    }
}

function startQuiz() {
    generateQuestions();
    currentQuestion = 0;
    score = 0;
    
    document.getElementById('quiz-intro')?.classList.add('hidden');
    document.getElementById('quiz-result')?.classList.add('hidden');
    document.getElementById('quiz-content')?.classList.remove('hidden');
    
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    
    document.getElementById('quiz-progress')!.textContent = `Question ${currentQuestion + 1}/${totalQuestions}`;
    document.getElementById('quiz-score')!.textContent = `Score: ${score}`;
    document.getElementById('quiz-question')!.textContent = q.q;
    
    const optionsContainer = document.getElementById('quiz-options')!;
    optionsContainer.innerHTML = '';
    
    document.getElementById('quiz-explanation')!.classList.add('hidden');
    document.getElementById('btn-next-question')!.classList.add('hidden');
    
    let answered = false;
    
    q.options.forEach((opt: string) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option text-lg font-medium text-slate-700';
        btn.textContent = opt;
        
        btn.addEventListener('click', () => {
            if(answered) return;
            answered = true;
            
            if(opt === q.correct) {
                btn.classList.add('correct');
                score++;
                document.getElementById('quiz-score')!.textContent = `Score: ${score}`;
            } else {
                btn.classList.add('wrong');
                // find correct and highlight it
                Array.from(optionsContainer.children).forEach(b => {
                    if(b.textContent === q.correct) b.classList.add('correct');
                });
            }
            
            const expEl = document.getElementById('quiz-explanation')!;
            expEl.textContent = q.exp;
            expEl.classList.remove('hidden');
            
            const nextBtn = document.getElementById('btn-next-question')!;
            nextBtn.textContent = currentQuestion === totalQuestions - 1 ? 'See Results' : 'Next Question';
            nextBtn.classList.remove('hidden');
        });
        
        optionsContainer.appendChild(btn);
    });
}

function nextQuestion() {
    currentQuestion++;
    if(currentQuestion < totalQuestions) {
        loadQuestion();
    } else {
        document.getElementById('quiz-content')?.classList.add('hidden');
        document.getElementById('quiz-result')?.classList.remove('hidden');
        document.getElementById('quiz-final-score')!.textContent = `You got ${score} out of ${totalQuestions} correct!`;
    }
}