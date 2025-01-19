import { ArrowLeft, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useChartStore } from "../store/useChatStore";
import DefaultProfilePic from "./DefaultProfilePic";
import { useAuthStore } from "../store/useAuthStore";
// import { useEffect, useRef, useState } from "react";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChartStore();
  const { onlineUsers } = useAuthStore();
  // const [openSearch, setOpenSearch] = useState(false);
  // const [search, setSearch] = useState("");
  // const searchRef = useRef(null);

  // function handleSearch(e) {
  //   e.preventDefault();
  //   console.log(search);
  // }

  // useEffect(() => {
  //   if (openSearch && searchRef.current) {
  //     searchRef.current.focus();
  //   }
  // }, [openSearch]);

  return (
    <div className="flex items-center justify-between gap-1.5 border-b-[1px] border-b-base-200 sm:py-2 py-1.5 px-1 relative">
      <div className="flex items-center gap-2">
        <Link
          to="/"
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-base-200 transition-colors"
        >
          <ArrowLeft />
        </Link>
        <div className="flex">
          <div>
            {selectedUser?.profilePic ? (
              <div className="relative">
                <div
                  className={`size-3 absolute ${
                    onlineUsers.includes(selectedUser._id)
                      ? "bg-green-500"
                      : "bg-red-500"
                  } top-0 right-0 rounded-full border-[1px]`}
                />
                <div className="overflow-hidden size-10 rounded-full ">
                  <img
                    src={selectedUser.profilePic}
                    alt={selectedUser.fullName + "pic"}
                    className="rounded-full w-10"
                  />
                </div>
              </div>
            ) : (
              selectedUser && (
                <div className="relative">
                  <div
                    className={`z-50 size-3 absolute ${
                      onlineUsers.includes(selectedUser._id)
                        ? "bg-green-500"
                        : "bg-red-500"
                    } top-0 right-0 rounded-full border-[1px]`}
                  />
                  <DefaultProfilePic
                    fullName={selectedUser.fullName}
                    type="nav"
                  />
                </div>
              )
            )}
          </div>
          <div className="space-y-0 ml-2">
            <h2 className="font-semibold">{selectedUser?.fullName}</h2>
            <p className="text-xs opacity-50">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>
      {/* <button
        className="px-2"
        onClick={() => {
          setOpenSearch(!openSearch);
        }}
      >
        <Search />
      </button> */}

      {/* {openSearch && (
        <div className="z-20 absolute right-1 bottom-[-3.2rem] bg-base-300 rounded-md shadow-md">
          <form
            onSubmit={handleSearch}
            className="flex items-center px-2 py-3 gap-2"
          >
            <input
              type="text"
              placeholder="Search Chats..."
              className="input input-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ref={searchRef}
            />{" "}
            <button onClick={() => setOpenSearch(false)}>
              <X />
            </button>
          </form>
        </div>
      )} */}
    </div>
  );
}

export default ChatHeader;
