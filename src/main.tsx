import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from './services/store/store'
import "../i18n"
import Home from "./layouts/Home.tsx"
import Login from "./layouts/Login.tsx"
import SignUp from "./layouts/SignUp.tsx"
import ResetPassword from "./layouts/ResetPassword.tsx"
import ErrorPage from "./layouts/ErrorPage.tsx"
import "./styles/index.css"
import { ThemeProvider } from "@material-tailwind/react"

const router = createBrowserRouter([
    {
        path: '/',
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
                children: []
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorPage />
    },
    {
        path: '/signup',
        element: <SignUp />,
        errorElement: <ErrorPage />
    },
    {
        path: '/resetpassword',
        element: <ResetPassword />,
        errorElement: <ErrorPage />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
