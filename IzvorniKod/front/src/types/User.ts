export interface User {
	id: number;
	email: string;
	userName: string;
	userType: string;
	subscriptionPlan: string;
	profilePicture?: string;
}