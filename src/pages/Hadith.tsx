import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const hadithBooks = [
  {
    id: 'bukhari',
    name: 'Sahih al-Bukhari',
    description: 'The most authentic collection of hadith',
    arabic: 'صحيح البخاري'
  },
  {
    id: 'muslim',
    name: 'Sahih Muslim',
    description: 'Second most authentic hadith collection',
    arabic: 'صحيح مسلم'
  },
  {
    id: 'abudawud',
    name: 'Sunan Abi Dawud',
    description: 'Collection focused on Islamic jurisprudence',
    arabic: 'سنن أبي داود'
  },
  {
    id: 'tirmidhi',
    name: 'Jami\' at-Tirmidhi',
    description: 'Comprehensive hadith collection',
    arabic: 'جامع الترمذي'
  },
  {
    id: 'nasai',
    name: 'Sunan an-Nasa\'i',
    description: 'Collection emphasizing authenticity',
    arabic: 'سنن النسائي'
  },
  {
    id: 'ibnmajah',
    name: 'Sunan Ibn Majah',
    description: 'One of the six major hadith collections',
    arabic: 'سنن ابن ماجه'
  },
  {
    id: 'malik',
    name: 'Muwatta Malik',
    description: 'Earliest written collection of hadith',
    arabic: 'موطأ مالك'
  },
  {
    id: 'ahmad',
    name: 'Musnad Ahmad',
    description: 'Large collection by Imam Ahmad',
    arabic: 'مسند أحمد'
  },
  {
    id: 'darimi',
    name: 'Sunan ad-Darimi',
    description: 'Early hadith collection',
    arabic: 'سنن الدارمي'
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
