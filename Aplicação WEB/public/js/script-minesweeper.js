(function tituloDinamico() {
    let index = 0

    setInterval(() => {

        if (index === 0) {
            imgA.src = 'images/campo-minado/happy-face.png'
            imgB.src = 'images/campo-minado/dead-face.png'
        } else if (index === 1) {
            imgA.src = 'images/campo-minado/dead-face.png'
            imgB.src = 'images/campo-minado/surprise-face.png'
        } else {
            imgA.src = 'images/campo-minado/surprise-face.png'
            imgB.src = 'images/campo-minado/happy-face.png'
        }

        index = (index + 1) % 3
    }, 1000)
})()

function jogar() {
    document.getElementById('menu-principal').style.display = 'none'
    document.getElementById('jogo').style.display = 'flex'
    document.getElementById('opcoes-jogo').style.display = 'flex'
}

function placarLideres() {
    buscarPontuacao()
    buscarMenorTempo()
    buscarMaioresVencedores()
    document.getElementById('menu-principal').style.display = 'none'
    document.getElementById('placar-lideres').style.display = 'flex'
}

function voltar() {
    reiniciar()
    document.getElementById('menu-principal').style.display = 'flex'
    document.getElementById('placar-lideres').style.display = 'none'
    document.getElementById('jogo').style.display = 'none'
    document.getElementById('opcoes-jogo').style.display = 'none'    
}

/* script do jogo abaixo */

const telaJogo = document.getElementById('jogo');
const ctx = telaJogo.getContext('2d');

var tiles = [];
const nTilesX = 10;
const nTilesY = 10;
var nBombs = 10;
let gameOverFlag = false;
let gameStarted = false;
let timer = 0;
let timerInterval;
let score = 0;
let elapsedSeconds = 0;

function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        timerInterval = setInterval(() => {
            if (timer < 999) {
                elapsedSeconds++;
                timer++;
                updateTimerDisplay();
            }
        }, 1000);
    }
}

function updateTimerDisplay() {
    const digit1 = document.getElementById('digit1');
    const digit2 = document.getElementById('digit2');
    const digit3 = document.getElementById('digit3');

    const timerString = String(timer).padStart(3, '0');

    digit1.src = `images/campo-minado/t${timerString[0]}.png`;
    digit2.src = `images/campo-minado/t${timerString[1]}.png`;
    digit3.src = `images/campo-minado/t${timerString[2]}.png`;
}

function updateScoreDisplay() {
    const hundreds = Math.floor(score / 100);
    const tens = Math.floor((score % 100) / 10);
    const units = score % 10;

    document.getElementById("sDigit1").src = `images/campo-minado/t${hundreds}.png`;
    document.getElementById("sDigit2").src = `images/campo-minado/t${tens}.png`;
    document.getElementById("sDigit3").src = `images/campo-minado/t${units}.png`;
}

class Tile {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.isBomb = false;
        this.isOpen = false;
        this.isMarked = false;
        this.bombsAround = 0;
        this.openedAround = false;
        this.isFlaggedWrong = false;
    }
}

function generateTiles() {
    for (let i = 0; i < nTilesX; i++) {
        for (let j = 0; j < nTilesY; j++) {
            let tile = new Tile(i, j);
            tiles.push(tile);
        }
    }
}

function generateBombs() {
    for (let i = 0; i < nBombs; i++) {
        let random = Math.floor(Math.random() * tiles.filter(t => !t.isBomb).length);
        tiles.filter(t => !t.isBomb)[random].isBomb = true;
    }
}

function generateNBombs() {
    tiles.map(t => {
        const nBombs = calculateNBombsAround(t);
        t.bombsAround = nBombs;
    });
}

function calculateNBombsAround(tile) {
    let bombCounter = 0;
    for (let i = tile.i - 1; i <= tile.i + 1; i++) {
        for (let j = tile.j - 1; j <= tile.j + 1; j++) {
            if (i != tile.i || j != tile.j) {
                if (getTile(i, j)?.isBomb) bombCounter += 1;
            }
        }
    }
    return bombCounter;
}

function getTile(i, j) {
    return tiles.find(t => t.i == i && t.j == j);
}

generateTiles();

const tileImage = new Image();
tileImage.src = 'images/campo-minado/tile.png';

const tileOpenImage = new Image();
tileOpenImage.src = 'images/campo-minado/tileOpen.png';

const flagImage = new Image();
flagImage.src = 'images/campo-minado/flag.png';

const noBombImage = new Image();
noBombImage.src = 'images/campo-minado/noBomb.png';

const bombImage = new Image();
bombImage.src = 'images/campo-minado/bomb.png';

const tileUm = new Image();
tileUm.src = 'images/campo-minado/1.png';

const tileDois = new Image();
tileDois.src = 'images/campo-minado/2.png';

const tileTres = new Image();
tileTres.src = 'images/campo-minado/3.png';

const tileQuatro = new Image();
tileQuatro.src = 'images/campo-minado/4.png';

const tileCinco = new Image();
tileCinco.src = 'images/campo-minado/5.png';

