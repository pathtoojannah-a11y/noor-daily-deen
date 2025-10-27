import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, Target, Flame, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    weeklyCompletion: 0,
    totalDhikr: 0,
    currentStreak: 0,
    totalReflections: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get last 7 days progress
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weekAgoStr = weekAgo.toISOString().split('T')[0];

      const { data: weekProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', weekAgoStr);

      if (weekProgress) {
        const completed = weekProgress.filter((day) =>
          day.ayah_done && day.hadith_done && day.dua_done && day.dhikr_done && day.reflection_done
        ).length;
        const weeklyCompletion = Math.round((completed / 7) * 100);
        
        const totalDhikr = weekProgress.reduce((sum, day) => sum + (day.dhikr_count || 0), 0);

        setStats((prev) => ({
          ...prev,
          weeklyCompletion,
          totalDhikr,
        }));
      }

      // Calculate streak
      const { data: allProgress } = await supabase
        .from('user_progress')
        .select('date, ayah_done, hadith_done, dua_done, dhikr_done, reflection_done')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(30);

      if (allProgress) {
        let currentStreak = 0;
        for (const day of allProgress) {
          const completed = day.ayah_done && day.hadith_done && day.dua_done && day.dhikr_done && day.reflection_done;
          if (completed) {
            currentStreak++;
          } else {
            break;
          }
        }
        setStats((prev) => ({ ...prev, currentStreak }));
      }

      // Get total reflections
      const { count } = await supabase
        .from('reflections')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setStats((prev) => ({ ...prev, totalReflections: count || 0 }));
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Weekly Completion',
      value: `${stats.weeklyCompletion}%`,
      icon: CheckCircle2,
      description: 'Last 7 days',
      color: 'text-success',
    },
    {
      title: 'Current Streak',
      value: stats.currentStreak,
      icon: Flame,
      description: 'Consecutive days',
      color: 'text-accent',
    },
    {
      title: 'Weekly Dhikr',
      value: stats.totalDhikr,
      icon: Target,
      description: 'Total count',
      color: 'text-primary',
    },
    {
      title: 'Total Reflections',
      value: stats.totalReflections,
      icon: TrendingUp,
      description: 'All time',
      color: 'text-primary',
    },
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-6 pb-24">
          <Skeleton className="h-12 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        <h1 className="text-3xl font-bold">Your Journey</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="border-2 hover:shadow-[var(--shadow-md)] transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Keep Going!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your consistency is building a beautiful spiritual practice. May Allah accept your efforts and grant you steadfastness.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
