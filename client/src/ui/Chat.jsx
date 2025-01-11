import { useParams } from "react-router-dom";
import { useChartStore } from "../store/useChatStore";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";

function Chat() {
  const { userId } = useParams();
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChartStore();

  useEffect(
    function () {
      getMessages(userId);
    },
    [userId, getMessages]
  );

  return (
    <div className="flex-grow flex flex-col justify-between">
      <ChatHeader />
      {isMessagesLoading ? (
        <MessageSkeleton />
      ) : (
        <div className="flex-grow p-2">{userId}</div>
      )}

      <ChatInput />
    </div>
  );
}

export default Chat;
