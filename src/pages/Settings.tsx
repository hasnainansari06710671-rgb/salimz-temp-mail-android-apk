
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Zap, Shield, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen cyber-grid pb-20">
      {/* Header */}
      <header className="glass-card border-b border-border/20 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/home')}
              className="neon-border hover:bg-primary/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Settings</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* App Settings */}
        <Card className="glass-card neon-border p-6 space-y-4">
          <h2 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
            App Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-refresh">Auto Refresh</Label>
                <p className="text-sm text-foreground/60">
                  Automatically check for new emails
                </p>
              </div>
              <Switch id="auto-refresh" defaultChecked />
            </div>

            <Separator className="bg-border/20" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Notifications</Label>
                <p className="text-sm text-foreground/60">
                  Get notified of new emails
                </p>
              </div>
              <Switch id="notifications" />
            </div>
          </div>
        </Card>

        {/* About Salimz */}
        <Card className="glass-card neon-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Mail className="w-8 h-8 text-primary" />
              <Zap className="w-4 h-4 text-accent absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold neon-text">SALIMZ</h2>
              <p className="text-sm text-foreground/60">Temp Mail v1.0.0</p>
            </div>
          </div>

          <Separator className="bg-border/20" />

          <div className="space-y-3 text-sm text-foreground/70">
            <p className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Instant. Secure. Disposable.</span>
            </p>
            <p className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>No login required. Your privacy is protected.</span>
            </p>
            <p className="flex items-start gap-2">
              <Info className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
              <span>Temporary emails expire automatically for your security.</span>
            </p>
          </div>
        </Card>

        {/* Privacy Notice */}
        <Card className="glass-card neon-border p-6 border-accent/50">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wide">
              Privacy Notice
            </h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Salimz Temp Mail does not store any personal data. All emails are temporary 
              and automatically deleted after expiration. We do not track your activity 
              or share any information with third parties.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}