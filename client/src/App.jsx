import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import Protected from "./ui/Protected";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import Layout from "./ui/Layout";

function App() {
  const { authUser } = useAuthStore();

  return (
    <div data-theme="business">
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          />
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
