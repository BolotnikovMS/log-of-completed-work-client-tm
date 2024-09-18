import * as fs from 'fs'

const spriteFilePath: string = '../icons/sprite.svg'
const typesIconFilePath: string = '../types/icons.type.ts'
const svgContent = fs.readFileSync(spriteFilePath, 'utf-8')
const iconIdRegex = /<symbol[^>]*id="([^"]+)"[^>]*>/g
const iconIds = []
let match

while ((match = iconIdRegex.exec(svgContent)) !== null) {
  iconIds.push(match[1])
}

const tsCode = `export type TIconName = ${iconIds.map(id => `'${id.slice(5)}'`).join(' | ')}`

fs.writeFileSync(typesIconFilePath, tsCode, 'utf-8')

console.log(`TypeScript файл успешно создан`)
