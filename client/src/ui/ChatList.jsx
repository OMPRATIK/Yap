import { useEffect } from "react";
import { useChartStore } from "../store/useChatStore";
import ChatListSkeleton from "./skeleton/ChatListSkeleton";
import { Contact } from "lucide-react";
import DefaultProfilePic from "./DefaultProfilePic";
import { useNavigate, useParams } from "react-router-dom";

function ChatList() {
  const navigate = useNavigate();
  const { onlineUsers, users, getUsers, isUsersLoading, setSelectedUser } =
    useChartStore();

  const { userId } = useParams();
  useEffect(
    function () {
      async function fetchUsers() {
        await getUsers();
      }
      fetchUsers();
    },
    [getUsers]
  );

  return (
    <aside className="space-y-2 pb-20 w-full sm:w-auto border-r-[1px] border-base-200">
      <div className="flex gap-1.5 items-center py-3.5 justify-center border-b-[1px] border-base-200">
        <Contact className="size-5" />
        <h2 className="text-xl font-semibold">Contacts</h2>
      </div>
      <div className="scrollbar-thin scrollbar-thumb-neutral/50 scrollbar-track-base-100 flex flex-col gap-1.5 h-full overflow-y-scroll pl-2">
        {isUsersLoading ? (
          <ChatListSkeleton />
        ) : (
          users.map((user) => (
            <button
              className={`pr-28 pl-3 text-start flex gap-1.5 py-3 rounded-tl-md rounded-bl-md hover:bg-base-200 transition-colors duration-300 ${
                user._id === userId && "bg-base-200"
              }`}
              key={user._id}
              onClick={() => {
                navigate(`/${user._id}`);
                setSelectedUser(user);
              }}
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
          ))
        )}
      </div>
    </aside>
  );
}

export default ChatList;
