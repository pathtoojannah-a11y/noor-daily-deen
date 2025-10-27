import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getBookMetadata } from '@/lib/api/hadithMetadata';

const HadithChapters = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const bookMetadata = bookId ? getBookMetadata(bookId) : undefined;

  if (!bookMetadata) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-6 pb-24">
          <Button variant="ghost" onClick={() => navigate('/hadith')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collections
          </Button>
          <p>Book not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        <Button
          variant="ghost"
          onClick={() => navigate('/hadith')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Collections
        </Button>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{bookMetadata.name}</h1>
          </div>
          <p className="text-xl font-arabic text-muted-foreground">{bookMetadata.arabic}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {bookMetadata.description}
          </p>
        </div>

        {bookMetadata.chapters.length > 0 ? (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-4">Chapters</h2>
            {bookMetadata.chapters.map((chapter) => (
              <Card
                key={chapter.number}
                className="border cursor-pointer hover:border-primary transition-colors"
                onClick={() => navigate(`/hadith/${bookId}/chapter/${chapter.number}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 text-center">
                      <span className="text-lg font-semibold text-primary">{chapter.number}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-medium">{chapter.name}</h3>
                      </div>
                      <p className="text-sm font-arabic text-muted-foreground">{chapter.arabic}</p>
                      <p className="text-xs text-muted-foreground">{chapter.hadithRange}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                Chapter metadata not yet available for this collection. 
                <br />
                We're working on adding detailed chapter information.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default HadithChapters;
