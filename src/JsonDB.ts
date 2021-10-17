import fs from 'fs'

export class JsonDB<T> {

  public data: T
  private path: string

  constructor({
    path,
    initObj
  }: {
    path: string,
    initObj: T
  }) {
    this.path = path
    this.data = initObj
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