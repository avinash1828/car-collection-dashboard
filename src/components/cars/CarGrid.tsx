
import { CarItem } from "@/components/cars/CarItem";
import { Car } from "@/types";

interface CarGridProps {
  cars: Car[];
  onAddToCollection?: (carId: string) => void;
}

export const CarGrid = ({ cars, onAddToCollection }: CarGridProps) => {
  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No cars found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cars.map((car) => (
        <CarItem 
          key={car.id} 
          car={car} 
          onAddToCollection={() => onAddToCollection && onAddToCollection(car.id)}
        />
      ))}
    </div>
  );
};
