import ChatList from "@/components/ChatList";

type Props = {
	params: {};
	searchParams: {
		error: string;
	};
};

function ChatsPage({ searchParams: { error } }: Props) {
	return (
		<div>
			{/* Chat permission chat */}

			{/* ChatList */}
			<ChatList />
		</div>
	);
}

export default ChatsPage;
