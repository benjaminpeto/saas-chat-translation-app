import Link from "next/link";
import LogoImage from "@logos/mainlogo.svg";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

function Logo() {
	return (
		<Link href="/" prefetch={false} className="overflow-hidden">
			<div className="flex items-center w-14 h-14">
				<AspectRatio ratio={1} className="flex items-center justify-center">
					<Image
						priority
						src={LogoImage}
						alt="Chat translate app logo"
						className="dark:filter dark:invert"
					/>
				</AspectRatio>
			</div>
		</Link>
	);
}

export default Logo;
