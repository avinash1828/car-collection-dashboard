
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Car, Star, Award } from "lucide-react";

interface StatsProps {
  totalCars: number;
  collectedCars: number;
  rareCollections: number;
}

const Stats = ({ totalCars, collectedCars, rareCollections }: StatsProps) => {
  const collectionPercentage = totalCars > 0 
    ? Math.round((collectedCars / totalCars) * 100) 
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="animate-slide-in" style={{ animationDelay: "0ms" }}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Cars Collected</CardTitle>
          <BadgeCheck className="h-5 w-5 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{collectedCars}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {collectionPercentage}% of available cars
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-slide-in" style={{ animationDelay: "100ms" }}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Cars Available</CardTitle>
          <Car className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalCars}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Browse all cars
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-slide-in" style={{ animationDelay: "200ms" }}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Rare Collections</CardTitle>
          <Award className="h-5 w-5 text-automotive-red" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{rareCollections}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Special and limited editions
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
