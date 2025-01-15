import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useChartStore } from "../store/useChatStore";
import DefaultProfilePic from "./DefaultProfilePic";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChartStore();

  return (
    <div className="flex items-center gap-1.5 border-b-[1px] border-b-base-200 sm:py-2 py-1.5 px-1">
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
            <div className="size-10 rounded-full overflow-hidden">
              <img src={selectedUser?.profilePic} alt={selectedUser.fullName} />
            </div>
          ) : (
            selectedUser && (
              <DefaultProfilePic fullName={selectedUser?.fullName} type="nav" />
            )
          )}
        </div>
        <div className="space-y-0 ml-2">
          <h2 className="font-semibold">{selectedUser?.fullName}</h2>
          <p className="text-xs">Online</p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
