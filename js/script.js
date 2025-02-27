// Variables globales
let currentPage = 'page1';
let currentExercise = 0;
let isAnimating = false;

// Navegación entre páginas
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelector(`button[onclick="showPage('${pageId}')"]`).classList.add('active');
    currentPage = pageId;
}

// Canvas para vectores
function initializeVectorCanvas() {
    const canvas = document.getElementById('vectorCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;

    function drawVector(startX, startY, endX, endY, color) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dibujar flecha
        const angle = Math.atan2(endY - startY, endX - startX);
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - 10 * Math.cos(angle - Math.PI / 6), endY - 10 * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(endX - 10 * Math.cos(angle + Math.PI / 6), endY - 10 * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }

    return { ctx, canvas, drawVector };
}

// Animación de vectores
function toggleAnimation() {
    isAnimating = !isAnimating;
    if (isAnimating) {
        animateVectors();
    }
}

function animateVectors() {
    const { ctx, canvas, drawVector } = initializeVectorCanvas();
    let angle = 0;

    function animate() {
        if (!isAnimating) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Vector A
        const endX = 300 + Math.cos(angle) * 100;
        const endY = 200 + Math.sin(angle) * 100;
        drawVector(300, 200, endX, endY, '#2196F3');

        // Vector B
        const endX2 = endX + Math.cos(angle + Math.PI/2) * 50;
        const endY2 = endY + Math.sin(angle + Math.PI/2) * 50;
        drawVector(endX, endY, endX2, endY2, '#F44336');

        // Vector Resultante
        drawVector(300, 200, endX2, endY2, '#4CAF50');

        angle += 0.02;
        requestAnimationFrame(animate);
    }

    animate();
}

// Cálculo de suma de vectores
function calculateSum() {
    const ax = parseFloat(document.getElementById('vectorAx').value) || 0;
    const ay = parseFloat(document.getElementById('vectorAy').value) || 0;
    const bx = parseFloat(document.getElementById('vectorBx').value) || 0;
    const by = parseFloat(document.getElementById('vectorBy').value) || 0;

    const rx = ax + bx;
    const ry = ay + by;
    const magnitude = Math.sqrt(rx * rx + ry * ry);
    const angle = Math.atan2(ry, rx) * 180 / Math.PI;

    document.getElementById('result').innerHTML = `
        Resultante: (${rx.toFixed(2)}, ${ry.toFixed(2)})
        <br>Magnitud: ${magnitude.toFixed(2)}
        <br>Ángulo: ${angle.toFixed(2)}°
    `;

    drawVectorSum(ax, ay, bx, by);
}

function drawVectorSum(ax, ay, bx, by) {
    const canvas = document.getElementById('vectorSum');
    const ctx = canvas.getContext('2d');
    const scale = 30;
    
    canvas.width = 600;
    canvas.height = 400;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Origen en el centro
    const originX = canvas.width / 2;
    const originY = canvas.height / 2;
    
    // Dibujar ejes
    ctx.beginPath();
    ctx.strokeStyle = '#ccc';
    ctx.moveTo(0, originY);
    ctx.lineTo(canvas.width, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, canvas.height);
    ctx.stroke();
    
    // Función helper para dibujar vectores
    function drawVector(startX, startY, dx, dy, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + dx * scale, startY - dy * scale);
        ctx.stroke();
        
        // Flecha
        const angle = Math.atan2(-dy, dx);
        ctx.beginPath();
        const tipX = startX + dx * scale;
        const tipY = startY - dy * scale;
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(tipX - 10 * Math.cos(angle - Math.PI/6), tipY + 10 * Math.sin(angle - Math.PI/6));
        ctx.lineTo(tipX - 10 * Math.cos(angle + Math.PI/6), tipY + 10 * Math.sin(angle + Math.PI/6));
        ctx.fillStyle = color;
        ctx.fill();
    }
    
    // Dibujar vectores
    drawVector(originX, originY, ax, ay, '#2196F3'); // Vector A
    drawVector(originX + ax * scale, originY - ay * scale, bx, by, '#F44336'); // Vector B
    drawVector(originX, originY, ax + bx, ay + by, '#4CAF50'); // Vector Resultante
}

