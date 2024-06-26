"use client";
import { Skeleton } from "./ui/skeleton";
import { limitedSortedMessagesRef, Message } from "@/lib/converters/Message";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserAvatar from "./UserAvatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLanguageStore } from "@/store/store";

function ChatListRow({ chatId }: { chatId: string }) {
	const { data: session } = useSession();
	const router = useRouter();
	const [messages, loading, error] = useCollectionData<Message>(
		limitedSortedMessagesRef(chatId)
	);
	const language = useLanguageStore((state) => state.language);

	function prettyUUID(n = 4) {
		return chatId.substring(0, n);
	}

	const row = (message?: Message) => (
		<div
			key={chatId}
			className="flex p-5 items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
			onClick={() => router.push(`/chat/${chatId}`)}
		>
			<UserAvatar
				name={message?.user.name || session?.user.name}
				image={message?.user.image || session?.user.image}
			/>

			<div className="flex-1">
				<p className="font-bold">
					{!message && "New Chat"}
					{message &&
						[message?.user.name || session?.user.name].toString().split(" ")[0]}
				</p>

				<p className="text-gray-400 line-clamp-1">
					{message?.translated?.[language] || "Get the conversation started!"}
				</p>
			</div>

			<div className="text-xs text-gray-400">
				<p className="mb-auto">
					{message
						? new Date(message.timestamp).toLocaleString()
						: "No messages yet"}
				</p>
				<p>chat #{prettyUUID()}</p>
			</div>
		</div>
	);

	return (
		<div>
			{loading && (
				<div className="flex p-5 items-center space-x-2">
					<Skeleton className="w-12 h-12 rounded-full" />
					<div className="flex-1 space-y-2">
						<Skeleton className="w-full h-4" />
						<Skeleton className="w-1/4 h-4" />
					</div>
				</div>
			)}
			{messages?.length === 0 && !loading && row()}
			{messages?.map((message) => row(message))}
		</div>
	);
}

export default ChatListRow;
