'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CategoryOneTable } from '../components/tables/categoryOne';
import { useRouter } from 'next/navigation';
import { SubCategoryTable } from '../components/tables/subCategory';
import { useSubCategoryService } from '../services/subCategoryServices';

export const SubCategory = () => {
  const router = useRouter();
  const { data } = useSubCategoryService();
  return (
    <Card className='px-4'>
      <CardHeader className='p-0 flex flex-row items-centre justify-between'>
        <div></div>
        <Button
          onClick={() => router.push('/categories/sub')}
          className='w-fit cursor-pointer'
        >
          Create Sub Category
        </Button>
      </CardHeader>
      <SubCategoryTable subCategories={data} />
    </Card>
  );
};
