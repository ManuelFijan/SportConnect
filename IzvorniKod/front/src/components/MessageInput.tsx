import React, { useState } from "react";

interface MessageInputProps {
	onSend: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
	const [message, setMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim() === "") return;
		onSend(message.trim());
		setMessage("");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="message-input p-4 border-t border-gray-300 flex bg-white rounded-b-lg"
		>
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder="Type your message..."
				className="flex-1 p-2 ring-1 ring-[#a19a9a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#936ff6] text-black"
			/>
			<button
				type="submit"
				className="ml-2 bg-[#936ff6] hover:bg-[#5434ab] text-white p-2 rounded-md"
			>
				Send
			</button>
		</form>
	);
};

export default MessageInput;