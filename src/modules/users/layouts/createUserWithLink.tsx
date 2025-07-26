import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { BackButton } from '@/core/commons/navigation/backButton';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useCategoryService } from '@/modules/categories/services/categoryServices';
import { useSubCategoryService } from '@/modules/categories/services/subCategoryServices';
import { useEffect, useState } from 'react';
import { CategoryTypes } from '@/types/categories.types';
import { SubCategoryTypes } from '@/types/categories.types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUserService } from '../services/user';

export function CreateUserWithLinkLayout() {
  const { data: categories, isLoading: categoriesLoading } =
    useCategoryService();
  const { getSubCategoryByCategory, subCategory, subCategoryLoading } =
    useSubCategoryService();
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryTypes | undefined
  >(undefined);
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    SubCategoryTypes | undefined
  >(undefined);
  const {
    createUserWithLink,
    linkForm: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      reset,
    },
  } = useUserService({});

  return (
    <Card>
      <CardHeader className='flex flex-row justify-between items-center px-3'>
        <BackButton title='Users' />
        <Button
          onClick={handleSubmit(createUserWithLink)}
          disabled={isSubmitting}
        >
          <Plus />
          {isSubmitting ? 'Adding User...' : 'Add User'}
        </Button>
      </CardHeader>
      <Separator />
      <main className='grid sm:grid-cols-2 grid-cols-1 gap-5 p-4'>
        <div className='mb-4'>
          <Label htmlFor='email' className='mb-2'>
            Email
          </Label>
          <Input
            type='email'
            id='email'
            placeholder='Enter email address'
            className='h-12'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='category' className='mb-2'>
            Category
          </Label>
          <Select
            onValueChange={(value) => {
              const category = categories?.find((cat) => cat.id === value);
              setSelectedCategory(category);
              setSelectedSubCategory(undefined);
              setValue('category', value, { shouldValidate: true });
              setValue('subCategory', '');
              getSubCategoryByCategory(value);
            }}
            value={selectedCategory?.id || ''}
            disabled={categoriesLoading || !categories?.length}
          >
            <SelectTrigger className='w-full h-12'>
              <SelectValue
                placeholder={
                  categoriesLoading ? 'Loading...' : 'Select Category'
                }
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
          {errors.category && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.category.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor='subCategory' className='mb-2'>
            Sub Category
          </Label>
          <Select
            onValueChange={(value) => {
              const subCat = subCategory?.find((cat) => cat.id === value);
              setSelectedSubCategory(subCat);
              console.log('Selected Sub Category:', subCat);
              setValue('subCategory', value, { shouldValidate: true });
            }}
            value={selectedSubCategory?.id || ''}
            disabled={
              subCategoryLoading || !subCategory?.length || !selectedCategory
            }
          >
            <SelectTrigger className='w-full h-12'>
              <SelectValue
                placeholder={
                  subCategoryLoading
                    ? 'Loading...'
                    : !selectedCategory
                      ? 'Select a category first'
                      : 'Select Sub Category'
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {subCategory?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.subCategory && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.subCategory.message}
            </p>
          )}
        </div>
      </main>
    </Card>
  );
}
