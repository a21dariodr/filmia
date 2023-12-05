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
import Gallery from "./routes/Gallery.tsx"
import Film, { loader as filmLoader } from "./routes/Film.tsx"
import NewFilmForm from "./routes/NewFilmForm.tsx"
import "./styles/index.css"
import 'atropos/css'
import '/node_modules/flag-icons/css/flag-icons.min.css'
import { ThemeProvider } from "@material-tailwind/react"

const customTheme = {
    list: {
        styles: {
            base: {
                item: {
                    selected: {
                        bg: 'bg-indigo-200'
                    }
                }
            }
        }
    }
}

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback="Cargando...">
                <ThemeProvider value={customTheme}>
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
                        path: '/films/:filmId',
                        element: <Film />,
                        loader: filmLoader
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
