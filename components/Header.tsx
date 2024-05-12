import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import UserButton from "./UserButton";
import CreateChatButton from "./CreateChatButton";
import UpgradeBanner from "./UpgradeBanner";
import { MessagesSquareIcon } from "lucide-react";
import LanguageSelect from "./LanguageSelect";

async function Header() {
	const session = await getServerSession(authOptions);

	return (
		<header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
			<nav className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<Logo />
				<div className="flex-1 flex items-center justify-end space-x-4">
					{session ? (
						<>
							<Link href="/chat" prefetch={false}>
								<MessagesSquareIcon className="text-black dark:text-white" />
							</Link>
							<CreateChatButton />
						</>
					) : (
						<Link href="/pricing">Pricing</Link>
					)}

					<DarkModeToggle />
					<LanguageSelect />
					<UserButton session={session} />
				</div>
			</nav>
			<UpgradeBanner />
		</header>
	);
}

export default Header;
