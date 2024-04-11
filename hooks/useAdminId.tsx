"use client";

import { chatMemberAdminRef } from "@/lib/converters/ChatMembers";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

function useAdminId({ chatId }: { chatId: string }) {
	const [isAdmin, setIsAdmin] = useState<string>("");

	useEffect(() => {
		const fetchAdminStatus = async () => {
			const adminId = (await getDocs(chatMemberAdminRef(chatId))).docs.map(
				(doc) => doc.id
			)[0];

			setIsAdmin(adminId);
		};

		fetchAdminStatus();
	}, [chatId]);

	return isAdmin;
}

export default useAdminId;
