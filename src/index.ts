import { Logger, makeConsoleStrategy, makeFileStrategy } from "./Logger";
import { JsonDB } from './JsonDB'
import { loadenv } from './loadenv'
import c from './colors'

(async () => {
  //using logger
  const logger = new Logger()
  // adding stratergies to logger
  // you can define your own strategy which implements the IStrategy interface
  // console stategy will give pretty output in the terminal
  logger.addStrategy(makeConsoleStrategy())
  // file strategy will append json logs to a file
  // use options to add log level to strategy
  logger.addStrategy(makeFileStrategy('app.json.log', {
    logLevel: "error"
  }))
  // the extra object is printed on terminal and appended to the json log object in the file
  logger.debug('hello world', { data: { hello: "world" } })
  logger.info('hello world')
  logger.warning('hello world')
  logger.error('hello world')

  // using colors
  console.log(c.brightGreen('this is bright green'))

  //loading env vars
  loadenv('.env.json')
  console.log(`PORT - ${process.env.PORT}`)

  //using json database
  //defining shape of database
  interface IDbData { users: { username: string, passoword: string }[] }
  const db = new JsonDB<IDbData>({
    path: "db.json",
    initState: {
      users: []
    }
  })
  await db.read() //updates db.data property from file
  db.data.users.push({ username: "aniket", passoword: "password123" })
  await db.write() // saves db.data to file
  console.log(db.data) // checkout the db.json file created on your system
})()
