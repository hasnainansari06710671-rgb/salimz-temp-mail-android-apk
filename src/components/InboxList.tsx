
import { useNavigate } from 'react-router-dom';
import { Mail, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: Date;
  read: boolean;
}

interface InboxListProps {
  emails: Email[];
  loading: boolean;
}

export default function InboxList({ emails, loading }: InboxListProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="glass-card p-4 animate-pulse">
            <div className="space-y-2">
              <div className="h-4 bg-card rounded w-3/4" />
              <div className="h-3 bg-card rounded w-1/2" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <Card className="glass-card neon-border p-12 text-center">
        <Mail className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
        <p className="text-foreground/60">No emails yet</p>
        <p className="text-sm text-foreground/40 mt-2">
          Your inbox is empty. Emails will appear here.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {emails.map((email) => (
        <Card
          key={email.id}
          onClick={() => navigate(`/email/${email.id}`)}
          className={`glass-card neon-border p-4 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 ${
            !email.read ? 'border-accent' : ''
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {email.from}
                </p>
                <p className={`text-sm truncate ${!email.read ? 'text-accent font-medium' : 'text-foreground/70'}`}>
                  {email.subject}
                </p>
              </div>
              {!email.read && (
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse flex-shrink-0 mt-2" />
              )}
            </div>
            <p className="text-sm text-foreground/50 line-clamp-2">
              {email.preview}
            </p>
            <div className="flex items-center gap-2 text-xs text-foreground/40">
              <Clock className="w-3 h-3" />
              <span>{formatDistanceToNow(email.date, { addSuffix: true })}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}