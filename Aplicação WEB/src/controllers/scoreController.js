var scoreModel = require("../models/scoreModel");

function buscarPontuacao(req, res) {
    console.log("ACESSEI O SCORE CONTROLLER \n\n function buscarPontuacao()");

    scoreModel.buscarPontuacao()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log("Houve um erro ao buscar as pontuações: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarMenorTempo(req, res) {
    console.log("ACESSEI O SCORE CONTROLLER \n\n function buscarMenorTempo()");

    scoreModel.buscarMenorTempo()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log("Houve um erro ao buscar o menor tempo: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarMaioresVencedores(req, res) {
    console.log("ACESSEI O SCORE CONTROLLER \n\n function buscarMaioresVencedores()");

    scoreModel.buscarMaioresVencedores()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log("Houve um erro ao buscar os maiores vencedores: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function gravarPontuacao(req, res) {
    var usuario = req.body.usuario;
    var pontuacao = req.body.pontuacao;
    var tempo = req.body.tempo;
    var fkUsuario = req.body.fkUsuario;

    if (usuario == undefined) {
        res.status(400).send("O nome do usuário está undefined!");
    } else if (pontuacao == undefined) {
        res.status(400).send("A pontuação está undefined!");
    } else if (tempo == undefined) {
        res.status(400).send("O tempo está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else {
        scoreModel.gravarPontuacao(usuario, pontuacao, tempo, fkUsuario)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarPontuacao,
    buscarMenorTempo,
    buscarMaioresVencedores,
    gravarPontuacao
};