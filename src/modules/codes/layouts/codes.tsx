'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CodeTable } from '../components/tables/codeTable';
import { GenerateCodeModal } from '../components/modals/generateCode';
import { useCodeService } from '../services';
import { handleExport } from '@/utils/exports/codes';
import { useAltStore } from '@/lib/zustand/userStore';

export const Codes = () => {
  const { data } = useCodeService({ page: 1, limit: 1000000 });
  const organization = useAltStore((state) => state.organization);
  const handleExportCodes = async () => {
    if (data && organization) {
      await handleExport('pdf', data.codes, organization);
    }
  };
  return (
    <Card>
      <CardHeader className='flex md:flex-row justify-between flex-col'>
        <h1>Authentication Code</h1>
        <div className='flex items-center gap-2'>
          <Button variant='outline' onClick={handleExportCodes}>
            Export Codes
          </Button>
          <GenerateCodeModal />
        </div>
      </CardHeader>
      <CardContent>
        <CodeTable />
      </CardContent>
    </Card>
  );
};
