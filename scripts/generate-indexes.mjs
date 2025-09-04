import { readdirSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'

const dataRoot = join(process.cwd(), 'public', 'data')

function isSemesterDir(name) {
  return /^semester\d+$/.test(name)
}

function main() {
  let dirs = []
  try {
    dirs = readdirSync(dataRoot, { withFileTypes: true })
      .filter(d => d.isDirectory() && isSemesterDir(d.name))
      .map(d => d.name)
  } catch (e) {
    console.error('No data directory found at', dataRoot)
    process.exit(0)
  }

  dirs.forEach(dir => {
    const folder = join(dataRoot, dir)
    const files = readdirSync(folder)
      .filter(f => f.endsWith('.json') && f !== 'index.json')
      .filter(f => {
        try {
          const s = statSync(join(folder, f))
          return s.isFile()
        } catch {
          return false
        }
      })
      .sort()

    const outPath = join(folder, 'index.json')
    writeFileSync(outPath, JSON.stringify(files, null, 2) + '\n')
    console.log('Wrote', outPath, 'with', files.length, 'entries')
  })
}

main()


