
import { useEffect, useState } from 'react'
import './App.css'

const skills = [
  'React',
  'JavaScript',
  'Node.js',
  'Express.js',
  'MongoDB',
  'REST APIs',
  'Git',
  'Docker',
]

function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(
          'http://localhost:5050/api/projects',
        )

        if (!response.ok) {
          throw new Error('Failed to load projects')
        }

        const result = await response.json()

        // Adapt the backend data to the existing portfolio cards.
        const formattedProjects = result.data.map((project, index) => ({
          number: String(index + 1).padStart(2, '0'),
          name: project.title,
          type:
            project.id === 'portfolio'
              ? 'FULL-STACK + DEVOPS'
              : 'FULL-STACK APPLICATION',
          description: project.description,
          technologies: project.technologies || [],
          status:
            project.id === 'portfolio'
              ? 'Building now'
              : 'In development',
        }))

        setProjects(formattedProjects)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen overflow-hidden bg-[#080b14] text-slate-100">
      {/* Navigation */}
      <header className="border-b border-white/10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="#home"
            className="text-xl font-bold tracking-tight"
          >
            MB<span className="text-indigo-400">.</span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#about" className="transition hover:text-indigo-400">
              About
            </a>
            <a href="#skills" className="transition hover:text-indigo-400">
              Skills
            </a>
            <a href="#projects" className="transition hover:text-indigo-400">
              Projects
            </a>
            <a href="#contact" className="transition hover:text-indigo-400">
              Contact
            </a>
          </div>

          <a
            href="#contact"
            className="rounded-full border border-indigo-400/40 px-4 py-2 text-sm font-medium transition hover:bg-indigo-500/10"
          >
            Let's talk
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section
          id="home"
          className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6 py-24"
        >
          <div className="pointer-events-none absolute right-0 top-20 -z-0 h-72 w-72 rounded-full bg-indigo-600/20 blur-[120px]" />

          <div className="relative z-10 max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-indigo-300">
              <span className="h-px w-10 bg-indigo-400" />
              Software Engineering Student
            </p>

            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
              Building digital
              <span className="block text-indigo-400">
                experiences.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
              I'm a software engineering student passionate about
              full-stack development, artificial intelligence, and
              building reliable software from frontend to backend.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-indigo-500 px-6 py-3 font-semibold transition hover:bg-indigo-400"
              >
                Explore my work
              </a>

              <a
                href="#contact"
                className="rounded-full border border-white/15 px-6 py-3 font-semibold transition hover:border-indigo-400/60 hover:bg-white/5"
              >
                Get in touch
              </a>
            </div>

            <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400">
              <span>Full-Stack Development</span>
              <span>AI & Automation</span>
              <span>DevOps & Cloud</span>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="border-y border-white/10 bg-white/[0.02]"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
                About me
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Curious by nature.
                <span className="block text-slate-500">
                  Builder by choice.
                </span>
              </h2>
            </div>

            <div className="space-y-5 leading-8 text-slate-400">
              <p>
                I'm studying software engineering and developing
                practical skills by building real applications.
                I enjoy understanding how systems work and turning
                ideas into useful digital products.
              </p>

              <p>
                My interests include modern JavaScript development,
                API design, databases, software testing, cloud
                infrastructure, and automation.
              </p>

              <p>
                My goal is to build software that is not only
                functional and intuitive, but also secure,
                maintainable, and ready to scale.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
            My toolkit
          </p>

          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Technologies I work with
            </h2>

            <p className="max-w-md text-slate-400">
              A growing toolkit for developing, testing, and delivering
              full-stack applications.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-slate-300 transition hover:border-indigo-400/50 hover:bg-indigo-500/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="border-y border-white/10 bg-white/[0.02]"
        >
          <div className="mx-auto max-w-6xl px-6 py-24">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
              Selected work
            </p>

            <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Projects & experiments
              </h2>

              <p className="text-sm text-slate-500">
                Loaded from my backend API
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {loading && (
                <p className="text-slate-400">
                  Loading projects...
                </p>
              )}

              {error && (
                <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6">
                  <p className="font-medium text-red-300">
                    Couldn't load projects
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    {error}. Make sure your backend is running on
                    port 5050.
                  </p>
                </div>
              )}

              {!loading && !error && projects.length === 0 && (
                <p className="text-slate-400">
                  No projects available yet.
                </p>
              )}

              {!loading &&
                !error &&
                projects.map((project) => (
                  <article
                    key={project.number}
                    className="group rounded-2xl border border-white/10 bg-[#0c1020] p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm font-medium text-indigo-300">
                        PROJECT / {project.number}
                      </span>

                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                        {project.status}
                      </span>
                    </div>

                    <p className="mt-8 text-xs font-semibold tracking-[0.15em] text-slate-500">
                      {project.type}
                    </p>

                    <h3 className="mt-3 text-2xl font-bold transition group-hover:text-indigo-300">
                      {project.name}
                    </h3>

                    <p className="mt-4 min-h-20 leading-7 text-slate-400">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
          <div className="rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/10 to-transparent p-8 sm:p-12 md:p-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
              Contact
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-5xl">
              Have a project or an opportunity in mind?
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-400">
              I'm interested in software development opportunities,
              internships, and collaborating on useful technology
              projects.
            </p>

            <a
              href="mailto:contact@example.com"
              className="mt-8 inline-flex rounded-full bg-indigo-500 px-6 py-3 font-semibold transition hover:bg-indigo-400"
            >
              Send me an email
              <span className="ml-2" aria-hidden="true">
                ↗
              </span>
            </a>

            <p className="mt-4 text-xs text-slate-500">
              Replace contact@example.com with your real email address.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Mohammed. Built with React.
          </p>

          <a
            href="#home"
            className="transition hover:text-indigo-300"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
