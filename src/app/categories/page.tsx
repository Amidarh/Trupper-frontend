'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { CategoryOne } from '@/modules/categories/layout/categoryOne';
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs';
import { SubCategory } from '@/modules/categories/layout/subCategoryList';

const CategoriesPage = () => {
  return (
    <DashboardLayout
      pageTitle='Categorization Center'
      subHeading='Manage Categorization here'
    >
      <Tabs defaultValue='category'>
        <TabsList>
          <TabsTrigger value='category'>Category</TabsTrigger>
          <TabsTrigger value='sub-category'>Sub Category</TabsTrigger>
        </TabsList>
        <TabsContent value='category'>
          <CategoryOne />
        </TabsContent>
        <TabsContent value='sub-category'>
          <SubCategory />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default CategoriesPage;
