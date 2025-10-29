import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, RotateCcw, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Dhikr {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  target: number;
}

const ADHKAR: Dhikr[] = [
  {
    id: 1,
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubḥānAllāh',
    translation: 'Glory be to Allah',
    target: 33,
  },
  {
    id: 2,
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alḥamdulillāh',
    translation: 'All praise is due to Allah',
    target: 33,
  },
  {
    id: 3,
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allāhu Akbar',
    translation: 'Allah is the Greatest',
    target: 34,
  },
  {
    id: 4,
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    transliteration: 'Lā ilāha illa Allāh',
    translation: 'There is no deity except Allah',
    target: 1,
  },
];

const STORAGE_KEY = 'dhikr_progress';

interface DhikrCounterProps {
  onComplete?: () => void;
  className?: string;
}

export const DhikrCounter = ({ onComplete, className }: DhikrCounterProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [isComplete, setIsComplete] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { counts: savedCounts, date } = JSON.parse(saved);
        const today = new Date().toISOString().split('T')[0];
        
        // Reset if it's a new day
        if (date === today) {
          setCounts(savedCounts);
          
          // Check if already complete
          const allComplete = savedCounts.every((count, idx) => count >= ADHKAR[idx].target);
          setIsComplete(allComplete);
          
          // Set current index to first incomplete dhikr
          const firstIncomplete = savedCounts.findIndex((count, idx) => count < ADHKAR[idx].target);
          if (firstIncomplete !== -1) {
            setCurrentIndex(firstIncomplete);
          }
        }
      }
    } catch (e) {
      console.warn('Failed to load dhikr progress:', e);
    }
  }, []);

  // Save progress whenever counts change
  useEffect(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        counts,
        date: today,
      }));
    } catch (e) {
      console.warn('Failed to save dhikr progress:', e);
    }
  }, [counts]);

  const currentDhikr = ADHKAR[currentIndex];
  const currentCount = counts[currentIndex];
  const progress = (currentCount / currentDhikr.target) * 100;

  const handleTap = () => {
    if (isComplete) return;

    const newCounts = [...counts];
    newCounts[currentIndex] = Math.min(newCounts[currentIndex] + 1, currentDhikr.target);
    setCounts(newCounts);

    // Haptic feedback (if supported)
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    // Play sound
    playTapSound();

    // Check if current dhikr is complete
    if (newCounts[currentIndex] >= currentDhikr.target) {
      playCompletionSound();
      
      // Auto-advance to next dhikr
      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < ADHKAR.length) {
          setCurrentIndex(nextIndex);
        } else {
          // All dhikr complete!
          setIsComplete(true);
          if (onComplete) {
            onComplete();
          }
        }
      }, 500);
    }
  };

  const handleReset = () => {
    setCounts([0, 0, 0, 0]);
    setCurrentIndex(0);
    setIsComplete(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleDotClick = (index: number) => {
    if (!isComplete) {
      setCurrentIndex(index);
    }
  };

  const playTapSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Silently fail if audio not supported
    }
  };

  const playCompletionSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 1200;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Silently fail if audio not supported
    }
  };

  return (
    <Card className={cn('border-2', className, isComplete && 'border-primary bg-primary/5')}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Dhikr Counter</CardTitle>
          {!isComplete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isComplete ? (
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-primary">All Dhikr Complete!</h3>
            <p className="text-sm text-muted-foreground">May Allāh accept your remembrance</p>
            <Button
              onClick={handleReset}
              variant="outline"
              className="mt-4"
            >
              Start Over
            </Button>
          </div>
        ) : (
          <>
            {/* Arabic Text */}
            <div className="text-center space-y-2">
              <p className="text-5xl md:text-6xl font-arabic leading-loose" dir="rtl">
                {currentDhikr.arabic}
              </p>
              <p className="text-lg text-muted-foreground italic">
                {currentDhikr.transliteration}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentDhikr.translation}
              </p>
            </div>

            {/* Count Display */}
            <div className="text-center">
              <div className="text-6xl font-bold text-primary">
                {currentCount} <span className="text-3xl text-muted-foreground">/ {currentDhikr.target}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <Progress value={progress} className="h-3" />

            {/* Tap Button */}
            <Button
              onClick={handleTap}
              size="lg"
              className="w-full h-24 text-xl bg-gradient-to-r from-primary to-primary/90 hover:scale-105 active:scale-95 transition-transform"
              disabled={currentCount >= currentDhikr.target}
            >
              {currentCount >= currentDhikr.target ? (
                <>
                  <Check className="w-6 h-6 mr-2" />
                  Complete!
                </>
              ) : (
                'Tap to Count'
              )}
            </Button>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 pt-2">
              {ADHKAR.map((dhikr, idx) => (
                <button
                  key={dhikr.id}
                  onClick={() => handleDotClick(idx)}
                  className={cn(
                    'w-3 h-3 rounded-full transition-all',
                    idx === currentIndex
                      ? 'bg-primary w-8'
                      : counts[idx] >= dhikr.target
                      ? 'bg-primary/50'
                      : 'bg-muted-foreground/30'
                  )}
                  aria-label={`Go to ${dhikr.transliteration}`}
                />
              ))}
            </div>

            {/* Summary of all counts */}
            <div className="grid grid-cols-4 gap-2 pt-4 border-t">
              {ADHKAR.map((dhikr, idx) => (
                <div
                  key={dhikr.id}
                  className={cn(
                    'text-center p-2 rounded-lg transition-colors',
                    counts[idx] >= dhikr.target ? 'bg-primary/10' : 'bg-muted/50'
                  )}
                >
                  <div className="text-lg font-arabic">{dhikr.arabic}</div>
                  <div className={cn(
                    'text-sm font-semibold',
                    counts[idx] >= dhikr.target ? 'text-primary' : 'text-muted-foreground'
                  )}>
                    {counts[idx]}/{dhikr.target}
                    {counts[idx] >= dhikr.target && (
                      <Check className="w-3 h-3 inline ml-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
