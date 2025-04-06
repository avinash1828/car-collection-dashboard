
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "@/types";
import { CarItem } from "@/components/cars/CarItem";

interface RecentlyAddedProps {
  cars: Car[];
}

const RecentlyAdded = ({ cars }: RecentlyAddedProps) => {
  return (
    <Card className="col-span-1 md:col-span-2 animate-slide-in" style={{ animationDelay: "300ms" }}>
      <CardHeader>
        <CardTitle>Recently Added</CardTitle>
        <CardDescription>
          The latest additions to your collection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cars.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 py-8 text-center text-muted-foreground">
              You haven't added any cars to your collection yet.
            </div>
          ) : (
            cars.map((car) => (
              <CarItem key={car.id} car={car} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentlyAdded;
