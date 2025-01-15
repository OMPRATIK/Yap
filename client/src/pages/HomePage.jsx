import { useEffect, useState } from "react";
import ChatList from "../ui/ChatList";
import { Outlet, useParams } from "react-router-dom";
import NoSelectedChat from "../ui/NoSelectedChat";

function HomePage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const { userId } = useParams();

  useEffect(function () {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-base-200 w-full">
      <div className="max-w-7xl mx-auto p-1 md:p-4 h-[calc(100vh-4rem)] lg:h-[calc(100vh-8rem)]">
        <div className="bg-base-100 rounded-md h-full flex overflow-hidden">
          {!isMobile && <ChatList />}
          {isMobile && !userId && <ChatList />}
          {!isMobile && !userId && <NoSelectedChat />}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
