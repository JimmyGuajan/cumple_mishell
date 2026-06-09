document.addEventListener("DOMContentLoaded", () => {

    // Envelope Logic
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const flap = document.getElementById('flap');
    const seal = document.getElementById('seal');
    const letter = document.getElementById('letter');
    const mainContent = document.getElementById('main-content');
    const techCard = document.getElementById('tech-card');

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
    let evidenceAlert = document.getElementById('evidence-alert');
    let glitchAlert = document.getElementById('glitch-alert');
    let finalAlert = document.getElementById('final-alert');
    let gameOverScreen = document.getElementById('game-over');

    function startSequence() {
        if (msgIndex < msgArray.length - 1) {
            typeWriterEffect(msgArray[msgIndex], typeElem, 40, () => {
                setTimeout(() => {
                    typeElem.style.transition = "opacity 0.3s";
                    typeElem.style.opacity = 0;
                    setTimeout(() => {
                        msgIndex++;
                        typeElem.style.opacity = 1;
                        startSequence();
                    }, 300);
                }, 2800); 
            });
        } else {
            typeElem.innerHTML = "> Ejecución completada. <br>> Mostrando evidencia adjunta por Jimmy del pasado ⬇️";

            setTimeout(() => {
                evidenceAlert.classList.remove('hidden');
                
                setTimeout(() => {
                    evidenceAlert.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }, 500);

                // Empezar cuenta regresiva fatal despus de unos pocos segundos
                setTimeout(() => {
                    initiateServerCrash();
                }, 6000); 
            }, 1200);
        }
    }

    function typeWriterEffect(text, element, speed = 50, callback) {
        element.innerHTML = '';
        let i = 0;
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

    // ==== LEYENDA DEL CRASH Y AUTODESTRUCCIÓN ====
    let countdownInterval;
    let timeLeft = 60;
    
    function initiateServerCrash() {
        // Ocultar texto normal
        typeElem.style.color = "#ef4444";
        typeElem.innerHTML = "> ¡ERROR! BASE DE DATOS COMPROMETIDA.";

        // Mostrar Alerta Glitch
        glitchAlert.classList.remove('hidden');
        glitchAlert.scrollIntoView({ behavior: 'smooth', block: 'end' });
        
        // Agiteo de Pantalla
        techCard.classList.add('shake-card');

        // Empezar reloj
        const timerSpan = document.getElementById('countdown');
        countdownInterval = setInterval(() => {
            timeLeft--;
            timerSpan.innerText = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                triggerGameOver();
            }
        }, 1000);
    }

    function triggerGameOver() {
        mainContent.style.display = 'none';
        gameOverScreen.classList.remove('hidden');
    }

    // Botón de salvación (Comando divertido)
    const saveBtn = document.getElementById('save-btn');
    saveBtn.addEventListener('click', () => {
        // Pausar crisis
        clearInterval(countdownInterval);
        techCard.classList.remove('shake-card');
        
        // Esconder Glitch
        glitchAlert.classList.add('hidden');
        
        // Retornar tipología de consola
        typeElem.style.color = "#4ade80";
        typeElem.innerHTML = "> ANULACIÓN EXITOSA.<br>> SALVADO POR LOS PELOS.";

        // Mostrar final hermoso
        finalAlert.classList.remove('hidden');
        setTimeout(() => {
            finalAlert.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 300);
    });

});
