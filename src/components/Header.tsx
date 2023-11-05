import { Navbar } from "@material-tailwind/react"

const Header = () => {
	return (
        <div className="w-full overflow-scroll">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
				<div className="flex items-center justify-between text-blue-gray-900"></div>
			</Navbar>
        </div>
    )
}

export default Header
