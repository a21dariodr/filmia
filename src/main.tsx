import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from './services/store/store'
import "../i18n"
import Home from "./routes/Home.tsx"
import Login from "./routes/Login.tsx"
import SignUp from "./routes/SignUp.tsx"
import ResetPassword from "./routes/ResetPassword.tsx"
import ErrorPage from "./routes/ErrorPage.tsx"
import Gallery from "./layouts/Gallery.tsx"
import NewFilmForm from "./layouts/NewFilmForm.tsx"
import "./styles/index.css"
import 'atropos/css'
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
                children: [
                    {
                        index: true,
                        element: <Gallery />
                    },
                    {
                        path: '/newFilm',
                        element: <NewFilmForm />
                    }
                ]
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
