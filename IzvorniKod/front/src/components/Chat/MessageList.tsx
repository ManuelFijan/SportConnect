import React, { useEffect, useRef } from "react";
import { Message } from "../../types/Message";

interface MessageListProps {
	messages: Message[];
	currentUserEmail: string | null;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserEmail }) => {
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="flex-1 p-4 bg-[#f1ebff] max-h-[31.5rem] overflow-y-auto scrollbar scrollbar-thumb-[#5434ab] scrollbar-track-transparent">
			{messages.map((msg) => {
				// zbog problema sa asinkronosti setMessages-a u chatwindow, tek kad se to obavi idemo dalje
				if (!msg.sender) return null;

				return (
					<div
						key={msg.id}
						className={`mb-6 flex items-center ${
							msg.sender.email === currentUserEmail ? "justify-end" : "justify-start"
						}`}
					>
						{/* Profile slika ako user nismo mi */}
						{msg.sender.email !== currentUserEmail && (
							<img
								src={msg.sender.profilePicture || "/user.png"}
								alt={msg.sender.firstName || "User"}
								className="w-14 h-14 rounded-full object-cover mr-3 flex-shrink-0"
								title={msg.sender.email} // Prikaz mail-a na hover
							/>
						)}

						{/* Poruka */}
						<div className="flex flex-col">
							{/* Ime osobe ako nismo mi */}
							{msg.sender.email !== currentUserEmail && (
								<span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
									{msg.sender.firstName} {msg.sender.lastName}
								</span>
							)}

							{/* Ime osobe ako smo mi, poravnato na desno */}
							{msg.sender.email === currentUserEmail && (
								<span className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-right">
									{msg.sender.firstName} {msg.sender.lastName}
								</span>
							)}

							{/* Sadrzaj poruke */}
							<div
								className={`px-4 py-2 rounded-lg max-w-[15rem] ${
									msg.sender.email === currentUserEmail
										? "bg-blue-500 text-white rounded-br-none"
										: "bg-gray-300 text-black rounded-bl-none"
								}`}
								style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
							>
								{msg.content}
							</div>

							{/* Vrijeme */}
							<span
								className={`text-xs text-gray-500 mt-1 ${
									msg.sender.email === currentUserEmail ? "text-right" : "text-left"
								}`}
							>
								{new Date(msg.timestamp).toLocaleTimeString([], {
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
									hour: "2-digit",
									minute: "2-digit",
									hour12: false, // da format bude 24 satni kao kod nas (bez am i pm)
								})}
							</span>
						</div>

						{/* Profile slika nas */}
						{msg.sender.email === currentUserEmail && (
							<img
								src={msg.sender.profilePicture || "/user.png"}
								alt={msg.sender.firstName || "User"}
								className="w-14 h-14 rounded-full object-cover ml-3 flex-shrink-0"
								title={msg.sender.email} // Prikaz mail-a na hover
							/>
						)}
					</div>
				);
			})}
			<div ref={messagesEndRef} />
		</div>
	);
};

export default MessageList;