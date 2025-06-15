import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const PreferenceSettings = () => {
  return (
    <section>
      <div className='flex flex-row items-center justify-between'>
        <h1 className='font-bold'>Preference Settings</h1>
        <Button>Edit</Button>
      </div>
      <Separator className='my-4' />
      <main>
        <div className='w-[150px] h-[150px] rounded-sm border'></div>
      </main>
      <main className='grid sm:grid-cols-2 grid-cols-1 gap-5 mt-5'>
        <div className='mb-4'>
          <Label htmlFor='email' className='mb-2'>
            First Name
          </Label>
          <Input
            type='text'
            id='email'
            placeholder='Enter First Name'
            className='h-12'
          />
        </div>
        <div className='mb-4'>
          <Label htmlFor='email' className='mb-2'>
            Last Name
          </Label>
          <Input
            type='text'
            id='email'
            placeholder='Enter Last Name'
            className='h-12'
          />
        </div>
      </main>
    </section>
  );
};
