var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var usuario = req.body.usuarioServer;
    var senha = req.body.senhaServer;

    if (usuario == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(usuario, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            idUsuario: resultadoAutenticar[0].idUsuario,
                            nome: resultadoAutenticar[0].nome,
                            usuario: resultadoAutenticar[0].usuario,
                            senha: resultadoAutenticar[0].senha,
                            avatar: resultadoAutenticar[0].avatar
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Usuário e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function buscarAvatar(req, res) {
    var usuario = req.body.usuarioServer;

    if (!usuario) {
        return res.status(400).send("Usuário não especificado.");
    }

    usuarioModel.buscarAvatar(usuario)
        .then(resultado => {
            if (resultado.length === 0) {

                return res.json({ avatar: null });
            }
            res.json({ avatar: resultado[0].avatar });
        })
        .catch(erro => {
            console.error("Erro ao buscar avatar:", erro);
            res.status(500).send("Erro ao buscar avatar.");
        });
}



function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var usuario = req.body.usuarioServer;
    var senha = req.body.senhaServer;
    var avatar = req.body.avatarServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (usuario == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (avatar == undefined) {
        res.status(400).send("Seu avatar está undefined!");
    } else {

        usuarioModel.cadastrar(nome, usuario, senha, avatar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    buscarAvatar
}