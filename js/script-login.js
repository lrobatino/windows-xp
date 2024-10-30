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
    if (textoCheckbox.innerHTML == "Visualizar Senha"){
        textoCheckbox.innerHTML = "Esconder Senha"
        inpSenha.type = "text"
    } else {
        textoCheckbox.innerHTML = "Visualizar Senha"
        inpSenha.type = "password"
    }
}