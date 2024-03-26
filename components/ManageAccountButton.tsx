import { generatePortalLink } from "@/actions/generatePortalLink";

function ManagegeAccountButton() {
	return (
		<form action={generatePortalLink}>
			<button type="submit">Manage Billing</button>
		</form>
	);
}

export default ManagegeAccountButton;
