import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Reflection {
  id: string;
  date: string;
  text: string;
  created_at: string;
}

const Reflections = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [reflections, setReflections] = useState<Reflection[]>([]);

  useEffect(() => {
    loadReflections();
  }, []);

  const loadReflections = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('reflections')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setReflections(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading reflections",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReflection = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reflections')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setReflections(reflections.filter((r) => r.id !== id));
      toast({
        title: "Reflection deleted",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting reflection",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto space-y-4 pb-24">
          <Skeleton className="h-12 w-48" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 pb-24">
        <h1 className="text-3xl font-bold">Your Reflections</h1>

        {reflections.length === 0 ? (
          <Card className="border-2">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No reflections yet. Start your daily practice!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reflections.map((reflection) => (
              <Card key={reflection.id} className="border-2 hover:shadow-[var(--shadow-md)] transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-base flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(reflection.date), 'MMMM d, yyyy')}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteReflection(reflection.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {reflection.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Reflections;
