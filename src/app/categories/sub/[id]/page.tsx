'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { BackButton } from '@/core/commons/navigation/backButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Trash2 } from 'lucide-react';
import { useCategoryService } from '@/modules/categories/services/categoryServices';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSubCategoryService } from '@/modules/categories/services/subCategoryServices';
import { CreateExamModeModal } from '@/modules/categories/components/modal/createExamMode';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CategoryTypes } from '@/types/categories.types';
import { SubCategoryFormData } from '@/modules/categories/schema/categoriesSchema';
import { toast } from 'sonner';
import { ExamModeTable } from '@/modules/categories/components/tables/examMode';

const ViewSubCategoryPage = () => {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      reset,
    },
    getSingleSubCategory,
    singleSubCategory,
    deleteSubCategory,
    editSubCategory,
    singleSubCategoryLoading,
  } = useSubCategoryService();

  const { id } = useParams<{ id: string }>();
  const [edit, setEdit] = useState(false);
  const { data: categories } = useCategoryService();
  const [isActive, setIsActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryTypes | undefined
  >(undefined);

  // Fetch subcategory data on mount
  useEffect(() => {
    if (id) {
      getSingleSubCategory(id);
    }
  }, [id]);

  // Populate form with subcategory data
  useEffect(() => {
    if (singleSubCategory) {
      reset({
        name: singleSubCategory.name,
        userCategory: singleSubCategory.userCategory?.id || '',
        status: singleSubCategory.status || false,
      });
      setIsActive(singleSubCategory.status || false);
      setSelectedCategory(
        categories?.find((cat) => cat.id === singleSubCategory.userCategory?.id)
      );
    }
  }, [singleSubCategory, categories, reset]);

  const onSubmit = async (data: SubCategoryFormData) => {
    try {
      await editSubCategory({ id, data }); // Use `id` from useParams
      setEdit(false); // Exit edit mode after successful submission
      toast.success('Subcategory updated successfully');
    } catch (error) {
      toast.error(
        'Failed to update subcategory: ' + ((error as Error)?.message || '')
      );
    }
  };

  const handleDelete = async () => {
    if (id && confirm('Are you sure you want to delete this subcategory?')) {
      try {
        await deleteSubCategory(id);
      } catch (error) {
        toast.error(
          'Failed to update subcategory: ' + ((error as Error)?.message || '')
        );
      }
    }
  };

  return (
    <DashboardLayout
      pageTitle={
        singleSubCategoryLoading
          ? 'Loading...'
          : `${singleSubCategory?.name} Sub Category`
      }
      subHeading='Manage your subcategories here'
    >
      <Card className='p-4 mb-4'>
        <CardContent className='p-0'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex justify-between items-center mb-4'>
              <BackButton title='Subcategories' />
              <div className='flex gap-2'>
                {!edit && (
                  <Button type='button' onClick={() => setEdit(true)}>
                    Edit Subcategory
                  </Button>
                )}
                {edit && (
                  <Button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update Subcategory'}
                  </Button>
                )}
                {edit ? (
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={() => setEdit(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={handleDelete}
                    disabled={isSubmitting}
                  >
                    <Trash2 className='h-4 w-4 mr-2' />
                    Delete
                  </Button>
                )}
              </div>
            </div>
            <div>
              {/* <div className='h-24 w-24 border rounded-sm'></div>{' '} */}
              {/* Fixed Tailwind classes */}
            </div>

            <Separator className='my-5' />

            <main className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
              <div className='mb-4'>
                <Label htmlFor='name' className='mb-2'>
                  Name
                </Label>
                <Input
                  id='name'
                  placeholder='Enter Subcategory name'
                  className='h-12'
                  {...register('name')}
                  disabled={!edit}
                />
                {errors.name && (
                  <p className='text-red-500 text-sm'>{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor='category' className='mb-2'>
                  Category
                </Label>
                <Select
                  onValueChange={(value) => {
                    setSelectedCategory(
                      categories?.find((cat) => cat.id === value)
                    );
                    setValue('userCategory', value, { shouldValidate: true });
                  }}
                  value={selectedCategory?.id || ''}
                  disabled={!edit}
                >
                  <SelectTrigger className='w-full h-12'>
                    <SelectValue
                      placeholder={singleSubCategory?.userCategory?.name}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.userCategory && (
                  <p className='text-red-500 text-sm'>
                    {errors.userCategory.message}
                  </p>
                )}
              </div>
            </main>
            <div>
              <h1 className='text-xl'>Status</h1>
              <div className='flex flex-row items-center gap-2.5 mt-5'>
                <p className='text-sm'>Active</p>
                <Switch
                  checked={isActive}
                  onCheckedChange={(checked) => {
                    setIsActive(checked);
                    setValue('status', checked, { shouldValidate: true });
                  }}
                  disabled={!edit}
                />
              </div>
              {errors.status && (
                <p className='text-red-500 text-sm'>{errors.status.message}</p>
              )}
            </div>
            <Separator className='my-5' />
          </form>

          <main className='mt-10'>
            <div className='flex flex-row justify-between'>
              <h1 className='text-xl'>Exam Mode</h1>
              <CreateExamModeModal />
            </div>
            <div className='mt-5'>
              <ExamModeTable />
            </div>
          </main>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ViewSubCategoryPage;
