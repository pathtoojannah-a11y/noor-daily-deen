import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 pb-24">
        <h1 className="text-3xl font-bold">Settings</h1>

        <Card 
          className="border-2 cursor-pointer hover:border-primary transition-colors"
          onClick={() => navigate('/notifications')}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <CardTitle>Notification Times</CardTitle>
                  <CardDescription>
                    Set when you'd like gentle Islamic reminders throughout your day
                  </CardDescription>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Nūr - Your daily companion for spiritual growth.</p>
            <p className="text-xs">
              Content sourced from Qur'an API, Hadith API, and Duʿāʾ API
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
