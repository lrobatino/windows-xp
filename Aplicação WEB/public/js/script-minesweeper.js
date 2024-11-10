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

function voltar() {
    document.getElementById('menu-principal').style.display = 'flex'
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

class Tile {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.isBomb = false;
        this.isOpen = false;
        this.isMarked = false;
        this.bombsAround = 0;
        this.openedAround = false;
        this.isFlaggedWrong = false; // Adicionado para rastrear marcação errada de bandeira
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

// Imagens para tiles
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

// Carregar imagens para os números de 1 a 8
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

// Função que desenha os tiles quando todas as imagens estiverem carregadas
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
    draw(); // Chama a função de desenho após as imagens serem carregadas
});

const borda = 5;  // Tamanho da borda
const tileSize = 50;  // Tamanho dos tiles (50x50px)

function draw() {
    ctx.clearRect(0, 0, 500, 500);
    tiles.map(t => {
        drawTile(t);
    });
}

function drawTile(tile) {
    // Desloca os tiles para dentro do canvas, respeitando a borda de 5px
    let x = (tile.i * tileSize) + borda;  // Calcula a posição X, levando em conta a borda
    let y = (tile.j * tileSize) + borda;  // Calcula a posição Y, levando em conta a borda

    // Se o tile estiver aberto
    if (tile.isOpen) {
        ctx.drawImage(tileOpenImage, x, y, tileSize, tileSize);
        
        // Se for uma bomba
        if (tile.isBomb) {
            if (tile.isMarked && !tile.isFlaggedWrong) {
                // Marca a bomba com fundo vermelho se for marcada corretamente
                ctx.fillStyle = "#ff0000";
                ctx.fillRect(x, y, tileSize, tileSize);
            }
            ctx.drawImage(bombImage, x + 10, y + 10, 30, 30);  // Desenha a bomba
        } else if (tile.bombsAround) {
            drawNumber(tile);  // Desenha o número de bombas ao redor
        }
    } else {
        // Se o tile não estiver aberto
        ctx.drawImage(tileImage, x, y, tileSize, tileSize);  // Desenha o tile fechado
        if (tile.isMarked) {
            ctx.drawImage(flagImage, x + 10, y + 10, 30, 30);  // Desenha a bandeira
        }
        if (tile.isFlaggedWrong) {
            // Marca a bandeira errada com a imagem 'noBomb'
            ctx.drawImage(noBombImage, x + 10, y + 10, 30, 30);
        }
    }
}

function drawNumber(tile) {
    let x = (tile.i * tileSize) + borda;  // Ajuste com a borda
    let y = (tile.j * tileSize) + borda;  // Ajuste com a borda
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
    // Impede que o tile com bandeira seja aberto
    if (tile.isMarked) return;  // Não abre o tile se ele tiver uma bandeira

    tile.isOpen = true;
    if (!tile.openedAround && tile.bombsAround == 0) openAround(tile);
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

function gameOver(clickedTile) {
    gameOverFlag = true;  // Marca o jogo como perdido

    document.getElementById('face').src = 'images/campo-minado/dead-face.png';

    // Revela todas as bombas
    tiles.forEach(tile => {
        if (tile.isBomb) {
            tile.isOpen = true;  // Revela as bombas
            ctx.clearRect((tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);  // Limpa o fundo do tile
            ctx.drawImage(tileOpenImage, (tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);  // Desenha o fundo do tile aberto
            ctx.drawImage(bombImage, (tile.i * tileSize) + 10 + borda, (tile.j * tileSize) + 10 + borda, 30, 30);  // Desenha a bomba
        }
    });

    // Agora, marca a bomba clicada com fundo vermelho
    clickedTile.isOpen = true;
    ctx.fillStyle = "#ff0000";  // Cor de fundo vermelho
    ctx.fillRect((clickedTile.i * tileSize) + borda, (clickedTile.j * tileSize) + borda, tileSize, tileSize);  // Fundo vermelho
    ctx.drawImage(bombImage, (clickedTile.i * tileSize) + 10 + borda, (clickedTile.j * tileSize) + 10 + borda, 30, 30);  // Desenha a bomba

    // Revele as bandeiras erradas (se houver alguma)
    tiles.forEach(tile => {
        if (tile.isMarked) {
            if (tile.isBomb) {
                // Se a bandeira foi colocada corretamente (onde há uma bomba), apenas desenha a bandeira
                ctx.clearRect((tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);  // Limpa o fundo do tile
                ctx.drawImage(tileOpenImage, (tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);  // Desenha o fundo do tile aberto
                ctx.drawImage(flagImage, (tile.i * tileSize) + 10 + borda, (tile.j * tileSize) + 10 + borda, 30, 30);  // Desenha a bandeira sobre o tile
            } else {
                // Se a bandeira foi colocada onde não há bomba, substitui pela imagem "noBomb.png"
                ctx.clearRect((tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);  // Limpa o fundo do tile
                ctx.drawImage(tileOpenImage, (tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);  // Desenha o fundo do tile aberto
                ctx.drawImage(noBombImage, (tile.i * tileSize) + 10 + borda, (tile.j * tileSize) + 10 + borda, 30, 30);  // Desenha a imagem de "noBomb"
            }
        }
    });

    // Adiciona a bandeira no tile correto se o jogo terminou
    tiles.forEach(tile => {
        if (tile.isMarked && tile.isBomb) {
            // Desenha o tile.png por trás da flag.png
            ctx.clearRect((tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);  // Limpa o fundo do tile
            ctx.drawImage(tileImage, (tile.i * tileSize) + borda, (tile.j * tileSize) + borda, tileSize, tileSize);  // Desenha o fundo tile.png
            ctx.drawImage(flagImage, (tile.i * tileSize) + 10 + borda, (tile.j * tileSize) + 10 + borda, 30, 30);  // Desenha a bandeira sobre o tile
        }
    });
}

function isGameOver() {
    return gameOverFlag;  // Retorna o estado do jogo
}

generateBombs();
generateNBombs();
draw();

function reiniciar() {
    // Reinicia as variáveis do jogo
    tiles = [];
    gameOverFlag = false;
    document.getElementById('face').src = 'images/campo-minado/happy-face.png';  // Muda o rosto de volta ao normal

    // Gera os tiles e bombas novamente
    generateTiles();
    generateBombs();
    generateNBombs();

    // Redesenha o jogo
    draw();
}


telaJogo.addEventListener("click", e => {
    if (isGameOver()) return;  // Se o jogo terminou, não faz nada

    const rect = telaJogo.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const i = Math.floor((mouseX / 500) * 10);
    const j = Math.floor((mouseY / 500) * 10);

    const clickedTile = getTile(i, j);

    if (!clickedTile.isOpen && !clickedTile.isMarked) {  // Adicionado !clickedTile.isMarked
        if (clickedTile.isBomb) {
            // Chama a função gameOver se a bomba for clicada
            gameOver(clickedTile);
        } else {
            openTile(clickedTile);
            draw();
        }
    }
});

// Evento de clique com o botão direito
telaJogo.addEventListener("contextmenu", e => {
    e.preventDefault();
    if (isGameOver()) return;  // Se o jogo terminou, não faz nada

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




