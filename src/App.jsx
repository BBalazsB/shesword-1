import React, { Suspense } from 'react'
import { Routes } from 'react-router-dom'
import { routes } from './routes'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Suspense 
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        }
      >
        <Routes>
          {routes}
        </Routes>
      </Suspense>
      <Toaster position="bottom-right" />
    </>
  )
}

export default App
