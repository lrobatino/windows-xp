function fecharAviso(){
    document.getElementById('caixa-erro').style.display = 'none'
    erro.innerHTML = ``
}

function entrar(){
    var usuario = inpUsuario.value
    var senha = inpSenha.value

    if (usuario == "" ||
        senha == ""){
        document.getElementById('caixa-erro').style.display = 'flex'
        icone.src = "images/icones/Alert.png"
        erro.innerHTML = `Preencha todos os campos.`
        aviso.play()
    }
}

function mostrarEsconder(){
    if (inpSenha.type == "password"){
        inpSenha.type = "text"
    } else {
        inpSenha.type = "password"
    }
}