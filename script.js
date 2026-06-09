document.addEventListener("DOMContentLoaded", () => {
    
    // Envelope Logic
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const flap = document.getElementById('flap');
    const seal = document.getElementById('seal');
    const letter = document.getElementById('letter');
    const mainContent = document.getElementById('main-content');

    let isOpened = false;

    envelopeWrapper.addEventListener('click', () => {
        if (isOpened) return;
        isOpened = true;
        
        seal.style.opacity = '0';
        flap.classList.add('open');

        setTimeout(() => {
            letter.classList.add('slide-up');
        }, 500);

        setTimeout(() => {
            envelopeWrapper.style.transition = "transform 0.5s, opacity 0.5s";
            envelopeWrapper.style.transform = "scale(0.8)";
            envelopeWrapper.style.opacity = 0;
            
            setTimeout(() => {
                envelopeWrapper.style.display = 'none';
                mainContent.classList.remove('hidden');
                startSequence();
            }, 500);
            
        }, 1600);
    });

    // Sequence & Typing Logic
    const msgArray = [
        "> ¿Cómo no decirle feliz cumpleaños a una niña loquita?",
        "> Y más si el Jimmy del pasado se puso alarmas para no olvidarlo.",
        "> Recuerdo que la alarma era para el 8 y el 9...",
        "> Decidí hacerlo el 9, ¡porque me gusta el número 9! jajaja.",
        "> Y si fue hoy (u otro día), ¡pues nunca es tarde para nada! 😎",
        ""
    ];
    let msgIndex = 0;
    let typeElem = document.getElementById('typewriter-text');
    let teamsAlert = document.getElementById('teams-alert');

    function startSequence() {
        if (msgIndex < msgArray.length - 1) {
            typeWriterEffect(msgArray[msgIndex], typeElem, 45, () => {
                setTimeout(() => {
                    typeElem.style.transition = "opacity 0.3s";
                    typeElem.style.opacity = 0;
                    setTimeout(() => {
                        msgIndex++;
                        typeElem.style.opacity = 1;
                        startSequence();
                    }, 300);
                }, 2800); // Dar suficiente tiempo para reir y leer el msj largo.
            });
        } else {
            typeElem.innerHTML = "> Ejecución completada. <br>> Testea el lienzo interactivo ⬇️";
            
            setTimeout(() => {
                teamsAlert.classList.remove('hidden');
            }, 1200);
        }
    }

    function typeWriterEffect(text, element, speed = 50, callback) {
        element.innerHTML = '';
        let i = 0;
        // Text cursor blinking effect
        element.style.borderRight = "2px solid #4ade80";
        
        let timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                element.style.borderRight = "none";
                if (callback) callback();
            }
        }, speed);
    }

    // Interactivity: Trailing Letters
    const interactiveArea = document.getElementById('interactive-area');
    const characters = ['S', 'H', 'A', 'O', 'S', 'H', 'A', 'O']; // Letras que quieres
    const colors = ['#f87171', '#facc15', '#4ade80', '#38bdf8', '#c084fc'];
    
    let charIndex = 0;

    function createLetterParticle(x, y) {
        const rect = interactiveArea.getBoundingClientRect();
        if(x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return;

        const p = document.createElement('div');
        p.classList.add('text-particle');
        
        // Uso de S-H-A-O
        p.innerText = characters[charIndex];
        // Ciclar la letra siguiente
        charIndex = (charIndex + 1) % characters.length;
        
        // Colores neon aleatorios
        p.style.color = colors[Math.floor(Math.random() * colors.length)];
        p.style.textShadow = `0 0 8px ${p.style.color}`;
        
        p.style.left = (x - rect.left - 10) + 'px';
        p.style.top = (y - rect.top - 20) + 'px';
        
        interactiveArea.appendChild(p);

        setTimeout(() => p.remove(), 1000);
    }

    // Eventos
    interactiveArea.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.1) createLetterParticle(e.clientX, e.clientY);
    });

    interactiveArea.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        if (Math.random() > 0.1) createLetterParticle(touch.clientX, touch.clientY);
    }, { passive: false });

    // Fun click burst of letters
    interactiveArea.addEventListener('click', (e) => {
        for(let i=0; i<10; i++){
            setTimeout(() => {
                createLetterParticle(
                    e.clientX + (Math.random() * 80 - 40), 
                    e.clientY + (Math.random() * 80 - 40)
                );
            }, i * 40);
        }
    });

});
