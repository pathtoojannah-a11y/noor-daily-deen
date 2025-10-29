import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const hadithBooks = [
  {
    id: 'sahih-bukhari',
    name: 'Sahih al-Bukhari',
    description: 'The most authentic collection of hadith',
    arabic: 'صحيح البخاري'
  },
  {
    id: 'sahih-muslim',
    name: 'Sahih Muslim',
    description: 'Second most authentic hadith collection',
    arabic: 'صحيح مسلم'
  },
  {
    id: 'abu-dawood',
    name: 'Sunan Abi Dawud',
    description: 'Collection focused on Islamic jurisprudence',
    arabic: 'سنن أبي داود'
  },
  {
    id: 'al-tirmidhi',
    name: 'Jami\' at-Tirmidhi',
    description: 'Comprehensive hadith collection',
    arabic: 'جامع الترمذي'
  },
  {
    id: 'sunan-nasai',
    name: 'Sunan an-Nasa\'i',
    description: 'Collection emphasizing authenticity',
    arabic: 'سنن النسائي'
  },
  {
    id: 'ibn-e-majah',
    name: 'Sunan Ibn Majah',
    description: 'One of the six major hadith collections',
    arabic: 'سنن ابن ماجه'
  }
];

const Hadith = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Hadith Collections</h1>
          <p className="text-muted-foreground">Browse authentic hadith from the major collections</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hadithBooks.map((book) => (
            <Card
              key={book.id}
              className="border-2 cursor-pointer hover:border-primary transition-colors"
              onClick={() => navigate(`/hadith/${book.id}`)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-lg">{book.name}</span>
                    <span className="text-sm font-arabic font-normal text-muted-foreground">{book.arabic}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {book.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Hadith;
