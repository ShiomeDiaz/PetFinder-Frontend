import React, { useState, useEffect } from "react";
import PageHeader from "../components/organisms/PageHeader";
import PetGrid from "../components/organisms/PetGrid";
import { getPets, searchPets } from "../api/petsApi";
import { Pet } from "../types/pet";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 4;

const Pets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [, setSearching] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (search.trim() !== "") {
          setSearching(true);
          data = await searchPets(search, page, PAGE_SIZE);
        } else {
          setSearching(false);
          data = await getPets(page, PAGE_SIZE);
        }
        const petsWithBoolean = data.content.map((pet: Pet) => ({
          ...pet,
          found: Boolean(pet.found),
        }));
        setPets(petsWithBoolean);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error cargando mascotas:", error);
      }
    };
    fetchData();
  }, [page, search]);

  const petsPerdidas = pets.filter(pet => !pet.found);

  return (
    <section className="min-h-screen bg-background dark:bg-gray-900 text-foreground dark:text-white transition-colors duration-300">
      <PageHeader>
        <input
          type="text"
          placeholder={t("search_placeholder")}
          value={search}
          onChange={e => {
            setPage(0);
            setSearch(e.target.value);
          }}
          className="border rounded px-3 py-2 w-full sm:w-72"
        />
      </PageHeader>
      <PetGrid pets={petsPerdidas} />
      <div className="flex gap-2 mt-6 justify-center">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 rounded ${
              i === page ? "bg-orange-500 text-white font-bold" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Pets;
