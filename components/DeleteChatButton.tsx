"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useAdminId from "@/hooks/useAdminId";
import { Trash } from "lucide-react";
import { set } from "zod";

function DeleteChatButton({ chatId }: { chatId: string }) {
	const { data: session } = useSession();
	const [open, setOpen] = useState<boolean>(false);
	const { toast } = useToast();
	const router = useRouter();
	const adminId = useAdminId({ chatId });

	const handleDelete = async () => {
		toast({
			title: "Deleting chat...",
			description: "Please wait while we delete the chat.",
		});

		console.log("Deleting chat with chatId: ", chatId);

		await fetch("/api/chat/delete", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ chatId: chatId }),
		})
			.then((res) => {
				toast({
					title: "Success!",
					description: "Your chat has been successfully deleted.",
					className: "bg-green-600 text-white",
					duration: 3000,
				});
				router.replace("/chat");
			})
			.catch((error) => {
				console.error("Error deleting chat: ", error);
				toast({
					title: "Failed to delete chat",
					description: "An error occurred while deleting your chat.",
					variant: "destructive",
				});
			})
			.finally(() => {
				setOpen(false);
			});
	};

	return (
		session?.user.id === adminId && (
			<Dialog onOpenChange={setOpen} open={open}>
				<DialogTrigger asChild>
					<Button variant="destructive">
						<Trash className="h-4 w-4 mr-2" />
						Delete Chat
					</Button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Are you sure?</DialogTitle>
						<DialogDescription>
							This action will delete the chat for all users.
						</DialogDescription>
					</DialogHeader>

					<div className="grid grid-cols-2 space-x-2">
						<Button onClick={handleDelete} variant="destructive">
							<Trash className="h-4 w-4 mr-2" />
							Delete
						</Button>

						<Button onClick={() => setOpen(false)} variant="outline">
							Cancel
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		)
	);
}

export default DeleteChatButton;
