
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, UserPlus, LogIn } from "lucide-react";

type AuthMode = "login" | "signup" | "forgotPassword";

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This is a mock auth implementation
      // In a real app, you would connect this to your authentication provider
      if (mode === "login") {
        // Mock login
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we'll just redirect to dashboard
        toast({
          title: "Login successful",
          description: "Welcome back to your car collection!",
        });
        navigate("/dashboard");
      } else if (mode === "signup") {
        // Password validation
        if (password !== confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please make sure your passwords match.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        // Mock signup
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Account created",
          description: "Your account has been successfully created!",
        });
        navigate("/dashboard");
      } else if (mode === "forgotPassword") {
        // Mock password reset
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Reset link sent",
          description: "Check your email for a password reset link.",
        });
        setMode("login");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {mode === "login" ? "Welcome Back" : 
           mode === "signup" ? "Create an Account" : 
           "Reset Your Password"}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === "login" ? "Sign in to access your car collection" : 
           mode === "signup" ? "Start tracking your dream car collection" : 
           "We'll send you a link to reset your password"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400">
                <Mail size={18} />
              </div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10"
              />
            </div>
          </div>

          {mode !== "forgotPassword" && (
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400">
                <Lock size={18} />
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          )}

          {mode === "signup" && (
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400">
                <Lock size={18} />
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pl-10"
              />
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Processing..." : 
             mode === "login" ? "Sign In" : 
             mode === "signup" ? "Create Account" : 
             "Send Reset Link"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {mode === "login" && (
          <>
            <Button
              variant="link"
              onClick={() => setMode("forgotPassword")}
              className="text-sm"
            >
              Forgot your password?
            </Button>
            <div className="flex items-center before:content-[''] before:flex-1 before:border-t before:border-gray-300 after:content-[''] after:flex-1 after:border-t after:border-gray-300">
              <span className="mx-3 text-sm text-gray-500">OR</span>
            </div>
            <Button
              variant="outline"
              className="w-full flex gap-2 items-center"
              onClick={() => setMode("signup")}
            >
              <UserPlus size={18} />
              Create an account
            </Button>
          </>
        )}
        {mode === "signup" && (
          <Button
            variant="outline"
            className="w-full flex gap-2 items-center"
            onClick={() => setMode("login")}
          >
            <LogIn size={18} />
            Already have an account? Sign in
          </Button>
        )}
        {mode === "forgotPassword" && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setMode("login")}
          >
            Back to Sign In
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
