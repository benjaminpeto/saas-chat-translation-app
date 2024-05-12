import Link from "next/link";
import {
	Home,
	LineChart,
	Menu,
	MessagesSquareIcon,
	Package,
	ShoppingCart,
	Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "./Logo";
import UserButton from "./UserButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import LanguageSelect from "./LanguageSelect";
import DarkModeToggle from "./DarkModeToggle";
import CreateChatButton from "./CreateChatButton";
import ChatList from "./ChatList";
import { useSubscriptionStore } from "@/store/store";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { getDocs } from "firebase/firestore";
import { sortedMessagesRef } from "@/lib/converters/Message";
import AdminControls from "./AdminControls";

async function ChatWindow({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);

	return (
		<div className="grid min-h-screen overflow-hidden w-full md:grid-cols-[220px_1fr] lg:grid-cols-[400px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link href="/" className="flex items-center gap-2 font-semibold">
							<Logo />
							<span className="">ChatTranslate</span>
						</Link>
					</div>
					<div className="h-[calc(100vh-55px)] lg:h-[calc(100vh-60px)] overflow-scroll">
						<div className="grid items-start text-sm font-medium">
							<ChatList />
						</div>
					</div>
					{/* SHOW Banner to upgrade for FREE tier */}

					{/* <div className="mt-auto p-4">
						<Card x-chunk="dashboard-02-chunk-0">
							<CardHeader className="p-2 pt-0 md:p-4">
								<CardTitle>Upgrade to Pro</CardTitle>
								<CardDescription>
									Unlock all features and get unlimited access to our support
									team.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
								<Button size="sm" className="w-full">
									Upgrade
								</Button>
							</CardContent>
						</Card>
					</div> */}
				</div>
			</div>
			<div className="flex flex-col h-full">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="flex flex-col">
							<section className="grid gap-2 text-lg font-medium">
								<ChatList />
							</section>
							{/* SHOW Banner to upgrade */}
							{/* {!isPro && (
								<section className="mt-auto">
									<Card>
										<CardHeader>
											<CardTitle>Upgrade to Pro</CardTitle>
											<CardDescription>
												Unlock all features and get unlimited access to our
												support team.
											</CardDescription>
										</CardHeader>
										<CardContent>
											<Button size="sm" className="w-full">
												Upgrade
											</Button>
										</CardContent>
									</Card>
								</section>
							)} */}
						</SheetContent>
					</Sheet>
					<div className="w-full flex-1">
						{/* <AdminControls chatId={chatId} /> */}
						{/* TODO: Search messages */}
						{/* <form>
							<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
							type="search"
							placeholder="Search messages..."
							className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
							/>
							</div>
						</form> */}
					</div>{" "}
					<Link href="/chat" prefetch={false}>
						<MessagesSquareIcon className="text-black dark:text-white" />
					</Link>
					<CreateChatButton />
					<DarkModeToggle />
					<LanguageSelect />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<UserButton session={session} />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className="flex h-[calc(100vh-55px)] lg:h-[calc(100vh-60px)] flex-col gap-4 pt-4 lg:gap-6 lg:px-6 lg:pt-6 overflow-scroll">
					{children}
				</main>
			</div>
		</div>
	);
}

export default ChatWindow;
