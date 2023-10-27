import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../i18n'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback='Cargando...'>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </Suspense>
        )
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
