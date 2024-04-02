import { authOptions } from "@/auth";
import ChatInput from "@/components/ChatInput";
import { getServerSession } from "next-auth";

type Props = {
	params: {
		chatId: string;
	};
};

async function ChatPage({ params: { chatId } }: Props) {
	const session = getServerSession(authOptions);

	return (
		<>
			{/* Admin controls */}
			{/* ChatMembersBadge */}
			{/* ChatMessages */}

			{/* ChatInput */}
			<ChatInput chatId={chatId} />
		</>
	);
}

export default ChatPage;
