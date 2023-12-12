import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import firebase from '../services/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setEmail, setId } from '../state-slices/userSlice'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

// Main app component that checks if a user is signed in and acts as an outlet for the rest of the films-related components
const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userEmail = localStorage.getItem('userEmail')!
    const userId = localStorage.getItem('userId')!

    // Checks if a user is signed in and redirects it to the login route if it is not
    useEffect(() => {
        onAuthStateChanged(firebase.auth, user => {
            if (user) {
                if (!userEmail) {
                    dispatch(setEmail(user.email!))
                    dispatch(setId(user.uid))
                    localStorage.setItem('userEmail', user.email!)
                    localStorage.setItem('userId', user.uid)
                }
                console.log('User Firebase', user)
                console.log('User email: ', userEmail)
                console.log('User id: ', userId)
            } else {
                navigate('/login')
            }
        })
    })

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Home
