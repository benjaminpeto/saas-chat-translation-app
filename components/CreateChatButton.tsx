"use client";

import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function CreateChatButton() {
	const router = useRouter();

	const createNewChat = async () => {
		// Implement logic!!!!

		router.push(`/chat/chatId123`);
	};
	return (
		<Button onClick={createNewChat} variant={"ghost"}>
			<MessageSquarePlusIcon />
		</Button>
	);
}

export default CreateChatButton;
