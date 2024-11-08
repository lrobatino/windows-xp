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

function desconectar(){
    sessionStorage.clear()
    window.location.href = 'login.html'
}
