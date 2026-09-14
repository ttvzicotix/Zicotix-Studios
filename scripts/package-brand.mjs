// Reproducible dependency-free ZIP for the downloadable brand kit.
// Uses ZIP's stored method: PNG/JPEG payloads are already compressed.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/brand')
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'downloads.json'), 'utf8'))
const names = [...new Set([...catalog.assets.flatMap((asset) => Object.values(asset.files)), ...catalog.documents, ...catalog.extras])].sort()
const table = Uint32Array.from({ length: 256 }, (_, n) => {
  let crc = n
  for (let k = 0; k < 8; k++) crc = (crc & 1) ? (0xedb88320 ^ (crc >>> 1)) : (crc >>> 1)
  return crc >>> 0
})
function crc32(data) {
  let crc = 0xffffffff
  for (const byte of data) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}
const local = [], directory = []
let offset = 0
for (const name of names) {
  if (!/^[a-zA-Z0-9._-]+\.(png|jpg|svg|json|txt)$/.test(name) || name.startsWith('.')) throw new Error(`Unexpected brand-kit member: ${name}`)
  const file = path.join(root, name)
  if (!fs.statSync(file).isFile()) throw new Error(`Missing brand file: ${name}`)
  const data = fs.readFileSync(file)
  if (data.length > 10_000_000) throw new Error(`Brand file too large: ${name}`)
  const filename = Buffer.from(`zicotix-brand-kit/${name}`, 'utf8'), crc = crc32(data)
  const header = Buffer.alloc(30)
  header.writeUInt32LE(0x04034b50, 0); header.writeUInt16LE(20, 4); header.writeUInt16LE(0x800, 6)
  header.writeUInt16LE(0x21, 12); header.writeUInt32LE(crc, 14)
  header.writeUInt32LE(data.length, 18); header.writeUInt32LE(data.length, 22); header.writeUInt16LE(filename.length, 26)
  local.push(header, filename, data)
  const entry = Buffer.alloc(46)
  entry.writeUInt32LE(0x02014b50, 0); entry.writeUInt16LE(20, 4); entry.writeUInt16LE(20, 6); entry.writeUInt16LE(0x800, 8)
  entry.writeUInt16LE(0x21, 14); entry.writeUInt32LE(crc, 16)
  entry.writeUInt32LE(data.length, 20); entry.writeUInt32LE(data.length, 24); entry.writeUInt16LE(filename.length, 28); entry.writeUInt32LE(offset, 42)
  directory.push(entry, filename)
  offset += header.length + filename.length + data.length
}
const central = Buffer.concat(directory), end = Buffer.alloc(22)
end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(names.length, 8); end.writeUInt16LE(names.length, 10)
end.writeUInt32LE(central.length, 12); end.writeUInt32LE(offset, 16)
const output = Buffer.concat([...local, central, end])
fs.writeFileSync(path.join(root, catalog.archive), output)
console.log(`Brand kit: ${names.length} files, ${(output.length / 1048576).toFixed(2)} MiB. No fonts, application source or credentials.`)
