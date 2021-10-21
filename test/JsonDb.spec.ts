import { JsonDB } from '../src/JsonDB'
import fs from 'fs'
import t from 'tap'

t.test('should create correct initial state', (ct) => {
  const initState = { users: [] }
  const db = new JsonDB<{ users: { name: string }[] }>({
    initState: initState,
    path: "test.db.json"
  })
  const file = fs.readFileSync('test.db.json').toString()
  ct.equal(file, JSON.stringify(initState))
  fs.unlinkSync('test.db.json')
  ct.end()
})

t.test('should write data properly', async (ct) => {
  let initState: { users: { name: string }[] } = { users: [] }
  const db = new JsonDB<{ users: { name: string }[] }>({
    initState: initState,
    path: "test.db2.json"
  })
  await db.read();
  db.data.users.push({ name: "aniket" });
  await db.write()
  const newState = { users: [{ name: "aniket" }] }
  const file = (await fs.promises.readFile('test.db2.json')).toString()
  ct.equal(file, JSON.stringify(newState))
  fs.promises.unlink('test.db2.json')
  ct.end()
})

t.test('should read data properly after writing', async (ct) => {
  let initState: { users: { name: string }[] } = { users: [] }
  const db = new JsonDB<{ users: { name: string }[] }>({
    initState: initState,
    path: "test.db3.json"
  })
  await db.read();
  db.data.users.push({ name: "aniket" });
  await db.write()
  // read data from file
  await db.read()
  ct.same(db.data, { users: [{ name: "aniket" }] })
  fs.promises.unlink('test.db3.json')
  ct.end()
})
