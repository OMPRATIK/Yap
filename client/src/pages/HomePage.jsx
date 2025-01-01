import { useChartStore } from "../store/useChatStore";
import Chat from "../ui/Chat";
import ChatList from "../ui/ChatList";
import NoSelectedChat from "../ui/NoSelectedChat";

function HomePage() {
  const { selectedUser } = useChartStore();
  return (
    <div className="bg-base-200 w-full">
      <div className="max-w-7xl mx-auto p-4 h-[calc(100vh-8rem)]">
        <div className="bg-base-100 rounded-md p-2 h-full flex justify-between overflow-hidden">
          <ChatList />
          {selectedUser ? <Chat /> : <NoSelectedChat />}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
