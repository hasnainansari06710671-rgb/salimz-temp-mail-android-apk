
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Copy, RefreshCw, Settings as SettingsIcon, Trash2, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useTempMail } from '@/hooks/useTempMail';
import InboxList from '@/components/InboxList';

export default function Home() {
  const navigate = useNavigate();
  const { email, inbox, loading, generateEmail, refreshInbox, deleteEmail } = useTempMail();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes default

  useEffect(() => {
    if (!email) {
      generateEmail();
    }
  }, [email, generateEmail]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      toast.error('Email expired! Generating new one...');
      generateEmail();
      setTimeLeft(600);
    }
  }, [timeLeft, generateEmail]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      toast.success('Email copied to clipboard!', {
        icon: <Copy className="w-4 h-4" />,
      });
    }
  };

  const handleRefresh = () => {
    refreshInbox();
    toast.info('Refreshing inbox...', {
      icon: <RefreshCw className="w-4 h-4" />,
    });
  };

  const handleDelete = () => {
    deleteEmail();
    setTimeLeft(600);
    toast.success('Email deleted! New one generated.', {
      icon: <Trash2 className="w-4 h-4" />,
    });
  };

  return (
    <div className="min-h-screen cyber-grid pb-20">
      {/* Header */}
      <header className="glass-card border-b border-border/20 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Mail className="w-8 h-8 text-primary" />
                <Zap className="w-4 h-4 text-accent absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold neon-text">SALIMZ</h1>
                <p className="text-xs text-foreground/60">Temp Mail</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
              className="neon-border hover:bg-primary/10"
            >
              <SettingsIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Email Display Card */}
        <Card className="glass-card neon-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
              Your Temp Email
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-accent" />
              <span className={`font-mono ${timeLeft < 60 ? 'text-destructive animate-pulse' : 'text-accent'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="h-12 bg-card/50 rounded-lg animate-pulse neon-border" />
          ) : (
            <div className="bg-card/50 rounded-lg p-4 neon-border">
              <p className="text-lg font-mono text-primary break-all">
                {email || 'Generating...'}
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={handleCopy}
              disabled={!email}
              className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button
              onClick={handleRefresh}
              disabled={loading}
              variant="outline"
              className="neon-border hover:bg-accent/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={handleDelete}
              variant="outline"
              className="neon-border hover:bg-destructive/10 text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </Card>

        {/* Inbox Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Inbox ({inbox.length})
            </h2>
            {inbox.length > 0 && (
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            )}
          </div>

          <InboxList emails={inbox} loading={loading} />
        </div>
      </div>
    </div>
  );
}