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
            if (simulationId === 'vector-sum-simulation') {
                // Verificar suma de vectores
                const result = sumSimulation.getResult();
                console.log('Suma de vectores:', result);
            } else {
                // Verificar descomposición
                const result = decompSimulation.getResult();
                console.log('Descomposición:', result);
            }
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