import React, { useState, useEffect } from "react";
import { MapPin, Plus } from "lucide-react";
import Button from "../components/atoms/Button";
import PetGridMyPets from "../components/organisms/PetGridMyPets";
import PetFormModal from "../components/organisms/modal/PetFormModal";
import { getPets, createPet, updatePet } from "../api/petsApi";
import { useAuth } from "../components/context/AuthContext";
import { useTranslation } from "react-i18next";

interface Pet {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  updatedAt: string;
  photoUrl?: string;
  found: boolean;
  description?: string;
}

const PAGE_SIZE = 4;

const MyPetsHeader: React.FC<{ onAddPet: () => void }> = ({ onAddPet }) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl shadow-lg shadow-orange-100 bg-gradient-to-r from-orange-50/80 to-white/90 dark:from-sidebar-dark dark:to-sidebar-dark p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-extrabold text-foreground dark:text-foreground-dark mb-1">{t("my_pets")}</h1>
        <div className="flex items-center gap-2 text-orange-700 dark:text-sidebar-dark-foreground font-medium">
          <MapPin className="w-5 h-5" />
          <span>{t("manage_your_pets", "Visualiza y administra tus mascotas")}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={onAddPet}
        >
          <Plus className="w-5 h-5" /> {t("report_pet")}
        </Button>
      </div>
    </div>
  );
};

const MyPets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const { userEmail, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMyPets = async () => {
      if (!isAuthenticated || !userEmail) return;
      try {
        const data = await getPets(page, PAGE_SIZE, userEmail);
        const petsWithBoolean = data.content.map((pet: Pet) => ({
          ...pet,
          found: Boolean(pet.found),
        }));
        setPets(petsWithBoolean);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error cargando tus mascotas:", error);
      }
    };
    fetchMyPets();
  }, [isAuthenticated, userEmail, page]);

  const handleAddPet = async (petData: any) => {
    if (!userEmail) return;
    try {
      const formData = new FormData();
      formData.append("name", petData.name);
      formData.append("description", petData.description || "");
      formData.append("latitude", String(petData.latitude));
      formData.append("longitude", String(petData.longitude));
      formData.append("isFound", "false"); // Siempre "false" al crear
      if (petData.photo) formData.append("photo", petData.photo);
      formData.append("userEmail", userEmail);

      await createPet(formData);

      const data = await getPets(page, PAGE_SIZE, userEmail);
      const petsWithBoolean = data.content.map((pet: Pet) => ({
        ...pet,
        found: Boolean(pet.found),
      }));
      setPets(petsWithBoolean);
      setTotalPages(data.totalPages);
    } catch (error) {
      alert(t("error_saving_pet", "Error al guardar la mascota"));
    }
  };

  const handleEditPet = async (petData: any) => {
    if (!userEmail || !editingPet) return;
    try {
      const formData = new FormData();
      formData.append("name", petData.name);
      formData.append("description", petData.description || "");
      formData.append("latitude", String(petData.latitude));
      formData.append("longitude", String(petData.longitude));
      // Usa petData.isFound (no petData.found)
      formData.append("isFound", petData.isFound ? "true" : "false");
      if (petData.photo) formData.append("photo", petData.photo);
      formData.append("userEmail", userEmail);

      await updatePet(editingPet.id, formData);

      const data = await getPets(page, PAGE_SIZE, userEmail);
      const petsWithBoolean = data.content.map((pet: Pet) => ({
        ...pet,
        found: Boolean(pet.found),
      }));
      setPets(petsWithBoolean);
      setTotalPages(data.totalPages);
      setEditingPet(null);
    } catch (error) {
      alert(t("error_updating_pet", "Error al actualizar la mascota"));
    }
  };

  return (
    <section className="min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark transition-colors duration-300">
      <MyPetsHeader onAddPet={() => { setShowForm(true); setEditingPet(null); }} />
      <PetGridMyPets
        pets={pets}
        onEdit={(pet) => {
          setEditingPet(pet);
          setShowForm(true);
        }}
      />
      <div className="flex gap-2 mt-6 justify-center">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 rounded ${
              i === page
                ? "bg-orange-500 text-white font-bold"
                : "bg-gray-200 dark:bg-sidebar-dark dark:text-sidebar-dark-foreground"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <PetFormModal
        open={showForm}
        onClose={() => { setShowForm(false); setEditingPet(null); }}
        onSubmit={editingPet ? handleEditPet : handleAddPet}
        initialData={editingPet || undefined}
      />
    </section>
  );
};

export default MyPets;
