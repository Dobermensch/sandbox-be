const postScoreSchema = {
  schema: {
    description: 'Route that posts a new user score',
    summary: 'Saves new score in the DB also emitting sendTop100Scores event at the end over websockets',
    tags: ['Public'],
    body: {
      type: 'object',
      properties: {
        playerName: { type: 'string' },
        score: { type: 'integer' },
      }
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'string' },
          rank: { type: 'number' },
          player_name: { type: 'string' },
          score: { type: 'number' },
          created_at: { type: 'string' }
        }
      },
    }
  }
}

module.exports = {
  postScoreSchema
}