const exercises = {
    vectorSum: {
        title: 'Suma de Vectores',
        description: 'Practica la suma de vectores con ejemplos interactivos.',
        difficulty: 'Básico',
        exercise: function() {
            // Lógica del ejercicio
            const vector1 = { x: Math.random() * 10, y: Math.random() * 10 };
            const vector2 = { x: Math.random() * 10, y: Math.random() * 10 };
            return {
                vectors: [vector1, vector2],
                solution: {
                    x: vector1.x + vector2.x,
                    y: vector1.y + vector2.y
                }
            };
        }
    },
    vectorDecomposition: {
        title: 'Descomposición de Vectores',
        description: 'Aprende a descomponer vectores en sus componentes.',
        difficulty: 'Intermedio',
        exercise: function() {
            // Lógica del ejercicio
            const magnitude = Math.random() * 20;
            const angle = Math.random() * Math.PI / 2;
            return {
                magnitude: magnitude,
                angle: angle,
                solution: {
                    x: magnitude * Math.cos(angle),
                    y: magnitude * Math.sin(angle)
                }
            };
        }
    }
};

// Exportar el módulo
export default exercises;