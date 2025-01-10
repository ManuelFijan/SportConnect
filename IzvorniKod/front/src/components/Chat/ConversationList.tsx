import React, { useState, useContext } from "react";
import UserSearch from "./UserSearch";
import { ConversationWithLastMessage } from "../../types/ConversationWithLastMessage";
import { User } from "../../types/User";
import { AuthContext } from "../../context/AuthContext";

interface ConversationListProps {
	conversations: ConversationWithLastMessage[];
	setConversations: React.Dispatch<
		React.SetStateAction<ConversationWithLastMessage[]>
	>;
	onSelectConversation: (conversation: ConversationWithLastMessage) => void;
	selectedConversation: ConversationWithLastMessage | null;
	isSearching: boolean;
	setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConversationList: React.FC<ConversationListProps> = ({
	conversations,
	setConversations,
	onSelectConversation,
	selectedConversation,
	isSearching,
	setIsSearching,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const { userEmail } = useContext(AuthContext);

	console.log("Conversations:", conversations);
	console.log(userEmail)

	const filteredConversations = conversations.filter((convo) => {
		if (!convo.participantEmail) {
			console.warn(
				`Conversation ${convo.conversationId} is missing participantEmail`
			);
			return false;
		}
		return convo.participantEmail
			.toLowerCase()
			.startsWith(searchTerm.toLowerCase());
	});

	const handleUserSelect = (user: User) => {
		const token = localStorage.getItem("token");

		if (!token) {
			alert("You must be logged in to start a conversation.");
			return;
		}

		fetch(`${import.meta.env.VITE_BACKEND_API}/chat/conversations`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				recipientEmail: user.email,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					if (response.status === 401) {
						throw new Error("Unauthorized. Please log in.");
					}
					throw new Error("Failed to create conversation.");
				}
				return response.json();
			})
			.then((conversation: ConversationWithLastMessage) => {
				setConversations((prev) => [...prev, conversation]);
				onSelectConversation(conversation);
				setIsSearching(false);
			})
			.catch((error) => {
				console.error("Error creating conversation:", error);
				alert(error.message);
			});
	};

	const handleConversationClick = (conversation: ConversationWithLastMessage) => {
		onSelectConversation(conversation);

		const token = localStorage.getItem("token");
		if (!token) return;

		fetch(
			`${import.meta.env.VITE_BACKEND_API}/chat/conversations/${conversation.conversationId}/read`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((response) => {
				if (!response.ok) {
					console.error(
						`Failed to mark conversation ${conversation.conversationId} as read`
					);
				}
				return response;
			})
			.then(() => {
				setConversations((prevConversations) =>
					prevConversations.map((convo) =>
						convo.conversationId === conversation.conversationId
							? { ...convo, unreadCount: 0 }
							: convo
					)
				);
			})
			.catch((error) => {
				console.error("Error marking conversation as read:", error);
			});
	};

	return (
		<div className="w-full sm:w-2/5 border-r border-gray-300 p-4">
			{!isSearching ? (
				<>
					<div className="flex items-center mb-4">
						<input
							type="text"
							placeholder="Search users by email..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full p-2 ring-1 ring-[#a19a9a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
						/>
						<button
							onClick={() => setIsSearching(true)}
							className="ml-2 bg-[#936ff6] text-white w-32 py-[0.6rem] rounded-md hover:bg-[#5434ab]"
						>
							New Chat
						</button>
					</div>
					<ul className="max-h-[27rem] overflow-y-auto scrollbar scrollbar-thumb-[#5434ab] scrollbar-track-transparent">
						{filteredConversations.length > 0 ? (
							filteredConversations.map((convo) => {
								const participantEmail = convo.participantEmail;
								const participantProfilePicture =
									convo.profileImage || "/user.png";

								return (
									<li
										key={convo.conversationId}
										onClick={() =>
											handleConversationClick(convo)
										}
										className={`p-2 cursor-pointer flex items-center gap-4 rounded-md -ml-10 ${
											selectedConversation?.conversationId ===
											convo.conversationId
												? "bg-[#c9c1dd]"
												: "hover:bg-[#5434ab]"
										}`}
									>
										<img
											src={participantProfilePicture}
											alt={participantEmail}
											className="w-12 h-12 rounded-full object-cover"
											onError={(e) => {
												(
													e.target as HTMLImageElement
												).src = "/user.png"; 
											}}
											title={participantEmail}
										/>
										<div className="flex flex-col -ml-3">
											<div className="flex justify-between items-center">
												<span className="font-semibold text-lg truncate text-black">
													{participantEmail}
												</span>
												{convo.unreadCount > 0 && (
													<span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
														{convo.unreadCount}
													</span>
												)}
											</div>

											<span className="text-sm text-gray-500">
												{convo.lastMessageContent ||
													"No messages yet"}
											</span>
										</div>
									</li>
								);
							})
						) : (
							<li className="text-center text-gray-500">
								No conversations found.
							</li>
						)}
					</ul>
				</>
			) : (
				<UserSearch
					onUserSelect={handleUserSelect}
					setIsSearching={setIsSearching}
				/>
			)}
		</div>
	);
};

export default ConversationList;