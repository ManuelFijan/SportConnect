import React, { useState, useContext } from "react";
import UserSearch from "./UserSearch";
import { Conversation } from "../types/Conversation";
import { User } from "../types/User";
import { AuthContext } from "../context/AuthContext";

interface ConversationListProps {
	conversations: Conversation[];
	setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
	onSelectConversation: (conversation: Conversation) => void;
	selectedConversation: Conversation | null;
	isSearching: boolean; 
	setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConversationList: React.FC<ConversationListProps> = ({
	conversations,
	setConversations,
	onSelectConversation,
	selectedConversation,
	isSearching,
	setIsSearching
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const { userEmail } = useContext(AuthContext);

	const filteredConversations = conversations.filter((convo) => {
		return convo.participants.some(
			(participant: User) =>
				participant.email
					.toLowerCase()
					.startsWith(searchTerm.toLowerCase()) &&
				participant.email.toLowerCase() !== userEmail?.toLowerCase()
		);
	});

	const handleUserSelect = (user: User) => {
		const token = localStorage.getItem("token");

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
			.then((conversation) => {
				setConversations((prev) => [...prev, conversation]);
				onSelectConversation(conversation);
				setIsSearching(false);
			})
			.catch((error) => {
				console.error("Error creating conversation:", error);
				alert(error.message);
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
								const otherParticipant =
									convo.participants.find(
										(p) =>
											p.email.toLowerCase() !==
											userEmail?.toLowerCase()
									);
								return (
									<li
										key={convo.id}
										onClick={() => onSelectConversation(convo)}
										className={`p-2 cursor-pointer flex items-center gap-4 rounded-md -ml-10 ${
											selectedConversation?.id === convo.id
												? "bg-[#c9c1dd]"
												: "hover:bg-[#5434ab]"
										}`}
									>

										<img
											src={
												otherParticipant?.profilePicture ||
												"/user.png"
											}
											alt={
												otherParticipant?.firstName ||
												"Users pic"
											}
											className="w-12 h-12 rounded-full object-cover"
											title={otherParticipant?.email} // kada se postavi mis na sliku prikaze se username osobe s kojom pricas
										/>
										<div className="flex flex-col -ml-3">
											<span className="font-semibold text-lg truncate text-black">
												{otherParticipant?.firstName}{" "}
												{otherParticipant?.lastName}
											</span>

											<span className="font-semibold text-sm truncate text-black">
												{"("}{otherParticipant?.email}{")"}
											</span>
											
											<span className="text-sm text-gray-500">
												{convo.lastMessage ||
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
				// ovo se otvori kada se pritisne gumb NEW CHAT
				<UserSearch onUserSelect={handleUserSelect} setIsSearching={setIsSearching}/>
			)}
		</div>
	);
};

export default ConversationList;