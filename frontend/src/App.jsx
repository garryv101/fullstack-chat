import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import React, { Suspense, useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) return (

    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <div data-theme={theme}>
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Suspense fallback={<div className="flex items-center justify-center h-32"><Loader className="animate-spin" /></div>}>
            <Routes>
              <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}  />
              <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
              <Route path="/login" element={!authUser ?<LoginPage /> : <Navigate to="/" />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
            </Routes>
          </Suspense>

          <Toaster />
        </div>
      </main>

      <footer className="footer footer-center bg-base-200 p-4 text-base-content">
        <p>© 2026 Chat App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
