// Generate branded OG/social PNG cards from scripts/og-template.html.
// Renders a light + dark card for the portfolio and every pinned project,
// into public/og-images/. Also refreshes the root og.png used in social meta.
//
// Self-contained (reads pinned.json directly) so it runs under plain Node.
//
// Usage:  npm run og
// Needs a headless browser once:  npx playwright install chromium
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { readFileSync, copyFileSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const template = 'file://' + resolve(__dirname, 'og-template.html')
const outDir = resolve(__dirname, '../public/og-images')

// Mirror the name overrides used in src/data/content.js.
const nameOverrides = {
  'local-rag-assistant': 'Local RAG Document Assistant',
  'azure-terraform-demo': 'Azure Terraform Platform',
  'self-hosted-private-cloud': 'Self-Hosted Private Cloud',
  'runbookforge': 'RunbookForge',
  'hermes-knowledge-brain': 'Hermes Knowledge Brain',
  'rag_llama3': 'Local RAG (Llama 3)',
}
const titleize = (s) => s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
const clip = (s, n) => (s && s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s || '')

const pinned = JSON.parse(readFileSync(resolve(__dirname, '../src/data/pinned.json'), 'utf8'))

const cards = [
  {
    slug: 'og-portfolio',
    kicker: 'Portfolio',
    title: 'Taha Nasir Siddiqi',
    sub: 'Cloud & Systems Engineer',
    tags: ['Azure & AWS', 'IaC', 'Kubernetes', 'Linux'],
    url: 'siddiqitaha.github.io',
    plain: false,
    ts: 84,
  },
  ...pinned.map((r) => {
    const name = nameOverrides[r.name] || titleize(r.name)
    const tags = r.topics && r.topics.length ? r.topics.slice(0, 4) : r.language ? [r.language] : []
    return {
      slug: 'project-' + r.name,
      kicker: 'Open source',
      title: name,
      sub: clip(r.description, 64),
      tags,
      url: (r.url || '').replace(/^https?:\/\//, ''),
      plain: true,
      ts: name.length > 18 ? 56 : 66,
    }
  }),
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })

for (const c of cards) {
  for (const theme of ['light', 'dark']) {
    const q = new URLSearchParams({
      theme,
      kicker: c.kicker,
      title: c.title,
      sub: c.sub,
      url: c.url,
      tags: c.tags.join(','),
      ts: String(c.ts),
      plain: c.plain ? '1' : '0',
    })
    await page.goto(`${template}?${q.toString()}`)
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: `${outDir}/${c.slug}-${theme}.png` })
  }
}
await browser.close()

// Root og.png (social meta) = light portfolio card, matching the light-default site.
copyFileSync(`${outDir}/og-portfolio-light.png`, resolve(__dirname, '../public/og.png'))

console.log(`Generated ${cards.length} cards x2 themes -> public/og-images/ (+ og.png)`)
