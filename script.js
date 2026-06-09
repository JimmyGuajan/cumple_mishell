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
    let evidenceAlert = document.getElementById('evidence-alert');

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
            typeElem.innerHTML = "> Ejecución completada. <br>> Mostrando evidencia adjunta por Jimmy del pasado ⬇️";

            setTimeout(() => {
                evidenceAlert.classList.remove('hidden');
                
                // Hacer scroll automático hacia abajo si la imagen cae debajo de la ventana
                setTimeout(() => {
                    evidenceAlert.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }, 500);
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

});
