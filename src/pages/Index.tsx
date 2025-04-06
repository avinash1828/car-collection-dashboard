
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { Car } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto flex flex-1 flex-col md:flex-row items-center justify-center py-12 gap-12">
        <div className="md:w-1/2 text-center md:text-left space-y-4">
          <div className="flex justify-center md:justify-start items-center gap-3 mb-6">
            <Car size={36} className="text-accent" />
            <h1 className="text-3xl font-bold">CarCollect</h1>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Track Your Dream Car Collection
          </h2>
          <p className="text-xl text-muted-foreground">
            Create your virtual garage, track your real collection, and discover new cars to add to your wishlist.
          </p>
          <div className="pt-4 flex gap-4 justify-center md:justify-start">
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 rounded-full bg-accent"></div>
              <span className="text-sm text-muted-foreground">Easy tracking</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 rounded-full bg-automotive-red"></div>
              <span className="text-sm text-muted-foreground">Detailed information</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 rounded-full bg-automotive-blue"></div>
              <span className="text-sm text-muted-foreground">Free to use</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
