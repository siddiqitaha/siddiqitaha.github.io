// Single source of truth for site content. Edit here, the whole site updates.
import pinned from './pinned.json'

export const profile = {
  name: 'Taha Nasir Siddiqi',
  title: 'Cloud & Systems Engineer',
  tagline: 'Secure, self-hosted cloud and AI systems.',
  blurb:
    'Building and running secure cloud and Linux infrastructure, and the security layer that sits in front of AI agents.',
  location: 'Doha, Qatar',
  citizenship: 'Canadian Citizen',
  openToWork: true,
  email: 'siddiqitaha1@gmail.com',
  github: 'https://github.com/siddiqitaha',
  linkedin: 'https://linkedin.com/in/siddiqitaha',
  resumeUrl: '/resume.pdf', // drop your résumé PDF in /public as resume.pdf
}

// Short cert labels for the hero badges.
export const certBadges = ['KCNA Kubernetes', 'AZ-900 Azure', 'Exam AZ-303']

// About — narrative paragraphs + working principles (used by About page variants).
export const bio = [
  'Cloud and systems work that started in information systems and a lot of hands-on operations, with a habit of owning the whole stack, from the network and identity layer up to the model behind an app.',
  "At Mannai, Qatar's leading Microsoft Platinum Partner, that meant migrating enterprise applications to Azure and building MLOps pipelines for clients, working alongside delivery and platform teams. At ZIACO, the focus is architecting and running a self-hosted private cloud end to end: identity, SSO, intrusion detection, and an AI monitoring pipeline.",
  'More recent work has been team-built: production RAG on multilingual data, and securing agentic AI systems. Canadian citizen based in Doha, open to Cloud, Systems, Infrastructure, and Solutions roles in Canada (remote or relocation) and the Gulf.',
]

export const principles = [
  { t: 'Own the outcome', d: 'Responsibility for the whole result, not just one slice: the late-night fix and the doc that stops it happening again.' },
  { t: 'Explain it simply', d: 'Translating technical trade-offs into plain language, so non-engineers can make good decisions together.' },
  { t: 'Document for the next person', d: 'Writing things down along the way, so the team (or future me) is not stuck reverse-engineering decisions.' },
]

export const skills = [
  { group: 'Cloud & Networking', items: ['Microsoft Azure (primary)', 'Azure landing zones', 'Hub-and-spoke VNets', 'NSGs', 'Azure Firewall', 'Bastion', 'Private Endpoints', 'Managed Identity', 'AWS'] },
  { group: 'Infrastructure as Code', items: ['Terraform', 'ARM templates', 'Ansible'] },
  { group: 'Containers & Orchestration', items: ['Docker', 'Docker Compose', 'Kubernetes (AKS)', 'Helm'] },
  { group: 'CI/CD', items: ['Azure DevOps', 'GitHub Actions', 'Jenkins'] },
  { group: 'Security & IAM', items: ['SSO / SAML', 'Microsoft Entra ID', 'Azure Key Vault', 'RBAC', 'Conditional Access', 'Authelia', 'LLDAP', 'UFW', 'Fail2ban'] },
  { group: 'Linux & Self-Hosting', items: ['Linux', 'Caddy', 'Cloudflare', 'Tailscale', 'Automated backups'] },
  { group: 'Observability', items: ['OpenTelemetry', 'Grafana', 'Prometheus', 'Loki', 'Splunk', 'Azure Monitor', 'Log Analytics'] },
  { group: 'AI / RAG', items: ['RAG pipelines', 'Multilingual RAG', 'Vector search', 'Embeddings & rerankers', 'Qdrant', 'ChromaDB', 'LLM deployment (vLLM, Ollama)', 'LangChain', 'LoRA / QLoRA fine-tuning'] },
  { group: 'AI Agent Security', items: ['Agentic AI security', 'OWASP MCP Top 10', 'Cisco AI Defense', 'DefenseClaw', 'Agent Control', 'Galileo', 'Prompt-injection defense', 'MCP'] },
  { group: 'Languages', items: ['Python (Flask)', 'PowerShell', 'Bash', 'HCL', 'SQL'] },
]

