import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getHadithFromChapter, getBookMetadata, type HadithData } from '@/lib/apis';

const HadithBook = () => {
  const { bookId, chapterId } = useParams<{ bookId: string; chapterId: string }>();
  const navigate = useNavigate();
  const [hadiths, setHadiths] = useState<HadithData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const bookMetadata = bookId ? getBookMetadata(bookId) : undefined;
  const chapter = bookMetadata?.chapters.find(c => c.number === Number(chapterId));

  useEffect(() => {
    async function load() {
      if (bookId && chapterId) {
        const list = await getHadithFromChapter(bookId, Number(chapterId));
        setHadiths(list);
      }
      setIsLoading(false);
    }
    load();
  }, [bookId, chapterId]);

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
          onClick={() => navigate(`/hadith/${bookId}`)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Chapters
        </Button>

        <div className="space-y-2">
          {chapter ? (
            <>
              <h1 className="text-3xl font-bold">{chapter.name}</h1>
              <p className="text-xl font-arabic text-muted-foreground">{chapter.arabic}</p>
              <p className="text-sm text-muted-foreground">
                {bookMetadata?.name} • Chapter {chapter.number} • {chapter.hadithRange}
              </p>
            </>
          ) : (
            <h1 className="text-3xl font-bold">Hadiths</h1>
          )}
        </div>

        <div className="space-y-4">
          {hadiths.map((hadith, index) => (
            <Card key={index} className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>{hadith.source}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {hadith.arabic && (
                    <p className="font-arabic text-xl text-right leading-relaxed whitespace-pre-wrap">
                      {hadith.arabic}
                    </p>
                  )}
                  <p className="text-base leading-relaxed whitespace-pre-wrap">{hadith.text}</p>
                  
                  {(hadith.chapter || hadith.reference || hadith.hadithNumber) && (
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {hadith.chapter && (
                        <span className="bg-secondary/20 rounded px-2 py-1">
                          Chapter {hadith.chapter}
                        </span>
                      )}
                      {hadith.hadithNumber && (
                        <span className="bg-secondary/20 rounded px-2 py-1">
                          #{hadith.hadithNumber}
                        </span>
                      )}
                      {hadith.reference && (
                        <span className="bg-secondary/20 rounded px-2 py-1">
                          {hadith.reference}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </Layout>
  );
};

export default HadithBook;
