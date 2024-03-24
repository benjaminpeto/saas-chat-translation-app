import { authOptions } from "@/auth";
import PricingCards from "@/components/PricingCards";
import RadialGradientSVG from "@/components/RadialGradientSVG";
import { getServerSession } from "next-auth";

async function RegisterPage() {
	const session = await getServerSession(authOptions);

	return (
		<div className="isolate h-full overflow-hidden bg-gray-900 pb-40">
			<div className="mx-auto max-w-7xl px-6 pb-12 pt-16 text-white text-center lg:px-8">
				<div className="mx-auto mx-w-4xl">
					<p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
						Let&apos;s handle your Membership{" "}
						{session?.user?.name?.split(" ")?.[0]}
					</p>
				</div>
				<div className="relative">
					<RadialGradientSVG />
				</div>
			</div>

			<PricingCards redirect={false} />
		</div>
	);
}

export default RegisterPage;
