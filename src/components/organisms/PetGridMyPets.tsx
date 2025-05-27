import MyPetCard from "../molecules/MyPetCard";

interface Pet {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  updatedAt: string;
  photoUrl?: string;
  found: boolean;
}

interface PetGridMyPetsProps {
  pets: Pet[];
  onEdit: (pet: Pet) => void;
}

const PetGridMyPets: React.FC<PetGridMyPetsProps> = ({ pets, onEdit }) => (
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {pets.map((pet) => (
      <MyPetCard
        key={pet.id}
        id={pet.id}
        name={pet.name}
        latitude={pet.latitude}
        longitude={pet.longitude}
        updatedAt={pet.updatedAt}
        photoUrl={pet.photoUrl}
        found={pet.found}
        onEdit={() => onEdit(pet)}
      />
    ))}
  </div>
);

export default PetGridMyPets;
