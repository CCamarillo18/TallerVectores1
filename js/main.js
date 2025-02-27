import VectorSimulation from './Simulation.js';  // Asegúrate de que el nombre del archivo coincida

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar simulaciones
    const simulations = {
        sum: new VectorSimulation('vector-sum-simulation'),
        decomp: new VectorSimulation('vector-decomp-simulation'),
        dot: new VectorSimulation('vector-dot-simulation')
    };

    // Agregar botones de limpieza
    document.querySelectorAll('.clear-button').forEach(button => {
        button.addEventListener('click', function() {
            const simulationId = this.parentElement.querySelector('.simulation-container').id;
            const simulation = Object.values(simulations).find(sim => sim.container.id === simulationId);
            if (simulation) {
                simulation.clearCanvas();
            }
        });
    });

    // Botones de verificación
    document.querySelectorAll('.example-card .cta-button').forEach(button => {
        button.addEventListener('click', function() {
            const simulationId = this.parentElement.querySelector('.simulation-container').id;
            const resultContainer = this.parentElement.querySelector('.result-container');
            const simulation = Object.values(simulations).find(sim => sim.container.id === simulationId);
            
            if (!simulation) return;
            
            const result = simulation.getResult();
            if (!result) {
                resultContainer.innerHTML = '<p class="error">Dibuja al menos un vector</p>';
                return;
            }

            switch(simulationId) {
                case 'vector-sum-simulation':
                    resultContainer.innerHTML = `
                        <h4>Vector Resultante:</h4>
                        <p>Magnitud: ${result.magnitude} unidades</p>
                        <p>Ángulo: ${result.angle}°</p>
                        <p>Componente X: ${result.x} unidades</p>
                        <p>Componente Y: ${result.y} unidades</p>
                    `;
                    break;
                case 'vector-decomp-simulation':
                    resultContainer.innerHTML = `
                        <h4>Componentes:</h4>
                        <p>Componente X: ${result.x} unidades</p>
                        <p>Componente Y: ${result.y} unidades</p>
                        <p>Magnitud: ${result.magnitude} unidades</p>
                        <p>Ángulo: ${result.angle}°</p>
                    `;
                    break;
                case 'vector-dot-simulation':
                    if (simulation.vectors.length < 2) {
                        resultContainer.innerHTML = '<p class="error">Dibuja dos vectores para calcular el producto escalar</p>';
                        return;
                    }
                    const dotProduct = result.x * result.y;
                    resultContainer.innerHTML = `
                        <h4>Producto Escalar:</h4>
                        <p>A·B = ${dotProduct.toFixed(2)} unidades²</p>
                        <p>Ángulo entre vectores: ${result.angle}°</p>
                    `;
                    break;
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