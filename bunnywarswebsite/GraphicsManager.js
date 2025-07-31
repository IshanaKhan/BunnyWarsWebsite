// Setup canvas
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');


// Store all images/sprites
const sprites = {};

function loadSprite(name, path) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = path;

        img.onload = () => {
            console.log(`Sprite "${name}" loaded.`);
            sprites[name] = img;
            resolve(); 
        };

        img.onerror = () => {
            console.error(`Failed to load sprite from "${path}"`);
            reject(new Error(`Failed to load sprite: ${path}`));
        };
    });
}

function drawSprite(name, x, y, width, height) {
    const sprite = sprites[name];

    if (!sprite) {
        console.warn(`Sprite "${name}" not found.`);
        return;
    }

    if (sprite.complete) {
        console.log(`Drawing sprite "${name}" at (${x}, ${y})`);
        bgCtx.drawImage(sprite, x, y, width, height);
    } 
    else {
        console.log(`Sprite "${name}" not yet complete, waiting...`);
        sprite.onload = () => {
            bgCtx.drawImage(sprite, x, y, width, height);
        };
    }
}

function drawBackground(name){
    const sprite = sprites[name];
    if (!sprite) {
        console.warn(`Background "${name}" not found.`);
        return;
    }

    if (sprite.complete) {
        console.log(`Drawing background "${name}"`);
        bgCtx.drawImage(sprite, 0, 0, bgCanvas.width, bgCanvas.height);
    } 
    else {
        console.log(`Background "${name}" not yet complete, waiting...`);
        sprite.onload = () => {
            ctx.drawImage(sprite, 0, 0, bgCanvas.width, bgCanvas.height);
        };
    }
}

function typeMessage(message, x = 50, y = 50, lineHeight = 28, typingSpeed = 10) {

    bgCtx.fillStyle = 'white';
    bgCtx.font = '20px Courier New';
    bgCtx.strokeStyle = 'black';
    bgCtx.lineWidth = 2;
    bgCtx.shadowColor = "rgba(0, 0, 0, 0.5)";
    bgCtx.shadowBlur = 2;
    bgCtx.shadowOffsetX = 2;
    bgCtx.shadowOffsetY = 2;

    const lines = message.split('\n');
    let currentLine = 0;
    let currentChar = 0;
    let timeoutId = null;

    return new Promise((resolve) => {
        function finishTyping() {
            clearTimeout(timeoutId);
            window.removeEventListener('keydown', onKeyDown);
            displayMessage(message);
            resolve();
        }

        function onKeyDown(event) {
            if (event.key === 'Enter') {
                finishTyping();
            }
        }
        window.addEventListener('keydown', onKeyDown);

        function onClick(event) {
            const id = event.target.id;
            if (id === 'level1Btn' || id === 'level2Btn' || id === 'level3Btn' || id === 'bossBtn') {
                finishTyping();
            }
        }
        window.addEventListener('click', onClick);

        function typeNext() {
            if (currentLine >= lines.length) {
                window.removeEventListener('keydown', onKeyDown);
                window.removeEventListener('click', onClick);
                resolve();
                return;
            }

            const line = lines[currentLine];
            const partial = line.substring(0, currentChar + 1);
            const yPos = y + currentLine * lineHeight;

            bgCtx.strokeText(partial, x, yPos);
            bgCtx.fillText(partial, x, yPos);

            currentChar++;
            if (currentChar < line.length) {
                timeoutId = setTimeout(typeNext, typingSpeed);
            } else {
                currentLine++;
                currentChar = 0;
                timeoutId = setTimeout(typeNext, typingSpeed);
            }
        }

        typeNext();
    });
}

function clearCanvas() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height); // Clear the entire canvas
}

function drawQuestionCentered(text) {
    const ctx = GraphicsManager.bgCtx;
    const centerX = bgCanvas.width / 2;
    const centerY = bgCanvas.height / 3;

    ctx.font = '24px Courier New';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    ctx.strokeText(text, centerX, centerY);
    ctx.fillText(text, centerX, centerY);
}


window.GraphicsManager = {
    bgCtx,
    bgCanvas,
    loadSprite,
    drawSprite,
    clearCanvas,
    drawBackground,
    typeMessage,
    drawQuestionCentered
};
