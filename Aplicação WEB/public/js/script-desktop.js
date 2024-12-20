function atualizarRelogio() {
    const agora = new Date()
    
    const dia = String(agora.getDate()).padStart(2, '0')
    const mes = String(agora.getMonth() + 1).padStart(2, '0')
    const ano = agora.getFullYear()
    
    const horas = String(agora.getHours()).padStart(2, '0')
    const minutos = String(agora.getMinutes()).padStart(2, '0')
    const segundos = String(agora.getSeconds()).padStart(2, '0')

    const dataHora = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`

    document.getElementById("data-hora").textContent = dataHora
}

setInterval(atualizarRelogio, 1000)

atualizarRelogio()


function abrirMenu(){
    iniciar.style = "background-color: #19581f !important; box-shadow: inset -4px -4px 4px #61b868, inset 4px 4px 4px #0e3011 !important;"
    document.getElementById('avatar').src = `images/avatares/${sessionStorage.AVATAR}.jpg` 
    document.getElementById('usuario').innerHTML = sessionStorage.NOME_USUARIO  
    menu.style.display = "flex"

    iniciar.onclick = fecharMenu
}

function fecharMenu(){
    iniciar.style = "background-color: #30a53a !important; box-shadow: inset -6px -6px 6px #19581f, inset 6px 6px 4px #61b868 !important;"

    menu.style.display = "none"

    iniciar.onclick = abrirMenu
}

function fecharAvisoInicial(){
    entrar.play()
    document.getElementById('barra-tarefa').style.display = 'flex'
    document.getElementById('caixa-erro').style.display = 'none'
    erro.innerHTML = ``
    btnFecharAviso.onclick = fecharAviso
}

function fecharAviso(){
    document.getElementById('caixa-erro').style.display = 'none'
    erro.innerHTML = ``
}

function sair(){
    informativo.play()
    document.getElementById('erro-titulo').innerHTML = 'Sair do Windows'
    document.getElementById('caixa-erro').style.display = 'flex'
    document.getElementById('btnAviso').innerHTML = 'Sim'
    document.getElementById('btnAviso').onclick = desconectar
    document.getElementById('btnFecharAviso').hidden = false
    document.getElementById('erro').innerHTML = 'Você realmente deseja sair?'
    document.getElementById('icone').src = 'images/icones/Authorization Manager.png'
}

function desconectar() {
    aplicarPretoEBranco();

    deslogar.play().then(() => {
        setTimeout(() => {
            sessionStorage.clear();
            window.location.href = 'login.html';
        }, 2000);
    }).catch((error) => {
        console.error("Erro ao tocar o som:", error);
        setTimeout(() => {
            sessionStorage.clear();
            window.location.href = 'login.html';
        }, 2000);
    });
}

function aplicarPretoEBranco() {
    document.body.style.transition = "filter 1s ease-in-out";
    document.body.style.filter = "grayscale(100%)";
}

var tarefa = ''
var campoMinadoAberto = false
var internetExplorerAberto = false

function abrirCampoMinado(){
    if (campoMinadoAberto){
        return erro()
    }
    tarefa = 'Campo Minado'
    criarTarefa()
    document.getElementById('janela-campo-minado').style.display = 'flex'
    campoMinadoAberto = true
}

function fecharCampoMinado(){
    tarefa = 'Campo Minado'
    apagarTarefa()
    voltar()
    document.getElementById('janela-campo-minado').style.display = 'none'
    campoMinadoAberto = false
}

function minimizarCampoMinado(){
    document.getElementById('janela-campo-minado').style.display = 'none'
}

function abrirInternetExplorer(){
    if (internetExplorerAberto){
        return erro()
    }
    tarefa = 'Internet Explorer'
    criarTarefa()
    document.getElementById('janela-internet-explorer').style.display = 'flex'
    internetExplorerAberto = true
}

function fecharInternetExplorer(){
    tarefa = 'Internet Explorer'
    apagarTarefa()
    voltar()
    document.getElementById('janela-internet-explorer').style.display = 'none'
    internetExplorerAberto = false
}

function minimizarInternetExplorer(){
    document.getElementById('janela-internet-explorer').style.display = 'none'
}

function erro(){
    critico.play()
    document.getElementById('caixa-erro').style.display = 'flex'
    document.getElementById('erro-titulo').innerHTML = 'Erro'
    document.getElementById('erro').innerHTML = `Você não pode abrir o mesmo aplicativo duas vezes.`
    document.getElementById('icone').src = "images/icones/Critical.png"
    document.getElementById('btnAviso').innerHTML = 'Ok'
    document.getElementById('btnAviso').onclick = fecharAviso
    document.getElementById('btnFecharAviso').hidden = true
}

function criarTarefa(){
    if (tarefa == 'Campo Minado'){
        const janela = document.getElementById('janela-campo-minado')
        const novaTarefa = document.createElement('div')
        novaTarefa.className = 'aplicacao'
        novaTarefa.id = 'minesweeper'
        novaTarefa.onclick = () => {
            janela.style.display = 'flex'
        }
    
        const tarefaIcon = document.createElement('img')
        tarefaIcon.src = 'images/icones/Minesweeper.png'
        tarefaIcon.draggable = false
    
        novaTarefa.appendChild(tarefaIcon)
    
        const tarefaTitulo = document.createElement('a')
        tarefaTitulo.textContent = 'Campo Minado'
    
        novaTarefa.appendChild(tarefaTitulo)
    
        const tarefas = document.getElementById('tarefas')
        tarefas.appendChild(novaTarefa)
    } else if (tarefa == 'Internet Explorer') {
        const janela = document.getElementById('janela-internet-explorer')
        const novaTarefa = document.createElement('div')
        novaTarefa.className = 'aplicacao'
        novaTarefa.id = 'internet'
        novaTarefa.onclick = () => {
            janela.style.display = 'flex'
        }
    
        const tarefaIcon = document.createElement('img')
        tarefaIcon.src = 'images/icones/Internet Explorer 6.png'
        tarefaIcon.draggable = false
    
        novaTarefa.appendChild(tarefaIcon)
    
        const tarefaTitulo = document.createElement('a')
        tarefaTitulo.textContent = 'Internet Explorer'
    
        novaTarefa.appendChild(tarefaTitulo)
    
        const tarefas = document.getElementById('tarefas')
        tarefas.appendChild(novaTarefa)
    }
}

function apagarTarefa() {
    var div

    if (tarefa == 'Campo Minado') {
        div = document.getElementById('minesweeper')
        div.remove()
    } else if (tarefa == 'Internet Explorer')
        div = document.getElementById('internet')
        div.remove()
}