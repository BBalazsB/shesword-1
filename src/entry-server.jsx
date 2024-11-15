import React, { Suspense } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

export function render(url) {
  const helmetContext = {}

  try {
    const html = renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
              </div>
            }
          >
            <App />
          </Suspense>
        </StaticRouter>
      </HelmetProvider>
    )

    return {
      html,
      helmet: helmetContext.helmet,
      status: 200
    }
  } catch (error) {
    console.error('Rendering error:', error)
    return {
      html: `<div>Error: ${error.message}</div>`,
      helmet: helmetContext.helmet,
      status: 500
    }
  }
}