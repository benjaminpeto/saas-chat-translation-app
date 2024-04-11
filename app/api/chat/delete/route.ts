import { adminDb } from "@/firebase-admin";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
	const { chatId } = await req.json();

	const chatRef = adminDb.collection("chats").doc(chatId);

	const bulkWriter = adminDb.bulkWriter();
	const MAX_RETRY_ATTEMPTS = 5;

	bulkWriter.onWriteError((error) => {
		if (error.failedAttempts < MAX_RETRY_ATTEMPTS) {
			return true;
		} else {
			console.log(
				"Failed to write document after 5 attempts ",
				error.documentRef.path
			);
			return false;
		}
	});

	try {
		// TODO: Check if the admin is the same person who have sent the request! here or firebase
		await adminDb.recursiveDelete(chatRef, bulkWriter);
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.log("Promise rejected with error: ", error);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
