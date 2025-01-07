import { User } from "./User";

export interface Conversation {
	lastMessage: string;
	id: number;
	participants: User[];
}