const tileSeis = new Image();
tileSeis.src = 'images/campo-minado/6.png';

const tileSete = new Image();
tileSete.src = 'images/campo-minado/7.png';

const tileOito = new Image();
tileOito.src = 'images/campo-minado/8.png';

Promise.all([
    new Promise(resolve => tileImage.onload = resolve),
    new Promise(resolve => tileOpenImage.onload = resolve),
    new Promise(resolve => tileUm.onload = resolve),
    new Promise(resolve => tileDois.onload = resolve),
    new Promise(resolve => tileTres.onload = resolve),
    new Promise(resolve => tileQuatro.onload = resolve),
    new Promise(resolve => tileCinco.onload = resolve),
    new Promise(resolve => tileSeis.onload = resolve),
    new Promise(resolve => tileSete.onload = resolve),
    new Promise(resolve => tileOito.onload = resolve),
    new Promise(resolve => bombImage.onload = resolve),
    new Promise(resolve => noBombImage.onload = resolve),
    new Promise(resolve => flagImage.onload = resolve)
]).then(() => {
    draw();
});

const borda = 5;
const tileSize = 50;

function draw() {
    ctx.clearRect(0, 0, 500, 500);
    tiles.map(t => {
        drawTile(t);
    });
}

function drawTile(tile) {
    let x = (tile.i * tileSize) + borda;
    let y = (tile.j * tileSize) + borda;

    if (tile.isOpen) {
        ctx.drawImage(tileOpenImage, x, y, tileSize, tileSize);

        if (tile.isBomb) {
            if (tile.isMarked && !tile.isFlaggedWrong) {
                ctx.fillStyle = "#ff0000";
                ctx.fillRect(x, y, tileSize, tileSize);
            }
            ctx.drawImage(bombImage, x + 10, y + 10, 30, 30);
        } else if (tile.bombsAround) {
            drawNumber(tile);
        }
    } else {
        ctx.drawImage(tileImage, x, y, tileSize, tileSize);
        if (tile.isMarked) {
            ctx.drawImage(flagImage, x + 10, y + 10, 30, 30);
        }
        if (tile.isFlaggedWrong) {
            ctx.drawImage(noBombImage, x + 10, y + 10, 30, 30);
        }
    }
}

function drawNumber(tile) {
    let x = (tile.i * tileSize) + borda;
    let y = (tile.j * tileSize) + borda;
    switch (tile.bombsAround) {
        case 1: ctx.drawImage(tileUm, x + 10, y + 10, 30, 30); break;
        case 2: ctx.drawImage(tileDois, x + 10, y + 10, 30, 30); break;
        case 3: ctx.drawImage(tileTres, x + 10, y + 10, 30, 30); break;
        case 4: ctx.drawImage(tileQuatro, x + 10, y + 10, 30, 30); break;
        case 5: ctx.drawImage(tileCinco, x + 10, y + 10, 30, 30); break;
        case 6: ctx.drawImage(tileSeis, x + 10, y + 10, 30, 30); break;
        case 7: ctx.drawImage(tileSete, x + 10, y + 10, 30, 30); break;
        case 8: ctx.drawImage(tileOito, x + 10, y + 10, 30, 30); break;
    }
}

function openTile(tile) {
    if (gameOverFlag) return;
    if (!gameStarted) startTimer();
    if (tile.isMarked) return;
    if (!tile.isOpen && !tile.isBomb) {
        tile.isOpen = true;
        score += 2;
        updateScoreDisplay();
    }
    if (!tile.openedAround && tile.bombsAround == 0) openAround(tile);
    if (tiles.filter(t => t.isOpen).length === (nTilesX * nTilesY - nBombs)) {
        gameWon();
    }
}

function openAround(tile) {
    tile.openedAround = true;
    for (let i = tile.i - 1; i <= tile.i + 1; i++) {
        for (let j = tile.j - 1; j <= tile.j + 1; j++) {
            if (i != tile.i || j != tile.j) {
                const currentTile = getTile(i, j);
                if (currentTile && !currentTile.isBomb && !currentTile.isMarked) {
                    openTile(currentTile);
                }
            }
        }
    }
}

function gameWon() {
    calculateFinalScore();
    gameOverFlag = true;
    clearInterval(timerInterval);
    document.getElementById('face').src = 'images/campo-minado/surprise-face.png';
}

