// Footer component that shows a The Movie Database attribution logo
const Footer = () => {
	return (
        <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center">
            <img src="/tmd_attribution_logo.svg" alt="The Movie Database attribution logo" className="max-w-[40%] md:max-w-[20%]" />
        </footer>
    )
}

export default Footer
