import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}))

app.use(express.json({ limit: '10kb' }))

// Health-check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString(),
  })
})

// Temporary project data.
// We'll replace this with MongoDB in a later step.
const projects = [
  {
    id: 'helpdesk',
    title: 'Helpdesk Platform',
    description: 'A full-stack support ticket management application.',
    technologies: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    description: 'A portfolio built with a full-stack architecture.',
    technologies: ['React', 'Express', 'MongoDB'],
  },
]

// Return all projects
app.get('/api/projects', (req, res) => {
  res.json({
    success: true,
    count: projects.length,
    data: projects,
  })
})

// Return a single project by ID
app.get('/api/projects/:id', (req, res) => {
  const project = projects.find((item) => item.id === req.params.id)

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found',
    })
  }

  res.json({
    success: true,
    data: project,
  })
})

// Handle unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Portfolio API running at http://localhost:${PORT}`)
})
