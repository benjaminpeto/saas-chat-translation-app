import { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguagesSupported =
	| "en"
	| "es"
	| "de"
	| "fr"
	| "hu"
	| "ar"
	| "zh-CN"
	| "ca"
	| "hr"
	| "af"
	| "sq"
	| "hy"
	| "az"
	| "eu"
	| "bg"
	| "cs"
	| "da"
	| "nl"
	| "fil"
	| "fi"
	| "gl"
	| "el"
	| "haw"
	| "he"
	| "hi"
	| "is"
	| "id"
	| "ga"
	| "it"
	| "ja"
	| "ko"
	| "la"
	| "lv"
	| "lt"
	| "lb"
	| "mk"
	| "mt"
	| "mh"
	| "my"
	| "no"
	| "ne"
	| "fa"
	| "pl"
	| "pt"
	| "ro"
	| "ru"
	| "gd"
	| "sr"
	| "sk"
	| "so"
	| "sv"
	| "th"
	| "tr"
	| "uk"
	| "vi"
	| "cy";

export const LanguageSupportedMap: Record<LanguagesSupported, string> = {
	en: "English",
	es: "Spanish",
	de: "German",
	fr: "French",
	hu: "Hungarian",
	ar: "Arabic	",
	"zh-CN": "Chinese (Simplified)",
	ca: "Catalan",
	hr: "Croatian",
	af: "Afrikaans",
	sq: "Albanian",
	hy: "Armenian",
	az: "Azerbaijani",
	eu: "Basque",
	bg: "Bulgarian",
	cs: "Czech",
	da: "Danish",
	nl: "Dutch",
	fil: "Filipino (Tagalog)",
	fi: "Finnish",
	gl: "Galician",
	el: "Greek",
	haw: "Hawaiian",
	he: "Hebrew",
	hi: "Hindi",
	is: "Icelandic",
	id: "Indonesian",
	ga: "Irish",
	it: "Italian",
	ja: "Japanese",
	ko: "Korean",
	la: "Latin",
	lv: "Latvian",
	lt: "Lithuanian",
	lb: "Luxembourgish",
	mk: "Macedonian",
	mt: "Maltese",
	mh: "Marshallese",
	my: "Myanmar (Burmese)",
	no: "Norwegian",
	ne: "Nepali",
	fa: "Persian",
	pl: "Polish",
	pt: "Portuguese",
	ro: "Romanian",
	ru: "Russian",
	gd: "Scots Gaelic",
	sr: "Serbian",
	sk: "Slovak",
	so: "Somali",
	sv: "Swedish",
	th: "Thai",
	tr: "Turkish",
	uk: "Ukrainian",
	vi: "Vietnamese",
	cy: "Welsh",
};

interface SubscriptionState {
	subscription: Subscription | null | undefined;
	setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
	subscription: undefined,
	setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
