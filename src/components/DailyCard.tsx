import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface DailyCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  completed?: boolean;
  onComplete?: () => void;
}

export const DailyCard = ({ title, icon, children, completed, onComplete }: DailyCardProps) => {
  return (
    <Card className="relative overflow-hidden border-2 transition-all hover:shadow-[var(--shadow-md)]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          </div>
          {onComplete && (
            <button
              onClick={onComplete}
              className={`p-1 rounded-full transition-colors ${
                completed
                  ? 'text-success'
                  : 'text-muted-foreground hover:text-success'
              }`}
              aria-label={completed ? 'Completed' : 'Mark as complete'}
            >
              <CheckCircle2 className={`w-7 h-7 ${completed ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
        <div className="space-y-3">
          {children}
        </div>
      </div>
    </Card>
  );
};
