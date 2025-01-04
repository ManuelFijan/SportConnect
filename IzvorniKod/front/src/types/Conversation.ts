import { User } from "./User";

export interface Conversation {
	id: number;
	participants: User[];
}