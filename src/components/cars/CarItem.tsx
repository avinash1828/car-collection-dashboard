
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "@/types";
import { BadgeCheck, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface CarItemProps {
  car: Car;
  onAddToCollection?: () => void;
}

export const CarItem = ({ car, onAddToCollection }: CarItemProps) => {
  const [isAddingToCollection, setIsAddingToCollection] = useState(false);
  
  const handleAddToCollection = () => {
    if (car.isCollected) return;
    
    setIsAddingToCollection(true);
    
    // Simulate API call
    setTimeout(() => {
      if (onAddToCollection) {
        onAddToCollection();
      }
      
      toast({
        title: "Added to collection",
        description: `${car.make} ${car.model} has been added to your collection.`,
      });
      
      setIsAddingToCollection(false);
    }, 1000);
  };
  
  return (
    <Card className="overflow-hidden car-hover-effect">
      <div className="aspect-video relative bg-muted">
        <img 
          src={car.imageUrl} 
          alt={`${car.make} ${car.model}`}
          className="object-cover w-full h-full"
        />
        {car.isCollected && (
          <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground p-1 rounded-md flex items-center gap-1">
            <BadgeCheck size={16} />
            <span className="text-xs font-medium">Collected</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold truncate">{car.make} {car.model}</h3>
            <p className="text-sm text-muted-foreground">{car.year}</p>
          </div>
        </div>
      </CardContent>
      {!car.isCollected && (
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleAddToCollection} 
            className="w-full" 
            size="sm"
            disabled={isAddingToCollection}
          >
            {isAddingToCollection ? "Adding..." : (
              <>
                <Plus size={16} className="mr-1" />
                Add to Collection
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
