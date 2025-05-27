// src/App.tsx
import React from "react";
import "./i18n";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Pets from "./pages/Pets";
import MyPets from "./pages/MyPets";
import Settings from "./pages/Settings";
import { SidebarProvider } from "./components/context/SidebarContext";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./components/context/AuthContext";

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/pets" replace />} />
        <Route path="pets" element={<Pets />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} />}>
          <Route path="myPets" element={<MyPets />} />
          <Route path="ajustes" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
};

const App: React.FC = () => (
  <SidebarProvider>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </SidebarProvider>
);

export default App;
