import { useEffect, useState } from "react";
import { useChartStore } from "../store/useChatStore";
import ChatListSkeleton from "./skeleton/ChatListSkeleton";
import DefaultProfilePic from "./DefaultProfilePic";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Plus, UserRound, UsersRound } from "lucide-react";

function ChatList() {
  const navigate = useNavigate();
  const { users, getUsers, isUsersLoading, setSelectedUser } = useChartStore();
  const { onlineUsers } = useAuthStore();
  const { userId } = useParams();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isContactListOpen, setIsContactListOpen] = useState(true);

  const filteredList = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const noUsers = filteredList.length === 0;

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
    <aside className="space-y-2 pb-28 w-full sm:w-[240px] border-r-[1px] border-base-200">
      <div className="rounded-md bg-base-100 flex items-center justify-center gap-1.5 p-2 w-full">
        <button
          className={`border-b-[1px] border-base-100 flex items-center justify-center gap-1 w-full py-1 ${
            isContactListOpen && "border-base-content"
          }`}
          onClick={() => setIsContactListOpen(true)}
        >
          <UserRound className="size-4" /> Contacts
        </button>
        <button
          className={`border-b-[1px] border-base-100 flex items-center justify-center gap-1 w-full py-1 ${
            !isContactListOpen && "border-base-content"
          }`}
          onClick={() => setIsContactListOpen(false)}
        >
          <UsersRound className="size-4" /> Groups
        </button>
      </div>

      <div className="w-full py-0.5 flex items-center justify-center gap-2">
        {isContactListOpen ? (
          <>
            {" "}
            <label className="cursor-pointer flex items-center">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-sm"
              />
            </label>
            <div className="flex items-center gap-1.5">
              <span className="text-sm flex items-center gap-1.5">
                Online Users {onlineUsers.length - 1}
                <div className="size-2 rounded-full animate-pulse bg-green-600" />
              </span>
            </div>{" "}
          </>
        ) : (
          <button className="flex items-center gap-1.5 bg-base-200 w-full justify-center py-2">
            <Plus className="size-5" /> Create a group
          </button>
        )}
      </div>

      <div className="scrollbar-thin scrollbar-thumb-neutral/50 scrollbar-track-base-100 flex flex-col gap-1.5 h-full overflow-y-scroll pl-2">
        {isUsersLoading ? (
          <ChatListSkeleton />
        ) : isContactListOpen ? (
          noUsers ? (
            <div className="flex items-center justify-center h-full opacity-50">
              No Yappers online 🥲
            </div>
          ) : (
            filteredList.map((user) => (
              <button
                className={`w-full pl-3 text-start flex gap-1.5 py-3 rounded-tl-md rounded-bl-md hover:bg-base-200 transition-colors duration-300 ${
                  user._id === userId && "bg-base-200"
                }`}
                key={user._id}
                onClick={() => {
                  navigate(`/${user._id}`);
                  setSelectedUser(user);
                }}
              >
                {user.profilePic ? (
                  <div className="relative">
                    <div
                      className={`size-3 absolute ${
                        onlineUsers.includes(user._id)
                          ? "bg-green-500"
                          : "bg-red-500"
                      } top-0 right-0 rounded-full border-[1px]`}
                    />
                    <div className="overflow-hidden size-10 rounded-full ">
                      <img
                        src={user.profilePic}
                        alt={user.fullName + "pic"}
                        className="rounded-full w-10"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div
                      className={`z-50 size-3 absolute ${
                        onlineUsers.includes(user._id)
                          ? "bg-green-500"
                          : "bg-red-500"
                      } top-0 right-0 rounded-full border-[1px]`}
                    />
                    <DefaultProfilePic fullName={user.fullName} type="nav" />
                  </div>
                )}
                <div>
                  <p className="">{user.fullName}</p>
                  <p className="text-xs">Online</p>
                </div>
              </button>
            ))
          )
        ) : (
          <div></div>
        )}
      </div>
    </aside>
  );
}

export default ChatList;
