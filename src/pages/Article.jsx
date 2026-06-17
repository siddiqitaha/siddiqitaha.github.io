import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Section, Reveal } from '../components/ui'
import { getPost } from '../data/writing'
import 'highlight.js/styles/github-dark.css'

const fmt = (d) => {
  try {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return d
  }
}

export default function Article() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) {
    return (
      <Section className="py-14">
        <p className="lbl">Writing</p>
        <h1 className="mt-5 font-head text-3xl font-semibold tracking-tight">Post not found.</h1>
        <Link to="/writing" className="mt-4 inline-block text-accent">← Back to writing</Link>
      </Section>
    )
  }

  return (
    <Section className="py-14">
      <Reveal>
        <Link to="/writing" className="lbl hover:text-ink">← Writing</Link>
        <h1 className="mt-5 max-w-3xl font-head text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink-faint">
          <span>{fmt(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
          {post.tags.map((t) => (
            <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-xs text-ink-soft">{t}</span>
          ))}
        </div>
      </Reveal>

      <article className="prose prose-slate mt-10 max-w-3xl dark:prose-invert prose-headings:font-head prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-pre:rounded-lg prose-pre:border prose-pre:border-line prose-pre:bg-[#0d1117] prose-img:rounded-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </Section>
  )
}
