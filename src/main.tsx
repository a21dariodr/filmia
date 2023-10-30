import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "../i18n"
import Home from "./layouts/Home.tsx"
import ErrorPage from "./layouts/ErrorPage.tsx"
import "./styles/index.css"
import { ThemeProvider } from "@material-tailwind/react"

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback="Cargando...">
                <ThemeProvider>
                    <Home />
                </ThemeProvider>
            </Suspense>
        ),
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					
				]
			}
		]
    }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
