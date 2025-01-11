import { MessagesSquare, Settings, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import DefaultProfilePic from "./DefaultProfilePic";
import { useEffect, useState } from "react";

function Navbar() {
  const { logout, authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const [activeTab, setActiveTab] = useState("messages");
  const navigate = useNavigate();

  useEffect(
    function () {
      async function fetchAuth() {
        await checkAuth();
      }
      fetchAuth();
    },
    [checkAuth]
  );

  return (
    <header className="navbar bg-base-100 border-b-[1px] border-neutral px-4 sm:px-6 py-0 fixed z-[1]">
      <div className="flex-1 flex gap-2">
        <div className="flex justify-between flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-4 group">
            <div className="size-8 sm:size-10 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Link to="/">
                <User className="size-4 sm:size-6 text-primary" />
              </Link>
            </div>
          </div>
        </div>
        <span className="text-primary text-lg font-semibold">Yap!</span>
      </div>

      <div className="flex-none gap-1 sm:gap-2">
        {isCheckingAuth ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          authUser && (
            <NavLink
              to="/"
              className={`${
                activeTab === "messages" && "bg-base-200"
              } flex gap-1.5 items-center hover:bg-base-200 transition-colors duration-300 px-2.5 py-1.5 rounded-md`}
              onClick={() => setActiveTab("messages")}
            >
              <MessagesSquare className="size-4 sm:size-4" />
              <span className="hidden sm:block">Messages</span>
            </NavLink>
          )
        )}

        <NavLink
          to="/settings"
          className={`${
            activeTab === "settings" && "bg-base-200"
          } flex gap-1.5 items-center hover:bg-base-200 transition-colors duration-300 px-2.5 py-1.5 rounded-md`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings className="size-4 sm:size-4" />
          <span className="hidden sm:block">Settings</span>
        </NavLink>
        {authUser && (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="rounded-full size-10">
                  {authUser.profilePic ? (
                    <img alt="User profile picture" src={authUser.profilePic} />
                  ) : (
                    <DefaultProfilePic
                      fullName={authUser.fullName}
                      type={"nav"}
                    />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-md z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>

                <li
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  <Link>Logout</Link>
                </li>
              </ul>
            </div>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Stop Yapping?</h3>
                <p className="py-4">Are you sure you want to log out?</p>
                <div className="w-full flex justify-end">
                  <button
                    className="btn btn-error"
                    onClick={async () => {
                      await logout();
                      navigate("/login");
                    }}
                  >
                    <span className="text-error-content">Confirm</span>
                  </button>
                </div>
              </div>
            </dialog>
          </>
        )}
      </div>
    </header>
  );
}
export default Navbar;
