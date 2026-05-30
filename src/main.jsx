import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router/dom'
import router from './router/router'
import TestContext from './components/TestContest/TestContext'




createRoot(document.getElementById('root')).render(
  <StrictMode>
  <TestContext>
    <RouterProvider router={router}></RouterProvider>
  </TestContext>
  </StrictMode>,
)
