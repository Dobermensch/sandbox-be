const scoresRepo = require("../repository/scores")

const getTop100Scores = async (fastify, req, res) => {
  const scores = await scoresRepo.getTop100Scores(fastify)

  return res.code(200).send({ scores })
}

const postPlayerScore = async (fastify, req, res) => {
  const { score, playerName } = req.body

  if (!playerName) {
    fastify.log.error("No player name!")
    return res.code(400).send()
  }

  const insertResult = await scoresRepo.insertUserScore(fastify, score, playerName)

  if (!insertResult[0] || !insertResult[0].id) {
    fastify.log.error("Error inserting player data!")
    return res.code(400).send()
  }

  const playerRank = await scoresRepo.getPlayerRank(fastify, insertResult[0].id)

  res.code(200).send({ ...playerRank[0] })

  const top100Scores = await scoresRepo.getTop100Scores(fastify)

  // emit the leaderboard data via socket
  fastify.io.emit("sendTop100Scores", { scores: top100Scores } )
}

module.exports = {
  getTop100Scores,
  postPlayerScore
}