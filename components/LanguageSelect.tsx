"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import LoadingSpinner from "./LoadingSpinner";
import {
	LanguagesSupported,
	LanguageSupportedMap,
	useLanguageStore,
	useSubscriptionStore,
} from "@/store/store";
import { usePathname } from "next/navigation";
import Link from "next/link";

function LanguageSelect() {
	const [language, setLanguage, getLanguages, getNotSupportedLanguages] =
		useLanguageStore((state) => [
			state.language,
			state.setLanguage,
			state.getLanguages,
			state.getNotSupportedLanguages,
		]);
	const subscription = useSubscriptionStore((state) => state.subscription);
	const pathName = usePathname();
	const isPro =
		subscription?.role === "pro" && subscription?.status === "active";
	const isChatPage = pathName.includes("/chat");

	return (
		isChatPage && (
			<div>
				<Select
					onValueChange={(value: LanguagesSupported) => setLanguage(value)}
				>
					<SelectTrigger className="w-[150px] text-black dark:text-white">
						<SelectValue
							placeholder={LanguageSupportedMap[language]}
							className=""
						/>
					</SelectTrigger>

					<SelectContent>
						{subscription === undefined ? (
							<LoadingSpinner />
						) : (
							<>
								{getLanguages(isPro).map((lang) => (
									<SelectItem key={lang} value={lang}>
										{LanguageSupportedMap[lang]}
									</SelectItem>
								))}

								{getNotSupportedLanguages(isPro).map((lang) => (
									<Link href={"/register"} key={language} prefetch={false}>
										<SelectItem
											key={lang}
											value={lang}
											disabled
											className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
										>
											{LanguageSupportedMap[lang]} (PRO)
										</SelectItem>
									</Link>
								))}
							</>
						)}
					</SelectContent>
				</Select>
			</div>
		)
	);
}

export default LanguageSelect;
