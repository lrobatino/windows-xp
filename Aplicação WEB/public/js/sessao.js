// sessão
function validarSessao() {
    var usuario = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (usuario != null) {
        /*AQUI PODERA COLOCAR PARA PUXAR O NOME DO USUARIO DO BANCO*/
    } else {
        window.location = "../login.html";
    }
}


