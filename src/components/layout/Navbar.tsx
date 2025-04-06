
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  Home, 
  Search, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/signup";

  const handleLogout = () => {
    // In a real app, you would implement actual logout logic here
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "My Collection", path: "/collection", icon: <Car size={20} /> },
    { name: "Browse Cars", path: "/browse", icon: <Search size={20} /> },
  ];

  if (isMobile) {
    return (
      <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 font-bold text-xl">
            <Car className="h-6 w-6 text-accent" />
            <span>CarCollect</span>
          </Link>
          
          {isLoggedIn ? (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[385px]">
                <div className="flex flex-col h-full pt-6">
                  <div className="space-y-4 py-4">
                    {navLinks.map((link) => (
                      <Button
                        key={link.path}
                        variant="ghost"
                        className={`w-full justify-start gap-2 ${
                          location.pathname === link.path
                            ? "bg-accent/10 font-medium text-accent"
                            : ""
                        }`}
                        onClick={() => {
                          navigate(link.path);
                          setIsMenuOpen(false);
                        }}
                      >
                        {link.icon}
                        {link.name}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-auto pb-8">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut size={20} />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 font-bold text-xl">
          <Car className="h-6 w-6 text-accent" />
          <span>CarCollect</span>
        </Link>
        
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant={location.pathname === link.path ? "default" : "ghost"}
                onClick={() => navigate(link.path)}
                className="gap-2"
              >
                {link.icon}
                {link.name}
              </Button>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <User size={20} />
                  <span>Account</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={handleLogout} className="gap-2 cursor-pointer">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/signup")}>
              Create Account
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
