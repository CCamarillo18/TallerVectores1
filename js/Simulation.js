class VectorSimulation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.vectors = [];
        this.isDrawing = false;
        this.setupCanvas();
        this.bindEvents();
    }

    setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = 400;
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.drawGrid();
    }

    drawGrid() {
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 0.5;
        
        // Dibujar líneas verticales con números
        for(let x = 0; x <= this.canvas.width; x += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
            
            // Agregar números en el eje X
            if (x > 0) {
                this.ctx.fillStyle = '#666';
                this.ctx.fillText(x/40, x - 5, this.canvas.height - 5);
            }
        }
        
        // Dibujar líneas horizontales con números
        for(let y = 0; y <= this.canvas.height; y += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
            
            // Agregar números en el eje Y
            if (y > 0) {
                this.ctx.fillStyle = '#666';
                this.ctx.fillText(-y/40, 5, y + 10);
            }
        }
    }

    bindEvents() {
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    }

    startDrawing(e) {
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        this.startX = e.clientX - rect.left;
        this.startY = e.clientY - rect.top;
    }

    draw(e) {
        if (!this.isDrawing) return;
        
        const rect = this.canvas.getBoundingClientRect();
        this.endX = e.clientX - rect.left;
        this.endY = e.clientY - rect.top;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        
        // Dibujar vectores existentes
        this.vectors.forEach(vector => {
            this.drawVector(vector.start.x, vector.start.y, vector.end.x, vector.end.y);
        });
        
        // Dibujar vector actual
        this.drawVector(this.startX, this.startY, this.endX, this.endY);
e        
        // Mostrar coordenadas
        const result = this.getResult();
        if (result) {
            this.ctx.fillStyle = '#333';
            this.ctx.font = '12px Arial';
            this.ctx.fillText(`(${result.x}, ${result.y})`, this.endX + 10, this.endY - 10);
        }
    }

    drawVector(startX, startY, endX, endY) {
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.strokeStyle = '#2962ff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        const angle = Math.atan2(endY - startY, endX - startX);
        this.drawArrowhead(endX, endY, angle);
    }

    stopDrawing() {
        this.isDrawing = false;
        if (this.startX && this.startY && this.endX && this.endY) {
            this.vectors.push({
                start: { x: this.startX, y: this.startY },
                end: { x: this.endX, y: this.endY }
            });
        }
    }

    clearCanvas() {
        this.vectors = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
    }

    getResult() {
        if (!this.startX || !this.startY || !this.endX || !this.endY) return null;
        
        const dx = this.endX - this.startX;
        const dy = this.endY - this.startY;
        const magnitude = Math.sqrt(dx * dx + dy * dy) / 40;
        const angle = Math.atan2(-dy, dx) * 180 / Math.PI;
        
        // Ajustar el ángulo para que esté en el rango [0, 360]
        const normalizedAngle = angle < 0 ? angle + 360 : angle;
        
        return {
            magnitude: Math.round(magnitude * 100) / 100,
            angle: Math.round(normalizedAngle * 100) / 100,
            x: Math.round((dx / 40) * 100) / 100,
            y: Math.round((-dy / 40) * 100) / 100
        };
    }

    drawArrowhead(x, y, angle) {
        const size = 10;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - size * Math.cos(angle - Math.PI / 6), y - size * Math.sin(angle - Math.PI / 6));
        this.ctx.lineTo(x - size * Math.cos(angle + Math.PI / 6), y - size * Math.sin(angle + Math.PI / 6));
        this.ctx.closePath();
        this.ctx.fillStyle = '#2962ff';
        this.ctx.fill();
    }
}

export default VectorSimulation;