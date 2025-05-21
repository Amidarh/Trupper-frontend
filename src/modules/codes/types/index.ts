import { SubCategoryTypes } from "@/types/categories.types";
import { CategoryTypes } from "@/types/categories.types";

export interface codeType {
    id: string;
    code: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    category: CategoryTypes;
    subCategory: SubCategoryTypes;
    organization: string;
};

export interface CodeDataTypes {
    doc: codeType[];
}