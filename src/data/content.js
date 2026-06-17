// Single source of truth for site content. Edit here, the whole site updates.
import pinned from './pinned.json'

export const profile = {
  name: 'Taha Siddiqi',
  title: 'Cloud & Systems Engineer',
  tagline: 'I build secure, self-hosted cloud & AI systems.',
  blurb:
    'From infrastructure-as-code and Kubernetes to production RAG pipelines — I turn messy, manual operations into clean, automated, well-documented systems.',
  location: 'Doha, Qatar',
  citizenship: 'Canadian Citizen',
  openToWork: true,
  email: 'siddiqitaha1@gmail.com',
  github: 'https://github.com/siddiqitaha',
  linkedin: '', // add your LinkedIn URL
  resumeUrl: '/resume.pdf', // drop your résumé PDF in /public as resume.pdf
}

// Short cert labels for the hero badges.
export const certBadges = ['AZ-303 Azure Architect', 'KCNA Kubernetes', 'AZ-900']

// About — narrative paragraphs + working principles (used by About page variants).
export const bio = [
  'I came to cloud architecture through information systems and a lot of hands-on operations — which is why I gravitate to owning the entire stack, from the network and identity layer up to the model behind an app.',
  "At Mannai, Qatar's leading Microsoft Platinum Partner, I migrated enterprise applications to Azure and built MLOps pipelines for clients. Today, at ZIACO, I architect and run a self-hosted private cloud end to end — identity, SSO, intrusion detection, and an AI monitoring pipeline.",
  "Most of my side projects exist because I wanted that same level of control over my own tools. I'm a Canadian citizen based in Doha — open to Cloud, Solutions, and Systems roles in Canada and the Gulf, remote or relocation.",
]

export const principles = [
  { t: 'Secure by default', d: 'IAM, least privilege, and intrusion detection designed in from the start — not bolted on after.' },
  { t: "Reproducible or it didn't happen", d: 'Infrastructure-as-code and validated runbooks over hand-built, snowflake servers.' },
  { t: 'Automate, then trust', d: 'Backups, deploys, and recovery are tested procedures — not last-minute heroics.' },
]

export const skills = [
  { group: 'Cloud', items: ['Microsoft Azure (primary)', 'AWS'] },
  { group: 'AI / MLOps', items: ['RAG pipelines', 'LLM deployment', 'LangChain', 'Ollama', 'Embeddings & vector search', 'Prompt engineering', 'Gradio', 'Azure ML'] },
  { group: 'Infrastructure as Code', items: ['Terraform', 'ARM templates', 'Ansible'] },
  { group: 'Containers & Orchestration', items: ['Docker', 'Docker Compose', 'Kubernetes (AKS)', 'Helm'] },
  { group: 'CI/CD', items: ['Azure DevOps', 'GitHub Actions', 'Jenkins'] },
  { group: 'Security & IAM', items: ['SSO / SAML', 'Microsoft Entra ID', 'Azure Key Vault', 'RBAC', 'Authelia', 'LLDAP', 'UFW', 'Fail2ban'] },
  { group: 'Linux & Self-Hosting', items: ['Linux', 'Caddy', 'Cloudflare', 'Tailscale', 'Nextcloud', 'Automated backups'] },
  { group: 'Monitoring', items: ['Azure Monitor', 'Application Insights', 'Alerting', 'Anomaly detection'] },
  { group: 'Databases', items: ['SQLite', 'ChromaDB', 'Qdrant', 'Knowledge graphs'] },
  { group: 'Web / Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'] },
  { group: 'Languages', items: ['Python (Flask)', 'Bash', 'PowerShell', 'HCL', 'SQL'] },
]

