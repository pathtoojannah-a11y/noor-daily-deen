import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { listCategories, type Category } from '@/lib/apis';
import { BookOpen, Sun, Moon, Clock, Plane, Heart, Leaf } from 'lucide-react';

const iconMap: Record<string, any> = {
  morning: Sun,
  evening: Moon,
  prayer: BookOpen,
  travel: Plane,
  joy: Heart,
  nature: Leaf,
  default: BookOpen
};

const Adhkar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const cats = await listCategories();
    setCategories(cats);
    setIsLoading(false);
  };

  const getIcon = (slug: string) => {
    const Icon = iconMap[slug] || iconMap.default;
    return Icon;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-6 pb-24">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
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
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Adhkār Library</h1>
          <p className="text-muted-foreground">Browse duʿāʾs and remembrances by category</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const Icon = getIcon(category.slug);
            return (
              <Card
                key={category.slug}
                className="border-2 cursor-pointer hover:border-primary transition-colors"
                onClick={() => navigate(`/adhkar/${category.slug}`)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-lg">{category.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {category.count} {category.count === 1 ? 'duʿāʾ' : 'duʿāʾs'}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Adhkar;
