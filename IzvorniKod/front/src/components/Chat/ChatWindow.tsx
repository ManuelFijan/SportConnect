import React, { useState, useEffect, useContext } from "react";
import ConversationList from "./ConversationList";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Pusher from "pusher-js";
import { Conversation } from "../../types/Conversation";
import { Message } from "../../types/Message";
import { AuthContext } from "../../context/AuthContext";

const ChatWindow: React.FC = () => {
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const { token, userEmail, user} = useContext(AuthContext);
	const [isSearching, setIsSearching] = useState(false);

    //ovo se obavlja automatski promjenom tokena (imanja ili ne tokena)
	useEffect(() => {
        // ako nema tokena ispisuje ovo
		if (!token) {
			console.error("No token found. User might not be authenticated.");
			return;
		}

		// ako ima tokena, onda fetch korisnikovih razgovora
		fetch(`${import.meta.env.VITE_BACKEND_API}/chat/conversations`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch conversations");
				}
				return response.json();
			})
			.then((data: Conversation[]) => {setConversations(data);}) // postavljamo varijablu conversations
			.catch((error) => console.error("Error fetching conversations:", error));
	}, [token]);

    // kada se promijeni selectedConversation onda se ide ovdje
	useEffect(() => {
		if (selectedConversation && token) {
			// Fetch poruka za odabrani conversation (svaki ima svoj unique id)
			fetch(`${import.meta.env.VITE_BACKEND_API}/chat/messages/${selectedConversation.id}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to fetch messages");
					}
					return response.json();
				})
				.then((data: Message[]) => setMessages(data))  // postavljamo varijablu messages
				.catch((error) =>
					console.error("Error fetching messages:", error)
				);

			// Inicijalizacija Pusher subscription-a
			const pusher = new Pusher("ae2338eb2e8dc21e416e", {
				cluster: "eu",
				authEndpoint: `${import.meta.env.VITE_BACKEND_API}/pusher/auth`,
				auth: {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			});

			const channel = pusher.subscribe(
				`private-conversation-${selectedConversation.id}`
			);

			channel.bind("new-message", (data: Message) => {
				setMessages((prevMessages) => [...prevMessages, data]);
			});

			return () => {
				channel.unbind_all();
				channel.unsubscribe();
			};
		}
	}, [selectedConversation, token]);

    // sluzi da posaljemo poruku na backend (post metoda), saljemo conversationId i content poruke (input)
	const handleSendMessage = (content: string) => {
		if (!selectedConversation) return;

		if (!token) {
			console.error("No token found. User might not be authenticated.");
			alert("You must be logged in to send messages.");
			return;
		}

		fetch(`${import.meta.env.VITE_BACKEND_API}/chat/messages`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				conversationId: selectedConversation.id,
				content: content,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to send message");
				}
				return response.json();
			})
			.then((_data: Message) => {
				setMessages((prevMessages) => [...prevMessages, _data]);
			})
			.catch((error) => console.error("Error sending message:", error));
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
						// Ako je isSearching true, prikazujemo da se trazi korisnik
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