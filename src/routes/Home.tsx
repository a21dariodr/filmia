import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import firebase from '../services/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'
import { getEmail, setEmail, setId, getId } from '../state-slices/userSlice'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userEmail = useSelector(getEmail)
    const userId = useSelector(getId)

    useEffect(() => {
        onAuthStateChanged(firebase.auth, user => {
            if (user) {
                if (!userEmail) {
                    dispatch(setEmail(user.email!))
                    dispatch(setId(user.uid))
                }
                console.debug('User Firebase', user)
                console.debug('User email: ', userEmail)
                console.debug('User id: ', userId)
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
