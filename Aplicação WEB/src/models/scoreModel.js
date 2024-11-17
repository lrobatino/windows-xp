var database = require("../database/config")

function buscarPontuacao() {
    const instrucaoSql = `
        SELECT 
            idPontuacao, 
            usuario, 
            pontuacao, 
            tempo 
        FROM pontuacao 
        ORDER BY pontuacao DESC 
        LIMIT 5;
    `;

    console.log("Executando a seguinte instrução SQL: ", instrucaoSql);
    return database.executar(instrucaoSql);
}
function gravarPontuacao(usuario, pontuacao, tempo, fkUsuario) {
    console.log("ACESSEI O SCORE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function gravarPontuacao():", usuario, pontuacao, tempo, fkUsuario);
    
    var instrucaoSql = `
        INSERT INTO pontuacao (usuario, pontuacao, tempo, fkUsuario) VALUES ('${usuario}', '${pontuacao}', '${tempo}', '${fkUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPontuacao,
    gravarPontuacao
};