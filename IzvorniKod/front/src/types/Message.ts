import { User } from "./User";

export interface Message {
	id: number;
	content: string;
	conversationId: number;
	sender: User;
	timestamp: string;
}