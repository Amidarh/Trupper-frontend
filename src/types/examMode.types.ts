import { IUser } from "./user.types";
import { ExamType } from "./exam.types";
import { SubCategoryTypes } from "./categories.types";
import { CategoryTypes } from "./categories.types";

export interface examModeType{
    name: string,
    createdAt: Date,
    createdBy: IUser,
    exam: ExamType,
    subCategory: SubCategoryTypes,
    category: CategoryTypes,
    updatedAt: Date,
    status: boolean,
    id:string,
    validFrom: Date,
    validTill: Date
};

export interface examModeDataType {
    doc: examModeType[];
}