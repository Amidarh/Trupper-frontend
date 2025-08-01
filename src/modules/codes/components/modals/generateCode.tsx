'use client';

import { useState, useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  // AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeftCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCodeService } from '../../services';
import { useSubCategoryService } from '@/modules/categories/services/subCategoryServices';
import { useCategoryService } from '@/modules/categories/services/categoryServices';
import { CategoryTypes, SubCategoryTypes } from '@/types/categories.types';
import { CodeFormData } from '../../schemas';
import { toast } from 'sonner';
// import { handleExport } from "@/utils/exports/codes";

export function GenerateCodeModal() {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
    },
    generateCode,
    serverError,
    generateCodeLoading,
    generatedCodeCount,
    generatedCode,
    setGeneratedCodeCount,
    bulkCode,
  } = useCodeService({});
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

  // const onSubmit = useCallback(
  //   async (data: CodeFormData, exportCodes: boolean) => {
  //     try {
  //       await generateCode(data)
  //       if(exportCodes && bulkCode.length > 0){
  //         handleExport("pdf", bulkCode)
  //       }
  //     } catch (error) {
  //       console.error("Failed to generate codes:", error)
  //     }
  //   },
  //   [generateCode, bulkCode]
  // );
  const onSubmit = useCallback(
    async (data: CodeFormData) => {
      try {
        await generateCode(data);
      } catch (error) {
        console.error('Failed to generate codes:', error);
      }
    },
    [generateCode, bulkCode]
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={categoriesLoading}>Generate Code</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {generateCodeLoading ? (
          <div className='flex items-center justify-center'>
            <p>Generating Codes...</p>
          </div>
        ) : generatedCodeCount === 1 ? (
          <AlertDialogDescription>
            <div className='flex flex-row justify-between items-center'>
              <Button variant='ghost' onClick={() => setGeneratedCodeCount(0)}>
                <ChevronLeftCircle className='h-6 w-6' />
                Back
              </Button>
              <AlertDialogCancel
                className='bg-transparent border-0 p-0'
                onClick={() => setGeneratedCodeCount(0)}
              >
                <X className='h-6 w-6' />
              </AlertDialogCancel>
            </div>
            <div className='flex items-center justify-center flex-col'>
              <p>Code Generated Successfully</p>
              <h1 className='text-green-500 font-bold text-3xl'>
                {generatedCode}
              </h1>
              <Button
                variant='outline'
                className='mt-4'
                onClick={() => {
                  navigator.clipboard.writeText(generatedCode || '');
                  toast.success('Code copied to clipboard');
                }}
              >
                Copy Code
              </Button>
            </div>
          </AlertDialogDescription>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <AlertDialogHeader>
              <div className='flex flex-row justify-between items-center'>
                <AlertDialogTitle>Generate Code Settings</AlertDialogTitle>
                <AlertDialogCancel className='bg-transparent border-0 p-0'>
                  <X className='h-6 w-6' />
                </AlertDialogCancel>
              </div>
              <AlertDialogDescription className='flex flex-col gap-5'>
                <p>Configure your authentication code use case</p>

                <div>
                  <Label htmlFor='count' className='mb-2'>
                    Number of Codes
                  </Label>
                  <Input
                    type='number'
                    id='count'
                    placeholder='Enter the number of codes to be generated'
                    {...register('count', {
                      required: 'Number of codes is required',
                      min: {
                        value: 1,
                        message: 'Must generate at least 1 code',
                      },
                      valueAsNumber: true,
                      validate: (value) =>
                        Number.isInteger(value) || 'Must be an integer',
                    })}
                  />
                  {errors.count && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.count.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor='category' className='mb-2'>
                    Category
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      const category = categories?.find(
                        (cat) => cat.id === value
                      );
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
                      const subCat = subCategory?.find(
                        (cat) => cat.id === value
                      );
                      setSelectedSubCategory(subCat);
                      console.log('Selected Sub Category:', subCat);
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

                {serverError && (
                  <p className='text-red-500 text-sm mt-2'>{serverError}</p>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className='mt-5 flex flex-row justify-between'>
              <AlertDialogAction
                onClick={handleSubmit((data) => onSubmit(data))}
                disabled={
                  isSubmitting || subCategoryLoading || categoriesLoading
                }
              >
                Generate Code(s)
              </AlertDialogAction>
              <AlertDialogAction
                onClick={handleSubmit((data) => onSubmit(data))}
                disabled={
                  isSubmitting || subCategoryLoading || categoriesLoading
                }
                className='bg-green-800 text-white hover:bg-green-900'
              >
                Generate and Export
              </AlertDialogAction>
            </div>
          </form>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
