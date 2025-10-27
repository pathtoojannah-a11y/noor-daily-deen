import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getHadithFromBook } from '@/lib/api/hadith';
import type { HadithData } from '@/lib/api/hadith';

const bookNames: Record<string, string> = {
  bukhari: 'Sahih al-Bukhari',
  muslim: 'Sahih Muslim',
  abudawud: 'Sunan Abi Dawud',
  tirmidhi: 'Jami\' at-Tirmidhi',
  nasai: 'Sunan an-Nasa\'i',
  ibnmajah: 'Sunan Ibn Majah',
  malik: 'Muwatta Malik',
  ahmad: 'Musnad Ahmad',
  darimi: 'Sunan ad-Darimi'
};

const HadithBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [hadiths, setHadiths] = useState<HadithData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(20);

  useEffect(() => {
    if (bookId) {
      loadHadiths(bookId);
    }
  }, [bookId]);

  const loadHadiths = async (book: string) => {
    const hadithList = await getHadithFromBook(book);
    setHadiths(hadithList);
    setIsLoading(false);
  };

  const loadMore = () => {
    setDisplayCount(prev => prev + 20);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto space-y-6 pb-24">
          <Skeleton className="h-10 w-48" />
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6 pb-24">
        <Button
          variant="ghost"
          onClick={() => navigate('/hadith')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Collections
        </Button>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{bookId ? bookNames[bookId] : 'Hadith Book'}</h1>
          <p className="text-muted-foreground">{hadiths.length} hadiths</p>
        </div>

        <div className="space-y-4">
          {hadiths.slice(0, displayCount).map((hadith, index) => (
            <Card key={index} className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>{hadith.source}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <p className="text-base leading-relaxed">{hadith.text}</p>
                  
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {hadith.chapter && (
                      <span className="bg-secondary/20 rounded px-2 py-1">
                        {hadith.chapter}
                      </span>
                    )}
                    {hadith.reference && (
                      <span className="bg-secondary/20 rounded px-2 py-1">
                        {hadith.reference}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {displayCount < hadiths.length && (
          <div className="flex justify-center">
            <Button onClick={loadMore} variant="outline">
              Load More Hadiths ({hadiths.length - displayCount} remaining)
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HadithBook;
