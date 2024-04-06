const scoresController = require("../controllers/scores")
const { postScoreSchema } = require("../route-schemas/public/schema")

async function PublicRoutes(fastify, options) {
  
  fastify.post("/score", postScoreSchema, (req, res) => scoresController.postPlayerScore(fastify, req, res))

}

module.exports = PublicRoutes