export const experience = [
  {
    role: 'Cloud & Infrastructure Engineer',
    company: 'ZIACO Industries Limited',
    location: 'Remote',
    period: 'Nov 2024 – Present',
    points: [
      'Architected and deployed a 13-service containerized private cloud on a dedicated Linux server (ERP, custom finance apps, video conferencing, SSO stack), hardened with UFW/Fail2ban across a 3-country encrypted mesh network.',
      'Developing an AI monitoring pipeline integrating computer vision, IoT sensor feeds, and operational data to automate risk detection across inventory, procurement, and compliance.',
      'Built a custom Flask app integrated with an ERP API for daily ledger entries, receipt capture, and multi-currency reconciliation — replacing commercial SaaS with a self-hosted alternative.',
      'Implemented network segmentation, encrypted tunnels, IAM, and automated intrusion detection across all services with zero dedicated security staff.',
    ],
  },
  {
    role: 'Cloud Engineer',
    company: 'Mannai Microsoft Solutions',
    location: 'Doha, Qatar',
    period: 'Jun 2023 – Sep 2024',
    points: [
      'Architected the migration of 15+ .NET enterprise applications to Azure App Service and AKS, with production/staging/test environments and CI/CD via Azure DevOps and Terraform.',
      'Built IaC-driven CI/CD pipelines that accelerated software delivery by 56%.',
      'Designed government-compliant cloud architectures automating security controls, RBAC, and secret management via Azure Key Vault to achieve audit compliance.',
      'Engineered an end-to-end MLOps pipeline for LLM development using Python, ChromaDB, and LangChain with RAG.',
    ],
  },
  {
    role: "Tech Supervisor & Professor's Assistant",
    company: 'Global Studies Institute (USC / Arkansas State)',
    location: 'Doha, Qatar',
    period: 'Sep 2021 – Jun 2023',
    points: [
      'Managed accounts, access, and security policies across Active Directory and Azure AD for 200+ students and faculty.',
      'Reduced classroom/lab system downtime by 85% through proactive monitoring and rapid fault resolution.',
      'Managed locally hosted Windows/Linux servers plus Azure cloud services.',
    ],
  },
  {
    role: 'Cloud DevOps Intern',
    company: 'Snoonu',
    location: 'Doha, Qatar',
    period: 'Apr 2022 – Jul 2022',
    points: [
      'Configured Jenkins CI/CD pipelines with automated QA via Cypress and built SQL-based service-health dashboards.',
      'Deployed multi-container apps on AKS using Helm across dev/staging/production.',
      'Improved Git practices, reducing merge conflicts by 30%, and mentored teammates on DevOps workflows.',
    ],
  },
]

const curatedProjects = [
  {
    slug: 'local-rag-assistant',
    name: 'Local RAG Document Assistant',
    icon: 'Search',
    tagline: 'Ask questions about your own documents — fully offline.',
    highlight: 'Private · cited answers',
    problem:
      'Most RAG demos depend on a hosted API. That is a non-starter when documents are private (policies, contracts, internal wikis).',
    build: [
      'Documents are chunked and embedded locally, then indexed in a local vector database.',
      'A question is embedded and matched against the index via semantic search.',
      'Retrieved passages are passed to a local LLM that answers only from that context and cites its sources.',
    ],
    stack: ['Python', 'Ollama', 'ChromaDB', 'LangChain', 'Gradio'],
    result: 'A private, citeable document Q&A app that runs entirely on your own hardware — no API keys, no data leaving the machine.',
    repo: 'https://github.com/siddiqitaha/local-rag-assistant',
  },
  {
    slug: 'runbookforge',
    name: 'RunbookForge',
    icon: 'BookOpen',
    tagline: 'Turn a messy, trial-and-error build into a validated runbook.',
    highlight: 'Validated on a clean env',
    problem:
      '"It works on my machine" — but the steps live in shell history and your head. Six months later nobody can reproduce it.',
    build: [
      'Captures the commands, outputs, and edits made during a build.',
      'Distills the minimal golden path, stripping dead ends and noise.',
      'Replays the runbook in a clean, isolated environment and fails loudly if a step does not reproduce.',
      'Publishes a searchable docs site (MkDocs) plus a printable PDF.',
    ],
    stack: ['Python', 'Plugin core', 'MkDocs', 'CLI'],
    result: 'Reproducible setup procedures that are proven correct on a clean machine before anyone else has to follow them.',
    repo: 'https://github.com/siddiqitaha/runbookforge',
  },
  {
    slug: 'hermes-knowledge-brain',
    name: 'Hermes — Knowledge Brain',
    icon: 'BrainCircuit',
    tagline: 'A model-agnostic memory substrate for AI agents.',
    highlight: 'Persistent agent memory',
    problem:
      'LLMs are stateless. Stuffing everything into the prompt does not scale and loses knowledge between sessions and model swaps.',
    build: [
      'A knowledge graph stores entities, relationships, and time-stamped episodes (what was learned, and when).',
      'A cognitive layer exposes small operations: recall (semantic + graph lookup), remember (durable writes), and reason (relationship traversal).',
      'The LLM is a plug-in, so accumulated knowledge survives switching models.',
    ],
    stack: ['Python', 'Knowledge graph', 'Docker'],
    result: 'Persistent, queryable agent memory that survives restarts and is independent of any single model.',
    repo: 'https://github.com/siddiqitaha/hermes-knowledge-brain',
  },
  {
    slug: 'self-hosted-private-cloud',
    name: 'Self-Hosted Private Cloud',
    icon: 'ServerCog',
    tagline: 'A secure, SSO-protected private cloud on a single Linux host.',
    highlight: '13 services, 1 operator',
    problem:
      'Small teams want the capabilities of SaaS (ERP, files, SSO) without the recurring cost or handing data to third parties.',
    build: [
      'Caddy reverse proxy → Authelia SSO/2FA → LLDAP identity, with apps protected by forward-auth.',
      'Default-deny access control, internal-only service network, brute-force regulation.',
      'Automated volume backups with Telegram alerting, so recovery is a tested procedure.',
    ],
    stack: ['Docker Compose', 'Caddy', 'Authelia', 'LLDAP'],
    result: 'A hardened, self-hosted replacement for several commercial SaaS tools — run and secured by one person.',
    repo: 'https://github.com/siddiqitaha/self-hosted-private-cloud',
  },
  {
    slug: 'azure-terraform-demo',
    name: 'Azure Terraform Platform',
    icon: 'Boxes',
    tagline: 'Infrastructure-as-code for an AKS platform on Azure.',
    highlight: '1 apply → full platform',
    problem:
      'Cloud environments drift and become un-reproducible when built by hand; teams need consistent, auditable infrastructure.',
    build: [
      'Reusable Terraform modules: VNet + NSG, AKS (with monitoring), Container Registry, Key Vault.',
      'Clean dev/prod separation — same code, per-environment tfvars and remote state.',
      'Least privilege: scoped AcrPull to the cluster identity, RBAC-authorized Key Vault.',
      'CI runs fmt + validate, then a plan for each environment on every PR.',
    ],
    stack: ['Terraform', 'Azure', 'AKS', 'GitHub Actions'],
    result: 'Reproducible, auditable Azure infrastructure that stands up an entire platform from one `terraform apply`.',
    repo: 'https://github.com/siddiqitaha/azure-terraform-demo',
  },
]

