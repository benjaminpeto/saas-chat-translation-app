import { db } from "@/firebase";
import { Subscription } from "@/types/Subscription";
import {
	DocumentData,
	FirestoreDataConverter,
	QueryDocumentSnapshot,
	SnapshotOptions,
	collection,
} from "firebase/firestore";

const subscriptionConverter: FirestoreDataConverter<Subscription> = {
	// Pushing data to Firestore
	toFirestore(subscription: Subscription): DocumentData {
		return {
			...subscription,
		};
	},
	// Pulling data from Firestore
	fromFirestore: function (
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): Subscription {
		const data = snapshot.data(options);

		const subscription: Subscription = {
			id: snapshot.id,
			cancel_at_period_end: data.cancel_at_period_end,
			created: data.created,
			current_period_start: data.current_period_start,
			current_period_end: data.current_period_end,
			items: data.items,
			latest_invoice: data.latest_invoice,
			metadata: data.metadata,
			payment_method: data.payment_method,
			price: data.price,
			prices: data.prices,
			product: data.product,
			quantity: data.quantity,
			role: data.role,
			status: data.status,
			stripeLink: data.stripeLink,
			cancel_at: data.cancel_at,
			canceled_at: data.canceled_at,
			ended_at: data.ended_at,
			trial_start: data.trial_start,
			trial_end: data.trial_end,
		};

		return subscription;
	},
};

export const subscriptionRef = (userId: string) =>
	collection(db, "customers", userId, "subscriptions").withConverter(
		subscriptionConverter
	);
