var database = require("../database/config")

function autenticar(usuario, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", usuario, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, usuario, senha, avatar FROM usuario WHERE usuario = '${usuario}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAvatar(usuario) {
    var instrucaoSql = `
        SELECT avatar FROM usuario WHERE usuario = '${usuario}';
    `;
    return database.executar(instrucaoSql);
}

function cadastrar(nome, usuario, senha, avatar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, usuario, senha, avatar);
    
    var instrucaoSql = `
        INSERT INTO usuario (nome, usuario, senha, avatar) VALUES ('${nome}', '${usuario}', '${senha}', '${avatar}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarAvatar
};