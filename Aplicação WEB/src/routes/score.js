var express = require("express");
var router = express.Router();

var scoreController = require("../controllers/scoreController");

router.get("/buscarPontuacao", scoreController.buscarPontuacao);

router.get("/buscarMenorTempo", scoreController.buscarMenorTempo);

router.get("/buscarMaioresVencedores", scoreController.buscarMaioresVencedores);

router.post("/gravarPontuacao", scoreController.gravarPontuacao);

module.exports = router;