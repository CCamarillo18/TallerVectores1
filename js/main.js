import VectorSimulation from './simulation.js';

document.addEventListener('DOMContentLoaded', () => {
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Inicializar simulaciones
    const sumSimulation = new VectorSimulation('vector-sum-simulation');
    const decompSimulation = new VectorSimulation('vector-decomp-simulation');

    // Botones de verificación
    document.querySelectorAll('.example-card .cta-button').forEach(button => {
        button.addEventListener('click', function() {
            const simulationId = this.parentElement.querySelector('.simulation-container').id;
            const resultContainer = this.parentElement.querySelector('.result-container');
            
            if (simulationId === 'vector-sum-simulation') {
                const result = sumSimulation.getResult();
                resultContainer.innerHTML = `
                    <h4>Resultados:</h4>
                    <p>Magnitud: ${Math.round(result.magnitude * 100) / 100} unidades</p>
                    <p>Ángulo: ${Math.round(result.angle * 180 / Math.PI)}°</p>
                `;
            } else {
                const result = decompSimulation.getResult();
                resultContainer.innerHTML = `
                    <h4>Componentes:</h4>
                    <p>Componente X: ${Math.round(result.x * 100) / 100} unidades</p>
                    <p>Componente Y: ${Math.round(result.y * 100) / 100} unidades</p>
                `;
            }
            resultContainer.style.display = 'block';
        });
    });

    // Menú activo según la sección
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});