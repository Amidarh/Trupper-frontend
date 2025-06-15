import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export const AdminPermissions = () => {
  return (
    <main>
      <Card>
        <CardHeader>
          <h1 className='text-xl'>Permissions</h1>
        </CardHeader>
        <Separator />
        <CardContent className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
          <div className='flex flex-row gap-3 items-center mt-4 justify-between'>
            <p>Users</p>
            <Switch />
          </div>
          <div className='flex flex-row gap-3 items-center mt-4 justify-between'>
            <p>Categories</p>
            <Switch />
          </div>
          <div className='flex flex-row gap-3 items-center mt-4 justify-between'>
            <p>Exam Type</p>
            <Switch />
          </div>
          <div className='flex flex-row gap-3 items-center mt-4 justify-between'>
            <p>Exam</p>
            <Switch />
          </div>
          <div className='flex flex-row gap-3 items-center mt-4 justify-between'>
            <p>Subjects</p>
            <Switch />
          </div>
          <div className='flex flex-row gap-3 items-center mt-4 justify-between'>
            <p>Questions</p>
            <Switch />
          </div>
          <div className='flex flex-row gap-3 items-center mt-4 justify-between'>
            <p>Notifications</p>
            <Switch />
          </div>
          <div className='flex flex-row gap-3 items-center mt-4 justify-between'>
            <p>Newsletters</p>
            <Switch />
          </div>
        </CardContent>

        <CardFooter>
          <Button className='cursor-pointer'>Save</Button>
        </CardFooter>
      </Card>
    </main>
  );
};
