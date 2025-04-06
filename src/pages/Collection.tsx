
import { useState, useEffect } from "react";
import { CarSearch } from "@/components/cars/CarSearch";
import { CarGrid } from "@/components/cars/CarGrid";
import { toast } from "@/components/ui/use-toast";
import { Car as CarType } from "@/types";
import { mockCars } from "@/data/mockData";
import { Car, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Collection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState<CarType[]>([]);
  const [filteredCollection, setFilteredCollection] = useState<CarType[]>([]);
  const [searchParams, setSearchParams] = useState({
    query: "",
    make: "",
    year: "",
  });

  // Extract unique makes and years for filters
  const makes = Array.from(new Set(collection.map((car) => car.make))).sort();
  const years = Array.from(new Set(collection.map((car) => car.year.toString())))
    .sort((a, b) => parseInt(b) - parseInt(a));

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // For demo purposes, we'll just randomly select some cars
      const randomCollection = mockCars
        .filter(() => Math.random() > 0.6)
        .map(car => ({ ...car, isCollected: true }));
      
      setCollection(randomCollection);
      setFilteredCollection(randomCollection);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (collection.length === 0) return;

    let results = [...collection];
    
    if (searchParams.query) {
      const query = searchParams.query.toLowerCase();
      results = results.filter(
        (car) =>
          car.make.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query)
      );
    }
    
    if (searchParams.make && searchParams.make !== "all-makes") {
      results = results.filter((car) => car.make === searchParams.make);
    }
    
    if (searchParams.year && searchParams.year !== "all-years") {
      results = results.filter((car) => car.year.toString() === searchParams.year);
    }
    
    setFilteredCollection(results);
  }, [collection, searchParams]);

  const handleSearch = (params: { query: string; make: string; year: string }) => {
    setSearchParams(params);
  };

  const handleRemoveFromCollection = (carId: string) => {
    // In a real app, you would call an API to remove the car
    toast({
      title: "Car removed",
      description: "The car has been removed from your collection.",
    });
    
    setCollection((prev) => prev.filter((car) => car.id !== carId));
    setFilteredCollection((prev) => prev.filter((car) => car.id !== carId));
  };

  if (isLoading) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <Car className="h-12 w-12 animate-pulse mx-auto text-muted" />
          <p className="mt-4 text-muted-foreground">Loading your collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Collection</h1>
        <p className="text-muted-foreground">
          {collection.length} cars in your collection
        </p>
      </div>
      
      {collection.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
          <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">Your collection is empty</h2>
          <p className="text-muted-foreground mb-6">
            Start building your collection by browsing available cars.
          </p>
          <Button 
            variant="default" 
            className="gap-2"
            onClick={() => window.location.href = "/browse"}
          >
            <FilePlus size={16} />
            Browse Cars
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <CarSearch 
              onSearch={handleSearch}
              makes={makes}
              years={years}
            />
          </div>
          <CarGrid 
            cars={filteredCollection} 
            onAddToCollection={handleRemoveFromCollection}
          />
        </>
      )}
    </div>
  );
};

export default Collection;
