// Fetch the user's pinned GitHub repositories and write them to src/data/pinned.json.
// Run in CI (GitHub Actions) with GITHUB_TOKEN; the site reads the JSON at build time.
import { writeFileSync } from 'node:fs'

const TOKEN = process.env.GITHUB_TOKEN
const USER = process.env.GH_USER || 'siddiqitaha'

if (!TOKEN) {
  console.error('No GITHUB_TOKEN — leaving pinned.json unchanged.')
  process.exit(0)
}

const query = `
  query($login:String!){
    user(login:$login){
      pinnedItems(first:6, types:REPOSITORY){
        nodes{ ... on Repository {
          name description url stargazerCount
          primaryLanguage{ name }
          repositoryTopics(first:8){ nodes{ topic{ name } } }
        } }
      }
    }
  }`

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: { Authorization: `bearer ${TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ query, variables: { login: USER } }),
})
const json = await res.json()
if (json.errors) {
  console.error('GraphQL errors:', JSON.stringify(json.errors))
  process.exit(0) // don't fail the build; keep existing pinned.json
}

const nodes = json.data?.user?.pinnedItems?.nodes ?? []
const out = nodes.map((n) => ({
  name: n.name,
  description: n.description || '',
  url: n.url,
  stars: n.stargazerCount,
  language: n.primaryLanguage?.name || '',
  topics: (n.repositoryTopics?.nodes || []).map((t) => t.topic.name),
}))

// Guard: never overwrite good pins with an empty result. The default Actions
// GITHUB_TOKEN (an app token) returns no pinnedItems, so without this the
// committed pins would get wiped to []. Keep the last known-good file instead.
if (out.length === 0) {
  console.error('Pinned items came back empty (token likely lacks profile read) — keeping existing pinned.json.')
  process.exit(0)
}

const path = new URL('../src/data/pinned.json', import.meta.url)
writeFileSync(path, JSON.stringify(out, null, 2) + '\n')
console.log(`Wrote ${out.length} pinned repo(s) to src/data/pinned.json`)
