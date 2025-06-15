import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Sample timetable data
const timetableData = [
  {
    time: '8:00 AM - 9:30 AM',
    subject: 'Mathematics',
    teacher: 'Prof. William Johnson',
    room: 'Room 101',
    status: 'completed',
  },
  {
    time: '9:45 AM - 11:15 AM',
    subject: 'Biology',
    teacher: 'Dr. Emily Chen',
    room: 'Lab 203',
    status: 'current',
  },
  {
    time: '11:30 AM - 1:00 PM',
    subject: 'Lunch Break',
    room: 'Cafeteria',
    status: 'upcoming',
  },
  {
    time: '1:15 PM - 2:45 PM',
    subject: 'History',
    teacher: 'Prof. Michael Adams',
    room: 'Room 305',
    status: 'upcoming',
  },
  {
    time: '3:00 PM - 4:30 PM',
    subject: 'Physics',
    teacher: 'Dr. Sarah Wilson',
    room: 'Lab 204',
    status: 'upcoming',
  },
];

export function ResultTable() {
  return (
    <div className='space-y-3'>
      {timetableData.map((session, i) => (
        <Card
          key={i}
          className={`bg-card ${session.status === 'current' ? 'border-primary border-2' : ''}`}
        >
          <CardContent className='p-4'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2'>
              <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                  <h3 className='font-medium'>{session.subject}</h3>
                  <Badge
                    variant={
                      session.status === 'completed'
                        ? 'secondary'
                        : session.status === 'current'
                          ? 'default'
                          : 'outline'
                    }
                  >
                    {session.status === 'completed'
                      ? 'Completed'
                      : session.status === 'current'
                        ? 'In Progress'
                        : 'Upcoming'}
                  </Badge>
                </div>
                {session.teacher && (
                  <p className='text-sm text-muted-foreground'>
                    {session.teacher}
                  </p>
                )}
              </div>

              <div className='flex flex-col sm:items-end'>
                <p className='text-sm font-medium'>{session.time}</p>
                <p className='text-sm text-muted-foreground'>{session.room}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
