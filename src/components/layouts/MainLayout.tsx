import React, { useState, useEffect } from "react";
import Sidebar from "../organisms/Sidebar";
import HeaderBar from "../organisms/HeaderBar";
import { useSidebar } from "../context/SidebarContext";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import PetFormModal from "../organisms/modal/PetFormModal";
import { createPet } from "../../api/petsApi";
import { useAuth } from "../context/AuthContext";

const MainLayout: React.FC = () => {
  const { collapsed, mobileOpen, setMobileOpen, setCollapsed, toggleSidebar } = useSidebar();
  const [showForm, setShowForm] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const { userEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => {
      setShowForm(true);
      setModalKey((k) => k + 1);
    };
    window.addEventListener("add-pet", handler);
    return () => window.removeEventListener("add-pet", handler);
  }, []);

  const handleAddPet = async (petData: any) => {
    if (!userEmail) {
      setShowForm(false);
      navigate("/login");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", petData.name);
      formData.append("description", petData.description || "");
      formData.append("latitude", String(petData.latitude));
      formData.append("longitude", String(petData.longitude));
      formData.append("isFound", "false");
      if (petData.photo) formData.append("photo", petData.photo);
      formData.append("userEmail", userEmail);

      await createPet(formData);

      setShowForm(false);

      if (location.pathname !== "/myPets") {
        navigate("/myPets");
      }
    } catch (error) {
      alert("Error al guardar la mascota");
      setShowForm(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark transition-colors duration-300">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setCollapsed={setCollapsed}
      />
      <div className="flex-1 flex flex-col">
        <HeaderBar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-8 bg-background dark:bg-background-dark transition-colors duration-300">
          <Outlet />
        </main>
      </div>
      <PetFormModal
        key={modalKey}
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleAddPet}
      />
    </div>
  );
};

export default MainLayout;
