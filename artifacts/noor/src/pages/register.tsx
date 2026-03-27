import { useState } from "react";
import { Link } from "wouter";
import { useRegister } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, User, Mail, Lock } from "lucide-react";

export default function Register() {
  const { toast } = useToast();
  const registerMutation = useRegister();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerMutation.mutateAsync({ data: { name, email, password } });
      localStorage.setItem("noor_token", res.token);
      toast({ title: "Welcome!", description: "Account created successfully." });
      window.location.href = "/";
    } catch (err: any) {
      toast({ 
        title: "Registration Failed", 
        description: err.message || "An error occurred", 
        variant: "destructive" 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      <img src={`${import.meta.env.BASE_URL}images/hero-bg.png`} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

      <div className="w-full max-w-md glass-card p-8 rounded-3xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <img src={`${import.meta.env.BASE_URL}images/noor-logo.png`} alt="Logo" className="w-20 h-20 mb-4" />
          <h2 className="text-3xl font-bold text-foreground">Create Account</h2>
          <p className="text-muted-foreground mt-2">Join us in your spiritual journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input 
                value={name}
                onChange={e => setName(e.target.value)}
                className="pl-10 py-6 bg-background/50 border-white/10"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="pl-10 py-6 bg-background/50 border-white/10"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="pl-10 py-6 bg-background/50 border-white/10"
                placeholder="••••••••"
                required minLength={6}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={registerMutation.isPending}
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl mt-4"
          >
            {registerMutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-muted-foreground mt-8">
          Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
}
