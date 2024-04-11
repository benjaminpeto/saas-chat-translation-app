import { authOptions } from "@/auth";
import AdminControls from "@/components/AdminControls";
import ChatInput from "@/components/ChatInput";
import ChatMembersBadges from "@/components/ChatMembersBadges";
import ChatMessages from "@/components/ChatMessages";
import { sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";

type Props = {
	params: {
		chatId: string;
	};
};

async function ChatPage({ params: { chatId } }: Props) {
	const session = await getServerSession(authOptions);

	const initialMessage = (await getDocs(sortedMessagesRef(chatId))).docs.map(
		(doc) => doc.data()
	);

	return (
		<>
			<AdminControls chatId={chatId} />

			<ChatMembersBadges chatId={chatId} />

			<div className="flex-1">
				<ChatMessages
					chatId={chatId}
					session={session}
					initialMessage={initialMessage}
				/>
			</div>

			<ChatInput chatId={chatId} />
		</>
	);
}

export default ChatPage;
