// Loads Markdown posts from ../content/writing/*.md at build time.
// Drop a new .md file in that folder and it appears automatically.
// Frontmatter: title, date (YYYY-MM-DD), summary, tags: [a, b], draft: true|false

const files = import.meta.glob('../content/writing/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
  if (!m) return { data: {}, content: raw }
  const data = {}
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const key = line.slice(0, i).trim()
    let val = line.slice(i + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1)
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean)
    }
    data[key] = val
  }
  return { data, content: m[2] }
}

const slugFromPath = (p) => p.split('/').pop().replace(/\.md$/, '')
const readingTime = (text) => Math.max(1, Math.round(text.trim().split(/\s+/).length / 200))

const all = Object.entries(files)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      slug: data.slug || slugFromPath(path),
      title: data.title || slugFromPath(path),
      date: data.date || '',
      summary: data.summary || '',
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      draft: String(data.draft) === 'true',
      readingTime: readingTime(content),
      content,
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

// Published posts for the index; drafts still resolvable by direct URL.
export const posts = all.filter((p) => !p.draft)
export const getPost = (slug) => all.find((p) => p.slug === slug)
