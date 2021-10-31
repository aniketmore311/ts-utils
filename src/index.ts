import { JsonDB } from './JsonDB'
import { loadenv } from './loadenv'
import c from './colors'

(async () => {

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
