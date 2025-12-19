
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

export default function EmailReader() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock email data - In production, fetch from state/API
  const email = {
    id: id || '1',
    from: 'noreply@service.com',
    subject: 'Your verification code is 123456',
    body: 'Your verification code is 123456. This code will expire in 10 minutes. Do not share this code with anyone.\n\nIf you did not request this code, please ignore this email.',
    date: new Date(),
  };

  // Detect OTP codes (4-8 digits)
  const otpRegex = /\b\d{4,8}\b/g;
  const otpCodes = email.body.match(otpRegex) || [];

  const handleCopyOTP = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('OTP copied to clipboard!', {
      icon: <Copy className="w-4 h-4" />,
    });
  };

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
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-semibold">Email Details</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Email Header */}
        <Card className="glass-card neon-border p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-semibold text-foreground">
                {email.subject}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <span className="font-medium">From:</span>
              <span className="text-primary">{email.from}</span>
            </div>
            <div className="text-xs text-foreground/40">
              {formatDistanceToNow(email.date, { addSuffix: true })}
            </div>
          </div>
        </Card>

        {/* OTP Detection */}
        {otpCodes.length > 0 && (
          <Card className="glass-card neon-border p-6 space-y-3 border-accent">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wide">
                OTP Detected
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {otpCodes.map((code, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-lg font-mono px-4 py-2 neon-border bg-card/50"
                  >
                    {code}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => handleCopyOTP(code)}
                    className="neon-glow bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Email Body */}
        <Card className="glass-card neon-border p-6">
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-foreground/80 text-sm leading-relaxed">
              {email.body}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
}