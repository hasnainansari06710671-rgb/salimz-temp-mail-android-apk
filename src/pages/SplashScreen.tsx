
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Zap } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center cyber-grid relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 px-6">
        {/* Logo */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative glass-card p-8 rounded-3xl neon-border pulse-neon">
            <div className="flex items-center justify-center gap-3">
              <Mail className="w-16 h-16 text-primary" strokeWidth={1.5} />
              <Zap className="w-12 h-12 text-accent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold neon-text tracking-wider">
            SALIMZ
          </h1>
          <p className="text-2xl font-light text-accent tracking-widest">
            TEMP MAIL
          </p>
        </div>

        {/* Tagline */}
        <div className="space-y-1">
          <p className="text-lg text-foreground/80 font-light tracking-wide">
            Instant. Secure. Disposable.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span>Initializing secure session...</span>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="max-w-xs mx-auto">
          <div className="h-1 bg-card rounded-full overflow-hidden neon-border">
            <div className="h-full bg-gradient-to-r from-primary via-accent to-secondary animate-[loading_3s_ease-in-out]" 
                 style={{
                   animation: 'loading 3s ease-in-out forwards'
                 }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}