export const experience = [
  {
    role: 'Cloud & Infrastructure Engineer',
    company: 'ZIACO Industries Limited',
    location: 'Remote',
    period: 'Nov 2024 – Present',
    points: [
      'Built and run a 13-service containerized private cloud on a dedicated Linux server (ERP, custom Flask finance apps, video conferencing, SSO via Caddy + Authelia + LLDAP, automated backups with alerting) as the sole infrastructure engineer, with network segmentation, default-deny access control and UFW/Fail2ban across a 3-country encrypted mesh network.',
      'Built a custom Flask app integrated with an ERP API for daily ledger entries, receipt capture, and multi-currency reconciliation, replacing commercial SaaS with a self-hosted alternative.',
      'Set up a shared GPU workstation as a jump server for a 5-engineer team: SSH gated by Tailscale identity instead of managed key files, demos published via Cloudflare Tunnel with Google SSO and an email allowlist, per-user browser IDEs, and one admin CLI so onboarding is a single command.',
      'Built a production RAG system over Arabic-first policy documents on Qdrant with locally served models, designed to answer only from retrieved sources and refuse rather than guess, with verification passes over answers.',
      'Built the security layer for AI agents: every tool call is approved or blocked before it runs, and blocked outright if the checker is unreachable; decisions record to Splunk and model turns score in Galileo, using Cisco AI Defense inline inspection and Agent Control policy.',
      'Compared LoRA and QLoRA fine-tuning and showed the memory-saving method cost 51% more time for a saving the hardware did not need; found a bug in NVIDIA\'s NeMo container that writes adapter files under key names the loader silently ignores.',
    ],
  },
  {
    role: 'Cloud Engineer',
    company: 'Mannai Microsoft Solutions',
    location: 'Doha, Qatar',
    period: 'Jun 2023 – Sep 2024',
    points: [
      'Led the migration of 15+ .NET enterprise applications to Azure App Service and AKS, with production/staging/test environments and CI/CD via Azure DevOps and Terraform.',
      'Replaced manual multi-step releases with Terraform-driven CI/CD pipelines, so a deployment became a single pipeline run with the same result in every environment.',
      'Built an Azure landing zone in Terraform for a government health client: hub-and-spoke VNets and NSG rules generated from a source spreadsheet, Azure Firewall, Bastion for admin access, Key Vault for secrets, and Log Analytics collecting from every spoke.',
      'Built a RAG pipeline for enterprise clients using Python, ChromaDB, and LangChain, automating document ingestion, embedding, and deployment.',
    ],
  },
  {
    role: "Tech Supervisor & Professor's Assistant",
    company: 'Global Studies Institute (USC / Arkansas State)',
    location: 'Doha, Qatar',
    period: 'Sep 2021 – Jun 2023',
    points: [
      'Managed accounts, access, and security policies across Active Directory and Azure AD for 200+ students and faculty.',
      'Cut repeat classroom and lab failures by monitoring for the underlying faults and fixing causes rather than resetting machines.',
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
      'Introduced a branching and review convention that cut repeat merge conflicts, and mentored teammates on DevOps workflows.',
    ],
  },
]

