import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import Protected from "./ui/Protected";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import Layout from "./ui/Layout";
import Chat from "./ui/Chat";

function App() {
  const { authUser, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  console.log(onlineUsers);
  return (
    <div data-theme={theme}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          >
            <Route path=":userId" element={<Chat />} />
          </Route>
          <Route
            path="profile"
            element={
              <Protected>
                <ProfilePage />
              </Protected>
            }
          />
          <Route
            path="signup"
            element={authUser ? <Navigate to="/" /> : <SignupPage />}
          />
          <Route
            path="login"
            element={authUser ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