// Gestión de ejercicios
const exercises = [
    {
        question: "Dados los vectores A(3,4) y B(1,2), calcula su suma.",
        answer: "R(4,6)"
    },
    // Añadir más ejercicios aquí
];

function showExercise(index) {
    const container = document.getElementById('exerciseContainer');
    const exercise = exercises[index];
    container.innerHTML = `
        <div class="exercise-card">
            <h3>Ejercicio ${index + 1}</h3>
            <p>${exercise.question}</p>
            <input type="text" id="userAnswer" placeholder="Tu respuesta">
            <button onclick="checkAnswer(${index})">Verificar</button>
        </div>
    `;
}
// Actividades con video
const videoActivities = {
    title: "Actividad con Video",
    videoId: "no8c1_MYaLA",
    tasks: [
        {
            instruction: "👉 En tu cuaderno, dibuja los vectores mostrados en el minuto 2:15",
            timeStamp: 135
        },
        {
            instruction: "📝 Copia la definición de vector que se menciona al inicio del video",
            timeStamp: 0
        },
        {
            instruction: "✍️ Escribe tres ejemplos de vectores en la vida cotidiana",
            timeStamp: 180
        }
    ]
};

function showVideoActivity() {
    const container = document.getElementById('videoContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="video-section">
            <h3>${videoActivities.title}</h3>
            <div class="video-wrapper">
                <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/${videoActivities.videoId}"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <div class="tasks-list">
                <h4>Actividades para realizar en tu cuaderno:</h4>
                ${videoActivities.tasks.map((task, index) => `
                    <div class="task-item">
                        <label>
                            <input type="checkbox" onchange="updateVideoProgress(${index})">
                            ${task.instruction}
                            <button onclick="jumpToTime(${task.timeStamp})" class="time-btn">
                                Ver en ${formatTime(task.timeStamp)}
                            </button>
                        </label>
                    </div>
                `).join('')}
            </div>
            <div class="progress-indicator">
                <span id="videoProgress">0/3 actividades completadas</span>
            </div>
        </div>
    `;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function jumpToTime(seconds) {
    const iframe = document.querySelector('.video-wrapper iframe');
    if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoActivities.videoId}?start=${seconds}`;
    }
}

function updateVideoProgress(taskIndex) {
    const completedTasks = document.querySelectorAll('.tasks-list input:checked').length;
    const totalTasks = videoActivities.tasks.length;
    document.getElementById('videoProgress').textContent = 
        `${completedTasks}/${totalTasks} actividades completadas`;
    
    if (completedTasks === totalTasks) {
        showCongratulations();
    }
}

function showCongratulations() {
    const message = document.createElement('div');
    message.className = 'congratulations';
    message.innerHTML = `
        <h3>¡Felicitaciones! 🎉</h3>
        <p>Has completado todas las actividades del video.</p>
        <p>No olvides guardar tu cuaderno y mostrarlo en la próxima clase.</p>
    `;
    document.querySelector('.video-section').appendChild(message);
}
// Modificar la función de inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeVectorCanvas();
    showExercise(currentExercise);
    showVideoActivity(); // Agregar esta línea
    // Inicializar todos los canvas
    initializeVectorCanvas();
    
    // Configurar ejercicios y progreso
    showExercise(currentExercise);
    updateProgress();
    
    // Iniciar animación de vectores
    animateVectors();
    
    // Ajustar canvas al tamaño de la pantalla
    function resizeCanvas() {
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            const container = canvas.parentElement;
            const containerWidth = container.clientWidth;
            canvas.width = Math.min(600, containerWidth);
            canvas.height = Math.min(400, window.innerHeight * 0.6);
        });
    }
    
    // Manejar cambios de tamaño de pantalla
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Cargar progreso guardado si existe
    const savedProgress = localStorage.getItem('vectorProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentExercise = progress.currentExercise || 0;
        showExercise(currentExercise);
    }
});