'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { BackButton } from '@/core/commons/navigation/backButton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Trash2 } from 'lucide-react';
import { useCategoryService } from '@/modules/categories/services/categoryServices';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CategoryFormData } from '@/modules/categories/schema/categoriesSchema';

const ViewCategoryPage = () => {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      watch,
      reset,
    },
    singleCategoryLoading,
    singleCategory,
    getSingleCategory,
    deleteCategory,
    editCategory,
  } = useCategoryService();

  const { id } = useParams();
  const [edit, setEdit] = useState(false);

  // Watch status from form state
  const status = watch('status');

  useEffect(() => {
    if (singleCategory) {
      reset({
        name: singleCategory.name,
        status: singleCategory.status,
      });
    }
  }, [singleCategory, reset]);

  useEffect(() => {
    if (typeof id === 'string') {
      getSingleCategory(id);
    }
  }, [id]);

  const handleEditState = () => {
    if (edit && singleCategory) {
      reset({
        name: singleCategory.name,
        status: singleCategory.status,
      });
    }
    setEdit(!edit);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(singleCategory?.id);
        // Optionally redirect
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      console.log({ data });
      await editCategory({ id: singleCategory?.id, data });
      setEdit(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <DashboardLayout
      pageTitle={
        singleCategoryLoading
          ? 'loading...'
          : `${singleCategory?.name} Category`
      }
      subHeading='Manage your categories here'
    >
      <Card className='p-4 mb-4'>
        <div className='flex justify-between items-center mb-4'>
          <BackButton title='Categories' />
          <div className='flex gap-2 flex-row'>
            {edit && (
              <Button type='submit' form='categoryForm' disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Category'}
              </Button>
            )}
            {!edit && (
              <Button
                onClick={handleEditState}
                disabled={singleCategoryLoading}
              >
                Edit Category
              </Button>
            )}
            {edit ? (
              <Button variant='destructive' onClick={handleEditState}>
                Cancel
              </Button>
            ) : (
              <Button
                variant='destructive'
                onClick={handleDelete}
                disabled={singleCategoryLoading}
              >
                <Trash2 />
                <p>Delete Category</p>
              </Button>
            )}
          </div>
        </div>
        <form id='categoryForm' onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="h-25 w-25 border rounded-sm"></div> */}

          <Separator className='my-5' />

          <main className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
            <div className='mb-4'>
              <Label htmlFor='categoryName' className='mb-2'>
                Name
              </Label>
              <Input
                type='text'
                id='categoryName'
                placeholder='Enter Category Name'
                className='h-12'
                disabled={!edit}
                {...register('name', { required: 'Category name is required' })}
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name.message}</p>
              )}
            </div>
          </main>

          <div>
            <h1 className='text-xl'>Status</h1>
            <div className='flex flex-row items-center gap-2.5 mt-5'>
              <Label htmlFor='statusSwitch' className='text-sm'>
                Active
              </Label>
              <Switch
                id='statusSwitch'
                checked={status}
                onCheckedChange={(checked) =>
                  setValue('status', checked, { shouldValidate: true })
                }
                disabled={!edit}
              />
            </div>
          </div>

          <Separator className='my-5' />
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default ViewCategoryPage;
