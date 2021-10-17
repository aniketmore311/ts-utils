import fs from 'fs'

export class JsonDB<T> {

  public data: T
  private path: string

  constructor({
    path,
    initState
  }: {
    path: string,
    initState: T
  }) {
    this.path = path
    this.data = initState
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(this.data))
    }
    else {
      const dataBuff = fs.readFileSync(this.path)
      this.data = JSON.parse(dataBuff.toString())
    }
  }

  public async read(): Promise<void> {
    const dataBuff = await fs.promises.readFile(this.path)
    this.data = JSON.parse(dataBuff.toString())
  }

  public async write(): Promise<void> {
    await fs.promises.writeFile(this.path, JSON.stringify(this.data))
  }
}