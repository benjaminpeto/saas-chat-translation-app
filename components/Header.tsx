import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import UserButton from "./UserButton";

function Header() {
	return (
		<header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
			<nav className="flex flex-col sm:flex-row items-center p-5 pl-2 max-w-7xl mx-auto">
				<Logo />
				<div className="flex-1 flex items-center justify-end space-x-4">
					{/* Language select */}

					{/* Session && (
                        ...
                    ) */}

					{/* Dark mode toggle */}
					<DarkModeToggle />

					<UserButton />
				</div>
			</nav>
			{/* Upgrade banner */}
		</header>
	);
}

export default Header;
