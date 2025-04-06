
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Stats from "@/components/dashboard/Stats";
import RecentlyAdded from "@/components/dashboard/RecentlyAdded";
import { Car, ChevronRight } from "lucide-react";
import { Car as CarType } from "@/types";
import { mockCars } from "@/data/mockData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userCollection, setUserCollection] = useState<CarType[]>([]);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // For demo purposes, we'll set a few random cars as collected
      const collectedCars = mockCars
        .filter(car => Math.random() > 0.7)
        .map(car => ({ ...car, isCollected: true }))
        .slice(0, 5);
      
      setUserCollection(collectedCars);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Statistics
  const totalCars = mockCars.length;
  const collectedCars = userCollection.length;
  const rareCollections = userCollection.filter(car => car.isRare).length;
  
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track your car collection
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => navigate("/collection")}
            className="gap-2"
          >
            My Collection
            <ChevronRight size={16} />
          </Button>
          <Button
            onClick={() => navigate("/browse")}
            variant="outline"
            className="gap-2"
          >
            Browse Cars
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6">
        <Stats 
          totalCars={totalCars}
          collectedCars={collectedCars}
          rareCollections={rareCollections}
        />
        
        <div className="grid gap-6 md:grid-cols-3">
          <RecentlyAdded cars={userCollection} />
          
          <div className="md:col-span-1">
            {/* This is a placeholder for future content */}
            {/* We could add achievements, activity feed, etc. here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
