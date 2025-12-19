
import { useState, useCallback } from 'react';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  body: string;
  date: Date;
  read: boolean;
}

export function useTempMail() {
  const [email, setEmail] = useState<string>('');
  const [inbox, setInbox] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);

  const generateRandomEmail = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8 + Math.floor(Math.random() * 4);
    let username = '';
    for (let i = 0; i < length; i++) {
      username += chars[Math.floor(Math.random() * chars.length)];
    }
    const domains = ['tempmail.com', 'disposable.email', 'throwaway.email'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${username}@${domain}`;
  };

  const generateEmail = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const newEmail = generateRandomEmail();
      setEmail(newEmail);
      setInbox([]);
      setLoading(false);
    }, 500);
  }, []);

  const refreshInbox = useCallback(() => {
    setLoading(true);
    // Simulate API call - In production, integrate with temp mail API
    setTimeout(() => {
      // Mock data for demonstration
      const mockEmails: Email[] = [
        {
          id: '1',
          from: 'noreply@service.com',
          subject: 'Your verification code is 123456',
          preview: 'Your verification code is 123456. This code will expire in 10 minutes.',
          body: 'Your verification code is 123456. This code will expire in 10 minutes. Do not share this code with anyone.',
          date: new Date(),
          read: false,
        },
      ];
      setInbox(mockEmails);
      setLoading(false);
    }, 1000);
  }, []);

  const deleteEmail = useCallback(() => {
    generateEmail();
  }, [generateEmail]);

  const markAsRead = useCallback((emailId: string) => {
    setInbox(prev => 
      prev.map(e => e.id === emailId ? { ...e, read: true } : e)
    );
  }, []);

  return {
    email,
    inbox,
    loading,
    generateEmail,
    refreshInbox,
    deleteEmail,
    markAsRead,
  };
}