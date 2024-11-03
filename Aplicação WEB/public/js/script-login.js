function fecharAviso(){
    document.getElementById('caixa-erro').style.display = 'none'
    erro.innerHTML = ``
}

function entrar() {
    var usuario = inpUsuario.value;
    var senha = inpSenha.value;

    if (usuario === "" || senha === "") {
        document.getElementById('caixa-erro').style.display = 'flex';
        icone.src = "images/icones/Alert.png";
        erro.innerHTML = `Preencha todos os campos.`;
        aviso.play();
    } else {
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuarioServer: usuario,
                senhaServer: senha
            })
        })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    sessionStorage.ID_USUARIO = json.idUsuario;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.USUARIO = json.usuario;
                    sessionStorage.SENHA = json.senha;
                    sessionStorage.AVATAR = json.avatar;
                    window.location.href = "desktop.html";
                });
            } else if (resposta.status === 403) { // Status 403
                document.getElementById('caixa-erro').style.display = 'flex';
                icone.src = "images/icones/Alert.png";
                erro.innerHTML = `Usuário e/ou senha inválido(s).`;
                aviso.play();
            } else {
                console.error("Erro inesperado:", resposta.status);
            }
        })
        .catch(function (erro) {
            console.error("Erro de conexão com o servidor:", erro);
        });
    }
}

function validarAvatar() {
    const usuario = inpUsuario.value;

    if (usuario) {
        fetch(`/usuarios/buscarAvatar`, { // Nova rota
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuarioServer: usuario })
        })
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error("Usuário não encontrado");
            }
        })
        .then(json => {
            document.getElementById("avatar").src = json.avatar 
                ? `images/avatares/${json.avatar}.jpg` 
                : "images/avatares/sem-avatar.jpg";
        })
        .catch(() => {
            document.getElementById("avatar").src = "images/avatares/sem-avatar.jpg";
        });
    } else {
        document.getElementById("avatar").src = "images/avatares/sem-avatar.jpg";
    }
}

function mostrarEsconder(){
    if (inpSenha.type == "password"){
        inpSenha.type = "text"
    } else {
        inpSenha.type = "password"
    }
}