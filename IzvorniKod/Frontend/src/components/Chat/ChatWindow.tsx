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

  useEffect(() => {
    if (!selectedConversation || !token) return;

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

    const pusher = new Pusher("ae2338eb2e8dc21e416e", {
      cluster: "eu",
      authEndpoint: `${import.meta.env.VITE_BACKEND_API}/pusher/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const channelName = `private-conversation-${selectedConversation.conversationId}`;
    const channel = pusher.subscribe(channelName);

    channel.bind("pusher:subscription_succeeded", () => {
      console.log(`ChatWindow: Subscribed to channel ${channelName}.`);
    });

    channel.bind("pusher:subscription_error", (err: any) => {
      console.error(`Subscription error on ${channelName}`, err);
    });

    channel.bind("new-message", (incoming: any) => {
      console.log("Received new message:", incoming);

      setMessages((prev) => [...prev, incoming]);

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
      pusher.connection.unbind("connected");
      pusher.connection.unbind("error");
      channel.unbind("pusher:subscription_succeeded");
      channel.unbind("pusher:subscription_error");
      channel.unbind("new-message");
      pusher.unsubscribe(channelName);
    };
  }, [selectedConversation, token]);

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
        setConversations((prevConvos) =>
          prevConvos.map((c) => {
            if (c.conversationId === selectedConversation.conversationId) {
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
    <div className="bg-gray-100 w-full mt-3 shadow-lg rounded-lg flex flex-col mb-4">
      {/* Header */}
      <div className="flex pt-5 bg-[#4f28b9] text-white rounded-t-lg gap-28 sm:gap-32 md:gap-64 lg:gap-80">
        <div className="flex items-center gap-3 ml-6 -mt-9">
          <img
            src={user?.profilePicture || "/user.png"}
            className="w-12 h-12 rounded-full"
            alt="User Icon"
          />
          <h4>{user?.userName}</h4>
        </div>
        <h2 className="font-semibold">Chat</h2>
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
            <div className="flex-grow flex items-center justify-center text-gray-700 text-[15px] md:text-lg mt-3">
              <p>Searching for users...</p>
            </div>
          ) : selectedConversation ? (
            <>
              <MessageList messages={messages} currentUserEmail={userEmail} />
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