const curatedProjects = [
  {
    slug: 'local-rag-assistant',
    name: 'Local RAG Document Assistant',
    icon: 'Search',
    tagline: 'Ask questions about your own documents, fully offline.',
    highlight: 'Private · cited answers',
    problem:
      'Most RAG demos depend on a hosted API. That is a non-starter when documents are private (policies, contracts, internal wikis).',
    build: [
      'Documents are chunked and embedded locally, then indexed in a local vector database.',
      'A question is embedded and matched against the index via semantic search.',
      'Retrieved passages are passed to a local LLM that answers only from that context and cites its sources.',
    ],
    stack: ['Python', 'Ollama', 'ChromaDB', 'LangChain', 'Gradio'],
    result: 'A private, citeable document Q&A app that runs entirely on your own hardware. No API keys, no data leaving the machine.',
    repo: 'https://github.com/siddiqitaha/local-rag-assistant',
  },
  {
    slug: 'runbookforge',
    name: 'RunbookForge',
    icon: 'BookOpen',
    tagline: 'Turn a messy, trial-and-error build into a validated runbook.',
    highlight: 'Validated on a clean env',
    problem:
      '"It works on my machine", but the steps live in shell history and your head. Six months later nobody can reproduce it.',
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
    result: 'A hardened, self-hosted replacement for several commercial SaaS tools, run and secured by one person.',
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
      'Clean dev/prod separation: same code, per-environment tfvars and remote state.',
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

// Hand-authored case studies (team projects), linked to their write-ups. Shown ahead of repos.
const caseStudies = [
  {
    slug: 'mcp-attack-lab',
    name: 'MCP Attack Lab',
    icon: 'ShieldAlert',
    tagline: 'Five MCP servers, each broken on purpose in a different way.',
    highlight: 'What a scan misses',
    problem:
      'An AI agent picks which tool to call by reading the tool\'s description, which is free text written by whoever made the tool. That trust is the attack surface, and most people have not seen how far it goes.',
    build: [
      'Five small MCP servers: tool poisoning, indirect prompt injection, rug pull, data exfiltration, privilege abuse. Five of the ten weaknesses in the OWASP MCP Top 10.',
      'A description scan reads what a tool says it does, so it catches tool poisoning and the rug pull.',
      'The other three have clean descriptions. Only watching what the tool actually does at runtime finds them.',
      'A probe script runs the full MCP handshake against any server and prints a plain verdict.',
    ],
    stack: ['Python', 'MCP SDK', 'OWASP MCP Top 10'],
    result: 'A place to point a scanner or a runtime guardrail and find out which weaknesses it can catch and which it cannot.',
    repo: 'https://github.com/siddiqitaha/mcp-attack-lab',
  },
  {
    slug: 'ai-body',
    name: 'The AI Body',
    icon: 'Boxes',
    tagline: 'A local AI agent built as five parts you can swap out.',
    highlight: 'Stops rather than continues',
    problem:
      'Trying a new model or a new tool usually means trusting it with everything the agent can reach. That makes experimenting expensive and slow.',
    build: [
      'Five parts behind one core that makes the decisions, each replaceable on its own.',
      'If a part fails or is not trusted, the system stops instead of carrying on.',
      'A new component can be run and measured without being trusted first.',
    ],
    stack: ['Python', 'Docker'],
    result: 'A foundation where an untrusted component can be tried safely, so new tools get measured instead of argued about.',
    repo: 'https://github.com/siddiqitaha/ai-body',
  },
  {
    slug: 'galileo-governed-openclaw',
    name: 'Galileo-Governed OpenClaw',
    icon: 'ShieldCheck',
    tagline: 'Let an AI agent do real work, with a checkpoint in front of every action.',
    highlight: 'Blocks unsafe actions',
    problem:
      'An agent that can run commands and edit files is useful, but one wrong call can break something. The goal was to keep it useful without handing it a blank cheque.',
    build: [
      'Before OpenClaw runs a tool, Agent Control approves or blocks the call. If Agent Control is unreachable, the call is blocked rather than let through.',
      'Approvals and blocks land in Splunk, so there is a record of what the agent tried to do.',
      'The model prompts and replies go to Galileo, for review and scoring.',
      'One docker compose command brings it all up, with pinned versions so it builds the same anywhere.',
    ],
    stack: ['OpenClaw', 'Agent Control', 'Galileo', 'Splunk', 'Docker'],
    result: 'An agent you can give real access to: bad actions get stopped, and everything it does is on the record.',
    repo: 'https://github.com/siddiqitaha/galileo-governed-openclaw',
  },
  {
    slug: 'production-rag-arabic',
    name: 'Production RAG on real Arabic data',
    icon: 'Search',
    tagline: 'A multilingual RAG system the team built and runs locally on a DGX Spark, with verification loops and a refuse-to-guess design.',
    stack: ['RAG', 'Qwen3', 'Qdrant', 'GPT-OSS', 'DGX'],
    link: '/writing/rag-on-real-arabic-data',
  },
  {
    slug: 'securing-agentic-ai',
    name: 'Securing agentic AI',
    icon: 'ShieldCheck',
    tagline: 'A firewall for AI agents the team runs: guardrails, prompt-injection and exfiltration defense, and full observability across many agents.',
    stack: ['DefenseClaw', 'Guardrails', 'OpenTelemetry', 'Splunk'],
    link: '/writing/firewall-for-agentic-ai',
  },
]

// Case studies first, then pinned repos (or the curated list when nothing is pinned).
const repoProjects = fromPinned.length ? fromPinned : curatedProjects
export const projects = [...caseStudies, ...repoProjects]

export const certifications = [
  { name: 'Exam AZ-303 · Azure Architect Technologies', issuer: 'Microsoft', year: '2021', logo: 'azure' },
  { name: 'KCNA · Kubernetes & Cloud Native Associate', issuer: 'Linux Foundation', year: '2023', logo: 'kubernetes' },
  { name: 'AZ-900 · Azure Fundamentals', issuer: 'Microsoft', year: '2020', logo: 'azure' },
  { name: 'Artificial Intelligence & Machine Learning', issuer: 'Samsung Innovation Campus', year: '2023-2024', logo: 'samsung', note: 'Capstone project: 1st place' },
]

export const education = [
  {
    school: 'University of Aberdeen',
    detail: 'BSc Business Management & Information Systems',
    period: 'Sep 2020 – Jun 2024',
    note: 'Campus Committee Chairman: led a 19-member committee, organized career fairs, co-authored student bylaws.',
  },
  {
    school: 'Elev8 Future Digital Leaders — Microsoft Qatar',
    detail: 'Cloud Solution Architecture Program',
    period: '2022',
    note: '',
  },
]
