import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Mail, User, Phone, MapPin, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/dashboard",
    });
    if (result.error) {
      toast({ title: "Error", description: "Google sign-in failed. Please try again.", variant: "destructive" });
    }
    setLoading(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: window.location.origin + "/dashboard",
        },
      });
      if (error) {
        toast({ title: "Signup Failed", description: error.message, variant: "destructive" });
      } else {
        // Update profile with additional details
        const { data: { user: newUser } } = await supabase.auth.getUser();
        if (newUser) {
          await supabase.from("profiles").update({
            full_name: fullName,
            phone,
            city,
            shipping_address: address,
          }).eq("user_id", newUser.id);
        }
        toast({ title: "Account Created!", description: "Welcome to MG Brands Pakistan!" });
        navigate("/dashboard");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: "Login Failed", description: error.message, variant: "destructive" });
      } else {
        navigate("/dashboard");
      }
    }
    setLoading(false);
  };

  const inputClass = "w-full bg-secondary border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors pl-11";

  return (
    <div className="min-h-screen bg-background pt-20 pb-24 px-4">
      <div className="max-w-md mx-auto">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to Shop
        </button>

        <h1 className="font-display text-4xl text-foreground mb-2">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {mode === "login" ? "Log in to your MG Brands account" : "Join MG Brands Pakistan"}
        </p>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-card border border-border rounded-sm px-4 py-3 text-foreground hover:bg-secondary transition-colors mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {mode === "signup" && (
            <>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                <input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className={inputClass} />
              </div>
              <div className="relative">
                <Phone size={18} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number (03XX XXXXXXX)" className={inputClass} />
              </div>
              <div className="relative">
                <MapPin size={18} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                <input required value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className={inputClass} />
              </div>
              <div className="relative">
                <MapPin size={18} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Shipping Address" className={inputClass} />
              </div>
            </>
          )}

          <div className="relative">
            <Mail size={18} className="absolute left-3.5 top-3.5 text-muted-foreground" />
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className={inputClass} />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3.5 top-3.5 text-muted-foreground" />
            <input
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              minLength={6}
              className={inputClass + " pr-11"}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 font-body font-semibold text-sm uppercase tracking-wider hover:shadow-[0_0_30px_hsl(110_100%_55%/0.4)] transition-all duration-300 rounded-sm disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        {mode === "signup" && (
          <div className="mt-6 p-4 border border-primary/30 bg-primary/5 rounded-sm">
            <p className="text-sm text-foreground font-medium mb-1">🎁 Exclusive Benefits!</p>
            <p className="text-xs text-muted-foreground">
              Sign up with your full details to unlock exclusive benefits. Users who complete their profile will receive free coupon codes, special discount offers, and promotional deals in the future.
            </p>
          </div>
        )}

        <p className="text-center text-muted-foreground text-sm mt-6">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-primary hover:underline font-medium"
          >
            {mode === "login" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
