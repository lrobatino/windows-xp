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
