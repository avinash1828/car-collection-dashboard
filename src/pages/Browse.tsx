
import { useState, useEffect, useMemo } from "react";
import { CarSearch } from "@/components/cars/CarSearch";
import { CarGrid } from "@/components/cars/CarGrid";
import { Car as CarType } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { mockCars } from "@/data/mockData";
import { Car } from "lucide-react";

const Browse = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<CarType[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarType[]>([]);
  const [searchParams, setSearchParams] = useState({
    query: "",
    make: "",
    year: "",
  });

  // Extract unique makes and years for filters
  const makes = useMemo(() => {
    const uniqueMakes = Array.from(new Set(mockCars.map((car) => car.make)));
    return uniqueMakes.sort();
  }, []);

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(mockCars.map((car) => car.year.toString())));
    return uniqueYears.sort((a, b) => parseInt(b) - parseInt(a));
  }, []);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // For demo purposes, randomly mark some cars as collected
      const carsWithCollectionStatus = mockCars.map(car => ({
        ...car,
        isCollected: Math.random() > 0.7,
      }));
      
      setCars(carsWithCollectionStatus);
      setFilteredCars(carsWithCollectionStatus);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (cars.length === 0) return;

    let results = [...cars];
    
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
    
    setFilteredCars(results);
  }, [cars, searchParams]);

  const handleSearch = (params: { query: string; make: string; year: string }) => {
    setSearchParams(params);
  };

  const handleAddToCollection = (carId: string) => {
    setCars((prevCars) =>
      prevCars.map((car) => {
        if (car.id === carId) {
          return { ...car, isCollected: true };
        }
        return car;
      })
    );
    
    setFilteredCars((prevCars) =>
      prevCars.map((car) => {
        if (car.id === carId) {
          return { ...car, isCollected: true };
        }
        return car;
      })
    );
  };

  if (isLoading) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <Car className="h-12 w-12 animate-pulse mx-auto text-muted" />
          <p className="mt-4 text-muted-foreground">Loading cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Browse Cars</h1>
        <p className="text-muted-foreground">
          Discover and add cars to your collection
        </p>
      </div>
      
      <div className="mb-8">
        <CarSearch 
          onSearch={handleSearch}
          makes={makes}
          years={years}
        />
      </div>
      
      <CarGrid 
        cars={filteredCars} 
        onAddToCollection={handleAddToCollection}
      />
    </div>
  );
};

export default Browse;