// --- Pinned-repo sync ---------------------------------------------------------
// Whatever you pin on github.com/siddiqitaha drives the site's projects (kept in
// sync by .github/workflows/deploy.yml, which runs scripts/fetch-pinned.mjs).
// Falls back to the curated list above when nothing is pinned yet.
const nameOverrides = {
  'local-rag-assistant': 'Local RAG Document Assistant',
  'azure-terraform-demo': 'Azure Terraform Platform',
  'self-hosted-private-cloud': 'Self-Hosted Private Cloud',
  'runbookforge': 'RunbookForge',
  'hermes-knowledge-brain': 'Hermes — Knowledge Brain',
  'rag_llama3': 'Local RAG (Llama 3)',
  'AI_Rag_Llama2': 'AI RAG (Llama 2)',
  'csv_rag': 'CSV RAG',
  'currenttime-flask-api': 'Current-Time Flask API',
}
const titleize = (s) => s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
const fromPinned = (pinned || []).map((r) => ({
  slug: r.name,
  name: nameOverrides[r.name] || titleize(r.name),
  tagline: r.description || '',
  result: '',
  stack: r.topics && r.topics.length ? r.topics.slice(0, 6) : r.language ? [r.language] : [],
  repo: r.url,
  stars: r.stars || 0,
}))

// Pinned repos win; otherwise show the curated case studies.
export const projects = fromPinned.length ? fromPinned : curatedProjects

export const certifications = [
  { name: 'AZ-303 — Azure Architect Technologies', issuer: 'Microsoft', year: '2021' },
  { name: 'KCNA — Kubernetes & Cloud Native Associate', issuer: 'Linux Foundation', year: '2023' },
  { name: 'AZ-900 — Azure Fundamentals', issuer: 'Microsoft', year: '2020' },
  { name: 'Artificial Intelligence & Machine Learning', issuer: 'Samsung Innovation Campus', year: '2022' },
]

export const education = [
  {
    school: 'University of Aberdeen',
    detail: 'BSc Business Management & Information Systems',
    period: 'Sep 2020 – Jun 2024',
    note: 'Campus Committee Chairman — led a 19-member committee, organized career fairs, co-authored student bylaws.',
  },
  {
    school: 'Elev8 Future Digital Leaders — Microsoft Qatar',
    detail: 'Cloud Solution Architecture Program',
    period: '2022',
    note: '',
  },
]
