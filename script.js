// Efeito de digitação
class TypeWriter {
    constructor(element) {
        this.professions = [
            { text: "Fullstack", class: "fullstack active", duration: 2500 },
            { text: "Frontend", class: "active", duration: 2000 },
            { text: "Backend", class: "active", duration: 2000 },
            { text: "UX/UI", class: "active", duration: 2000 },
            { text: "Mobile", class: "active", duration: 2000 }
        ];
        this.element = element;
        this.cursor = document.querySelector('.typing-cursor');
        this.index = 0;
        this.isDeleting = false;
        this.text = '';
        this.type();
    }

    type() {
        const current = this.professions[this.index];
        const fullText = current.text;
        
        this.element.className = `profession-text ${current.class}`;
        
        if (this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }

        this.element.textContent = this.text;

        let typeSpeed = this.isDeleting ? 75 : 150;

        if (!this.isDeleting && this.text === fullText) {
            typeSpeed = current.duration;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.index = (this.index + 1) % this.professions.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Efeito de partículas
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#4ad4ff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#4ad4ff", opacity: 0.2, width: 1 },
            move: { enable: true, speed: 1, direction: "none", random: true }
        }
    });
}

// Efeito de fumaça
function initSmoke() {
    const canvas = document.getElementById('smokeCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    for (let i = 0; i < 30; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 100 + 50,
            speed: Math.random() * 0.2 + 0.1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = `rgba(74, 212, 255, 0.05)`;
        
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            p.y -= p.speed;
            if (p.y < -p.size) {
                p.y = canvas.height + p.size;
                p.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    new TypeWriter(document.getElementById('profession-text'));
    initParticles();
    initSmoke();
    
    // Atualiza o ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();
});