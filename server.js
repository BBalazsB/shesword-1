import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  // Handle static files
  app.use(express.static(path.resolve(__dirname, 'public')))

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      // Skip SSR for static assets
      if (url.includes('.')) {
        return next()
      }

      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      )

      template = await vite.transformIndexHtml(url, template)
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
      const { html, helmet, status } = await render(url)

      const [start, end] = template.split('<!--app-html-->')
      const head = start.replace('<!--app-head-->', 
        `${helmet?.title?.toString() || ''}${helmet?.meta?.toString() || ''}${helmet?.link?.toString() || ''}`
      )

      const fullHtml = `${head}${html}${end}`
      
      res.status(status).set({ 'Content-Type': 'text/html' }).end(fullHtml)

    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e.stack)
      res.status(500).end(e.stack)
    }
  })

  app.listen(5173, () => {
    console.log('Server running at http://localhost:5173')
  })
}

createServer()