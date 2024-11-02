var maiuscula = /[A-Z]/
var minuscula = /[a-z]/
var simbolo = /[!@#$]/
var numerico = /[0-9]/
var senhaForte = false

function validarSenha() {
    var senha = inpSenha.value
    var temMaiuscula = maiuscula.test(senha)
    var temMinuscula = minuscula.test(senha)
    var temSimbolo = simbolo.test(senha)
    var temNumerico = numerico.test(senha)
    var temTamanho = senha.length >= 8

    validacaoMaiuscula.style.color = 
    temMaiuscula ? "green" : "red"
    validacaoMinuscula.style.color = 
    temMinuscula ? "green" : "red"
    validacaoSimbolo.style.color = 
    temSimbolo ? "green" : "red"
    validacaoNumerico.style.color = 
    temNumerico ? "green" : "red"
    validacaoTamanho.style.color = 
    temTamanho ? "green" : "red"

    senhaForte = temMaiuscula &&
                 temMinuscula &&
                 temSimbolo   &&
                 temNumerico  &&
                 temTamanho;
    validacaoForte.style.color = 
    senhaForte ? "green" : "red"
}

function cadastrar(){
    var nome = inpNome.value
    var usuario = inpUsuario.value
    var confirmarSenha = inpConfirmarSenha.value
    var senha = inpSenha.value
    var avatar = selAvatar.value

    if (nome == "" ||
        usuario == "" ||
        senha == "" ||
        confirmarSenha == ""){
        document.getElementById('caixa-erro').style.display = 'flex'
        icone.src = "images/icones/Alert.png"
        erro.innerHTML = `Preencha todos os campos.`
        aviso.play()
    } else if (senha != confirmarSenha) {
        document.getElementById('caixa-erro').style.display = 'flex'
        icone.src = "images/icones/Alert.png"
        erro.innerHTML = `As senhas digitadas não conferem.`
        aviso.play()
    } else if (senhaForte == false){
        document.getElementById('caixa-erro').style.display = 'flex'
        icone.src = "images/icones/Alert.png"
        erro.innerHTML = `Sua senha é fraca. Siga a recomendação para uma senha forte.`
        aviso.play()
    } else {
        document.getElementById('caixa-erro').style.display = 'flex'
        icone.src = "images/icones/System Information.png"
        erro.innerHTML = `Cadastro efetuado com sucesso.`
        informativo.play()
        btnOk.onclick = paraLogin
    }
}

function fecharAviso(){
    document.getElementById('caixa-erro').style.display = 'none'
    erro.innerHTML = ``
}

function alterarAvatar(){
    const avatarEscolhido = selAvatar.value

    if (avatarEscolhido == "car"){
        avatar.src = "images/avatares/car.jpg"
    } else if (avatarEscolhido == "dog"){
        avatar.src = "images/avatares/dog.jpg"
    } else if (avatarEscolhido == "fish"){
        avatar.src = "images/avatares/fish.jpg"
    } else if (avatarEscolhido == "duck"){
        avatar.src = "images/avatares/duck.jpg"
    } else if (avatarEscolhido == "cat"){
        avatar.src = "images/avatares/cat.jpg"
    } else if (avatarEscolhido == "flower"){
        avatar.src = "images/avatares/flower.jpg"
    } else if (avatarEscolhido == "guitar"){
        avatar.src = "images/avatares/guitar.jpg"
    } else if (avatarEscolhido == "ball"){
        avatar.src = "images/avatares/ball.jpg"
    } else if (avatarEscolhido == "kick"){
        avatar.src = "images/avatares/kick.jpg"
    } else {
        avatar.src = "images/avatares/sem-avatar.png"
    }
}

function paraLogin(){
    window.location.href="login.html"
}