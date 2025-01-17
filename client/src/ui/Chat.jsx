import { useParams } from "react-router-dom";
import { useChartStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import formatMessageTime from "../utils/dateFormat";

function Chat() {
  const { userId } = useParams();
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChartStore();
  const { authUser } = useAuthStore();

  const messageRef = useRef();

  useEffect(
    function () {
      getMessages(userId);
      subscribeToMessages();

      return () => unsubscribeFromMessages();
    },
    [userId, getMessages, subscribeToMessages, unsubscribeFromMessages]
  );

  useEffect(
    function () {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [messages]
  );

  return (
    <div className="flex-grow flex flex-col justify-between">
      <ChatHeader />
      {isMessagesLoading ? (
        <MessageSkeleton />
      ) : (
        <div className="flex-grow scrollbar-thin scrollbar-thumb-neutral/50 scrollbar-track-base-100 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-xl opacity-40">
                Start yapping with {selectedUser?.fullName} 😜
              </p>
            </div>
          ) : (
            <div className="space-y-3 h-full px-5 py-2">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={` ${
                    message.senderId === authUser._id
                      ? "chat-end "
                      : "chat-start"
                  } `}
                >
                  <div
                    className={`${
                      message.senderId === authUser._id ? "bg-primary/65" : ""
                    } chat-bubble space-y-1`}
                  >
                    <div className="space-y-1.5">
                      {message.image && (
                        <img
                          className="rounded-md w-full sm:w-80"
                          src={message.image}
                        />
                      )}
                      {message.text && (
                        <p
                          className={`${
                            message.senderId === authUser._id &&
                            "text-primary-content"
                          }`}
                        >
                          {message.text}
                        </p>
                      )}
                    </div>
                    <div ref={messageRef} />
                    <time
                      className={`text-xs opacity-75 flex justify-end ${
                        message.senderId === authUser._id &&
                        "text-primary-content"
                      }`}
                    >
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <ChatInput />
    </div>
  );
}

export default Chat;
