import { useState } from 'react';
import api from './api';
import { toast } from 'sonner';
import {
  categorySchema,
  CategoryFormData,
  SubCategoryFormData,
  subCategorySchema,
} from '@/modules/categories/schema/categoriesSchema';
import {
  CategoryTypes,
  CategoryDataTypes,
  SubCategoryDataTypes,
  SubCategoryTypes,
} from '@/types/categories.types';

export const useCoreServices = () => {
  const [subCategory, setSubCategory] = useState<
    SubCategoryTypes | null | undefined
  >(null);
  const [subCategoryLoading, setSubCategoryLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState('');

  const getSubCategoryByCategory = async (id: string | undefined) => {
    setSubCategoryLoading(true);
    setServerError('');
    try {
      const res = await api.get(`/category/category-two-by-category-one/${id}`);
      if (res.status === 200) {
        setSubCategory(res.data.doc);
        setSubCategoryLoading(false);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not get Sub category';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    getSubCategoryByCategory,
    subCategory,
    subCategoryLoading,
    serverError,
  };
};
