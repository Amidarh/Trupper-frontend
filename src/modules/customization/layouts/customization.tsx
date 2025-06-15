'use client';

import { Card } from '@/components/ui/card';
import { Settings } from '../components/tabs/settings';
import { Preference } from '../components/tabs/prefrence';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';

export const Customization = () => {
  return (
    <Card className='px-5'>
      <Tabs defaultValue='settings'>
        <TabsList>
          <TabsTrigger value='settings'>Settings</TabsTrigger>
          <TabsTrigger value='preference'>Preference</TabsTrigger>
        </TabsList>
        <TabsContent value='settings'>
          <Settings />
        </TabsContent>
        <TabsContent value='preference'>
          <Preference />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
