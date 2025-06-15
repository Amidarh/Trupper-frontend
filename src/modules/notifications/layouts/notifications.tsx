import { NotificationsTable } from '../components/table/notificationTable';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const Notifications = () => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader className='flex flex-row justify-between items-center'>
        <h1>All Notifications</h1>
        <Button
          onClick={() => router.push('/notifications/create')}
          className='cursor-pointer'
        >
          Create Notification
        </Button>
      </CardHeader>
      <CardContent>
        <NotificationsTable />
      </CardContent>
    </Card>
  );
};
