import { useEffect } from "react";
import { useChartStore } from "../store/useChatStore";
import ChatListSkeleton from "./skeleton/ChatListSkeleton";
import { Contact } from "lucide-react";
import DefaultProfilePic from "./DefaultProfilePic";

function ChatList() {
  const {
    onlineUsers,
    users,
    getUsers,
    isUsersLoading,
    setSelectedUser,
    selectedUser,
  } = useChartStore();

  useEffect(
    function () {
      async function fetchUsers() {
        await getUsers();
      }
      fetchUsers();
    },
    [getUsers]
  );

  if (isUsersLoading) {
    return <ChatListSkeleton />;
  }

  return (
    <aside className="space-y-2 pb-8">
      <div className="flex gap-1.5 items-center">
        <Contact className="size-5" />
        <h2 className="text-xl font-semibold">Contacts</h2>
      </div>
      <div className="flex flex-col gap-1.5 h-full overflow-y-scroll">
        {users.map((user) => (
          <button
            className={`pr-16 pl-3 text-start flex gap-1.5 py-3 rounded-tl-md rounded-bl-md hover:bg-base-200 transition-colors duration-300 ${
              user === selectedUser && "bg-base-200"
            }`}
            key={user._id}
            onClick={() => setSelectedUser(user)}
          >
            {user.profilePic ? (
              <div className="size-10 rounded-full overflow-hidden">
                <img src={user.profilePic} alt={user.fullName + "pic"} />
              </div>
            ) : (
              <DefaultProfilePic fullName={user.fullName} type="nav" />
            )}
            <div>
              <p className="">{user.fullName}</p>
              <p className="text-xs">Online</p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default ChatList;
