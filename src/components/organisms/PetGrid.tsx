import PetCard from "../molecules/PetCard";

interface Pet {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  updatedAt: string;
  photoUrl?: string;
  found: boolean;
}

interface PetGridProps {
  pets: Pet[];
  onLocation?: (pet: Pet) => void;
  onEdit?: (pet: Pet) => void;
}

const PetGrid: React.FC<PetGridProps> = ({ pets, onLocation, onEdit }) => (
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    
    {pets.map((pet) => (
      <PetCard
        key={pet.id}
        id={pet.id}
        name={pet.name}
        latitude={pet.latitude}
        longitude={pet.longitude}
        updatedAt={pet.updatedAt}
        photoUrl={pet.photoUrl}
        onLocation={onLocation ? () => onLocation(pet) : undefined}
        onEdit={onEdit ? () => onEdit(pet) : undefined}
        found={pet.found}
      />
      
    ))}
  </div>
);

export default PetGrid;
