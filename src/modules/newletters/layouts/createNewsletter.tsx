'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/core/commons/navigation/backButton';
import RichTextEditor from '@/core/commons/components/richTextEditor';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useNewsletterService } from '../services';
import { useCategoryService } from '@/modules/categories/services/categoryServices';
import { useSubCategoryService } from '@/modules/categories/services/subCategoryServices';
import { CategoryTypes, SubCategoryTypes } from '@/types/categories.types';
import { newsletterUserType } from '@/constants/data';
import { NewsletterFormData } from '../schema';

export const CreateNewsletter = () => {
  const [selectedUserType, setSelectedUserType] = useState<
    { label: string; key: string } | undefined
  >(undefined);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryTypes | undefined
  >(undefined);
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    SubCategoryTypes | undefined
  >(undefined);

  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      watch,
    },
    createAndDraftNewsletter,
    createAndSend,
    serverError,
  } = useNewsletterService();

  const content = watch('content');

  const { data: categories, isLoading: categoryLoading } = useCategoryService();
  const {
    getSubCategoryByCategory,
    subCategory,
    singleSubCategoryLoading: subCategoryLoading,
  } = useSubCategoryService();

  const onCreateAndDraftNewsletter = async (data: NewsletterFormData) => {
    try {
      await createAndDraftNewsletter(data);
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  };

  const onCreateAndSendNewsletter = async (data: NewsletterFormData) => {
    try {
      await createAndSend(data);
    } catch (error) {
      console.error('Failed to send newsletter:', error);
    }
  };

  return (
    <Card>
      <CardHeader className='flex flex-row justify-between items-center mb-3'>
        <BackButton title='Newsletters' />
        <div className='flex flex-row gap-2'>
          <Button
            variant='outline'
            className='border-amber-600 text-amber-600'
            type='submit'
            disabled={isSubmitting}
            form='newsletter-form'
            onClick={handleSubmit(onCreateAndDraftNewsletter)}
          >
            Save as draft
          </Button>
          <Button
            type='submit'
            disabled={isSubmitting}
            form='newsletter-form'
            onClick={handleSubmit(onCreateAndSendNewsletter)}
          >
            Send
          </Button>
        </div>
      </CardHeader>
      <form
        id='newsletter-form'
        className='px-4 pb-6'
        onSubmit={(e) => e.preventDefault()}
      >
        {serverError && (
          <div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>
            {serverError}
          </div>
        )}
        <Separator className='mb-5' />
        <main className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <div>
            <Label className='mb-2'>User Type</Label>
            <Select
              onValueChange={(value) => {
                const type = newsletterUserType?.find((q) => q.key === value);
                setSelectedUserType(type);
                setValue('userType', value, { shouldValidate: true });
              }}
              value={selectedUserType?.key || ''}
            >
              <SelectTrigger className='w-full h-12'>
                <SelectValue placeholder='Select User type' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {newsletterUserType.map((type) => (
                    <SelectItem value={type.key} key={type.key}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.userType && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.userType.message}
              </p>
            )}
          </div>
        </main>
        {selectedUserType?.key === 'users' && (
          <main className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
            <div>
              <Label htmlFor='category' className='mb-2'>
                Category
              </Label>
              <Select
                onValueChange={(value) => {
                  const category = categories?.find((cat) => cat.id === value);
                  setSelectedCategory(category);
                  setSelectedSubCategory(undefined);
                  setValue('userCategory', value, { shouldValidate: true });
                  setValue('subCategory', '');
                  getSubCategoryByCategory(value);
                }}
                value={selectedCategory?.id || ''}
                disabled={categoryLoading || !categories?.length}
              >
                <SelectTrigger className='w-full h-12'>
                  <SelectValue placeholder='Select Category' />
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
                <p className='text-red-500 text-sm mt-1'>
                  {errors.userCategory.message}
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
                  setValue('subCategory', value, { shouldValidate: true });
                }}
                value={selectedSubCategory?.id || ''}
                disabled={
                  subCategoryLoading ||
                  !subCategory?.length ||
                  !selectedCategory
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
        )}
        <Separator className='my-5' />
        <main className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <div>
            <Label htmlFor='title' className='mb-2'>
              Title
            </Label>
            <Input
              id='title'
              placeholder='Enter Newsletter title'
              {...register('title')}
            />
            {errors.title && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.title.message}
              </p>
            )}
          </div>
        </main>
        <main className='mt-5'>
          <Label htmlFor='content' className='mb-2'>
            Content
          </Label>
          <RichTextEditor
            content={content}
            onChange={(e) => setValue('content', e, { shouldValidate: true })}
          />
          {errors.content && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.content.message}
            </p>
          )}
        </main>
      </form>
    </Card>
  );
};
