"use client";

import { useSubscriptionStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function UpgradeBanner() {
	const subscription = useSubscriptionStore((state) => state.subscription);
	const isPro = subscription?.role === "pro";
	const router = useRouter();

	if (subscription === undefined || isPro) return null;

	return (
		<Button
			onClick={() => router.push("/register")}
			className="w-full rounded-none bg-gradient-to-r from-[#7775d6] to-[#e935c1] text-center text-white px-5 py-2 hover:from-[#7775d6] hover:to-[#e935c1] hover:shadow-md transition-all hover:opacity-75 duration-300"
		>
			Upgrade to Pro to unlock all features 🚀
		</Button>
	);
}

export default UpgradeBanner;
