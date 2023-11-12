import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import FirebaseAuthService from '../services/auth/FirebaseAuthService'
import { useTranslation } from 'react-i18next'

const SignUp = () => {
    const { t } = useTranslation()
    const firebaseAuth = new FirebaseAuthService()
    const navigate = useNavigate()
    const [keepLogin, setKeepLogin] = useState<boolean>(true)

    const toggleKeepLogin = () => setKeepLogin(!keepLogin)

    const createAccountHandler = () => {
        const email = (document.querySelector('#email') as HTMLInputElement).value
        const password = (document.querySelector('#password') as HTMLInputElement).value
        firebaseAuth
            .createUserWithEmail(email, password, keepLogin)
            .then(userCredential => {
                console.debug('User email: ', userCredential.user.email)
                navigate('/')
            })
            .catch(() => (document.querySelector('#warning') as HTMLInputElement).classList.remove('hidden'))
    }

    return (
        <div className="bg-white rounded-lg h-full">
            <div className="container flex flex-col mx-auto bg-white rounded-lg h-full place-items-center">
                <div className="flex w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                    <div className="flex items-center justify-center w-full lg:p-12">
                        <div className="flex px-4 xl:p-10">
                            <form autoComplete='on' className="flex flex-col w-full h-full text-center bg-white">
                                <h1 className="pb-14 text-6xl text-bold">FILMIA</h1>
                                <h3 className="mb-14 text-4xl font-extrabold text-gray-900">{t('sign_up.title')}</h3>
                                <p id="warning" className="hidden pb-3 font-semibold text-red-800">
                                    {t('sign_up.invalid')}
                                </p>
                                <label htmlFor="email" className="mb-2 text-sm text-start text-gray-900">
                                    {t('sign_up.email')}*
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder={t('sign_up.email_placeholder')}
                                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-7 placeholder:text-gray-700 bg-gray-100 text-dark-gray-900 rounded-2xl"
                                />
                                <label htmlFor="password" className="mb-2 text-sm text-start text-gray-900">
                                    {t('sign_up.password')}*
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder={t('sign_up.password_placeholder')}
                                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-gray-700 bg-gray-100 text-dark-gray-900 rounded-2xl"
                                />
                                <div className="flex flex-row justify-between my-5">
                                    <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                                        <input type="checkbox" checked={keepLogin} onChange={toggleKeepLogin} className="sr-only peer" />
                                        <div className="w-5 h-5 bg-white border-2 rounded-sm border-gray-500 peer peer-checked:border-0 peer-checked:bg-violet-700">
                                            <img className="" src="check-icon.png" alt="tick" />
                                        </div>
                                        <span className="ml-3 text-sm font-normal text-gray-900">{t('login.keep_login')}</span>
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    onClick={createAccountHandler}
                                    className="w-full px-6 py-5 my-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-violet-600 focus:ring-4 focus:ring-purple-blue-100 bg-violet-700">
                                    {t('sign_up.create_account')}
                                </button>
                                <NavLink
                                    to="/login"
                                    className="w-full px-6 py-5 my-5 text-sm font-bold leading-none bg-gray-100 text-dark-gray-900 transition duration-300 md:w-96 rounded-2xl hover:bg-gray-200 focus:ring-4 focus:ring-purple-blue-100">
                                    <button type="button">{t('common.come_back')}</button>
                                </NavLink>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
