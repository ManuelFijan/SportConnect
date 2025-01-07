export interface User {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	userName: string;
	userType: string;
	subscriptionPlan: string;
	profilePicture?: string;
}