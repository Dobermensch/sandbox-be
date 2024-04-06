require("dotenv").config()
const { Server } = require("socket.io")
const fastify = require("fastify")({
  logger: true
})
const scoresRepo = require("./repository/scores")

const start = async () => {
  try {
    const io = new Server(fastify.server, {
      transports: ["websocket"]
    })
 
    fastify.decorate('io', io)
    fastify.addHook('onClose', (fastify, done) => {
      fastify.io.close()
      done()
    })
    
    await fastify.register(require("@fastify/cors"))
    await fastify.register(require('@fastify/swagger'))
    await fastify.register(require('@fastify/swagger-ui'), { routePrefix: '/documentation' })
    await fastify.register(require("./setup/db"))
    await fastify.register(require('./routes/public'), { prefix: '/public' })
    
    fastify.io.on("connection", async (socket) => {
      const scores = await scoresRepo.getTop100Scores(fastify)
    
      socket.emit("sendTop100Scores", { scores })
    })
    
    await fastify.ready()
    fastify.swagger()
    fastify.listen({port: process.env.PORT || 3001, host: "::"})
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()