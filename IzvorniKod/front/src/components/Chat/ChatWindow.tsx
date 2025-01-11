import React, { useState, useEffect, useContext } from "react";
import ConversationList from "./ConversationList";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Pusher from "pusher-js";
import { ConversationWithLastMessage } from "../../types/ConversationWithLastMessage";
import { Message } from "../../types/Message";
import { AuthContext } from "../../context/AuthContext";

const ChatWindow: React.FC = () => {
	const [conversations, setConversations] = useState<
		ConversationWithLastMessage[]
	>([]);
	const [selectedConversation, setSelectedConversation] =
		useState<ConversationWithLastMessage | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const { token, userEmail, user } = useContext(AuthContext);
	const [isSearching, setIsSearching] = useState(false);

	// Fetch conversations on mount / token change
	useEffect(() => {
		if (!token) return;
		fetch(`${import.meta.env.VITE_BACKEND_API}/chat/conversations`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch conversations");
				return res.json();
			})
			.then((data: ConversationWithLastMessage[]) => {
				setConversations(data);
			})
			.catch((error) => {
				console.error("Error fetching conversations:", error);
			});
	}, [token]);

	// Fetch messages + set up Pusher whenever a conversation is selected
	useEffect(() => {
		if (!selectedConversation || !token) return;

		// 1) Fetch the conversation’s messages
		fetch(
			`${import.meta.env.VITE_BACKEND_API}/chat/messages/${selectedConversation.conversationId}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch messages");
				return res.json();
			})
			.then((fetchedMessages: Message[]) => {
				setMessages(fetchedMessages);
			})
			.catch((err) => {
				console.error("Error fetching messages:", err);
			});

		// 2) Initialize Pusher
		const pusher = new Pusher("ae2338eb2e8dc21e416e", {
			cluster: "eu",
			authEndpoint: `${import.meta.env.VITE_BACKEND_API}/pusher/auth`,
			auth: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
			// forceTLS: true, // remove or comment out if your host already provides TLS
		});

		// Optional: for debugging only—remove later if noisy

		// 4) Subscribe to channel
		const channelName = `private-conversation-${selectedConversation.conversationId}`;
		const channel = pusher.subscribe(channelName);

		channel.bind("pusher:subscription_succeeded", () => {
			console.log(`ChatWindow: Subscribed to channel ${channelName}.`);
		});

		channel.bind("pusher:subscription_error", (err: any) => {
			console.error(`Subscription error on ${channelName}`, err);
		});

		// 5) Listen for "new-message"
		channel.bind("new-message", (incoming: any) => {
			console.log("Received new message:", incoming);

			// Add the new message to local state
			setMessages((prev) => [...prev, incoming]);

			// If the message came from someone else, *and*
			// we are *not* looking at this conversation, then increment.
			const notFromMe = incoming.sender.email !== userEmail;
			const notCurrentConv =
				!selectedConversation ||
				incoming.conversationId !== selectedConversation.conversationId;

			if (notFromMe && notCurrentConv) {
				setConversations((prevConvos) =>
					prevConvos.map((c) =>
						c.conversationId === incoming.conversationId
							? {
									...c,
									unreadCount: c.unreadCount + 1,
									lastMessageContent: incoming.content,
									lastMessageTimestamp: incoming.timestamp,
									senderEmail: incoming.sender?.email ?? null,
								}
							: c
					)
				);
			} else {
				// Otherwise just update last message content (no unread bump).
				setConversations((prevConvos) =>
					prevConvos.map((c) =>
						c.conversationId === incoming.conversationId
							? {
									...c,
									lastMessageContent: incoming.content,
									lastMessageTimestamp: incoming.timestamp,
									senderEmail: incoming.sender?.email ?? null,
								}
							: c
					)
				);
			}
		});

		return () => {
			// 6) Cleanup: unbind only what you bound
			pusher.connection.unbind("connected");
			pusher.connection.unbind("error");
			channel.unbind("pusher:subscription_succeeded");
			channel.unbind("pusher:subscription_error");
			channel.unbind("new-message");
			pusher.unsubscribe(channelName);
		};
	}, [selectedConversation, token]);

	// Send a message
	const handleSendMessage = (content: string) => {
		if (!selectedConversation || !token) return;

		fetch(`${import.meta.env.VITE_BACKEND_API}/chat/messages`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				conversationId: selectedConversation.conversationId,
				content: content,
			}),
		})
			.then((res) => {
				if (!res.ok) throw new Error("Failed to send message");
				return res.json();
			})
			.then((savedMessage: Message) => {
				// Immediately update local messages
				//setMessages((prev) => [...prev, savedMessage]); ne radimo setMessages jer to vec radi Pusher

				// Also update conversation's lastMessage
				setConversations((prevConvos) =>
					prevConvos.map((c) => {
						if (
							c.conversationId ===
							selectedConversation.conversationId
						) {
							return {
								...c,
								lastMessageContent: savedMessage.content,
								lastMessageTimestamp: savedMessage.timestamp,
								senderEmail: savedMessage.sender?.email || null,
							};
						}
						return c;
					})
				);
			})
			.catch((err) => console.error("Error sending message:", err));
	};

	return (
		<div className="bg-gray-100 w-11/12 mt-3 shadow-lg rounded-lg flex flex-col mb-4">
			{/* Header */}
			<div className="flex pt-5 bg-[#4f28b9] text-white rounded-t-lg">
				<div className="flex items-center gap-3 ml-6 -mt-9">
					<img
						src={user?.profilePicture || "/user.png"}
						className="w-12 h-12 rounded-full"
						alt="User Icon"
					/>
					<h4>{user?.userName}</h4>
				</div>
				<h2 className="ml-80 font-semibold">Chat</h2>
			</div>

			{/* Body */}
			<div className="flex flex-1 overflow-hidden">
				<ConversationList
					conversations={conversations}
					setConversations={setConversations}
					onSelectConversation={setSelectedConversation}
					selectedConversation={selectedConversation}
					isSearching={isSearching}
					setIsSearching={setIsSearching}
				/>

				<div className="flex flex-col flex-1">
					{isSearching ? (
						<div className="flex-grow flex items-center justify-center text-gray-700 text-lg mt-3">
							<p>Searching for users...</p>
						</div>
					) : selectedConversation ? (
						<>
							<MessageList
								messages={messages}
								currentUserEmail={userEmail}
							/>
							<MessageInput onSend={handleSendMessage} />
						</>
					) : (
						<div className="flex-grow flex items-center justify-center text-gray-700 text-lg mt-3">
							<p>Select a conversation to start chatting!</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChatWindow;