import { Logger, makeConsoleStrategy, makeFileStrategy } from "./Logger";
import { JsonDB } from './JsonDB'
import { loadenv } from './loadenv'
import c from './colors'

(async () => {
  //using logger
  const logger = new Logger({
    logLevel: 'debug'
  })
  logger.addStrategy(makeConsoleStrategy())
  logger.addStrategy(makeFileStrategy('app.json.log'))

  // using colors
  logger.info(c.brightGreen('this is bright green'))
  logger.debug('hello world')
  logger.warning('hello world')
  logger.error('hello world')

  //loading env vars
  loadenv('.env.json')
  logger.debug(`PORT - ${process.env.PORT}`)

  //using json database
  interface IDbData { users: { username: string, passoword: string }[] }
  const db = new JsonDB<IDbData>({
    path: "db.json",
    initObj: {
      users: []
    }
  })
  await db.read() //updates db.data property
  db.data.users.push({ username: "aniket", passoword: "password123" })
  await db.write() // saves db.data to file
  logger.debug('db state', { state: db.data })


})()
