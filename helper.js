require('trycatch').configure({ 'long-stack-traces': true })
require('songbird')

function logError(err) {
  console.log(err.stack)
}

process.on('uncaughtException', logError)
process.on('uncaughtApplicationException', logError)
process.on('unhandledRejection', logError)
