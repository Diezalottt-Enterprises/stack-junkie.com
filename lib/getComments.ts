import fs from 'fs'
import path from 'path'

export type Comment = { name: string; message: string; date: string }

export function getCommentsForSlug(slug: string): Comment[] {
  const dir = path.join(process.cwd(), 'data', 'comments', slug)
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'))
  const items = files.map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) as Comment)
  return items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
