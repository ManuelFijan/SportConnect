export interface ConversationWithLastMessage {
	conversationId: number;
	participantEmail: string;
	lastMessageContent: string | null;
	lastMessageTimestamp: string | null;
	senderEmail: string | null;
	profileImage?: string | null;
	unreadCount: number;
}