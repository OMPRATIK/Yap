import { useEffect } from "react";
import { useChartStore } from "../store/useChatStore";
import ChatListSkeleton from "./skeleton/ChatListSkeleton";
import { Contact } from "lucide-react";
import DefaultProfilePic from "./DefaultProfilePic";

function ChatList() {
  const { users, getUsers, isUsersLoading, setSelectedUser, selectedUser } =
    useChartStore();

  console.log(users);
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
    <aside className="space-y-2">
      <div className="flex gap-1.5 items-center">
        <Contact className="size-5" />
        <h2 className="text-lg font-semibold">Contacts</h2>
      </div>
      <div className="flex flex-col gap-1.5 h-full overflow-y-scroll">
        {users.map((user) => (
          <button
            className={`pr-9 flex gap-3 items-center p-2 rounded-md hover:bg-base-200 transition-colors duration-300 ${
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
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default ChatList;
