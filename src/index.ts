import JellyClient from "./client";

process.on('unhandledRejection', console.error)
process.on('uncaughtException', console.error)

const client = new JellyClient()

client.start()
