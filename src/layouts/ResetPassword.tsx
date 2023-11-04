import FirebaseAuthService from '../services/auth/FirebaseAuthService'
import { useNavigate, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ResetPassword = () => {
    const { t } = useTranslation()
	const navigate = useNavigate()
    const firebaseAuth = new FirebaseAuthService()

	const resetPasswordHandler = () => {
		const email = (document.querySelector('#email') as HTMLInputElement).value
		firebaseAuth.resetPassword(email)
		.then(() => {
            console.log('Changed password ', email)
            navigate('/')
		})
		.catch(() => {
			(document.querySelector('#email') as HTMLInputElement).placeholder = t('reset_password.wrong_email');
			(document.querySelector('#email') as HTMLInputElement).classList.add('placeholder:text-red-800', 'placeholder:font-bold')
		})
	}

    return (
        <div className="bg-white rounded-lg h-full">
            <div className="container flex flex-col mx-auto bg-white rounded-lg h-full place-items-center">
                <div className="flex w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                    <div className="flex items-center justify-center w-full lg:p-12">
                        <div className="flex px-4 xl:p-10">
                            <form className="flex flex-col w-full h-full text-center bg-white">
                                <h1 className="pb-14 mb-14 text-6xl text-bold">FILMIA</h1>
                                <h3 className="mb-14 text-4xl font-extrabold text-gray-900">{t('reset_password.title')}</h3>
                                <label htmlFor="email" className="mb-2 mt-4 text-sm text-start text-gray-900">
                                    {t('reset_password.email')}*
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder={t('reset_password.email_placeholder')}
                                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-7 placeholder:text-gray-700 bg-gray-100 text-dark-gray-900 rounded-2xl"
                                />
                                <button
                                    type="button"
                                    onClick={resetPasswordHandler}
                                    className="w-full px-6 py-5 my-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-violet-600 focus:ring-4 focus:ring-purple-blue-100 bg-violet-700">
                                    {t('reset_password.send_email')}
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

export default ResetPassword
