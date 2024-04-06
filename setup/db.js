const fastifyPlugin = require("fastify-plugin")
const fastifyPostgres = require("@fastify/postgres")

async function dbConnector (fastify, options) {
  const dbUser = encodeURIComponent(process.env.DATABASE_USERNAME)
  const dbPassword = encodeURIComponent(process.env.DATABASE_PASSWORD)
  const dbHost = encodeURIComponent(process.env.DATABASE_HOST)
  const dbName = encodeURIComponent(process.env.DATABASE_NAME)
  const dbPort = process.env.DATABASE_PORT

  const connectionString = process.env.NODE_ENV === "production" ? process.env.DATABASE_URL : `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
  const config = {
    connectionString,
  }

  if (process.env.NODE_ENV === "production") {
    config["ssl"] = { rejectUnauthorized: false }
  }

  fastify.register(fastifyPostgres, config)
}
// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)