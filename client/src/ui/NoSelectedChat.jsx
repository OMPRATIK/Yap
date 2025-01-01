import { MessagesSquare } from "lucide-react";

function NoSelectedChat() {
  return (
    <div className="flex items-center flex-col justify-center w-full">
      <div className="flex justify-center">
        <div className="p-3 bg-base-200 rounded-md animate-bounce">
          <MessagesSquare className="size-8" />
        </div>
      </div>
      <h2 className="text-center font-semibold text-lg">Welcome to Yap</h2>
      <h3 className="text-center opacity-75 text-sm">
        Yap to your Friends and family all you want!
      </h3>
    </div>
  );
}

export default NoSelectedChat;
