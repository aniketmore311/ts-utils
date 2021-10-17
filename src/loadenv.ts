import fs from 'fs'

export function loadenv(filePath: string): void {
  let envObj = JSON.parse(fs.readFileSync(filePath).toString());
  Object.keys(envObj).forEach((key) => {
    if (process.env[key] === undefined) {
      process.env[key] = envObj[key];
    }
  });
}
