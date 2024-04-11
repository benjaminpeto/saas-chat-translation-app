"use client";

import { useSession } from "next-auth/react";
import { z } from "zod";
import { useToast } from "./ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { useSubscriptionStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";
import { ToastAction } from "./ui/toast";
import { getUserByEmailRef } from "@/lib/converters/User";
import ShareLink from "./ShareLink";

const formSchema = z.object({
	email: z.string().email("Please enter a valid email address.."),
});

type FormSchema = z.infer<typeof formSchema>;

function InviteUser({ chatId }: { chatId: string }) {
	const { data: session } = useSession();
	const { toast } = useToast();
	const adminId = useAdminId({ chatId });
	const subscription = useSubscriptionStore((state) => state.subscription);
	const router = useRouter();

	const [open, setOpen] = useState<boolean>(false);
	const [openInviteLink, setOpenInviteLink] = useState<boolean>(false);

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(values: FormSchema) {
		if (!session?.user.id) return;

		toast({
			title: "Delivering your invitation",
			description: "Please wait while we send the invite...",
		});

		const isPro =
			subscription?.role === "pro" && subscription.status === "active";

		const numberOfUsersInChat = (
			await getDocs(chatMembersRef(chatId))
		).docs.map((doc) => doc.data()).length;

		if (!isPro && numberOfUsersInChat >= 2) {
			toast({
				title: "Free plan limit exceeded",
				description:
					"You have exceeded the limit of users in a single chat for the FREE plan. Please upgrade to PRO to continue adding users to chats!",
				variant: "destructive",
				action: (
					<ToastAction
						altText="Upgrade"
						onClick={() => router.push("/register")}
					>
						Upgrade to PRO
					</ToastAction>
				),
			});

			return;
		}

		// Check if email exist in DB
		const querySnapShot = await getDocs(getUserByEmailRef(values.email));

		if (querySnapShot.empty) {
			toast({
				title: "User not found",
				description:
					"Please enter an email address of a registered user or resend the invitation once they have signed up!",
				variant: "destructive",
			});

			return;
		} else {
			const user = querySnapShot.docs[0].data();

			// Add user to the chat
			await setDoc(addChatRef(chatId, user.id), {
				userId: user.id!,
				email: user.email!,
				timestamp: serverTimestamp(),
				chatId: chatId,
				isAdmin: false,
				image: user.image || "",
			})
				.then(() => {
					setOpen(false);

					toast({
						title: "Added to chat",
						description: "The user has been added to the chat successfully!",
						className: "bg-green-600 text-white",
						duration: 3000,
					});

					setOpenInviteLink(true);
				})
				.catch(() => {
					toast({
						title: "Error!",
						description:
							"Whoopsy-daisy... There was an error adding the user to the chat!",
						variant: "destructive",
					});

					setOpen(false);
				});
		}

		form.reset();
	}

	return (
		adminId === session?.user.id && (
			<>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button>
							<PlusCircleIcon className="mr-1" />
							Add User
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Add User to Chat</DialogTitle>
							<DialogDescription>
								Simply enter another user&apos;s email address to invite them to
								your chat!{" "}
								<span className="text-indigo-600 font-bold">
									(Note: they must be registered)
								</span>
							</DialogDescription>
						</DialogHeader>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="flex flex-col space-y-2"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input placeholder="yourFriend@email.com" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<Button className="ml-auto sm:w-fit w-full" type="submit">
									Add to Chat
								</Button>
							</form>
						</Form>
					</DialogContent>
				</Dialog>

				<ShareLink
					isOpen={openInviteLink}
					setIsOpen={setOpenInviteLink}
					chatId={chatId}
				/>
			</>
		)
	);
}

export default InviteUser;