function gameOver(clickedTile) {
    clearInterval(timerInterval);
    gameOverFlag = true;

    document.getElementById('face').src = 'images/campo-minado/dead-face.png';

    tiles.forEach(tile => {
        if (tile.isBomb) {
            tile.isOpen = true;
            ctx.clearRect((tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);
            ctx.drawImage(tileOpenImage, (tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);
            ctx.drawImage(bombImage, (tile.i * tileSize) + 10 + borda, (tile.j * tileSize) + 10 + borda, 30, 30);
        }
    });

    clickedTile.isOpen = true;
    ctx.fillStyle = "#ff0000";
    ctx.fillRect((clickedTile.i * tileSize) + borda, (clickedTile.j * tileSize) + borda, tileSize, tileSize);
    ctx.drawImage(bombImage, (clickedTile.i * tileSize) + 10 + borda, (clickedTile.j * tileSize) + 10 + borda, 30, 30);

    tiles.forEach(tile => {
        if (tile.isMarked) {
            if (tile.isBomb) {
                ctx.clearRect((tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);
                ctx.drawImage(tileOpenImage, (tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);
                ctx.drawImage(flagImage, (tile.i * tileSize) + 10 + borda, (tile.j * tileSize) + 10 + borda, 30, 30);
            } else {
                ctx.clearRect((tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);
                ctx.drawImage(tileOpenImage, (tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);
                ctx.drawImage(noBombImage, (tile.i * tileSize) + 10 + borda, (tile.j * tileSize) + 10 + borda, 30, 30);
            }
        }
    });

    tiles.forEach(tile => {
        if (tile.isMarked && tile.isBomb) {
            ctx.clearRect((tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);
            ctx.drawImage(tileImage, (tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);
            ctx.drawImage(flagImage, (tile.i * tileSize) + 10 + borda, (tile.j * tileSize) + 10 + borda, 30, 30);
        }
    });
}

let pontuacaoGravada = false;

function calculateFinalScore() {
    if (pontuacaoGravada) return;
    tiles.forEach(tile => {
        if (tile.isMarked && tile.isBomb) {
            score += 5;
        }
    });

    if (elapsedSeconds <= 20) {
        score += 500;
    } else if (elapsedSeconds <= 30) {
        score += 300;
    } else if (elapsedSeconds <= 60) {
        score += 200;
    } else if (elapsedSeconds <= 120) {
        score += 100;
    }

    updateScoreDisplay();

    pontuacao = score;
    tempo = timer;

    gravarPontuacao(pontuacao, tempo)
    pontuacaoGravada = true;
}

function gravarPontuacao(pontuacao, tempo) {
    var idUsuario = sessionStorage.ID_USUARIO;
    var usuario = sessionStorage.USUARIO;

    if (!idUsuario || !usuario) {
        console.error('Usuário não autenticado ou informações ausentes no sessionStorage.');
        return;
    }

    fetch('/score/gravarPontuacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            usuario, 
            pontuacao: Number(pontuacao),
            tempo,
            fkUsuario: idUsuario 
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Pontuação gravada com sucesso:', data);
    })
    .catch(err => {
        console.error('Erro ao gravar pontuação:', err);
    });
}

function buscarPontuacao() {
    fetch('/score/buscarPontuacao', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Pontuações recebidas:', data);

        const top = document.getElementById('top-5');
        top.innerHTML = '';

        data.forEach((pontuacao, index) => {
            const p = document.createElement('p');
            p.textContent = `${index + 1}. ${pontuacao.usuario}`.toUpperCase() + ` - ${pontuacao.pontuacao} PTS - ${pontuacao.tempo}s`;
            top.appendChild(p);
        });
    })
    .catch(err => {
        console.error('Erro ao buscar pontuações:', err);
    });
}

function buscarMenorTempo() {
    fetch('/score/buscarMenorTempo', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Menor tempo recebido:', data);

        const usuarioMelhorTempo = document.getElementById('usuario-melhor-tempo');
        const melhorTempo = document.getElementById('melhor-tempo');

        usuarioMelhorTempo.innerHTML = "";
        melhorTempo.innerHTML = "";

        usuarioMelhorTempo.textContent = `${data[0].usuario}`.toUpperCase();
        melhorTempo.textContent = `${data[0].tempo}s`;
    })
    .catch(err => {
        console.error('Erro ao buscar menor tempo:', err);
    });
}

function isGameOver() {
    return gameOverFlag;
}

generateBombs();
generateNBombs();
draw();

function reiniciar() {
    tiles = [];
    gameOverFlag = false;
    gameStarted = false;
    timer = 0;
    score = 0;
    pontuacaoGravada = false;
    clearInterval(timerInterval);
    updateTimerDisplay();
    updateScoreDisplay();
    document.getElementById('face').src = 'images/campo-minado/happy-face.png';

    generateTiles();
    generateBombs();
    generateNBombs();

    draw();
}

telaJogo.addEventListener("click", e => {
    if (isGameOver()) return;

    const rect = telaJogo.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const i = Math.floor((mouseX / 500) * 10);
    const j = Math.floor((mouseY / 500) * 10);

    const clickedTile = getTile(i, j);

    if (!clickedTile.isOpen && !clickedTile.isMarked) {
        if (clickedTile.isBomb) {
            gameOver(clickedTile);
        } else {
            openTile(clickedTile);
            draw();
        }
    }
});

telaJogo.addEventListener("contextmenu", e => {
    e.preventDefault();
    if (isGameOver()) return;

    const rect = telaJogo.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const i = Math.floor((mouseX / 500) * 10);
    const j = Math.floor((mouseY / 500) * 10);

    const clickedTile = getTile(i, j);

    if (!clickedTile.isOpen) {
        clickedTile.isMarked = !clickedTile.isMarked;
        draw();
    }
});