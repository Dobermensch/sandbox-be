const getPlayerRank = async (fastify, scoreId) => {
  const client = await fastify.pg.connect()
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM (
          SELECT
            id,
            player_name,
            score,
            created_at,
            DENSE_RANK() OVER (ORDER BY score DESC) as rank
          FROM
            scores
        ) as ranked_scores
        WHERE id = $1
      `,
      [scoreId]
    )

    return rows
  } catch (e) {
    fastify.log.error(e)
  } finally {
    client.release()
  }
}

const getTop100Scores = async (fastify) => {
  const client = await fastify.pg.connect()
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM (
          SELECT
            id,
            player_name,
            score,
            created_at,
            DENSE_RANK() OVER (ORDER BY score DESC) as rank
          FROM
            scores
        ) as ranked_scores
        WHERE rank <= 100
        LIMIT 100;
      `,
      []
    )

    return rows
  } catch (e) {
    fastify.log.error(e)
  } finally {
    client.release()
  }
}

const insertUserScore = async (fastify, score, playerName) => {
  const client = await fastify.pg.connect()
  try {
    const { rows } = await client.query(
      `
        INSERT INTO scores (player_name, score, created_at)
        VALUES ($1, $2, now())
        RETURNING id;
      `,
      [playerName, score]
    )

    return rows
  } catch (e) {
    fastify.log.error(e)
  } finally {
    client.release()
  }
}

module.exports = {
  getPlayerRank,
  getTop100Scores,
  insertUserScore
}