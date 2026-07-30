// utils.js
function displayMessage(message, x = 50, y = 50, lineHeight = 28) {
    const bgCtx = GraphicsManager.bgCtx; // Get the canvas context

    bgCtx.fillStyle = 'white'; // Set text color
    bgCtx.font = '20px Courier New'; // Set font style and size
    bgCtx.strokeStyle = 'black'; // Set stroke color
    bgCtx.lineWidth = 4; // Set stroke width

    // Split the message into lines if it contains line breaks
    const lines = message.split('\n');
    lines.forEach((line, index) => {
        const yPosition = y + index * lineHeight; // Calculate the y position for each line
        bgCtx.strokeText(line, x, yPosition); // Draw the text with stroke
        bgCtx.fillText(line, x, yPosition); // Draw the text with fill
    });
}

function getPlayerInput(inputText) {
    displayMessage(inputText, 500, 300, 28); // Display the input text on the canvas
    return new Promise((resolve) => {
        const input = document.getElementById('game-input');
        const submit = document.getElementById('submit-button');

        input.style.display = 'block';
        submit.style.display = 'block';
        input.focus();
        const handler = () => {
            const value = input.value.trim();
            input.value = '';
            input.style.display = 'none';
            submit.style.display = 'none';
            submit.removeEventListener('click', handler);
            resolve(value);
        };
        submit.addEventListener('click', handler);
    });
}

function getPlayerInputWithTimeout(promptText, timeoutMs = 10000) {
    displayMessage(promptText, 500, 300, 28);

    const input = document.getElementById('game-input');
    const submit = document.getElementById('submit-button');
    const timerContainer = document.getElementById('timer-container');
    const timerProgress  = document.getElementById('timer-progress');
    const timerText      = document.getElementById('timer-text');

    input.style.display = 'block';
    submit.style.display = 'block'; 
    timerContainer.style.display = 'flex'; 
    input.focus(); 

    return new Promise(resolve => {
        let resolved = false;
        const totalSec = Math.ceil(timeoutMs / 1000);
        let remaining = totalSec;

        // timer reset
        timerText.textContent = remaining;
        timerProgress.style.width = '100%';

        // countdown timer
        const intervalId = setInterval(() => {
            remaining--;
            if (remaining >= 0) {
                timerText.textContent = remaining;
                timerProgress.style.width = (remaining / totalSec * 100) + '%';
            }
            if (remaining <= 0 && !resolved) {
                resolved = true;                
                clearInterval(intervalId); 
                input.value = ''; 
                resolve(null); 
            }
        }, 1000);

        // submit button event listener
        submit.addEventListener('click', function onSubmit() {
            if (resolved) return;
            resolved = true;
            clearInterval(intervalId); // Stop the timer
            const value = input.value.trim(); 
            input.value = '';
            resolve(value);
        });
    });
}

function animateHPDecrease(who, from, to, delay = 20) {
    const hpText = document.getElementById(`${who}HPText`);
    const popup = document.getElementById(`${who}DamagePopup`);
    const damage = from - to;
  
    // display damage popup
    popup.textContent = `-${damage}`;
    popup.style.display = 'inline';
    popup.classList.remove('damage-popup'); // reset animation
    void popup.offsetWidth; // reflow
    popup.classList.add('damage-popup');
  
    // animate HP decrease
    let current = from;
    const interval = setInterval(() => {
      if (current <= to) {
        clearInterval(interval);
        hpText.textContent = to;
      } else {
        current--;
        hpText.textContent = current;
      }
    }, delay);
  
    // hide popup after animation
    setTimeout(() => {
      popup.style.display = 'none';
    }, 600);
  }